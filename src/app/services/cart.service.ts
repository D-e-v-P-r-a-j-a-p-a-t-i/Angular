// cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = `${environment.apiUrl}/api/carts`;

  constructor(private http: HttpClient) { }

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addToCart(cart: any): Observable<any> {
    return this.http.post(this.apiUrl, cart);
  }

  deleteCartItem(cartId: string, itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}/item/${itemId}`);
  }
}
