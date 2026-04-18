import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { Patient } from '../../../../models/patient.model';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PatientCardComponent } from '../patient-card/patient-card.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../../../../core/services/toast.service';

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
  private toast = inject(ToastService);
  patients$ = new BehaviorSubject<Patient[] | null>(null);
  subject = new Subject<string>();
  private currentQuery = '';

  ngOnInit(): void {
    this.subject.pipe(
      startWith(''),
      tap(q => this.currentQuery = q),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.service.searchPatientsClaim(searchTerm))
    ).subscribe(patients => this.patients$.next(patients));
  }

  onChange(query: string) {
    this.subject.next(query);
  }

  handleCardClick(patientId: string) {
    this.service.claimPatient(patientId).subscribe({
      next: () => {
        this.toast.success('Patient claimed successfully');
        const current = this.patients$.value ?? [];
        this.patients$.next(current.filter(p => p.username.toString() !== patientId));
      },
      error: (error) => {
        console.error('Claim patient failed:', error);
        this.toast.error('Could not claim patient');
      }
    });
  }
}
