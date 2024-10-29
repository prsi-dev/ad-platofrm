import { IsString, IsNotEmpty } from 'class-validator';

export class HelloWorldDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
