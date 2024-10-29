import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: createMessageDto,
    });
  }

  findAll() {
    return this.prisma.message.findMany({
      include: {
        chat: true,
        sender: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.message.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.prisma.message.update({
      where: {
        id,
      },
      data: updateMessageDto,
    });
  }

  remove(id: number) {
    return this.prisma.message.delete({
      where: {
        id,
      },
    });
  }
}
