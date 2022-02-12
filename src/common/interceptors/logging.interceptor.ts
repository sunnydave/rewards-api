import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.debug(`Callin api ${context.switchToHttp().getRequest().url}`);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.debug(
          `API call ${context.switchToHttp().getRequest().url} took ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
