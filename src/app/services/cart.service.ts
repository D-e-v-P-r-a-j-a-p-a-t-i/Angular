import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../env/env';
import { jwtDecode } from 'jwt-decode';
import { CartItem } from '../interface/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/carts`;

  constructor(private http: HttpClient) { }

  private getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  private getCartFromLocalStorage(): { productId: string, quantity: number }[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToLocalStorage(cart: { productId: string, quantity: number }[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Observable<any> {
    const userId = this.getUserId();
    if (userId) {
      return this.http.get(`${this.apiUrl}/${userId}`).pipe(
        catchError(error => {
          console.error('Error fetching cart:', error);
          return throwError(error);
        })
      );
    } else {
      const cart = this.getCartFromLocalStorage();
      return of({ products: cart });
    }
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const userId = this.getUserId();
    if (userId) {
      console.log({userId, productId, quantity})
      return this.http.post(`${this.apiUrl}`, { userId, productId, quantity }).pipe(
        catchError(error => {
          console.error('Error adding to cart:', error);
          return throwError(error);
        })
      );
    } else {
      let cart = this.getCartFromLocalStorage();
      const existingItem = cart.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }

      this.saveCartToLocalStorage(cart);
      return of(cart);
    }
  }

  deleteCartItem(cartId: string, itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}/item/${itemId}`).pipe(
      tap(() => this.removeCartItemFromLocalStorage(itemId)),
      catchError(error => {
        console.error('Error deleting cart item:', error);
        return throwError(error);
      })
    );
  }

  synchronizeCartWithServer(): Observable<any> {
    const userId = this.getUserId();
    if (userId) {
      const cart = this.getCartFromLocalStorage();
      return this.http.post(`${this.apiUrl}/synchronize`, { userId, cart }).pipe(
        tap(() => this.clearLocalStorageCart()),
        catchError(error => {
          console.error('Error synchronizing cart:', error);
          return throwError(error);
        })
      );
    } else {
      return of(null);
    }
  }

  clearLocalStorageCart(): void {
    localStorage.removeItem('cart');
  }

  private removeCartItemFromLocalStorage(itemId: string): void {
    let cart = this.getCartFromLocalStorage();
    cart = cart.filter(item => item.productId !== itemId);
    this.saveCartToLocalStorage(cart);
  }

  clearCart(): Observable<any> {
    const userId = this.getUserId();
    if (userId) {
      return this.http.delete(`${this.apiUrl}/${userId}`).pipe(
        catchError(error => {
          console.error('Error clearing cart:', error);
          return throwError(error);
        })
      );
    } else {
      this.clearLocalStorageCart();
      return of(null);
    }
  }

  placeOrder(orderData: any): Observable<any> {
    console.log(orderData)
    const userId = this.getUserId();
    if (!userId) {
      return throwError('User not authenticated.');
    }
    console.log(userId)
    return this.getCart().pipe(
      switchMap(cartResponse => {
        if (!cartResponse || !cartResponse.products) {
          return throwError('Invalid cart response');
        }

        const cartItems = cartResponse.products;
        console.log(cartItems)
        const totalAmount = this.getTotal(cartItems);
        const transformedOrderData = {
          user: userId,
          name: orderData.name,
          address: orderData.address,
          paymentDetails: orderData.payment,
          products: cartItems.map((item: { productId: any, quantity: number }) => ({
            product: item.productId._id,
            quantity: item.quantity
          })),
          totalAmount: totalAmount
        };
        console.log(transformedOrderData)
        return this.http.post(`${environment.apiUrl}/api/orders`, transformedOrderData).pipe(
          catchError(error => {
            console.error('Error placing order:', error);
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        console.error('Error in placeOrder:', error);
        return throwError(error);
      })
    );
  }

  getTotal(cartItems: CartItem[]): number {
    return cartItems.reduce(
      (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
      0
    );
  }
}
