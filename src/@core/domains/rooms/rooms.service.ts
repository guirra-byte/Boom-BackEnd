import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { IRoomRepository } from './repostiories/IRoomRepository';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('RoomRepository') private roomRepository: IRoomRepository,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.create(createRoomDto);
  }

  findAll() {
    return this.roomRepository.findAll();
  }

  findOne(id: string) {
    return this.roomRepository.findOne(id);
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: string) {
    return this.roomRepository.remove(id);
  }
}
