import {Component, Input} from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-patient-details',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatProgressSpinner,
    DatePipe
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  @Input() patient!: Patient;
}
