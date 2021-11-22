import { Body, Controller, Post } from '@nestjs/common';
import { Res } from 'src/mode/response';
import { User } from 'src/mode/user.interface';
import { UserService } from '../user/user.service';

@Controller('login')
export class LoginController {

    constructor(private userService: UserService) { }

    @Post()
    private async login(@Body() userInfo: User): Promise<Res<User>> {
        let result = await this.userService.findOne(userInfo);
        return result ? new Res(200, result, 'success') : new Res(400, result, '账号或密码错误');
    }
}
