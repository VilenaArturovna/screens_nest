import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";
import {ScreenEntity} from "../screens/screen.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  name: string

  @Column()
  @ApiProperty()
  date: Date

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, user => user.events)
  user: UserEntity

  @OneToMany(() => ScreenEntity, screen => screen.event)
  screens: ScreenEntity[]
}
