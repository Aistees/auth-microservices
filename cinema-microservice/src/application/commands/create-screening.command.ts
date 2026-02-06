export class CreateScreeningCommand {
  constructor(
    public roomId: string,
    public externalFilmId: string,
    public startTime: Date,
    public endTime: Date,
    public price: number,
  ) {}
}
