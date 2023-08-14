import { SessionType } from '../enums/talks/session-type.enum';
import { SessionFactory } from '../services/factories/session-factory.service';
import { Talk } from './talk.model';
import { Session } from './session.model';
import dayjs from 'dayjs';
import { TrackState } from '../enums/track-state.enum';

export default class Track {
  private static counter = 0;

  public id: number;

  public state: TrackState = TrackState.EMPTY;

  private sessionFactory = new SessionFactory();

  public sessions = {
    [SessionType.MORNING]: this.sessionFactory.createMorningSession(),
    [SessionType.EVENING]: this.sessionFactory.createEveningSession(),
  };

  public constructor() {
    this.id = Track.counter;
    Track.counter++;
  }

  public addTalk(talk: Talk): boolean {
    const morningSession = this.sessions[SessionType.MORNING];
    const eveningSession = this.sessions[SessionType.EVENING];

    if (
      this.isSessionDurationGreaterOrEqualsTalkDuration(morningSession, talk)
    ) {
      return this.addTalkToSession(morningSession, talk);
    } else if (
      this.isSessionDurationGreaterOrEqualsTalkDuration(eveningSession, talk)
    ) {
      return this.addTalkToSession(eveningSession, talk);
    } else {
      for (const session of Object.values(this.sessions)) {
        if (this.addIfSessionHasMatchingDurationSlot(talk, session)) {
          return true;
        }
      }
    }

    return false;
  }

  private isSessionDurationGreaterOrEqualsTalkDuration(
    session: Session,
    talk: Talk
  ) {
    return session.duration >= (talk.duration ?? 0);
  }

  private addIfSessionHasMatchingDurationSlot(talk: Talk, session: Session) {
    for (const sessionTalk of session.talks) {
      if (!talk.duration) {
        break;
      }
      if (sessionTalk.durationAfter >= (talk.duration ?? 0)) {
        sessionTalk.append(talk);
        sessionTalk.durationAfter -= talk.duration;
        return true;
      }
    }
    return false;
  }

  private addTalkToSession(session: Session, currentTalk: Talk): boolean {
    currentTalk.start = session.currentTime;
    currentTalk.end = dayjs(session.currentTime)
      .add(currentTalk.duration ?? 0, 'minute')
      .toDate();
    const previousTalk = session.talks?.toArray()[session.talks.size - 1];

    if (previousTalk)
      previousTalk.durationAfter = this.getDurationBetween(
        currentTalk,
        previousTalk
      );

    if (previousTalk?.durationAfter > 0) {
      this.state = TrackState.SPACE_BETWEEN;
    }

    session.talks.append(currentTalk);
    session.duration -= currentTalk?.duration ?? 0;
    return true;
  }

  private getDurationBetween(currentTalk: Talk, previousTalk: Talk) {
    if (!previousTalk.end) return 0;
    return dayjs(currentTalk.start).diff(previousTalk.end, 'minute');
  }
}
