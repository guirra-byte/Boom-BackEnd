import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { hash } from 'bcrypt';
import { UserRepository } from './infra/mongoose/UserRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userRepository(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.findById(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.userRepository.findByIdAndDelete(id).exec();
  }
}
