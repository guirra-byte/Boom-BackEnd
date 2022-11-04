import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
       private jwtService: JwtService
    ){}

    login(user: { username:string, email:string }){
        const payload = { username: user.username, sub: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
