import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../../../models/appointment.model';
import { SpecialistService } from '../../specialist.service';
import {
  AppointmentDetailsComponent
} from '../../../../shared/components/appointment-details/appointment-details.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-appointment-occupied',
  imports: [
    AppointmentDetailsComponent,
    MatProgressSpinner,
    MatIconButton,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './appointment-occupied.component.html',
  styleUrl: './appointment-occupied.component.css'
})
export class AppointmentOccupiedComponent implements OnInit {
  service = inject(SpecialistService);
  occupiedAppointments: Appointment[] = []
  appointmentsLoaded = false;

  ngOnInit(): void {
    this.loadOccupiedAppointments()
  }

  loadOccupiedAppointments() {
    this.service.getOccupiedAppointments().subscribe({
      next: (appointments) => {
        this.occupiedAppointments = appointments;
        this.appointmentsLoaded = true;
      },
      error: (error) => {
        console.error('Error loading occupied appointments:', error);
      }
    });
  }
}
