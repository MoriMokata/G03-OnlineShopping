import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

  createOrder(orderData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.post<any>('http://localhost:3000/orders/create', orderData, httpOptions);
  }

  getOrderDetail(orderId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>(`http://localhost:3000/orders/success/${orderId}`, httpOptions).pipe(
      map((data: any) => {
        if (data._id) {
          this.order = data;
          return this.order;
        }
      })
    );
  }

  getOrderByMember(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>(`http://localhost:3000/orders/user/${userId}`, httpOptions).pipe(
      map((data: any) => {
        if (data) {
          this.order = data;
          return this.order;
        }
      })
    );
  }

  getOrderAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>(`http://localhost:3000/orders/all`, httpOptions).pipe(
      map((data: any) => {
        this.order = data;
        return this.order;
      })
    );
  }
}
