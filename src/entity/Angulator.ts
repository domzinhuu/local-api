import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, Min, Max } from 'class-validator';

@Entity()
export class Angulator {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  @IsNotEmpty()
  public alterEgo: string;
  @Column()
  @IsNotEmpty()
  public realName: string;
  @Column()
  public thumbs: string;
  @Column()
  @IsNotEmpty()
  public description: string;
  @Column()
  @IsNotEmpty()
  public status: string;
  @Column()
  @Min(0)
  @Max(100)
  public strength: number;
  @Column()
  @Min(0)
  @Max(100)
  public intelligence: number;
  @Column()
  @Min(0)
  @Max(100)
  public dexterity: number;
}
