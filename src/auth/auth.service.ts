import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    async validateUser(userDto: UserDto): Promise<User> {
        const user = await this.userService.findByUsername(userDto.username);

        if (!user) {
            return null;
        }

        return user;
    }

    async login(userDto: UserDto) {
        const user = await this.validateUser(userDto);

        if (!user) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Invalid combination',
            };
        }

        if (user.status !== 1) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'User is not enabled',
            };
        }

        const accessToken = this.jwtService.sign({ username: user.username, sub: user.uuid });

        return {
            status: HttpStatus.OK,
            message: 'Success',
            data: {
                user: {
                    id: user.uuid
                },
                tokens: {
                    access_token: accessToken,
                }
            }
        };
    }

    /*public async login(userDto: UserDto): Promise<any | { status: number }> {
        return this.validate(userDto).then(userData => {
            if (!userData) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Invalid combination',
                };
            }
            const payload = { sub: userData.uuid, username: userData.username };
            const accessToken = this.jwtService.sign(payload);

            return {
                status: HttpStatus.OK,
                message: 'Success',
                access_token: accessToken,
            };
        });
    }*/

    /*
    async validateUser(userDto: UserDto): Promise<any> {
        const user = await this.userService.findByUsername(userDto.username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }*/

}
