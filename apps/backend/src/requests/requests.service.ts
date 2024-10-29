import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRequestDto: CreateRequestDto) {
    return this.prisma.request.create({
      data: createRequestDto,
    });
  }

  findAll() {
    return this.prisma.request.findMany();
  }

  findOne(id: number) {
    return this.prisma.request.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return this.prisma.request.update({
      where: {
        id,
      },
      data: updateRequestDto,
    });
  }

  remove(id: number) {
    return this.prisma.request.delete({
      where: {
        id,
      },
    });
  }
}
