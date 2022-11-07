import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token!: string | null;
  role!: string | null;
  totalCartItem: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.role = this.authService.getRole();
    
    let userId = localStorage.getItem('id');
    if (userId) {
      this.getCart(userId);
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

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
