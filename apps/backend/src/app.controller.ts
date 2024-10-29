import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloWorldDto } from './dto/hello-world..dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<HelloWorldDto> {
    return this.appService.getHello();
  }
}
