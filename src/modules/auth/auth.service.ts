import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/mode/user.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jstService: JwtService) { }

    async validate(username: string, password: string): Promise<User> {
        const user = this.userService.findOne({ username, password });
        return user ? user : null;

    }

    async login(user: User): Promise<{ username: string, token: string }> {
        const { id, username } = user;
        return {
            username,
            token: this.jstService.sign({ username, sub: id })
        }
    }
}
