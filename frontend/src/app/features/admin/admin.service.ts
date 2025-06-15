import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private baseUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {
    }

    getAllUsers() {
        return this.http.get<any[]>(`${this.baseUrl}`);
    }

    deleteUser(userId: number) {
        return this.http.delete(`${this.baseUrl}/delete/${userId}`, {
            responseType: 'text' as const
        });
    }
}
