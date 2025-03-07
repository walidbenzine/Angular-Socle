import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../../shared/services/loader.service';
import { LocalNotificationsService } from '../../shared/services/local-notifications.service';
import { ErrorsEnum } from '../../shared/enums/errors.enum';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private authService = inject(AuthService);
  private localNotificationsService = inject(LocalNotificationsService);
  private loaderService = inject(LoaderService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const token = this.authService.getToken();
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          return this.authService.refreshTokens().pipe(
            switchMap((result) => {
              if (!!result) {
                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${result ? result[0] : ''}`,
                  },
                });
                return next.handle(newRequest);
              } else {
                this.authService.logOut();
                return this.showAuthError();
              }
            }),
            catchError((err) => {
              this.authService.logOut();
              return this.showAuthError();
            })
          );
        } else if(err.status === 0) {
          return of(this.localNotificationsService.showNotificationByErrorKey(ErrorsEnum.ERROR_OCCURED, 'test error occured', false));
        } else {
          if (
            err.status === HttpStatusCode.Forbidden ||
            (err.status === HttpStatusCode.InternalServerError && err.error && err.error.auth == false)
          ) {
            this.authService.logOut();
          }

        return of(this.localNotificationsService.showNotification(err.message, 'test', false));
        }
      }),
      finalize(() => this.loaderService.hide()),
    );
  }

  private showAuthError(): Observable<any> {
    return of(this.localNotificationsService.showNotificationByErrorKey(ErrorsEnum.AUTHENTIFICATION_REQUIRED, 'test auth required', false));
  }
}