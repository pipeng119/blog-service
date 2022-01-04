import { HttpRequestBody } from 'src/mode/response';
import { ArticleService } from './article.service';
import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors, Request, Response, Session, UseGuards } from '@nestjs/common';
import { Article } from 'src/mode/article.interface';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    private async getAllArticle(): Promise<HttpRequestBody<Article[]>> {
        let result = await this.articleService.findAll();
        return new HttpRequestBody(200, result, 'success')
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    // private async createOne(@Body() articleInfo: Article, @Request() req): Promise<HttpRequestBody<boolean>> {
    private async createOne(@Body() articleInfo: Article, @Request() req, @Response() res): Promise<any> {
        articleInfo = { ...articleInfo, nikename: req.user.username };
        let result = await this.articleService.createOne(articleInfo);
        res.send(result ? new HttpRequestBody(200, true, '创建文章成功') : new HttpRequestBody(400, false, '创建文章失败'));
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
