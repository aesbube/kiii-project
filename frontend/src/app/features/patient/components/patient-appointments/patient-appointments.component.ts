import { Component, OnInit } from '@angular/core';
import { AppointmentDetailsComponent } from "../../../../shared/components/appointment-details/appointment-details.component";
import { PatientService } from '../../patient.service';
import { Appointment } from '../../../../models/appointment.model';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-patient-appointments',
  imports: [
    AppointmentDetailsComponent,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit {

  appointments: Appointment[] = []
  numOfAppointments = 0
  fetched = false
  subscription: Subscription | undefined;

  today = this.getDate()

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.subscription = this.patientService.getAppointments().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data;
        this.numOfAppointments = this.appointments.length
        this.fetched = true;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      }
    });
  }

  getDate() {
    var d = new Date(Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
