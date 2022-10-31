import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/db.module';
import { UsersRepository } from '../UsersRepository';
import { mongoProvider } from './mongo.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...mongoProvider, UsersRepository],
  exports: [...mongoProvider],
})
export class MongodbModule {}
