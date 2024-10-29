import { Prisma } from '@prisma/client';

export class CreateMessageDto implements Prisma.MessageCreateInput {
  content: string;
  createdAt: string | Date;
  chat: Prisma.ChatCreateNestedOneWithoutMessagesInput;
  sender: Prisma.UserCreateNestedOneWithoutMessageInput;
}
