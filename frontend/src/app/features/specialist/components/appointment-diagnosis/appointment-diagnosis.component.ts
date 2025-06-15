import {Component, inject, Input, OnInit} from '@angular/core';
import {AppointmentCardComponent} from '../../../../shared/components/appointment-card/appointment-card.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {SpecialistService} from '../../specialist.service';
import {Appointment} from '../../../../models/appointment.model';
import {forkJoin, of, switchMap, throwError} from 'rxjs';
import {WriteDiagnosisComponent} from '../write-diagnosis/write-diagnosis.component';
import {Diagnosis} from '../../../../models/diagnosis.model';
import {DiagnosisCardComponent} from '../../../../shared/components/diagnosis-card/diagnosis-card.component';
import {catchError} from 'rxjs/operators';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DoctorService} from '../../../doctor/doctor.service';

@Component({
  selector: 'app-appointment-diagnosis',
  imports: [
    AppointmentCardComponent,
    WriteDiagnosisComponent,
    DiagnosisCardComponent,
    MatIconModule,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './appointment-diagnosis.component.html',
  styleUrl: './appointment-diagnosis.component.css'
})
export class AppointmentDiagnosisComponent implements OnInit {
  service = inject(SpecialistService)
  doctorService = inject(DoctorService)
  appointment$?: Appointment | undefined
  diagnosis$?: Diagnosis | undefined
  route = inject(ActivatedRoute);
  @Input() isDoctor: boolean = false;
  @Input() isGuest: boolean = false;
  goBackUrl: string = '/dashboard/patients/' + this.route.snapshot.params['id'];

  ngOnInit(): void {
    if (this.isDoctor) {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = this.isDoctor ? params.get('appointmentId')! : params.get('id')!;
          return forkJoin({
            appointment: this.doctorService.getAppointmentDetails(id),
            diagnosis: this.doctorService.getDiagnosis(id).pipe(
              catchError(error => {
                return of(undefined)
              })
            )
          });
        })
      ).subscribe(({appointment, diagnosis}) => {
        this.appointment$ = appointment;
        this.diagnosis$ = diagnosis;
        console.log('Appointment:', appointment);
        console.log('Diagnosis:', diagnosis);
      });
    } else if (this.isGuest) {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('reference')!;
          return forkJoin({
            appointment: this.service.getAppointmentByReference(id)
          });
        })
      ).subscribe(({appointment}) => {
        this.appointment$ = appointment;
        console.log('Appointment:', appointment);
      });
    } else {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id')!;
          return forkJoin({
            appointment: this.service.getAppointmentDetails(id),
            diagnosis: this.service.getDiagnosis(id).pipe(
              catchError(error => {
                if (error.status === 404) {
                  console.warn('Diagnosis not found.');
                  return of(undefined);
                }
                return throwError(() => error);
              })
            )
          });
        })
      ).subscribe(({appointment, diagnosis}) => {
        this.appointment$ = appointment;
        this.diagnosis$ = diagnosis;
        console.log('Appointment:', appointment);
        console.log('Diagnosis:', diagnosis);
      });
    }
  }
}
