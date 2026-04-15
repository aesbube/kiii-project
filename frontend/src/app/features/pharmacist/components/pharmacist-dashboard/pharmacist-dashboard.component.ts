import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pharmacist-dashboard',
  imports: [RouterLink, MatIconModule],
  templateUrl: './pharmacist-dashboard.component.html',
  styleUrl: './pharmacist-dashboard.component.css'
})
export class PharmacistDashboardComponent {}
