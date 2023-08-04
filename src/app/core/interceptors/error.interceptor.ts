import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        let errorDetails = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}`;
          if (error.error && error.error.message) {
            errorDetails = error.error.message;
          }
        }

        const errorResponse = {
          timestamp: new Date().toISOString(),
          message: errorMessage,
          details: errorDetails,
        };

        this.openDialog(errorResponse.details);
        return throwError(() => errorResponse);
      })
    );
  }

  constructor(public dialog: MatDialog) {}

  openDialog(message: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      message: message
    };

    this.dialog.open(ErrorDialogComponent, dialogConfig);
  }
}
