import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {hash} from 'bcrypt'
import {EventEntity} from "../events/event.entity";
import {ApiProperty} from "@nestjs/swagger";
import {FileEntity} from "../files/file.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  username: string

  @Column()
  @ApiProperty()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => EventEntity, event => event.user)
  events: EventEntity[]

  @OneToMany(() => FileEntity, file => file.user)
  files: FileEntity[]
}
