import { IsNotEmpty, Length } from 'class-validator';
import { IsExistsInTable } from 'src/decorator/isExistsInTable';
import { AccountType } from '../entity/accountType.entity';

export class AccountTypeDto {
    @IsNotEmpty()
    @Length(1, 128)
    @IsExistsInTable(AccountType)
    name: string;
    @IsNotEmpty()
    @Length(1, 12)
    @IsExistsInTable(AccountType)
    code: string;
    description: string;
    status: number;
}
