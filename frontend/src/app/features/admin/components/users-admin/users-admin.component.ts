import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { User } from '../../../../models/user.model';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-users-admin',
  imports: [
    MatIconModule,
    MatIconButton,
    RouterLink,
    MatProgressSpinner
  ],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css'
})
export class UsersAdminComponent implements OnInit {
  service = inject(AdminService);
  private toast = inject(ToastService);
  users: User[] = [];
  loaded = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loaded = true;
        this.toast.error('Could not load users');
      }
    });
  }

  deleteUser(userId: any) {
    this.service.deleteUser(Number(userId)).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== userId);
        this.toast.success('User deleted');
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.toast.error('Could not delete user');
      }
    });
  }
}
