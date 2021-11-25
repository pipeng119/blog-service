import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Res } from 'src/mode/response';
import { User } from 'src/mode/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // 获取所有的用户
    @Get()
    private async index(): Promise<Res<User[]>> {
        let result: User[] = await this.userService.findAll();
        return new Res(200, result, 'success');
    }

    @Post()
    private async createUser(@Body() userInfo: User): Promise<Res<boolean>> {
        let result = await this.userService.createOne(userInfo);
        return result ? new Res(200, true, '创建成功') : new Res(400, false, '创建失败')
    }
}
