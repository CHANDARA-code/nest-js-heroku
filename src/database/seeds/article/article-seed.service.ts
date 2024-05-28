import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoremIpsum } from 'lorem-ipsum';
import { Article } from '@api/articles/entities/article.entity';

@Injectable()
export class ArticleSeedService {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4,
        },
        wordsPerSentence: {
          max: 16,
          min: 4,
        },
      });
      for (let i = 0; i < 10; i++) {
        await this.repository.save(
          this.repository.create({
            title: lorem.generateWords(3),
            content: lorem.generateSentences(5),
            published: Math.random() > 0.5,
          }),
        );
      }
    }
  }
}
