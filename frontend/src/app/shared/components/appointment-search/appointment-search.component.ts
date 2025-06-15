import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-search',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './appointment-search.component.html',
  styleUrl: './appointment-search.component.css'
})
export class AppointmentSearchComponent implements AfterViewInit{

  searchControl2 = new FormControl('');

  @HostBinding('class.no-grayscale') isInputFocused: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.searchInput.nativeElement.addEventListener('focus', () => {
      this.isInputFocused = true;
    });

    this.searchInput.nativeElement.addEventListener('blur', () => {
      this.isInputFocused = false;
    });
  }

  goToAppointment(){
    this.router.navigate(['/appointment', this.searchControl2.value]);
  }

  @Output() focused = new EventEmitter<boolean>();

    onFocus(): void {
      this.focused.emit(true);
    }

    onBlur(): void {
      this.focused.emit(false);
    }
}
