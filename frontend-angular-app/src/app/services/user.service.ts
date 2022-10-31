import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  userSignup(payload: any) {
    const apiUrl = `http://localhost:3000/users/create`;
    return this.http.post<any>(apiUrl, payload, this.httpOptions);
  }
}
