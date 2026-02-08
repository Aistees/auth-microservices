export class Film {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public director: string,
    public genre: string,
    public duration: number,
    public releaseDate: Date,
    public rating: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
