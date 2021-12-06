import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {getRepository} from "typeorm";
import {FileEntity} from "../file.entity";

@Injectable()
export class OwnerFilesGuard implements CanActivate{
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const filesRepo = getRepository(FileEntity)

    const file = await filesRepo.findOne(request.params.id, {relations: ['user']})

    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND)
    }

    if (file.user.id === request.user.id) {
      return true
    }

    throw new HttpException('You are not owner', HttpStatus.FORBIDDEN)
  }
}
