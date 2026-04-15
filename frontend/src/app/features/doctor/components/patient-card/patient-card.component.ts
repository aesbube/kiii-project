import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Patient} from '../../../../models/patient.model';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-patient-card',
  imports: [
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.css'
})
export class PatientCardComponent {
  @Input() patient!: Patient;
  @Input() isClaim: boolean = false;
  @Output() cardClick = new EventEmitter<string>();

  handleCardClick() {
    this.cardClick.emit(this.patient.id.toString());
  }
}
