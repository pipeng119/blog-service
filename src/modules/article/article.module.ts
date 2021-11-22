import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { articleSchema } from './article.schema';
import { ArticleService } from './article.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Articles', schema: articleSchema, collection: 'article' }])],

  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
