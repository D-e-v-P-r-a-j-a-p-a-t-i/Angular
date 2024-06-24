import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrder(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }
}
