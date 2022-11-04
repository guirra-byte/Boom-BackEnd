import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/Jwt/jwt.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { LocalStrategyGuard } from './auth/localStrategy.guard';
import { RolesGuard } from '../../../shared/infra/guards/isAdmin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: AuthService ) {}

  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('token')
  token(@Body() user: { username: string, email: string }) {
    return this.authService.login(user);
  }

  @UseGuards(LocalStrategyGuard)
  @Get('login')
  login(@Body() user) {
    return this.authService.login({ username: user.username, email: user.email });
  }
  

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify(@Body() user: { username: string, email: string }) {
    return 'Authenticated';
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('admin')
  admin() {
    return 'You are an admin';
  }

  @HttpCode(200)
  @Post('session')
  authenticate(@Body() authenticateUserDto: AuthenticateUserDto) {
    const { email, password, secretWord } = authenticateUserDto;
    return this.usersService.authenticate(email, password, secretWord);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
