import {Component, inject, OnInit} from '@angular/core';
import {DoctorService} from '../../doctor.service';
import {debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap} from 'rxjs';
import {Patient} from '../../../../models/patient.model';
import {AsyncPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {PatientCardComponent} from '../patient-card/patient-card.component';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-claim-patient',
  imports: [
    AsyncPipe,
    MatIconModule,
    MatIconButton,
    MatProgressSpinner,
    PatientCardComponent,
    RouterLink
  ],
  templateUrl: './claim-patient.component.html',
  styleUrl: './claim-patient.component.css'
})
export class ClaimPatientComponent implements OnInit {
  service = inject(DoctorService);
  patients$?: Observable<Patient[]>;
  subject = new Subject<string>();

  ngOnInit(): void {
    this.patients$ = this.subject.pipe(
      startWith(""),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.service.searchPatientsClaim(searchTerm))
    )
  }

  onChange(query: string) {
    this.subject.next(query);
  }

  handleCardClick(patientId: string) {
    console.log("Card clicked:", patientId);
    this.service.claimPatient(patientId).subscribe(
      (patient) => {
        console.log('Patient claimed:', patient);
      },
      (error) => {
        console.error('Claim patient failed:', error);
      }
    );
  }
}
