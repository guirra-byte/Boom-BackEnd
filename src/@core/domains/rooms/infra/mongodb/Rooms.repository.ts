import { Model } from 'mongoose';
import { CreateRoomDto } from '../../dto/create-room.dto';
import { UpdateRoomDto } from '../../dto/update-room.dto';
import { Room } from '../../entities/room.entity';
import { IRoomRepository } from '../../repostiories/IRoomRepository';

export class RoomRepository implements IRoomRepository {
  constructor(private roomModel: Model<Room>) {}
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const user = new this.roomModel(createRoomDto);
    return user;
  }
  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<void> {
    await this.roomModel.findOneAndUpdate({ _id: id }, updateRoomDto);
  }
  async remove(id: string): Promise<void> {
    await this.roomModel.findByIdAndDelete(id);
  }
  findAll(): Promise<Room[]> {
    const rooms = this.roomModel.find().exec();
    return rooms;
  }

  findOne(id: string): Promise<Room> {
    const room = this.roomModel.findById(id).exec();
    return room;
  }
}
