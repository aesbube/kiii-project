import { Component } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { CommonModule } from '@angular/common';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PatientAppointmentsComponent } from "../patient-appointments/patient-appointments.component";
import { PatientPrescriptionsComponent } from "../patient-prescriptions/patient-prescriptions.component";
import { PatientHistoryComponent } from '../patient-history/patient-history.component';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    PatientInfoComponent,
    PatientAppointmentsComponent,
    PatientPrescriptionsComponent,
    PatientHistoryComponent
],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
  currentTab = "Basic Info"

  updatePatientTab(lastClicked:string){
    this.currentTab = lastClicked
  }
}
