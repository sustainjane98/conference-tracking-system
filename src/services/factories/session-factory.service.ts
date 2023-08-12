import { Session } from '@/models/session.model';
import { SessionType } from '@/enums/talks/session-type.enum';
import dayjs from 'dayjs';

export class SessionFactory {
  public createMorningSession() {
    return new Session(
      SessionType.MORNING,
      dayjs().add(9, 'hour').toDate(),
      dayjs().add(12, 'hour').toDate(),
    );
  }

  public createEveningSession() {
    return new Session(
      SessionType.EVENING,
      dayjs().add(13, 'hour').toDate(),
      dayjs().add(16, 'hour').toDate(),
    );
  }

  public createNetworkingSession() {
    return new Session(
      SessionType.NETWORKING,
      dayjs().add(16, 'hour').toDate(),
      dayjs().add(17, 'hour').toDate(),
    );
  }
}
