import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseDto<T>> | Promise<Observable<ResponseDto<T>>> {
    return next.handle().pipe(
      map((data) => {
        const response = new ResponseDto<T>();
        response.statusCode = context.switchToHttp().getResponse().statusCode;
        response.data = data;
        return response;
      }),
    );
  }
}
