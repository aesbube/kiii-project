import {Component, inject, OnInit} from '@angular/core';
import {DoctorService} from '../../doctor.service';
import {Patient} from '../../../../models/patient.model';
import {PatientCardComponent} from '../patient-card/patient-card.component';
import {MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-doctor-patients',
  imports: [
    PatientCardComponent,
    MatIconModule,
    MatIconButton,
    RouterLink,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './doctor-patients.component.html',
  styleUrl: './doctor-patients.component.css'
})
export class DoctorPatientsComponent implements OnInit {
  service = inject(DoctorService);
  patients$?: Observable<Patient[]>;
  subject = new Subject<string>();

  ngOnInit(): void {
    this.patients$ = this.subject.pipe(
      startWith(""),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.service.searchPatients(searchTerm))
    )
  }

  onChange(query: string) {
    this.subject.next(query);
  }
}
