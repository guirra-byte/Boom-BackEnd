import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from '../repositories/IUserRepository';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UsersRepository') 
        private userRepository: IUsersRepository,
        private jwtService: JwtService
    ){}

    async validateUser(name: string, password: string){
        const user = await this.userRepository.findByEmail(name);
        if(!user){
            return null;
        }
        console.log(user);
        return user;
    }
    login(user: { username:string, email:string }){
        const payload = { username: user.username, sub: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
