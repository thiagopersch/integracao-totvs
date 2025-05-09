import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: data.message || 'Operação realizada com sucesso',
        data: data.result || data,
      })),
      catchError((err) => {
        return throwError(() => ({
          success: false,
          message: err.message || 'An unexpected error occurred',
          statusCode: err.status || 500,
        }));
      }),
    );
  }
}
