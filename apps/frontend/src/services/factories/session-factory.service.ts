import { Session } from '../../models/session.model';
import { SessionType } from '../../enums/talks/session-type.enum';
import dayjs from 'dayjs';

export class SessionFactory {
  public createMorningSession() {
    return new Session(
      SessionType.MORNING,
      dayjs().hour(9).minute(0).second(0).toDate(),
      dayjs().hour(12).minute(0).second(0).toDate()
    );
  }

  public createEveningSession() {
    return new Session(
      SessionType.EVENING,
      dayjs().hour(13).minute(0).second(0).toDate(),
      dayjs().hour(17).minute(0).second(0).toDate()
    );
  }
}
