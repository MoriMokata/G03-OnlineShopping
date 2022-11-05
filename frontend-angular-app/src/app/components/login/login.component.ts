import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl(),
    password : new FormControl()
  })
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: res => {
        if (res.loginStatus) {
          localStorage.setItem('id', res.result.id);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.result.role);
          if (res.result.role === 'Member') {
            window.location.href = '/first';
          } else if (res.result.role === 'Admin') {
            window.location.href = '/admin/add-product';
          }
        } else {
          alert('email or password incorrect!');
        }
      },
      error: err => {
        console.log(err);
        alert('sign in failed!');
      }
    })
  }
}
