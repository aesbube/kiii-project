// write-diagnosis.component.ts
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {SpecialistService} from '../../specialist.service';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-write-diagnosis',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInput,
  ],
  templateUrl: './write-diagnosis.component.html',
  styleUrl: './write-diagnosis.component.css'
})
export class WriteDiagnosisComponent implements OnInit {
  service = inject(SpecialistService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  form!: FormGroup;
  patientId: string | null = null;
  isSubmitting = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.patientId = id;
      }
    });

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      treatment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  submit() {
    if (this.form.valid && this.patientId !== null) {
      this.isSubmitting = true;

      const diagnosis = this.form.value;

      this.service.writeDiagnosis(this.patientId.toString(), diagnosis).subscribe({
        next: (response) => {
          console.log('Diagnosis written successfully', response);
          this.isSubmitting = false;
          window.location.reload();
        },
        error: (err) => {
          console.error('Failed to write diagnosis', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  get nameControl() {
    return this.form.get('name');
  }

  get descriptionControl() {
    return this.form.get('description');
  }

  get treatmentControl() {
    return this.form.get('treatment');
  }
}
