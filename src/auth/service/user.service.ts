import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { UserUpdateDto } from '../dto/update/user.update.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) { }

  create(userDto: UserDto): Promise<User> {

    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    user.status = userDto.status;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(uuid: string): Promise<User> {
    return this.userRepository.findOne({ uuid: uuid });
  }

  findByUsername(username: string): Promise<User> {
    //return this.userRepository.findByUsername(username);
    return this.userRepository.findOne({ username: username });
  }

  update(uuid: string, userUpdateDto: UserUpdateDto) {
    const user = new User();
    user.username = userUpdateDto.username;
    user.password = userUpdateDto.password;
    user.status = userUpdateDto.status;

    return this.userRepository.update({ uuid: uuid }, user);
  }

  async remove(uuid: string) {
    await this.userRepository.softDelete({ uuid: uuid });
  }
}
