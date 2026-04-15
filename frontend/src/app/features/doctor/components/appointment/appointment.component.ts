import {Component, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Appointment} from '../../../../models/appointment.model';
import {Specialist} from '../../../../models/specialist.model';
import {OccupyAppointment} from '../../../../models/occupy-appointment.model';
import {DoctorService} from '../../doctor.service';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatIconButton,
    MatNativeDateModule,
    MatProgressSpinner,
    RouterLink
  ]
})
export class AppointmentComponent implements OnInit {
  service = inject(DoctorService);
  private toast = inject(ToastService);

  specialists: Specialist[] = [];
  selectedSpecialist: Specialist | null = null;
  value: Date | null = null;
  time: string = '';
  availableAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  availableDates: Set<string> = new Set();
  availableTimesByDate: Map<string, string[]> = new Map();
  appointmentsByDateTime: Map<string, Appointment> = new Map();
  route = inject(ActivatedRoute);
  loading = false;
  appointmentsLoaded = false;
  patientId = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id') || '';
    });
    this.loadSpecialists();
  }

  loadSpecialists() {
    this.loading = true;
    this.service.getAllSpecialists().subscribe({
      next: (specialists) => { this.specialists = specialists; this.loading = false; },
      error: () => this.loading = false
    });
  }

  onSpecialistChange(specialist: Specialist) {
    this.selectedSpecialist = specialist;
    this.value = null;
    this.time = '';
    this.selectedAppointment = null;
    this.loadAppointments();
  }

  loadAppointments() {
    if (!this.selectedSpecialist) return;
    this.loading = true;
    this.appointmentsLoaded = false;
    this.service.getFreeAppointments(this.selectedSpecialist.username as string).subscribe({
      next: (appointments) => {
        this.availableAppointments = appointments;
        this.processAppointments();
        this.loading = false;
        this.appointmentsLoaded = true;
      },
      error: () => { this.loading = false; this.appointmentsLoaded = true; }
    });
  }

  processAppointments() {
    this.availableDates = new Set();
    this.availableTimesByDate = new Map();
    this.appointmentsByDateTime = new Map();
    for (const appointment of this.availableAppointments) {
      this.availableDates.add(appointment.date);
      const times = this.availableTimesByDate.get(appointment.date) || [];
      times.push(appointment.time);
      this.availableTimesByDate.set(appointment.date, times);
      this.appointmentsByDateTime.set(`${appointment.date}_${appointment.time}`, appointment);
    }
  }

  onDateChange(date: Date) {
    if (!date) return;
    this.value = date;
    this.time = '';
    this.selectedAppointment = null;
  }

  onTimeChange(timeStr: string) {
    this.time = timeStr;
    if (!this.value || !this.time) return;
    const key = `${this.formatDate(this.value)}_${this.time}`;
    this.selectedAppointment = this.appointmentsByDateTime.get(key) || null;
  }

  scheduleAppointment() {
    if (!this.selectedAppointment || !this.patientId) return;
    const occupyAppointment: OccupyAppointment = {
      appointmentId: this.selectedAppointment.id,
      scheduleId: this.selectedAppointment.scheduleId,
      refNumber: this.selectedAppointment.refNumber
    };
    this.loading = true;
    this.service.scheduleAppointment(this.patientId, occupyAppointment).subscribe({
      next: () => {
        this.toast.success('Appointment scheduled');
        this.loading = false;
        this.resetForm();
      },
      error: () => {
        this.toast.error('Could not schedule appointment');
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.selectedSpecialist = null;
    this.value = null;
    this.time = '';
    this.selectedAppointment = null;
    this.availableAppointments = [];
    this.appointmentsLoaded = false;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isDateAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    return this.availableDates.has(this.formatDate(date));
  }

  getAvailableTimesForSelectedDate(): string[] {
    if (!this.value) return [];
    return this.availableTimesByDate.get(this.formatDate(this.value)) || [];
  }

  dateClass = (date: Date) => this.isDateAvailable(date) ? 'available-date' : '';
}
