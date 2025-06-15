import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  isControlInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!(control?.invalid && control?.touched);
  }

  hasError(form: FormGroup, controlName: string, errorName: string): boolean {
    const control = form.get(controlName);
    return !!(control?.hasError(errorName) && control?.touched);
  }

  formHasErrors(
    form: FormGroup,
    controlName: string,
    errorNames: string[]
  ): boolean {
    return errorNames.some((errorName) =>
      this.hasError(form, controlName, errorName)
    );
  }
}
