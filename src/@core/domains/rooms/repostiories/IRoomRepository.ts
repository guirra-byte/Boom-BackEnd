import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { Room } from '../entities/room.entity';

export interface IRoomRepository {
  create(CreateRoomDto: CreateRoomDto): Promise<Room>;
  findAll(): Promise<Room[]>;
  findOne(id: string): Promise<Room>;
  update(id: string, UpdateRoomDto: UpdateRoomDto): Promise<void>;
  remove(id: string): Promise<void>;
}
