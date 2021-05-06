import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @Length(1, 128)
  username: string;
  @IsNotEmpty()
  password: string;
  status: number;
}