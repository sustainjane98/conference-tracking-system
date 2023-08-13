import { SessionType } from '../enums/talks/session-type.enum';
import { Talk } from './talk.model';
import dayjs from 'dayjs';

export class Session {
  public talks: Talk[] = [];
  public duration: number;

  public get currentTime(): Date {
    return dayjs(this.endDate)
      .add(this.duration * -1, 'minute')
      .toDate();
  }

  public constructor(
    public type: SessionType,
    public startDate: Date,
    public endDate: Date
  ) {
    this.duration = dayjs(endDate).diff(startDate, 'minute');
  }
}
