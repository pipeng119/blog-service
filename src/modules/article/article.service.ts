import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/mode/article.interface';
import * as Short from 'short-uuid'

@Injectable()
export class ArticleService {

    constructor(@InjectModel('Articles') private readonly articleModel: Model<Article>) { }

    public async findAll(): Promise<Article[]> {
        return this.articleModel.find();
    }

    public async createOne(article: Article): Promise<Article> {
        const req = {
            id: Short.generate(),
            comment: 0,
            like: 0,
            create_time: Date.now(),
            ...article,
        };
        console.log('req',req)
        return this.articleModel.create(req);
    }
}
