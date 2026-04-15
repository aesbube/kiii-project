import {Component, Input} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {Diagnosis} from '../../../models/diagnosis.model';

@Component({
  selector: 'app-diagnosis-card',
  imports: [
    MatProgressSpinner,
    MatIconModule
  ],
  templateUrl: './diagnosis-card.component.html',
  styleUrl: './diagnosis-card.component.css'
})
export class DiagnosisCardComponent {
  @Input() diagnosis!: Diagnosis;
}
