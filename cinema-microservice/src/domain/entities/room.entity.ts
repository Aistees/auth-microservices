export class Room {
  constructor(
    public id: string,
    public name: string,
    public capacity: number,
    public cinemaId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
