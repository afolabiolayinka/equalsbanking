import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService,UserService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.access_token_secret,
      signOptions: { expiresIn: jwtConstants.access_token_expires_in },
    }),
    TypeOrmModule.forFeature([User])],
})
export class AuthModule { }
