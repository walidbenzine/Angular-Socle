import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root'})
export class ApiService {
    private apiUrl = environment.API_URL;

    private http = inject(HttpClient);

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
    }

    register(user: UserModel): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, { user });
    }

    logOut(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/logOut`);
    }

    refreshTokens(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/refreshTokens`);
    }
}