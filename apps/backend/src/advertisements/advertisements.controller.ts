import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Logger } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}
  private readonly logger = new Logger(AdvertisementsController.name); // Logger instance

  @Post('create')
  async create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    this.logger.log('createAdvertisementDto', JSON.stringify(createAdvertisementDto));

    try {
      const result = await this.advertisementsService.create(createAdvertisementDto);
      this.logger.log('Create result:', JSON.stringify(result));
      return result;
    } catch (error) {
      this.logger.error('Error creating advertisement', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request & { user: {} }) {
    //this.logger.log('Received a request to /advertisements'); // Log when request is received

    const authHeader = req.headers['authorization']; // Or req.headers.get('authorization')

    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract the token part
      // console.log('JWT Token received:', token, req.user);
    }
    return this.advertisementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto) {
    return this.advertisementsService.update(+id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisementsService.remove(+id);
  }
}
