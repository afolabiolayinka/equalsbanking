import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwtAuth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BankingModule } from './banking/banking.module';
import { BooksModule } from './books/books.module';
import { HrModule } from './hr/hr.module';
import { CrmModule } from './crm/crm.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'equals',
      password: '83d096d80b7fe717e7c84dbc26797525',
      database: 'equalsbankingdb',
      autoLoadEntities: true,
    }),
    BankingModule, BooksModule, HrModule, CrmModule, OrganizationModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  AppService],
})
export class AppModule {}
