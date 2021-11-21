import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mode/user.interface';

@Injectable()
export class RegisterService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    public async register(user: User): Promise<any> {
        return this.userModel.bulkWrite([
            {
                insertOne: {
                    document: user
                }
            }
        ])
    }

}
