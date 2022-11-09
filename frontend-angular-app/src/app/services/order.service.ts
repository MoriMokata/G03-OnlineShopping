import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
}
