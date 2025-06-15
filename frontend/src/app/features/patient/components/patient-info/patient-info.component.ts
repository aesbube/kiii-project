import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {PatientService} from '../../patient.service';
import {BloodType} from '../../../../models/blood-type.model';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinner,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class PatientInfoComponent implements OnInit {
  service = inject(PatientService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  today: Date = new Date();
  patientDate: string | null = null;
  bloodTypes = Object.entries(BloodType).map(([display, value]) => ({display, value}));

  ngOnInit(): void {
    this.service.getPatient().subscribe((patient) => {
      this.patientDate = patient.birthDate ? patient.birthDate.toString() : null;
      this.form = this.fb.group({
        username: [{value: patient.username, disabled: true}],
        email: [{value: patient.email, disabled: true}],
        name: [patient.name, Validators.required],
        surname: [patient.surname, Validators.required],
        phone: [patient.phone, [Validators.required, Validators.pattern('^[0-9+\\-\\s]*$')]],
        address: [patient.address, Validators.required],
        birthDate: [patient.birthDate, Validators.required],
        birthPlace: [patient.birthPlace, Validators.required],
        allergies: [patient.allergies],
        bloodType: [patient.bloodType, Validators.required],
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const updatedPatient = this.form.getRawValue();
      updatedPatient.birthDate = this.formatDate(updatedPatient.birthDate);
      this.service.updatePatientDetails(updatedPatient).subscribe({
        next: (response) => {
          console.log('Update successful', response);
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    if (this.patientDate && this.patientDate === date.toString()) {
      return this.patientDate;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
