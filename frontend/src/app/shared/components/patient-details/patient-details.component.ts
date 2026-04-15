import {Component, Input} from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-patient-details',
  imports: [
    MatProgressSpinner,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  @Input() patient!: Patient;
}
