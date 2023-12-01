import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHomes(): Promise<HomeResponseDto[]> {
    const home = await this.prismaService.home.findMany({
      select: {
        id: true,
        city: true,
        propertyType: true,
        number_of_bedrooms: true,
        number_of_bathrooms: true,
        address: true,
        price: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
    });
    return home.map((home) => {
      const fetchHome = { ...home, image: home.images[0].url };
      delete fetchHome.images;
      return new HomeResponseDto(fetchHome);
    });
  }
}
