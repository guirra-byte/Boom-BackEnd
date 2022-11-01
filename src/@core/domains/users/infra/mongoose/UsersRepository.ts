import { Model } from 'mongoose';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { IUsersRepository } from '../../repositories/IUserRepository';

export class UsersRepository implements IUsersRepository {
  constructor(private userRepository: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userRepository(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.userRepository.findByIdAndDelete(id).exec();
  }
}
