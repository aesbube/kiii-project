import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DoctorService} from '../../doctor.service';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatIconButton,
    RouterLink,
    MatProgressSpinner,
  ]
})
export class DoctorDetailsComponent implements OnInit {
  service = inject(DoctorService);
  fb = inject(FormBuilder);
  private toast = inject(ToastService);
  form!: FormGroup;
  todayStr: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.service.getDoctorDetails().subscribe((doctor) => {
      this.form = this.fb.group({
        username: [{value: doctor.username, disabled: true}],
        email: [{value: doctor.email, disabled: true}],
        phone: [doctor.phone],
        name: [doctor.name],
        surname: [doctor.surname],
        birthDate: [doctor.birthDate ?? ''],
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
      this.service.updateDoctorDetails(updatedDoctor).subscribe({
        next: () => this.toast.success('Doctor details saved'),
        error: () => this.toast.error('Could not save doctor details')
      });
    }
  }
}
