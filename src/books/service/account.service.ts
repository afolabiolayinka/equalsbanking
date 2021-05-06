import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';
import { AccountRepository } from '../repository/account.repository';
import { AccountDto } from '../dto/account.dto';
import { AccountUpdateDto } from '../dto/update/account.update.dto';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: AccountRepository,
  ) { }

  create(accountDto: AccountDto): Promise<Account> {
    const account = new Account();
    account.name = accountDto.name;
    account.code = accountDto.code;
    account.description = accountDto.description;

    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(uuid: string): Promise<Account> {
    return this.accountRepository.findOne({ uuid: uuid });
  }

  update(uuid: string, accountUpdateDto: AccountUpdateDto) {
    const account = new Account();
    account.name = accountUpdateDto.name;
    account.code = accountUpdateDto.code;
    account.description = accountUpdateDto.description;

    return this.accountRepository.update({ uuid: uuid }, account);
  }

  async remove(uuid: string) {
    await this.accountRepository.softDelete({ uuid: uuid });
  }
}
