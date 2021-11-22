import { Res } from 'src/mode/response';
import { ArticleService } from './article.service';
import { Controller, Get } from '@nestjs/common';
import { Article } from 'src/mode/article.interface';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @Get()
    private async getAllArticle(): Promise<Res<Article[]>> {
        let result = await this.articleService.findAll();
        return new Res(200, result, 'success')
    }
}
