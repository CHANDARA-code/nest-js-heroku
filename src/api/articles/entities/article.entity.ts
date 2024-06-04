import { User } from '@api/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  published?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  editedAt?: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, user => user.articles)
  author: User;
}
