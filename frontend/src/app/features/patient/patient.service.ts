import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../../models/patient.model';
import {Observable} from 'rxjs';
import {Appointment} from '../../models/appointment.model';
import {Prescription} from '../../models/prescription.model';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {
  }

  getPatient(): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/me`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments`);
  }

  getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/me/prescriptions`);
  }

  updatePatientDetails(patient: Patient): Observable<string> {
    return this.http.post(`${this.apiUrl}/update`, patient, {
      responseType: 'text' as const
    });
  }


}
