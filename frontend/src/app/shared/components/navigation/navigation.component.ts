import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {

  authService = inject(AuthService)

}
