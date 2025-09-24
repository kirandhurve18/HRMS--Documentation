import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// ✅ Define API response structure
interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  role?: string;
  email?: string;
  employee_id?: string;
  data?: {
    token: string;
    role: string;
    email: string;
    employee_id: string;
    _id:string;
    full_name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // ---------------- LOGIN ----------------
  login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/hrms/login`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ---------------- STORE TOKEN ----------------
 // ---------------- STORE TOKEN ----------------
storeAuthData(
  token: string,
  role: string,
  employee_id: string,
  email?: string,
  full_name?: string
): void {
  if (token) localStorage.setItem('token', token);
  if (role) localStorage.setItem('role', role);
  if (employee_id) localStorage.setItem('employee_id', employee_id);
  if (email) localStorage.setItem('email', email);
  if (full_name) localStorage.setItem('full_name', full_name);

  console.log('✅ Auth data saved:', { token, role, employee_id, email, full_name });
}


  // ---------------- LOGOUT ----------------
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ---------------- HELPERS ----------------
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getEmployeeId(): string {
    return localStorage.getItem('employee_id') || '';
  }

  getEmail(): string {
    return localStorage.getItem('email') || '';
  }
}
