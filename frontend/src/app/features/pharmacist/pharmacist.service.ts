import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prescription} from '../../models/prescription.model';
import {Pharmacist} from '../../models/pharmacist.model';

@Injectable({
  providedIn: 'root'
})

export class PharmacistService {
  private apiUrl = `${environment.apiUrl}/pharmacists`;

  constructor(private http: HttpClient) {
  }

  getPrescription(prescriptionId: string, patientId: number) {
    return this.http.get<Prescription>(`${this.apiUrl}/prescription?prescriptionId=${prescriptionId}&patientId=${patientId}`);
  }

  validatePrescription(prescriptionId: string, patientId: number): Observable<Prescription> {
    return this.http.post<Prescription>(
      `${this.apiUrl}/prescription`,
      {
        prescriptionId: prescriptionId,
        patientId: patientId
      }
    );
  }

  getPharmacistDetails(): Observable<Pharmacist> {
    return this.http.get<Pharmacist>(`${this.apiUrl}/me`);
  }

  updatePharmacistDetails(pharmacist: Pharmacist): Observable<string> {
    return this.http.post(`${this.apiUrl}/update`, pharmacist, {
      responseType: 'text' as const
    });
  }

}
