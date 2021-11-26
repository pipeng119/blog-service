import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { CommonRes } from 'src/mode/response';
import { User } from 'src/mode/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // 获取所有的用户
    @Get()
    private async index(@Request() req, @Res() res): Promise<void> {
        let result: User[] = await this.userService.findAll();
        console.log('req.signedCookies.sid_guard',req.signedCookies.sid_guard)
        console.log(req.sessionID === req.signedCookies.sid_guard)
        // console.log('req.signedCookies.name', req.signedCookies.sid)
        res.send(new CommonRes(200, result, 'success'))
    }

    @Post()
    private async createUser(@Body() userInfo: User): Promise<CommonRes<boolean>> {
        let result = await this.userService.createOne(userInfo);
        return result ? new CommonRes(200, true, '创建成功') : new CommonRes(400, false, '创建失败')
    }
}
