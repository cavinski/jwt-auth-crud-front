import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private http = inject(HttpClient);

  private api = 'http/localhost:8080/auth';

  register(data:any) {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data:any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

}
