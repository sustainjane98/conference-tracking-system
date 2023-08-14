import { Item } from 'linked-list';

export class Talk extends Item {
  public durationAfter = 0;

  constructor(
    public title: string,
    public duration?: number,
    public start?: Date,
    public end?: Date
  ) {
    super();
  }
}
