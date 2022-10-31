import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongodbModule } from './infra/mongoose/mongodb/mongo.module';

@Module({
  imports: [MongodbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
