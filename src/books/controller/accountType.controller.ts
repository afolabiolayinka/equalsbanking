import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from '../../auth/service/user.service';
import { AccountTypeService } from '../service/accountType.service';
import { AccountTypeDto } from '../dto/accountType.dto';
import { AccountTypeUpdateDto } from '../dto/update/accountType.update.dto';
import { JwtAuthGuard } from '../../auth/guard/jwtAuth.guard';

@Controller('books/account_types')
@UseGuards(JwtAuthGuard)
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService, private readonly userService: UserService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Request() request: any, @Body() accountTypeDto: AccountTypeDto) {
    const user = await this.userService.findOne(request.user.userId);
    const accountType = await this.accountTypeService.create(user, accountTypeDto);
    return { status: HttpStatus.OK, message: "Success", data: accountType };
  }

  @Get()
  public async findAll(@Request() request: any) {
    const user = await this.userService.findOne(request.user.userId);
    const accountTypes = await this.accountTypeService.findAll();
    return { status: HttpStatus.OK, message: "Success", data: accountTypes };
  }

  @Get(':uuid')
  public async findOne(@Request() request: any, @Param('uuid') uuid: string) {
    const accountType = await this.accountTypeService.findOne(uuid);
    return { status: HttpStatus.OK, message: "Success", data: accountType };
  }

  @Patch(':uuid')
  public async update(@Request() request: any, @Param('uuid') uuid: string, @Body() accountTypeUpdateDto: AccountTypeDto) {
    const user = await this.userService.findOne(request.user.userId);
    const accountType =  await this.accountTypeService.update(user, uuid, accountTypeUpdateDto);
    return { status: HttpStatus.OK, message: "Success", data: accountTypeUpdateDto };
  }

  @Delete(':uuid')
  public async remove(@Request() request: any, @Param('uuid') uuid: string) {
    const user = await this.userService.findOne(request.user.userId);
    await this.accountTypeService.remove(user, uuid);
    return { status: HttpStatus.OK, message: "Success" };
  }
}
