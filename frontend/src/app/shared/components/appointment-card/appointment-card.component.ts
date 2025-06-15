import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Appointment} from '../../../models/appointment.model';

@Component({
  selector: 'app-appointment-card',
    imports: [
        DatePipe,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatProgressSpinner
    ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.css'
})
export class AppointmentCardComponent {
  @Input() appointment!: Appointment;
}
