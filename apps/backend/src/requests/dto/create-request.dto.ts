import { $Enums, Prisma } from '@prisma/client';

export class CreateRequestDto implements Prisma.RequestCreateInput {
  amount: number;
  message?: string;
  status?: $Enums.RequestStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  advertisement?: Prisma.AdvertisementCreateNestedOneWithoutRequestsInput;
  item: Prisma.ItemCreateNestedOneWithoutRequestsInput;
  requester: Prisma.UserCreateNestedOneWithoutRequestsInput;
}
