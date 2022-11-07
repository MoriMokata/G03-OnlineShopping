import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token!: string | null;
  role!: string | null;
  totalCartItem: number = 0;
  user: any | undefined;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.role = this.authService.getRole();
    
    let userId = localStorage.getItem('id');
    if (userId) {
      this.getCart(userId);
      this.getUser(userId);
    }
  }

  getCart(id: string) {
    this.cartService.getCart(id).subscribe({
      next: data => {
        this.totalCartItem = data.length;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getUser(id: string) {
    this.userService.getUserData(id).subscribe({
      next: data => {
        console.log(data);
        this.user = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
