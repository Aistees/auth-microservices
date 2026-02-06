export class CreateRoomCommand {
  constructor(
    public name: string,
    public capacity: number,
    public cinemaId: string,
  ) {}
}
