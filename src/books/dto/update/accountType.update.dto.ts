import { PartialType } from '@nestjs/mapped-types';
import { AccountTypeDto } from '../accountType.dto';

export class AccountTypeUpdateDto extends PartialType(AccountTypeDto) {}
