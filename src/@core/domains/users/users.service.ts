import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { UsersRepository } from './infra/mongoose/UsersRepository';
import { UseRepository } from 'src/shared/decorators/RepositoryProvider.decorator';
import { sign } from 'jsonwebtoken';
import { SetMetadata } from '@nestjs/common';
import * as crypt from 'crypto';

export interface ICipherPayload {
  token: string;
  algorithm: string;
  vector: Buffer;
  secretKey: Buffer;
  encryptedData: string;
}

@UseRepository('UsersRepository')
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

  async authenticate(
    email: string,
    password: string,
    __secret_word: string,
  ): Promise<void> {
    const ensureEmailExists = await this.userRepository.findByEmail(email);

    if (!ensureEmailExists) {
      throw new Error('Email or Password are incorrect!');
    }

    const userPass = ensureEmailExists.password;
    const verifyPassword = await compare(userPass, password);

    if (verifyPassword === false) {
      throw new Error('Email or Password are incorrect!');
    }

    const algorithm = 'aes-256-cbc';
    const initVector = crypt.randomBytes(16);
    const secretKey = crypt.randomBytes(32);

    const cipher = crypt.createCipheriv(algorithm, secretKey, initVector);
    const encryptedData = cipher.update(__secret_word, 'utf-8', 'hex');

    const jwtToken = sign({}, process.env.API_TOKEN_SECRET_KEY, {
      subject: encryptedData,
      expiresIn: '1d',
    });

    const cipherAuthToken = {
      token: jwtToken,
      algorithm: algorithm,
      vector: initVector,
      secretKey: secretKey,
      encryptedData: encryptedData,
    } as ICipherPayload;

    SetMetadata('secret_token', cipherAuthToken);
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
