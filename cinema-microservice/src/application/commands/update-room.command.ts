export class UpdateRoomCommand {
  constructor(
    public id: string,
    public name: string,
    public capacity: number,
    public cinemaId: string,
    public createdAt: Date,
  ) {}
}
