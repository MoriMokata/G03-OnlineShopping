import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any

  constructor(private http: HttpClient, private authService: AuthService) { }

  addProduct(productData:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.post<any>('http://localhost:3000/products/add', productData, httpOptions);
  }

  getProducts(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>('http://localhost:3000/products/get', httpOptions)
      .pipe(map(data => {
        if(data){
          this.products = data;
        }
        return this.products;
      }));
  }

  getProductsById(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>(`http://localhost:3000/products/${id}`, httpOptions)
      .pipe(map(data => {
        if(data){
          this.products = data;
        }
        return this.products;
      }));
  }

  getProductsByType(type: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.get<any>(`http://localhost:3000/products/get/${type}`, httpOptions)
      .pipe(map(data => {
        if(data){
          this.products = data;
        }
        return this.products;
      }));
  }
  
  deleteProduct(productId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.delete<any>(`http://localhost:3000/products/${productId}`, httpOptions);
  }

}
