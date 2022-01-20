import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/mode/article.interface';
import * as Short from 'short-uuid';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel('Articles') private readonly articleModel: Model<Article>,
    ) { }

    public async findAll(key: string, nikename: string): Promise<Article[]> {
        let condition = key === 'admin' ? { nikename: { $eq: nikename } } : {};
        return this.articleModel.find({ ...condition, ...{ isDeleted: { $ne: true } } }).sort({ create_time: -1 }).limit(20);
    }

    public async findOne(article_id): Promise<Article> {
        return this.articleModel.findOne({ article_id, ...{ isDeleted: { $ne: true } } });
    }

    public async createOne(article: Article): Promise<any> {
        const sliceNum = 16;
        const summary =
            article.content.length > sliceNum
                ? article.content.slice(0, sliceNum) + '...'
                : article.content.slice(0, sliceNum);
        const req: Article = {
            article_id: Short.generate(),
            comment: 0,
            like: 0,
            create_time: Date.now(),
            summary,
            ...article,
        };
        return this.articleModel.create(req);
    }

    public async removeOne(article_id: string): Promise<any> {
        return this.articleModel.updateOne({ article_id }, { $set: { isDeleted: true } });
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
                like: 0,
            });
        }
        return arr;
    }
}
