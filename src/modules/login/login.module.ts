import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: userSchema, collection: 'user' }])],
  providers: [LoginService,UserService],
  controllers: [LoginController]
})
export class LoginModule { }
