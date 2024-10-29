import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ItemsModule } from './items/items.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { LocationsModule } from './locations/locations.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [PrismaModule, UsersModule, SupabaseModule, ItemsModule, AdvertisementsModule, LocationsModule, ChatsModule, MessagesModule, RequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
