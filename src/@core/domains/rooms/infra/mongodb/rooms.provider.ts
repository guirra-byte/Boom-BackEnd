import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { RoomRepository } from './Rooms.repository';
import { RoomSchema } from './rooms.schema';

export const mongoRoomProvider: Provider[] = [
  {
    provide: 'RoomRepository',
    useFactory: (connection: Connection) => {
      const users = connection.model('Room', RoomSchema);
      return new RoomRepository(users);
    },
    inject: ['DATABASE'],
  },
];
