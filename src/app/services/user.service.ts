import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addUser`, user);
  }

  generateToken(email: string, password: string): Observable<any> {
    console.log("second");
    console.log(`${this.apiUrl}/login`);
    
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  storeUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/addUser`, user);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found');
      return false;
    }

    return true;
  }

  logoutUser() {
    if (confirm('Are you sure to Logout?')) {
      localStorage.removeItem('token');
      console.log(localStorage.getItem('token'));
    }
  }
}
