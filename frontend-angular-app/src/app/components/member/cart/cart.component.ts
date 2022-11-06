import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart(localStorage.getItem("id") as string).subscribe({
      next: data => {
        console.log(data);
        
        this.cart = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getTotal() {
    return this.cartService.getTotalPrice();
  }

}
