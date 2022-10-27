import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './@core/domains/users/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://user:senha@cluster0.x73mg.mongodb.net/boom',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
