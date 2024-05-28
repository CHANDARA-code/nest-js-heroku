import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleSeedService } from './article-seed.service';
import { Article } from '@api/articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleSeedService],
  exports: [ArticleSeedService],
})
export class ArticleSeedModule {}
