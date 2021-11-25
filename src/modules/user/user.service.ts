import { User } from './../../mode/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as moment from 'moment';

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    public async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    public async findOne({ user_name, password }: User): Promise<User> {
        return this.userModel.findOne({ user_name, password });
    }

    public async createOne(userInfo: User): Promise<any> {
        const isExist = await this.userModel.exists({ user_name: userInfo.user_name });
        if (isExist) {
            return Promise.resolve(null);
        } else {
            const req = {
                ...userInfo,
                create_date: Date.now()
            }
            return isExist ? Promise.resolve(null) : this.userModel.create(req);
        }
    }
}
