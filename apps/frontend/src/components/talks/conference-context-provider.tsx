'use client';

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import conferenceModel from '../../models/conference.model';
import { Talk } from '../../models/talk.model';
import Track from '../../models/track.model';
import { TrackState } from '../../enums/track-state.enum';

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

  const _createNewTrackAndAdd = (
    talk: Talk,
    tracks: (typeof conferenceModel)['tracks']
  ) => {
    const newTrack = new Track();
    newTrack.addTalk(talk);
    tracks.add(newTrack);
  };

  return (
    <ConferenceContext.Provider
      value={{
        ...talksContextState,
        addTalk(talk: Talk) {
          const openTracks = talksContextState.openTracks();

          if (openTracks.size === 0) {
            _createNewTrackAndAdd(talk, talksContextState.tracks);
            setTalksContextState((prev) => ({ ...prev }));
            return;
          }

          const firstOpenTrack = openTracks.keys()?.next().value as Track;
          const successful = firstOpenTrack.addTalk(talk);

          if (!successful) {
            if (firstOpenTrack.state === TrackState.EMPTY) {
              talksContextState.setTrackToFinished(firstOpenTrack);
            }
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
