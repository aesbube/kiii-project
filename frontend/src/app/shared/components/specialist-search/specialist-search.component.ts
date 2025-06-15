import { AsyncPipe } from '@angular/common';
import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { catchError, debounceTime, map, Observable, of, startWith, switchMap } from 'rxjs';
import { Specialist } from '../../../models/specialist.model';
import { SearchesService } from '../searches.service';

@Component({
  selector: 'app-specialist-search',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './specialist-search.component.html',
  styleUrl: './specialist-search.component.css'
})
export class SpecialistSearchComponent implements OnInit{

  private searchesService = inject(SearchesService)
  searchControl1 = new FormControl('');
  filteredSpecialists$?: Observable<Specialist[]>;
  constructor(private router: Router) {}


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

    onOptionSelected(event: any) {
      const selectedUsername = event.option.value;
      this.router.navigate(['/specialist', selectedUsername]);
    }

    @Output() focused = new EventEmitter<boolean>();

    onFocus(): void {
      this.focused.emit(true);
    }

    onBlur(): void {
      this.focused.emit(false);
    }

}
