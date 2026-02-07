export class Booking {
  constructor(
    public id: string,
    public screeningId: string,
    public seatId: string,
    public userId: string,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
