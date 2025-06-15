import {Component, inject, Input, OnInit} from '@angular/core';
import {DoctorService} from '../../doctor.service';
import {Prescription} from '../../../../models/prescription.model';
import {
  AppointmentDetailsComponent
} from '../../../../shared/components/appointment-details/appointment-details.component';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  PrescriptionDetailsComponent
} from '../../../../shared/components/prescription-details/prescription-details.component';

@Component({
  selector: 'app-patient-prescriptions',
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatProgressSpinner,
    RouterLinkActive,
    RouterLink,
    PrescriptionDetailsComponent
  ],
  templateUrl: './patient-prescriptions.component.html',
  styleUrl: './patient-prescriptions.component.css'
})
export class PatientPrescriptionsComponent implements OnInit {
  service = inject(DoctorService)
  prescriptions: Prescription[] = []
  prescriptionsLoaded = false;
  @Input() patientId!: string;

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions() {
    this.service.getPatientPrescriptions(this.patientId).subscribe({
      next: (prescriptions) => {
        this.prescriptions = prescriptions;
        this.prescriptionsLoaded = true;
      },
      error: (error) => {
        console.error('Error loading occupied prescriptions:', error);
      }
    })
  }
}
