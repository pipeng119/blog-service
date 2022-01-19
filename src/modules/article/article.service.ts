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
    public async findOne(article_id): Promise<Article> {
        return this.articleModel.findOne({ article_id });
    }

    public async createOne(article: Article): Promise<any> {
        const req: Article = {
            article_id: Short.generate(),
            comment: 0,
            like: 0,
            create_time: Date.now(),
            summary: article.content.slice(0, 16),
            ...article,
        };
        return this.articleModel.create(req);
    }

    public async createMany(): Promise<Article[]> {
        let articles = this.makeArticles(50);
        return this.articleModel.create(articles);

    }

    private makeArticles(num: number): Article[] {
        let arr: Article[] = [];
        for (let i = 0; i < num; i++) {
            arr.push({
                article_id: Short.generate(),
                title: `标题${i + 1}`,
                summary: `概要${i + 1}`,
                content: `内容${i + 1}`,
                nikename: `昵称${i + 1}`,
                create_time: Date.now(),
                comment: 0,
                like: 0
            })
        }
        return arr;
    }

}
