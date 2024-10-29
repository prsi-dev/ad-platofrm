import { $Enums, Prisma } from '@prisma/client';

export class CreateItemDto implements Prisma.ItemCreateInput {
  title: string;
  description: string;
  price: number;
  images?: Prisma.ItemCreateimagesInput | string[];
  status?: $Enums.ItemStatus;
  adDuration?: $Enums.AdDuration;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  size?: $Enums.ItemSize;
  chat?: Prisma.ChatCreateNestedManyWithoutItemInput;
  location?: Prisma.LocationCreateNestedOneWithoutItemInput;
  owner: Prisma.UserCreateNestedOneWithoutItemsInput;
  requests?: Prisma.RequestCreateNestedManyWithoutItemInput;
  advertisement?: Prisma.AdvertisementCreateNestedManyWithoutItemsInput;
}
