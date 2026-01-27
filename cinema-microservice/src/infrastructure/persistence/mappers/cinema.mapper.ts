import { Cinemas as PrismaCinema } from '../../../../generated/prisma/client';
import { Cinema } from '../../../domain/entities/cinema.entity';

export class CinemaMapper {
  static toDomain(raw: PrismaCinema): Cinema {
    return new Cinema(
      raw.id,
      raw.name,
      raw.city,
      raw.address,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: Cinema): PrismaCinema {
    return {
      id: domain.id,
      name: domain.name,
      city: domain.city,
      address: domain.address,
      status: (domain as any).status ?? 'active',
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}