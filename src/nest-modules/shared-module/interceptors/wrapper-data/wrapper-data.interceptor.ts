import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs'; //reactive x

@Injectable()
export class WrapperDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((body) => (!body || 'meta' in body ? body : { data: body })));
  }
}

/**
 * Criamos este interceptor para modelar o retorno dos dados
 * Ao inves de retornar assim: {
  "id": "7f4dceb5-a027-4d60-9c02-2f8bc718f74b",
  "name": "Category 1",
  "description": "Description 1",
  "is_active": true,
  "created_at": "2023-10-14T01:29:31.805Z"
}

  retorna assim: {
  "data": {
    "id": "7f4dceb5-a027-4d60-9c02-2f8bc718f74b",
    "name": "Category 1",
    "description": "Description 1",
    "is_active": true,
    "created_at": "2023-10-14T01:29:31.805Z"
  }
 * 
 */
