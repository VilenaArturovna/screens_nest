import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthUserResponse} from "./types";
import {AuthUserDto, CreateUserDto} from "./dto";
import {UserEntity} from "../users/user.entity";

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({type: AuthUserResponse})
  async signUp(@Body() createUserDto: CreateUserDto): Promise<AuthUserResponse> {
    const user = await this.authService.signUp(createUserDto);
    return this.authService.buildUserResponse(user);
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: AuthUserDto })
  @ApiOkResponse({type: AuthUserResponse})
  async signIn(@Body() authUserDto: AuthUserDto): Promise<AuthUserResponse> {
    const user = await this.authService.signIn(authUserDto);
    return this.authService.buildUserResponse(user);
  }
}
