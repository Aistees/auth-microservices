export class Screening {
  constructor(
    public id: string,
    public roomId: string,
    public externalFilmId: string,
    public startTime: Date,
    public endTime: Date,
    public price: number,
    public createdAt: Date,
    public updatedAt: Date,
    public room?: any, // Add room relationship
  ) {}
}
