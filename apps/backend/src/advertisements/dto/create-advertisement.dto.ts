import { Item } from 'src/items/entities/item.entity';
import { $Enums, Prisma, User } from '@prisma/client';

export class CreateAdvertisementDto implements Prisma.AdvertisementCreateInput {
  title: string;
  description: string;
  price: number;
  images?: Prisma.AdvertisementCreateimagesInput | string[];
  status?: $Enums.ItemStatus;
  adDuration?: $Enums.AdDuration;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  location?: Prisma.LocationCreateNestedOneWithoutAdvertisementInput;
  owner: Prisma.UserCreateNestedOneWithoutAdvertisementInput;
  chat?: Prisma.ChatCreateNestedManyWithoutAdvertisementInput;
  requests?: Prisma.RequestCreateNestedManyWithoutAdvertisementInput;
  items?: Prisma.ItemCreateNestedManyWithoutAdvertisementInput;
}
