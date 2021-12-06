import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';
import {ExpressRequest} from "../types";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {

    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET);
      req.user = await this.authService.findById(decode.id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
