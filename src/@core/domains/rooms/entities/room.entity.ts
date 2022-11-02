import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop()
  participants?: string[];

  @Prop()
  createdAt: {
    type: Date;
    default: Date;
  };
}

export const UserSchema = SchemaFactory.createForClass(Room);
