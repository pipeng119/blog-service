import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/mode/article.interface';

@Injectable()
export class ArticleService {

    constructor(@InjectModel('Articles') private readonly articleModel: Model<Article>) { }

    public async findAll(): Promise<Article[]> {
        return this.articleModel.find();
    }
}
