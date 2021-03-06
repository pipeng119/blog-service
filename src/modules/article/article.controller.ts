import { HttpRequestBody } from 'src/mode/response';
import { ArticleService } from './article.service';
import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors, Request, Response, Session, UseGuards, Param, Query, Delete, Put } from '@nestjs/common';
import { Article } from 'src/mode/article.interface';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/all')
    private async getAllArticle(@Query('key') key, @Request() req): Promise<HttpRequestBody<Article[]>> {
        let result = await this.articleService.findAll(key + '', req.user.username);
        return new HttpRequestBody(200, result, 'success')
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    private async getArticle(@Param('id') id: string): Promise<HttpRequestBody<Article>> {
        let result = await this.articleService.findOne(id);
        return result ? new HttpRequestBody(200, result, 'success') : new HttpRequestBody(400, result, 'error')
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    // private async createOne(@Body() articleInfo: Article, @Request() req): Promise<HttpRequestBody<boolean>> {
    private async createOne(@Body() articleInfo: Article, @Request() req, @Response() res): Promise<any> {
        articleInfo = { ...articleInfo, nikename: req.user.username };
        let result = await this.articleService.createOne(articleInfo);
        res.send(result ? new HttpRequestBody(200, true, '创建文章成功') : new HttpRequestBody(400, false, '创建文章失败'));
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    private async removeOne(@Param('id') id: string) {
        let result = await this.articleService.removeOne(id);
        return result.matchedCount ? new HttpRequestBody(200, true, '删除文章成功') : new HttpRequestBody(400, false, '删除文章失败');
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    private async updateOne(@Body() articleInfo: Article, @Request() req) {
        let result = await this.articleService.updateOne(articleInfo);
        return result.matchedCount ? new HttpRequestBody(200, true, '更新文章成功') : new HttpRequestBody(400, false, '更新文章失败');
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
