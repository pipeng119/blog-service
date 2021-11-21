import { Body, Controller, Post } from '@nestjs/common';
import { IRes } from 'src/mode/response.interface';
import { User } from 'src/mode/user.interface';
import { UserService } from '../user/user.service';

@Controller('login')
export class LoginController {

    constructor(private userService: UserService) { }

    @Post()
    private async login(@Body() userInfo: User): Promise<IRes<User>> {
        let result = await this.userService.findOne(userInfo);
        let res: IRes<User> = result ? { code: 200, data: result, message: 'success' }
            : { code: 400, data: result, message: '账号或密码错误' }
        return res;
    }
}
