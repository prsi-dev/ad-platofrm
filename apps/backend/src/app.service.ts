import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { HelloWorldDto } from './dto/hello-world..dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<HelloWorldDto> {
    // This is just an example to show Prisma usage
    const userCount = await this.prisma.user.count();
    return { message: `Hello World from NestJS! There are ${userCount} users.` };
  }
}
