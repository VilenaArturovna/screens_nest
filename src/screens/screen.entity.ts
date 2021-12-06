import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {EventEntity} from "../events/event.entity";
import {PlaylistEntity} from "../playlists/playlist.entity";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../users/user.entity";

@Entity('screens')
export class ScreenEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  model: string

  @Column()
  @ApiProperty()
  releaseYear: number

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => EventEntity, event => event.screens)
  event: EventEntity

  @ManyToOne(() => UserEntity, user => user.screens)
  user: UserEntity

  @OneToOne(() => PlaylistEntity, playlist => playlist.screen)
  @JoinColumn()
  playlist: PlaylistEntity
}
