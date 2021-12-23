import { RegisterService } from './register.service';
import { User } from './../../mode/user.interface';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { HttpRequestBody } from 'src/mode/response';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post()
    private async add(@Body() userInfo: User): Promise<HttpRequestBody<number>> {
        let result = await this.registerService.register(userInfo);
        return result.ok === 1 ? new HttpRequestBody(200, result.ok, 'success') : new HttpRequestBody(400, result.ok, 'error')
    }
}
