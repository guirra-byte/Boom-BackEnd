import mongoose, { Schema } from 'mongoose';
import { Room } from '../../entities/room.entity';

export const RoomSchema: Schema<Room> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  participants: String,
  createdAt: {
    type: Date,
    autoIncrement: true,
  },
});
