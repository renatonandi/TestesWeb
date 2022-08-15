import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

import { MessageService } from "primeng/api";

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({url: environment.baseUrl + request.url});
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.mensagemErro(error);
      })
    );
  }

  private mensagemErro(error: HttpErrorResponse): Observable<HttpEvent<unknown>> {
    if (error.status && error.status > 0) {
      let text = 'Ocorreu um erro inesperado';
      if (error.error && error.error.message) {
        text = error.error.message;
      }
      this.messageService.add({
        severity: error.status === 500 ? 'error' : 'warn',
        summary: error.status === 500 ? 'Erro' : 'Atenção',
        detail: text
      });
    } else {
      this.messageService.add({
        severity:'error',
        summary: 'Erro',
        detail: 'Não foi possível conectar ao servidor'
      });
    }
    return throwError(() => error);
  }
}
