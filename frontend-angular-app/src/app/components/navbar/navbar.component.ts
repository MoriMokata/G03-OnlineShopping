import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token!: string | null;
  role!: string | null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.role = this.authService.getRole();
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
