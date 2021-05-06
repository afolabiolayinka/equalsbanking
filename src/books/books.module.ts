import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { AccountType } from './entity/accountType.entity';
import { BooksService } from './books.service';
import { AccountService } from './service/account.service';
import { AccountTypeService } from './service/accountType.service';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from './controller/account.controller';
import { AccountTypeController } from './controller/accountType.controller';

@Module({
  controllers: [AccountController, AccountTypeController],
  providers: [BooksService, AccountService, AccountTypeService],
  imports: [TypeOrmModule.forFeature([Account, AccountType]), AuthModule],
})
export class BooksModule { }
