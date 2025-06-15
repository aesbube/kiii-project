import {Component, inject, OnInit} from '@angular/core';
import {switchMap} from 'rxjs';
import {Patient} from '../../../../models/patient.model';
import {DoctorService} from '../../doctor.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PatientDetailsComponent} from '../../../../shared/components/patient-details/patient-details.component';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {PatientAppointmentsComponent} from '../patient-appointments/patient-appointments.component';
import {PatientPrescriptionsComponent} from '../patient-prescriptions/patient-prescriptions.component';

@Component({
  selector: 'app-patient-panel',
  imports: [
    PatientDetailsComponent,
    RouterLink,
    MatIconModule,
    MatIconButton,
    PatientAppointmentsComponent,
    PatientPrescriptionsComponent
  ],
  templateUrl: './patient-panel.component.html',
  styleUrl: './patient-panel.component.css'
})
export class PatientPanelComponent implements OnInit {
  service = inject(DoctorService)
  patient$?: Patient | undefined
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log('Patient ID:', id);
        return this.service.getPatientDetails(id!);
      })
    ).subscribe(patient => {
      this.patient$ = patient;
      console.log('Patient:', patient);
    });
  }

}
