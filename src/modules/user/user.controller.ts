import { Controller, Get, Query } from '@nestjs/common';
import { IRes } from 'src/mode/response.interface';
import { User } from 'src/mode/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // 获取所有的用户
    @Get()
    private async index() {
        let data: User[] = await this.userService.findAll();
        const res: IRes<User[]> = {
            code: 200,
            data,
            message: 'success',
        };
        return res;
    }
}
