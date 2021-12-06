import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {PlaylistEntity} from "../playlists/playlist.entity";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../users/user.entity";
import {FileType} from "../constants";

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty({enum: FileType})
  type: FileType

  @Column()
  @ApiProperty()
  duration: string

  @Column()
  @ApiProperty()
  fileName: string

  @Column()
  @ApiProperty()
  fileKey: string

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, user => user.files)
  user: UserEntity

  @ManyToMany(() => PlaylistEntity, playlist => playlist.files)
  playlists: PlaylistEntity[]
}
