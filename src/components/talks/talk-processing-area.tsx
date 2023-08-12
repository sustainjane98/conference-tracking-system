'use client';

import { FunctionComponent } from 'react';
import { Textarea } from '@/components/common/flowbite-react';
import { useConferenceContext } from '@/hooks/talks/use-conference-context';
import TalksService from '@/services/talks.service';

export const TalkProcessingArea: FunctionComponent = () => {
  const { tracks } = useConferenceContext();
  const talkService = new TalksService();
  return (
    <Textarea
      readOnly
      className={'h-full cursor-not-allowed'}
      value={talkService.tracksToString(tracks.keys())}
    />
  );
};
