import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Patient} from '../../../../models/patient.model';
import {MatCard, MatCardHeader, MatCardModule} from '@angular/material/card';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-patient-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardModule,
    RouterLink,
    MatButton,
    RouterLinkActive,
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
    console.log("Card clicked:", this.patient.id);
  }
}
