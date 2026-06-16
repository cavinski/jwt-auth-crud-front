import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { AuthRespose } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  private api = environment.apiUrl;

  register(name: string, email: string, password: string): Observable<void> {

    const request : RegisterRequest = {name, email, password};

    return this.http.post<void>(`${this.api}/auth/register`, request);
  }

  login(email: string, password: string): Observable<AuthRespose> {
    
    const request : LoginRequest = {email, password};

    return this.http.post<AuthRespose>(`${this.api}/auth/login`, request);
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

