import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { User } from '../interface/User';
import { jwtDecode } from 'jwt-decode';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient, private cartService: CartService) { }

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
    const her = jwtDecode(token)
    this.cartService.synchronizeCartWithServer().subscribe();
    console.log("here", her)
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
      this.cartService.clearLocalStorageCart();
      console.log(localStorage.getItem('token'));
    }
  }
}
