import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Specialist } from '../../../models/specialist.model';
import { SearchesService } from '../searches.service';

@Component({
  selector: 'app-specialist-search',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './specialist-search.component.html',
  styleUrl: './specialist-search.component.css'
})
export class SpecialistSearchComponent implements OnInit {

  private searchesService = inject(SearchesService);
  searchControl1 = new FormControl('');
  filteredSpecialists$?: Observable<Specialist[]>;
  isInputFocused = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.filteredSpecialists$ = this.searchControl1.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(term => {
        if (!term || term.length < 2) {
          return of([]);
        }
        return this.searchesService.findSpecialist(term).pipe(
          map(spec => spec ? spec : []),
          catchError(err => {
            console.error('Error searching for doctors:', err);
            return of([]);
          })
        );
      })
    );
  }

  selectSpecialist(username: String) {
    this.router.navigate(['/specialist', username]);
  }

  displayName(specialist: Specialist): string {
    const full = [specialist.name, specialist.surname]
      .map(v => (v ?? '').toString().trim())
      .filter(v => v.length > 0)
      .join(' ');
    return full || (specialist.username ?? '').toString();
  }

  @Output() focused = new EventEmitter<boolean>();

  onInputFocus(): void {
    this.isInputFocused = true;
    this.focused.emit(true);
  }

  onInputBlur(): void {
    this.isInputFocused = false;
    this.focused.emit(false);
  }
}
