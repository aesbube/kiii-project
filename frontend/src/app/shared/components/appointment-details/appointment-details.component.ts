import {Component, Input} from '@angular/core';
import {Appointment} from '../../../models/appointment.model';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-appointment-details',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatButton,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {
  @Input() appointment!: Appointment
  @Input() isDoctor: boolean = false;
  @Input() isPatient: boolean = false;
}
