import { IRes } from './../../mode/response.interface';
import { ArticleService } from './article.service';
import { Controller, Get } from '@nestjs/common';
import { Article } from 'src/mode/article.interface';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @Get()
    private async getAllArticle(): Promise<any> {
        let result = await this.articleService.findAll();
        // return result.length ? {code}
        // return {
        //     code: 
        // }
    }
}
