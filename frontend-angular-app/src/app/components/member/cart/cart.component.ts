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

  updateCartItem(cartItem: any) {
    let payload = {
      quantity: cartItem.quantity,
    }
    console.log(payload);
    
    this.cartService.updateCartItem(cartItem._id, payload).subscribe({
      next: _ => {
        alert('update successfully');
        this.getCart();
      },
      error: _ => {
        alert('update failed');
      }
    })
  }

  getTotal() {
    return this.cartService.getTotalPrice();
  }

  increaseQuantity(index: number) {
    if (this.cart[index].quantity >= this.cart[index].product.quantity) {
      return;
    }
    this.cart[index].quantity++;
    this.updateCartItem(this.cart[index]);
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity <= 1) {
      return;
    }
    this.cart[index].quantity--;
    this.updateCartItem(this.cart[index]);
  }

  deleteCartItem(index: number) {
    if (confirm('Art you sure ?') === false) {
      return;
    }

    this.cartService.deleteCartItem(this.cart[index]._id).subscribe({
      next: _ => {
        alert('delete successfully');
        window.location.reload();
      }, 
      error: err => {
        console.log(err);
        alert('delete failed');
      }
    })
  }

}
