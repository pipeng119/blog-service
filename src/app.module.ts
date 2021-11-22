import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RegisterModule } from './modules/register/register.module';
import { LoginModule } from './modules/login/login.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [
    // 数据库地址
    MongooseModule.forRoot('mongodb://localhost/blog'),
    UserModule,
    RegisterModule,
    LoginModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
