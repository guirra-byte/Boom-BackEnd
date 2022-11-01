import { User } from '../../entities/user.entity';

export class TestUtil {
    static giveMeAValidUser(){
        const user = new User();
        user.email = "guedes@gmail.com";
        user.name = "Willian";
        user.password = "12345";
        user.roles = ['admin'];

        return user;
    }
}