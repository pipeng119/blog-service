import { CommonRes } from 'src/mode/response';
import { ArticleService } from './article.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Article } from 'src/mode/article.interface';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @Get()
    private async getAllArticle(): Promise<CommonRes<Article[]>> {
        let result = await this.articleService.findAll();
        return new CommonRes(200, result, 'success')
    }

    @Post()
    private async createOne(@Body() articleInfo: Article): Promise<CommonRes<boolean>> {
        console.log('articleInfo: ', articleInfo);
        let result = await this.articleService.createOne(articleInfo);
        return result ? new CommonRes(200, true, '创建文章成功') : new CommonRes(400, false, '创建文章失败');
    }

    @Get('createMany')
    private async createMany(): Promise<void> {
        let result = await this.articleService.createMany();
        console.log(result)
    }
}
