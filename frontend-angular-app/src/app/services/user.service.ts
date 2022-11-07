import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  userSignup(payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const apiUrl = `http://localhost:3000/users/create`;
    return this.http.post<any>(apiUrl, payload, httpOptions);
  }

  getUserData(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: `${this.authService.getToken()}`
      })
    };
    const apiUrl = `http://localhost:3000/users/${id}`;
    return this.http.get<any>(apiUrl, httpOptions).pipe(
      map(data => {
        if(data) {
          this.user = data;
        }
        return this.user;
      })
    );
  }

  updateUser(id: string, payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: `${this.authService.getToken()}`
      })
    };
    const apiUrl = `http://localhost:3000/users/${id}`;
    return this.http.put<any>(apiUrl, payload, httpOptions);
  }
}
