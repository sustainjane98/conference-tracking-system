export class Talk {
  constructor(
    public title: string,
    public duration: number,
    public start?: Date,
    public end?: Date,
  ) {}
}
