export class FilmScreeningResponseDto {
  filmId: string;
  screeningId: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  price: number;
  availableSeats: number;
}
