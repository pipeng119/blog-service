import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: userSchema, collection: 'user' }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
