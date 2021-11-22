import { RegisterService } from './register.service';
import { User } from './../../mode/user.interface';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { Res } from 'src/mode/response';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post()
    private async add(@Body() userInfo: User): Promise<Res<number>> {
        let result = await this.registerService.register(userInfo);
        return result.ok === 1 ? new Res(200, result.ok, 'success') : new Res(400, result.ok, 'error')
    }
}
