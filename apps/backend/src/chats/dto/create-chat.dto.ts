import { Prisma } from '@prisma/client';

export class CreateChatDto implements Prisma.ChatCreateInput {
  createdAt?: string | Date;
  updatedAt?: string | Date;
  advertisement?: Prisma.AdvertisementCreateNestedOneWithoutChatInput;
  item: Prisma.ItemCreateNestedOneWithoutChatInput;
  messages?: Prisma.MessageCreateNestedManyWithoutChatInput;
  participants?: Prisma.UserCreateNestedManyWithoutChatsInput;
}
