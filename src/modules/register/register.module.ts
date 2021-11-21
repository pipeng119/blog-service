import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../user/user.schema';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: userSchema, collection: 'user' }])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule { }
