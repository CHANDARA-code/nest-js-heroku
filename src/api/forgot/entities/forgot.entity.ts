import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { Allow } from 'class-validator';
import { EntityHelper } from '@utils/entity-helper';
import { User } from '@api/users/entities/user.entity';

@Entity()
export class Forgot extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Allow()
  @Column()
  @Index()
  hash: string;

  @Allow()
  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
