import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {EventEntity} from "../events/event.entity";
import {PlaylistEntity} from "../playlists/playlist.entity";
import {ApiProperty} from "@nestjs/swagger";

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

  @OneToOne(() => PlaylistEntity, playlist => playlist.screen)
  @JoinColumn()
  playlist: PlaylistEntity
}
