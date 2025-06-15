import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Diagnosis} from '../../../models/diagnosis.model';

@Component({
  selector: 'app-diagnosis-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatProgressSpinner
  ],
  templateUrl: './diagnosis-card.component.html',
  styleUrl: './diagnosis-card.component.css'
})
export class DiagnosisCardComponent {
  @Input() diagnosis!: Diagnosis;
}
