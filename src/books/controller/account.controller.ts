import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AccountDto } from '../dto/account.dto';
import { AccountUpdateDto } from '../dto/update/account.update.dto';
import { JwtAuthGuard } from '../../auth/guard/jwtAuth.guard';

@Controller('books/accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  create(@Body() accountDto: AccountDto) {
    return this.accountService.create(accountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.accountService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() accountUpdateDto: AccountUpdateDto) {
    return this.accountService.update(uuid, accountUpdateDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.accountService.remove(uuid);
  }
}
