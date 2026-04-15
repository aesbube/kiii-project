import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-doctor-dashboard',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {}
