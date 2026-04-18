import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../../models/appointment.model';
import { Subscription } from 'rxjs';
import { PatientService } from '../../patient.service';
import { Prescription } from '../../../../models/prescription.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  AppointmentDetailsComponent
} from '../../../../shared/components/appointment-details/appointment-details.component';
import {
  PrescriptionDetailsComponent
} from '../../../../shared/components/prescription-details/prescription-details.component';
import { MatIconModule } from '@angular/material/icon';
import { PrescriptionStatusModel } from '../../../../models/prescription-status.model';

@Component({
  selector: 'app-patient-history',
  imports: [
    MatProgressSpinnerModule,
    AppointmentDetailsComponent,
    PrescriptionDetailsComponent,
    MatIconModule,
  ],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.css'
})
export class PatientHistoryComponent implements OnInit {

  appointments: Appointment[] = []
  numOfAppointments = 0
  fetchedAppointments = false

  prescriptions: Prescription[] = []
  numOfPrescriptions = 0
  fetchedPrescriptions = false
  prescriptionStatus = PrescriptionStatusModel

  subscription: Subscription | undefined;

  today = this.getDate()

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.subscription = this.patientService.getAppointments().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data;
        this.numOfAppointments = this.appointments.length;
        this.fetchedAppointments = true;
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });

    this.subscription = this.patientService.getPrescriptions().subscribe({
      next: (data: Prescription[]) => {
        this.prescriptions = data;
        this.numOfPrescriptions = this.prescriptions.length;
        this.fetchedPrescriptions = true;
      },
      error: (error) => {
        console.error('Error fetching prescriptions:', error);
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
