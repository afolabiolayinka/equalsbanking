import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entity/user.entity';
import { AccountTypeRepository } from '../repository/accountType.repository';
import { AccountType } from '../entity/accountType.entity';
import { AccountTypeDto } from '../dto/accountType.dto';
import { AccountTypeUpdateDto } from '../dto/update/accountType.update.dto';

@Injectable()
export class AccountTypeService {

  constructor(
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: AccountTypeRepository,
  ) { }

  create(user: User, accountTypeDto: AccountTypeDto) {
    const accountType = new AccountType();
    accountType.name = accountTypeDto.name;
    accountType.code = accountTypeDto.code;
    accountType.description = accountTypeDto.description;
    accountType.createdBy = user;

    return this.accountTypeRepository.save(accountType);
  }

  async findAll(): Promise<AccountType[]> {
    return this.accountTypeRepository.find();
  }

  findOne(uuid: string): Promise<AccountType> {
    return this.accountTypeRepository.findOne({ uuid: uuid });
  }

  update(user: User, uuid: string, accountTypeUpdateDto: AccountTypeUpdateDto) {
    const accountType = new AccountType();
    accountType.name = accountTypeUpdateDto.name;
    accountType.code = accountTypeUpdateDto.code;
    accountType.description = accountTypeUpdateDto.description;
    accountType.updatedBy = user;

    return this.accountTypeRepository.update({ uuid: uuid }, accountType);
  }

  async remove(user: User, uuid: string) {
    await this.accountTypeRepository.softDelete({ uuid: uuid });
  }
}
