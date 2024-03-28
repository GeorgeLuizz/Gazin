import { Developer } from 'src/developer/entity/developer.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @OneToMany(() => Developer, (developer) => developer.position)
  developer: Developer[];
}
