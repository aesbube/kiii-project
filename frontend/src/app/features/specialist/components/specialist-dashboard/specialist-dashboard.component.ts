import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-specialist-dashboard',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {}
