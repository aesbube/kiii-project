import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DoctorService} from '../../doctor.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinner,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DoctorDetailsComponent implements OnInit {
  service = inject(DoctorService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  today: Date = new Date();
  doctorDate: string | null = null;

  ngOnInit(): void {
    this.service.getDoctorDetails().subscribe((doctor) => {
      this.doctorDate = doctor.birthDate ? doctor.birthDate.toString() : null;
      this.form = this.fb.group({
        username: [{value: doctor.username, disabled: true}],
        email: [{value: doctor.email, disabled: true}],
        phone: [doctor.phone],
        name: [doctor.name],
        surname: [doctor.surname],
        birthDate: [doctor.birthDate],
        address: [doctor.address ?? ''],
        specialty: [doctor.specialty],
        licenseNumber: [doctor.licenseNumber],
        yearsOfExperience: [doctor.yearsOfExperience],
        hospitalName: [doctor.hospitalName],
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const updatedDoctor = this.form.getRawValue();
      updatedDoctor.birthDate = this.formatDate(updatedDoctor.birthDate);
      this.service.updateDoctorDetails(updatedDoctor).subscribe({
        next: (ok) => {
          console.log('Update successful', ok);
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    if (this.doctorDate && this.doctorDate === date.toString()) {
      return this.doctorDate;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
