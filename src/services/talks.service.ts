import {
  durationRegex,
  talksTitleRegex,
} from '@/regex/talks.regex';
import { Talk } from '@/models/talk.model';
import Track from '@/models/track.model';
import { SessionType } from '@/enums/talks/session-type.enum';
import dayjs from 'dayjs';

export default class TalksService {
  public async extractTitleAndDuration(talkString: string) {
    const talkTitle =
      talkString.match(talksTitleRegex)?.[0];
    const duration = talkString.match(durationRegex)?.[0];

    if (talkTitle && duration) {
      const durationNumber = parseInt(duration);
      return new Talk(talkTitle, durationNumber);
    }

    return null;
  }

  private formatTalkTime(time: Date) {
    return dayjs(time).format('hh:mm A');
  }

  private addTalkString(tracksString: string, talk: Talk) {
    if (talk.start) {
      tracksString += `${this.formatTalkTime(talk.start)} ${
        talk.title
      } ${talk.duration}min \n`;
      return tracksString;
    }
    return '';
  }

  public tracksToString(
    tracks: IterableIterator<Track>,
  ): string {
    let tracksString = '';

    for (const track of tracks) {
      tracksString += `Track ${track.id}: \n`;

      for (const talk of track.sessions[SessionType.MORNING]
        .talks) {
        tracksString = this.addTalkString(
          tracksString,
          talk,
        );
      }

      for (const talk of track.sessions[SessionType.EVENING]
        .talks) {
        this.addTalkString(tracksString, talk);
      }

      for (const talk of track.sessions[
        SessionType.NETWORKING
      ].talks) {
        this.addTalkString(tracksString, talk);
      }
    }

    return tracksString;
  }
}
