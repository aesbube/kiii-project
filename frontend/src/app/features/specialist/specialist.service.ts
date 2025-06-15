import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Appointment} from '../../models/appointment.model';
import {FreeAppointment} from '../../models/free-appointment.model';
import {Specialist} from '../../models/specialist.model';
import {environment} from '../../../environments/environment';
import {WriteDiagnosis} from '../../models/write-diagnosis.model';
import {Diagnosis} from '../../models/diagnosis.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  private baseUrl = `${environment.apiUrl}/specialists`;

  constructor(private http: HttpClient) {
  }

  getSavedFreeAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }

  setFreeAppointments(appointments: FreeAppointment[]): Observable<string> {
    return this.http.post(`${this.baseUrl}/appointments/set`, appointments, {
      responseType: 'text' as const
    });
  }

  getOccupiedAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/occupied-appointments`);
  }

  getAppointmentDetails(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/appointments/${id}`);
  }

  getAppointmentByReference(reference: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/appointments/ref/${reference}`);
  }

  writeDiagnosis(appointmentId: string, diagnosis: WriteDiagnosis): Observable<string> {
    return this.http.post(`${this.baseUrl}/appointments/${appointmentId}/diagnosis`, diagnosis, {
      responseType: 'text' as const
    });
  }

  getDiagnosis(appointmentId: string): Observable<Diagnosis> {
    return this.http.get<Diagnosis>(`${this.baseUrl}/appointments/${appointmentId}/diagnosis`);
  }

  getSpecialistDetails(): Observable<Specialist> {
    return this.http.get<Specialist>(`${this.baseUrl}/me`);
  }

  updateSpecialistDetails(specialist: Specialist): Observable<string> {
    return this.http.post(`${this.baseUrl}/update`, specialist, {
      responseType: 'text' as const
    });
  }
}
