export class CreateSeatCommand {
  constructor(
    public row: string,
    public number: number,
    public roomId: string,
  ) {}
}
