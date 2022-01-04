import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpRequestBody } from 'src/mode/response';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() request): Promise<HttpRequestBody<{ username: string, token: string }>> {
        // 这个request里有user，不知道从何而来
        const data = await this.authService.login(request.user);
        return new HttpRequestBody(200, data, '登录成功')
    }
}
