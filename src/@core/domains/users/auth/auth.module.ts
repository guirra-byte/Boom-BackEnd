import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({ 
            secret: process.env.API_TOKEN_SECRET_KEY,
            signOptions: {
                expiresIn: '1d'
            }
        })
    ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
