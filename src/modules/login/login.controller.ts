import { Body, Controller, Post, Req, Response, Session } from '@nestjs/common';
import { HttpRequestBody } from 'src/mode/response';
import { User } from 'src/mode/user.interface';
import { UserService } from '../user/user.service';
import { Request } from 'express'

@Controller('login')
export class LoginController {

    constructor(private userService: UserService) { }

    @Post()
    private async login(@Body() userInfo: User, @Req() req, @Response() res): Promise<void> {
        let result = await this.userService.findOne(userInfo);
        if (result) {
            res.send(new HttpRequestBody(200, result, 'success'))
        } else {
            res.send(new HttpRequestBody(400, result, '账号或密码错误'));
        }
    }
}
