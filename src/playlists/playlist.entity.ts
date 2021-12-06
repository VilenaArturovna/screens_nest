import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {ScreenEntity} from "../screens/screen.entity";
import {FileEntity} from "../files/file.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  duration: string

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updatedAt: Date;

  @OneToOne(() => ScreenEntity, screen => screen.playlist, {
    cascade: true,
  })
  screen: ScreenEntity

  @ManyToMany(() => FileEntity, file => file.playlists)
  @JoinTable()
  files: FileEntity[]
}
