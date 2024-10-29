import { Injectable } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdvertisementsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAdvertisementDto: CreateAdvertisementDto) {
    console.log('createAdvertisementDto', createAdvertisementDto);

    return this.prisma.advertisement.create({
      data: createAdvertisementDto,
    });
  }

  findAll() {
    return this.prisma.advertisement.findMany({
      include: {
        owner: true,
        items: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.advertisement.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        items: true,
      },
    });
  }

  update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
    return this.prisma.advertisement.update({
      where: {
        id,
      },
      data: updateAdvertisementDto,
    });
  }

  remove(id: number) {
    return this.prisma.advertisement.delete({
      where: {
        id,
      },
    });
  }
}
