import { HttpRequestBody } from 'src/mode/response';
import { ArticleService } from './article.service';
import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Article } from 'src/mode/article.interface';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @Get()
    private async getAllArticle(): Promise<HttpRequestBody<Article[]>> {
        let result = await this.articleService.findAll();
        return new HttpRequestBody(200, result, 'success')
    }

    @Post()
    private async createOne(@Body() articleInfo: Article): Promise<HttpRequestBody<boolean>> {
        console.log('articleInfo: ', articleInfo);
        let result = await this.articleService.createOne(articleInfo);
        return result ? new HttpRequestBody(200, true, '创建文章成功') : new HttpRequestBody(400, false, '创建文章失败');
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('avatar'))
    uploadFile(@UploadedFile() file) {
        console.log('file: ', file);
    }
    // @UseInterceptors(FileInterceptor('file'))
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@Body() file) {
    //     console.log('file: ', file);
    // }
    // @Post('upload')
    // @UseInterceptors(AnyFilesInterceptor())
    // uploadFile(@UploadedFiles() files) {
    //     console.log(files);
    // }

    @Get('createMany')
    private async createMany(): Promise<void> {
        let result = await this.articleService.createMany();
        console.log(result)
    }
}
