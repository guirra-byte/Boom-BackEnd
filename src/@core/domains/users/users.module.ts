import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongodbModule } from './infra/mongoose/mongodb/mongo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongodbModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
