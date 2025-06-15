import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pharmacist-dashboard',
  imports: [
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './pharmacist-dashboard.component.html',
  styleUrl: './pharmacist-dashboard.component.css'
})
export class PharmacistDashboardComponent {



}

