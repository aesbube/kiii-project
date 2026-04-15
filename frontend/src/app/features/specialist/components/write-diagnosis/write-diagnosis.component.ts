import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {SpecialistService} from '../../specialist.service';
import {MatInput} from '@angular/material/input';
import {Location} from '@angular/common';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-write-diagnosis',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatIconButton,
    MatInput,
  ],
  templateUrl: './write-diagnosis.component.html',
  styleUrl: './write-diagnosis.component.css'
})
export class WriteDiagnosisComponent implements OnInit {
  service = inject(SpecialistService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  private location = inject(Location);
  private toast = inject(ToastService);

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

  goBack() {
    this.location.back();
  }

  submit() {
    if (this.form.valid && this.patientId !== null) {
      this.isSubmitting = true;

      const diagnosis = this.form.value;

      this.service.writeDiagnosis(this.patientId.toString(), diagnosis).subscribe({
        next: () => {
          this.toast.success('Diagnosis saved');
          this.isSubmitting = false;
          window.location.reload();
        },
        error: (err) => {
          console.error('Failed to write diagnosis', err);
          this.toast.error('Could not save diagnosis');
          this.isSubmitting = false;
        }
      });
    }
  }

  get nameControl() { return this.form.get('name'); }
  get descriptionControl() { return this.form.get('description'); }
  get treatmentControl() { return this.form.get('treatment'); }
}
