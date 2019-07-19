import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class AdjustParametrization {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  name: string;
  @Column()
  @IsNotEmpty()
  description: string;
  @Column()
  @IsNotEmpty()
  origin: string;
}
