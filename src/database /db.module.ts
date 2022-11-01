import { Module } from '@nestjs/common';
import { databaseProvider } from './dab.provider';

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
