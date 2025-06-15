import { Component, OnInit } from '@angular/core';
import { Prescription } from '../../../../models/prescription.model';
import { Subscription } from 'rxjs';
import { PatientService } from '../../patient.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PrescriptionDetailsComponent } from '../../../../shared/components/prescription-details/prescription-details.component';
import {MatButtonModule} from '@angular/material/button';
import {PrescriptionStatusModel} from '../../../../models/prescription-status.model';


@Component({
  selector: 'app-patient-prescriptions',
  imports: [
    MatProgressSpinnerModule,
    PrescriptionDetailsComponent,
    MatButtonModule,
  ],
  templateUrl: './patient-prescriptions.component.html',
  styleUrl: './patient-prescriptions.component.css'
})
export class PatientPrescriptionsComponent implements OnInit {

  prescriptions: Prescription[] = []
  numOfPrescriptions = 0
  fetched = false
  subscription: Subscription | undefined;
  prescriptionStatus = PrescriptionStatusModel


  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.subscription = this.patientService.getPrescriptions().subscribe({
      next: (data: Prescription[]) => {
        this.prescriptions = data;
        this.numOfPrescriptions = this.prescriptions.length
        this.fetched = true;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      },
      complete: () => {
        console.log('Patient data fetching complete.');
      }
    });
  }

}
