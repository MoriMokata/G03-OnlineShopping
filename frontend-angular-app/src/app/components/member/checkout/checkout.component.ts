import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any[] = [];
  user: any | undefined;

  constructor(
    private cartService: CartService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('id');
    if (userId) {
      this.getUser(userId);
      this.getCart(userId);
    }
  }

  getUser(userId: string) {
    this.userService.getUserData(userId).subscribe({
      next: data => {
        // console.log(data);
        
        if (data._id) {
          this.user = data;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getCart(userId: string) {
    this.cartService.getCart(userId).subscribe({
      next: data => {
        // console.log(data);

        if (data) {
          this.cart = data;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
