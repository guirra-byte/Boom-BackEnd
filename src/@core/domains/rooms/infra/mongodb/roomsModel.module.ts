import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database /db.module';
import { mongoRoomProvider } from './rooms.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...mongoRoomProvider],
  exports: [...mongoRoomProvider],
})
export class RoomsModelModule {}
