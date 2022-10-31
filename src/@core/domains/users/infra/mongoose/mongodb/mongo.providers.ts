import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { UsersRepository } from '../UsersRepository';
import { UserSchema } from './users.schema';

export const mongoProvider: Provider[] = [
  {
    provide: 'UsersRepository',
    useFactory: (connection: Connection) => {
      const users = connection.model('User', UserSchema);
      return new UsersRepository(users);
    },
    inject: ['DATABASE'],
  },
];
