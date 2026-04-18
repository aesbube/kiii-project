import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from '../../../core/services/validation.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ValidationService],
})
export class RegisterComponent {
  myForm: FormGroup;
  strongPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  successMessage: string | null = null;

  private toast = inject(ToastService);

  constructor(
    public validationService: ValidationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.strongPasswordPattern),
      ]),
    });
  }

  onSubmit() {
    console.log('Submit');
    if (this.myForm.valid) {
      console.log('Registering...');
      const registrationData = this.myForm.value;

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful!', response);
          this.successMessage = null;
          this.toast.success('Account created — please sign in');
          this.myForm.reset();
          this.myForm.markAsPristine();
          this.myForm.markAsUntouched();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.successMessage = 'Registration failed please try again';
          this.toast.error('Registration failed. Please try again');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
