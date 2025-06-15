import {Component, inject, OnInit} from '@angular/core';
import { DoctorDashboardComponent } from '../../../features/doctor/components/doctor-dashboard/doctor-dashboard.component';
import { AdminDashboardComponent } from '../../../features/admin/components/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from '../../../features/patient/components/patient-dashboard/patient-dashboard.component';
import { SpecialistDashboardComponent } from '../../../features/specialist/components/specialist-dashboard/specialist-dashboard.component';
import { PharmacistDashboardComponent } from '../../../features/pharmacist/components/pharmacist-dashboard/pharmacist-dashboard.component';
import { AuthService } from '../../../core/services/auth.service';
import {Role} from '../../../models/roles.model';

@Component({
  selector: 'app-dashboard-container',
  imports: [
    PatientDashboardComponent,
    DoctorDashboardComponent,
    SpecialistDashboardComponent,
    PharmacistDashboardComponent,
    AdminDashboardComponent,
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.css'
})
export class DashboardContainerComponent implements OnInit {

  authService = inject(AuthService)
  userRole: String = "ROLE_GUEST"

  ngOnInit(){
    this.userRole = this.authService.getRole()
  }

  protected readonly Roles = Role;
}
