import {Component, inject, Input, OnInit} from '@angular/core';
import {Appointment} from '../../../../models/appointment.model';
import {DoctorService} from '../../doctor.service';
import {AppointmentDetailsComponent} from '../../../../shared/components/appointment-details/appointment-details.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-patient-appointments',
  imports: [
    AppointmentDetailsComponent,
    MatIconModule,
    MatProgressSpinner,
    RouterLink,
  ],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit {
  service = inject(DoctorService);
  appointments: Appointment[] = [];
  appointmentsLoaded = false;
  @Input() patientId!: string;

  ngOnInit(): void {
    this.service.getPatientAppointments(this.patientId).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.appointmentsLoaded = true;
      },
      error: () => this.appointmentsLoaded = true
    });
  }
}
