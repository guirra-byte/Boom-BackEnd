import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { UsersRepository } from './infra/mongoose/UsersRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private userRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const hashPassword = await hash(password, 10);
    const createdUser = await this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.userRepository.remove(id);
  }
}
