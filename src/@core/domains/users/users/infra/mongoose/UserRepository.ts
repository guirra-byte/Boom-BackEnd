import { IUserRepository } from '../../repositories/IUserRepository';
import { User, UserDocument } from '../../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class UserRepository implements IUserRepository {
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
