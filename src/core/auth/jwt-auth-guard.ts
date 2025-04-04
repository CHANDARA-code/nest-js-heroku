import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpStatus } from '@nestjs/common';
import { AppException } from '../exception/app-exception/app-exception';

@Injectable()
export class AppJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log(`💥💥App Exception 💥 AppJwtAuthGuard💥💥`);
    console.log(context);
    if (err || !user) {
      if (info && info.message) {
        throw new AppException('Unauthorized access', 'No Rigth to access', HttpStatus.UNAUTHORIZED);
      } else if (err) {
        throw new AppException(err, err, HttpStatus.UNAUTHORIZED);
      } else {
        throw new AppException('Unauthorized access', 'No Rigth to access', HttpStatus.UNAUTHORIZED);
      }
    }
    return user;
  }
}
