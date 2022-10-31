import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';

export const databaseProvider: Provider[] = [
  {
    provide: 'DATABASE',
    useFactory: () =>
      mongoose.connect(
        'mongodb+srv://user:senha@cluster0.x73mg.mongodb.net/boom',
      ),
  },
];
