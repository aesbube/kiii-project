import {Component, Input} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {Appointment} from '../../../models/appointment.model';

@Component({
  selector: 'app-appointment-card',
  imports: [
    DatePipe,
    NgClass,
    MatProgressSpinner,
    MatIconModule,
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.css'
})
export class AppointmentCardComponent {
  @Input() appointment!: Appointment;

  get statusClass(): string {
    const s = this.appointment?.status?.toString().toLowerCase() ?? '';
    return `appt-status--${s}`;
  }
}
