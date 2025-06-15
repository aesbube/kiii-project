import {Component, inject, OnInit} from '@angular/core';
import {DoctorService} from '../../doctor.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {WritePrescriptionModel} from '../../../../models/write-prescription.model';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-write-prescription',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInput
  ],
  templateUrl: './write-prescription.component.html',
  styleUrl: './write-prescription.component.css'
})
export class WritePrescriptionComponent implements OnInit {
  service = inject(DoctorService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  form!: FormGroup;
  patientId: number | null = null;
  isSubmitting = false;

  ngOnInit(): void {
    console.log('Patient ID:', this.patientId);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.patientId = +id;
        console.log('Patient ID:', this.patientId);
      }
    });

    this.form = this.fb.group({
      medicine: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      frequency: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]]
    });
  }

  submit() {
    if (this.form.valid && this.patientId !== null) {
      this.isSubmitting = true;

      const prescription: WritePrescriptionModel = this.form.value;

      this.service.writePrescription(this.patientId, prescription).subscribe({
        next: (response) => {
          console.log('Prescription written successfully', response);
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Failed to write prescription', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  get medicineControl() {
    return this.form.get('medicine');
  }

  get frequencyControl() {
    return this.form.get('frequency');
  }
}
