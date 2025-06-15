import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from '../../models/patient.model';
import {Prescription} from '../../models/prescription.model';
import {WritePrescriptionModel} from '../../models/write-prescription.model';
import {environment} from '../../../environments/environment';
import {Doctor} from '../../models/doctor.model';
import {Appointment} from '../../models/appointment.model';
import {Specialist} from '../../models/specialist.model';
import {OccupyAppointment} from '../../models/occupy-appointment.model';
import {Diagnosis} from '../../models/diagnosis.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {
  }

  searchPatients(patient: string): Observable<Patient[]> {
    return this.http.post<Patient[]>(`${this.baseUrl}/search-patients`, {name: patient});
  }

  searchPatientsClaim(patient: string): Observable<Patient[]> {
    return this.http.post<Patient[]>(`${this.baseUrl}/search-patients-claim`, {name: patient});
  }

  claimPatient(patientUsername: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/add-patient`, {username: patientUsername}, {
      responseType: 'text' as const
    });
  }

  getPatientDetails(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patients/${patientId}`);
  }

  getPatientAppointments(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/patients/${patientId}/appointments-all`);
  }

  getFreeAppointments(username: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/${username}`);
  }

  scheduleAppointment(patientId: string, occupyAppointment: OccupyAppointment): Observable<string> {
    return this.http.post(`${this.baseUrl}/patients/${patientId}/appointments`, occupyAppointment, {
      responseType: 'text' as const
    });
  }

  getAllSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.baseUrl}/specialists`);
  }

  getDoctorDetails(): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/me`);
  }

  updateDoctorDetails(doctor: Doctor): Observable<string> {
    return this.http.post(`${this.baseUrl}/update`, doctor, {
      responseType: 'text' as const
    });
  }

  getPatientPrescriptions(patientId: string): Observable<Prescription[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients/${patientId}/prescriptions`);
  }

  writePrescription(patientId: number, prescription: WritePrescriptionModel): Observable<WritePrescriptionModel> {
    return this.http.post<WritePrescriptionModel>(`${this.baseUrl}/patients/${patientId}/prescriptions/new`, prescription);
  }

  getAppointmentDetails(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/appointments-details/${id}`);
  }

  getDiagnosis(appointmentId: string): Observable<Diagnosis> {
    return this.http.get<Diagnosis>(`${this.baseUrl}/appointments/${appointmentId}/diagnosis`);
  }

}
