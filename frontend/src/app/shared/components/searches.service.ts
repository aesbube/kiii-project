import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Specialist} from '../../models/specialist.model';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  findSpecialist(keyword: String): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.apiUrl}/specialists/search?name=${keyword}`)
      .pipe(
        map((doctors: Specialist[]) => {
          if (doctors && doctors.length > 0) {
            return doctors;
          } else {
            return [];
          }
        })
      );
  }

  findSpecialistByUsername(username: String): Observable<Specialist> {
    return this.http.get<Specialist>(`${this.apiUrl}/specialists/${username}`)
  }

}
