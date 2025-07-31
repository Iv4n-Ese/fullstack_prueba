import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
  user: { id: number; email: string; name: string };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, payload);
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token); // uso de localStorage (persistencia entre pestañas y sesiones)
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
