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
  total: number = 0;

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
        data.map(item => {
          this.total += (item.quantity * item.product.price);
        });
        return this.cart;
      })
    );
  }

  getTotalPrice() {
    return this.total;
  }

}
