import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongodbModule } from '../infra/mongoose/mongodb/mongo.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './Jwt/jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({ 
            secret: 'process.env.API_TOKEN_SECRET_KEY',
            signOptions: {
                expiresIn: '1d'
            }
        }),
        MongodbModule,
    ],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
  exports: [AuthService],
})
export class AuthModule {}
