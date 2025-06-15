import {Component, OnInit} from '@angular/core';
import {RegisterAdminComponent} from '../register-admin/register-admin.component';
import {UsersAdminComponent} from '../users-admin/users-admin.component';
import {MatListItem, MatNavList} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatListItem, MatNavList, RouterLinkActive, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  ngOnInit(): void {
  }

}
