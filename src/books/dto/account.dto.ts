import { IsNotEmpty, Length } from 'class-validator';
import { IsExistsInTable } from 'src/decorator/isExistsInTable';
import { Account } from '../entity/account.entity';

export class AccountDto {
  @IsNotEmpty()
  @Length(1, 128)
  @IsExistsInTable(Account)
  name: string;
  @IsNotEmpty()
  @Length(1, 12)
  @IsExistsInTable(Account)
  code: string;  
  description: string;
  status: number;
}