import { TokenService } from './../../../services/token.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class errorInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router, private message: MessageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 || error.status == 403) {
          this.tokenService.clearStorage();
          this.router.navigateByUrl('login');
          return throwError("");
        }

        this.message.add({ severity: 'error', summary: 'Error', detail: `${error.error.error}` });
        return throwError("");

      })
    );
  }
};
