import { SessionType } from '../enums/talks/session-type.enum';
import { SessionFactory } from '../services/factories/session-factory.service';
import { Talk } from './talk.model';
import { Session } from './session.model';
import dayjs from 'dayjs';

export default class Track {
  private static counter = 0;

  public id: number;

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
    }
    return false;
  }

  private isSessionDurationGreaterOrEqualsTalkDuration(
    session: Session,
    talk: Talk
  ) {
    return session.duration >= (talk.duration ?? 0);
  }

  private addTalkToSession(session: Session, talk: Talk): boolean {
    talk.start = session.currentTime;
    talk.end = dayjs(session.currentTime)
      .add(talk.duration ?? 0, 'minute')
      .toDate();
    session.talks.push(talk);
    session.duration -= talk?.duration ?? 0;
    return true;
  }
}
