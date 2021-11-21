import { User } from './../../mode/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    public async findAll(): Promise<User[]> {
        return this.userModel.find();
    }
    
    public async findOne({ user_name, password }: User): Promise<User> {
        return this.userModel.findOne({ user_name, password });
    }
}
