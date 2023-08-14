import { SessionType } from '../enums/talks/session-type.enum';
import { SessionFactory } from '../services/factories/session-factory.service';
import { Talk } from './talk.model';
import { Session } from './session.model';
import dayjs from 'dayjs';
import { TrackState } from '../enums/track-state.enum';

export default class Track {
  private static counter = 0;

  private ensureThatDateIsNotSmallerThan16OClock(
    date: Date | undefined
  ): Date | undefined {
    if ((date?.getHours() ?? 0) < 16) {
      return dayjs().hour(16).minute(0).second(0).toDate();
    }

    return date;
  }

  public getNetworkEvent() {
    const lastDateEvening = this.sessions[SessionType.EVENING].talks.tail;
    const lastDateMorning = this.sessions[SessionType.MORNING].talks.tail;

    let networkEventStart = lastDateEvening?.end ?? lastDateMorning?.end;

    networkEventStart =
      this.ensureThatDateIsNotSmallerThan16OClock(networkEventStart);

    return new Talk('Networking Event', undefined, networkEventStart);
  }

  public launch = new Talk(
    'Lunch',
    60,
    dayjs().hour(12).minute(0).second(0).toDate(),
    dayjs().hour(13).minute(0).second(0).toDate()
  );

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
    let previousTalk = session.talks?.toArray()[session.talks.size - 1];

    const isPreviousTalkInMorning =
      session === this.sessions[SessionType.EVENING] &&
      session.talks.size === 0;

    const isPreviousTalkTheEventBeforeNetwork =
      session === this.sessions[SessionType.EVENING] && session.talks.size > 1;

    if (isPreviousTalkInMorning) {
      previousTalk =
        this.sessions[SessionType.MORNING].talks.toArray()?.[
          this.sessions[SessionType.MORNING].talks.size - 1
        ];
    }

    if (previousTalk)
      if (isPreviousTalkInMorning) {
        previousTalk.durationAfter = this.calcDiffToLunch(previousTalk);
      } else if (isPreviousTalkTheEventBeforeNetwork) {
        previousTalk.durationAfter = this.getDurationBetween(
          currentTalk,
          previousTalk
        );
      } else {
        previousTalk.durationAfter = this.getDurationBetween(
          currentTalk,
          previousTalk
        );
      }

    if (previousTalk?.durationAfter > 0) {
      this.state = TrackState.SPACE_BETWEEN;
    }

    session.talks.append(currentTalk);

    session.duration -= currentTalk?.duration ?? 0;
    return true;
  }

  private calcDiffToLunch(previousTalk: Talk) {
    return dayjs(this.launch.start).diff(previousTalk.end, 'minute');
  }

  private getDurationBetween(currentTalk: Talk, previousTalk: Talk) {
    if (!previousTalk.end) return 0;
    return dayjs(currentTalk.start).diff(previousTalk.end, 'minute');
  }
}
