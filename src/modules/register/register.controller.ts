import { RegisterService } from './register.service';
import { User } from './../../mode/user.interface';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { IRes } from 'src/mode/response.interface';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post()
    private async add(@Body() userInfo: User): Promise<any> {
        let result = await this.registerService.register(userInfo);
        let res: IRes<number> = null;
        if (result.ok === 1) {
            res = {
                code: 200,
                data: result.ok,
                message: 'success'
            }
            return res
        }
    }
}
