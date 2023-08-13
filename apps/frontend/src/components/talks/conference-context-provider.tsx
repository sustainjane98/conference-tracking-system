'use client';

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import conferenceModel from '../../models/conference.model';
import { Talk } from '../../models/talk.model';
import Track from '../../models/track.model';

export type ConferenceContext = typeof conferenceModel;

export type ConferenceContextWithSetter = ConferenceContext & {
  addTalk: (talk: Talk) => void;
};

const initalData: ConferenceContext = conferenceModel;

const initalDataWithSetter: ConferenceContextWithSetter = {
  ...initalData,
  addTalk: () => {
    return;
  },
};

export const ConferenceContext =
  React.createContext<ConferenceContextWithSetter>(initalDataWithSetter);

export const ConferenceContextProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [talksContextState, setTalksContextState] =
    useState<ConferenceContext>(initalData);

  const _createNewTrackAndAdd = (talk: Talk, tracks: Map<Track, boolean>) => {
    const newTrack = new Track();
    newTrack.addTalk(talk);
    tracks.set(newTrack, false);
  };

  return (
    <ConferenceContext.Provider
      value={{
        ...talksContextState,
        addTalk(talk: Talk) {
          const openTracks = talksContextState.openTracks();

          if (openTracks.length === 0) {
            _createNewTrackAndAdd(talk, talksContextState.tracks);
            setTalksContextState((prev) => ({ ...prev }));
            return;
          }

          const firstOpenTrack = openTracks?.[0];
          const successful = firstOpenTrack.key.addTalk(talk);

          if (!successful) {
            talksContextState.setTrackToFinished(firstOpenTrack?.key);
            _createNewTrackAndAdd(talk, talksContextState.tracks);
          }

          setTalksContextState((prev) => ({ ...prev }));
        },
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};
