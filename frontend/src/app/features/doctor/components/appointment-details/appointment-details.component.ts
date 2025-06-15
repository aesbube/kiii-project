import { Component } from '@angular/core';
import {
  AppointmentDiagnosisComponent
} from '../../../specialist/components/appointment-diagnosis/appointment-diagnosis.component';

@Component({
  selector: 'app-appointment-details',
  imports: [
    AppointmentDiagnosisComponent
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {

}
