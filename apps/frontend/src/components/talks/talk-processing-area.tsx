'use client';

import { FunctionComponent } from 'react';
import { Textarea } from 'flowbite-react';
import { useConferenceContext } from '../../hooks/talks/use-conference-context';
import TalksService from '../../services/talks.service';
import { DataTestIds } from '@conference-tracking-system/frontend/tests';

export const TalkProcessingArea: FunctionComponent = () => {
  const { tracks } = useConferenceContext();
  const talkService = new TalksService();
  return (
    <Textarea
      data-test-id={DataTestIds.INDEX.TALK_PROCESSING_AREA}
      readOnly
      className={'h-full cursor-not-allowed'}
      value={talkService.tracksToString(tracks.keys())}
    />
  );
};
