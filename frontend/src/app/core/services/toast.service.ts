import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackBar = inject(MatSnackBar);

  private base: MatSnackBarConfig = {
    duration: 3500,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  success(message: string, action = 'OK') {
    this.snackBar.open(message, action, {
      ...this.base,
      panelClass: ['app-snackbar-success'],
    });
  }

  error(message: string, action = 'Dismiss') {
    this.snackBar.open(message, action, {
      ...this.base,
      duration: 5000,
      panelClass: ['app-snackbar-error'],
    });
  }

  info(message: string, action = 'OK') {
    this.snackBar.open(message, action, {
      ...this.base,
      panelClass: ['app-snackbar-info'],
    });
  }
}
