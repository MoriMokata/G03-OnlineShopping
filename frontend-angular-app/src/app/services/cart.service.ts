import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cart } from '../product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  // cartProduct: productsModel = [];
  cart: Cart[] = [];
  totalPrice: number = 0;
  totalItem: number = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addToCart(payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.post<any>('http://localhost:3000/carts/add', payload, httpOptions);
  }

  updateCartItem(id: string, payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.put<any>(`http://localhost:3000/carts/update/${id}`, payload, httpOptions);
  }

  deleteCartItem(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.delete<any>(`http://localhost:3000/carts/${id}`, httpOptions);
  }

  getCart(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>(`http://localhost:3000/carts/user/${userId}`, httpOptions).pipe(
      map((data: any[]) => {
        this.cart = data;
        this.totalItem = data.length;
        this.totalPrice = 0;
        data.map(item => {
          this.totalPrice += (item.quantity * item.product.price);
        });
        return this.cart;
      })
    );
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getTotalCartItem() {
    return this.totalItem;
  }

}
