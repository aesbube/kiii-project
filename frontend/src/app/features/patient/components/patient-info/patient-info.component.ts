import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {PatientService} from '../../patient.service';
import {BloodType} from '../../../../models/blood-type.model';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinner,
  ]
})
export class PatientInfoComponent implements OnInit {
  service = inject(PatientService);
  fb = inject(FormBuilder);
  private toast = inject(ToastService);
  form!: FormGroup;
  todayStr: string = new Date().toISOString().split('T')[0];
  bloodTypes = Object.entries(BloodType).map(([display, value]) => ({display, value}));

  ngOnInit(): void {
    this.service.getPatient().subscribe((patient) => {
      this.form = this.fb.group({
        username: [{value: patient.username, disabled: true}],
        email: [{value: patient.email, disabled: true}],
        name: [patient.name, Validators.required],
        surname: [patient.surname, Validators.required],
        phone: [patient.phone, [Validators.required, Validators.pattern('^[0-9+\\-\\s]*$')]],
        address: [patient.address, Validators.required],
        birthDate: [patient.birthDate ?? '', Validators.required],
        birthPlace: [patient.birthPlace, Validators.required],
        allergies: [patient.allergies],
        bloodType: [patient.bloodType, Validators.required],
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const updatedPatient = this.form.getRawValue();
      this.service.updatePatientDetails(updatedPatient).subscribe({
        next: () => this.toast.success('Your information has been saved'),
        error: () => this.toast.error('Could not save your information')
      });
    }
  }
}
