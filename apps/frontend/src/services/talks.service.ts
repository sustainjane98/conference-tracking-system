import { durationRegex, talksTitleRegex } from '../regex/talks.regex';
import { Talk } from '../models/talk.model';
import Track from '../models/track.model';
import { SessionType } from '../enums/talks/session-type.enum';
import dayjs from 'dayjs';
import { List } from 'linked-list';

export default class TalksService {
  public async extractTitleAndDuration(talkString: string) {
    let talkTitle = talkString.match(talksTitleRegex)?.[0];

    if (talkTitle?.[talkTitle.length - 1] === ' ') {
      talkTitle = talkTitle.slice(0, talkTitle.length - 1);
    }

    const duration = talkString.match(durationRegex)?.[0] ?? '5';

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
      tracksString += `${this.formatTalkTime(talk.start)} ${talk.title}${
        talk.duration ? ` ${talk?.duration}min` : ''
      }\n`;
      return tracksString;
    }
    return '';
  }

  private processTalks(
    talks: List<Talk>,
    lastTalkEndDate?: Date
  ): {
    tracksString: string;
    lastTalkEndDate: Date | undefined;
  } {
    let tracksString = '';

    for (const [index, talk] of talks.toArray().entries()) {
      tracksString = this.addTalkString(tracksString, talk);

      if (index === talks.size - 1) {
        lastTalkEndDate = talk.end;
      }
    }

    return { tracksString, lastTalkEndDate };
  }

  private addLaunch(tracksString: string, launch: Talk): string {
    return this.addTalkString(tracksString, launch);
  }

  private addNetworkEvent(
    tracksString: string,

    networkEvent: Talk
  ): string {
    return this.addTalkString(tracksString, networkEvent);
  }

  public tracksToString(tracks: IterableIterator<Track>): string {
    let tracksString = '';

    for (const track of tracks) {
      tracksString += `Track ${track.id}: \n`;

      const morningTalks = track.sessions[SessionType.MORNING].talks;
      let lastTalkBeforeNetorkingEventDate: Date | undefined = undefined;

      const morningProcessResults = this.processTalks(
        morningTalks,
        lastTalkBeforeNetorkingEventDate
      );

      tracksString += morningProcessResults.tracksString;
      lastTalkBeforeNetorkingEventDate = morningProcessResults.lastTalkEndDate;

      tracksString = this.addLaunch(tracksString, track.launch);

      const eveningTalks = track.sessions[SessionType.EVENING].talks;

      const eveningProcessResults = this.processTalks(
        eveningTalks,
        lastTalkBeforeNetorkingEventDate
      );

      tracksString += eveningProcessResults.tracksString;
      lastTalkBeforeNetorkingEventDate = eveningProcessResults.lastTalkEndDate;
      tracksString = this.addNetworkEvent(
        tracksString,
        track.getNetworkEvent()
      );

      tracksString += '\n';
    }

    return tracksString;
  }
}
