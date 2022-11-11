import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  userAddress: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserAddresses(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: `${this.authService.getToken()}`
      })
    };
    const apiUrl = `http://localhost:3000/user-addresses/user/${userId}`;
    return this.http.get<any>(apiUrl, httpOptions).pipe(
      map(data => {
        if(data) {
          this.userAddress = data;
        }
        return this.userAddress;
      })
    );
  }


  addAddress(addressData:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.post<any>('http://localhost:3000/user-addresses/add', addressData, httpOptions);
  }

  deleteAddress(addressId: string){
    const httpOption = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        Authorization: `${this.authService.getToken()}`
      })
    };
    return this.http.delete<any>(`http://localhost:3000/user-addresses/${addressId}`, httpOption);
  }

}
