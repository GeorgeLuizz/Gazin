import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Position } from 'src/position/entity/position.entity';

@Entity()
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Position, (position) => position.developer, { eager: true })
  position: Position;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @Column()
  hobby: string;
}
