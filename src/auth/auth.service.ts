import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AuthUserResponse} from "./types";
import {UserEntity} from "../users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AuthUserDto, CreateUserDto} from "./dto";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByEmail) {
      throw new HttpException('email is taken', HttpStatus.FORBIDDEN);
    }
    if (userByUsername) {
      throw new HttpException('username is taken', HttpStatus.FORBIDDEN);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    newUser.events = []
    return await this.userRepository.save(newUser);
  }

  async signIn(authUserDto: AuthUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { email: authUserDto.email },
      { select: ['id', 'email', 'username', 'password'] },
    );

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await compare(
      authUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException('password is not valid', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): AuthUserResponse {
    delete user.password;
    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }
}
