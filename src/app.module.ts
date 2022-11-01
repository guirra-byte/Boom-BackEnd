import { Module } from '@nestjs/common';
import { RoomsModule } from './@core/domains/rooms/rooms.module';
import { UsersModule } from './@core/domains/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
