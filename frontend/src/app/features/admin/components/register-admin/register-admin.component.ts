import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ValidationService} from '../../../../core/services/validation.service';
import {AuthService} from '../../../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-register-admin',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent implements OnInit {
  myForm: FormGroup;
  strongPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  successMessage: string | null = null;

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
      role: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submit');
    if (this.myForm.valid) {
      console.log('Registering...');
      const registrationData = this.myForm.value;

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful!', response);
          this.successMessage = 'Registration successful!';
          this.myForm.reset();
          this.myForm.markAsPristine();
          this.myForm.markAsUntouched();
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.successMessage = 'Registration failed please try again';
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
