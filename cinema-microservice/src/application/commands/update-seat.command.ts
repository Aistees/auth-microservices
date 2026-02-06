export class UpdateSeatCommand {
  constructor(
    public id: string,
    public row: string,
    public number: number,
    public roomId: string,
    public createdAt: Date,
  ) {}
}
