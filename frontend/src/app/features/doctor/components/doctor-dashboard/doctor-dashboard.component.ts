import {Component, OnInit} from '@angular/core';
import {AppointmentComponent} from '../appointment/appointment.component';
import {MatListItem, MatNavList} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-doctor-dashboard',
  imports: [MatListItem, MatNavList, RouterLinkActive, RouterLink],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
