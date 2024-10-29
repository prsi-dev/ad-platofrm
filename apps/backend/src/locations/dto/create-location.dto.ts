import { Prisma } from '@prisma/client';

export class CreateLocationDto implements Prisma.LocationCreateInput {
  street: string;
  postalCode: string;
  city: string;
  latitude: number;
  longitude: number;
  advertisement?: Prisma.AdvertisementCreateNestedManyWithoutLocationInput;
  item?: Prisma.ItemCreateNestedManyWithoutLocationInput;
}
