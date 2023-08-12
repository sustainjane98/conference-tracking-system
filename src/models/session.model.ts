import { SessionType } from '@/enums/talks/session-type.enum';
import { Talk } from '@/models/talk.model';
import dayjs from 'dayjs';

export class Session {
  public talks: Talk[] = [];
  public duration: number;

  public get currentTime(): Date {
    return dayjs(this.startDate)
      .add(this.duration, 'minute')
      .toDate();
  }

  public constructor(
    public type: SessionType,
    public startDate: Date,
    public endDate: Date,
  ) {
    this.duration = dayjs(endDate).diff(
      startDate,
      'minute',
    );
  }
}
