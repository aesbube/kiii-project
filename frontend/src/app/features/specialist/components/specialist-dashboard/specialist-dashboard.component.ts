import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-specialist-dashboard',
  imports: [RouterLink, RouterLinkActive, MatNavList, MatListItem],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {

}
