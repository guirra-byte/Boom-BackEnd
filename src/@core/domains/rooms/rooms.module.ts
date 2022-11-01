import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsModelModule } from './infra/mongodb/roomsModel.module';

@Module({
  imports: [RoomsModelModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
