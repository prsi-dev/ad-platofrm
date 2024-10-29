import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  name: string;
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
  password: string;
}
