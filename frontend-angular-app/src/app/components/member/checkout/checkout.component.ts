import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

interface Checkout {
  userAddress: any,
  carts: any[],
  comment: string,
  shipping: {
    name: string,
    price: number,
  },
  payment: {
    cardType: string,
    cardName: string,
    cardNumber: string,
    expirationData: string,
    cvv: string,
  },
  totalPrice: number,
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: any | undefined;
  
  selectedUserAddress: any | undefined;
  cart: any[] = [];
  comment: string = '';
  shipping: any;
  payment: any;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
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
        this.totalPrice = 0;
        if (data) {
          this.cart = data;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getCartTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  receiveUserAddress($event: any) {
    this.selectedUserAddress = $event;
  }

  receiveShippingOption($event: any) {
    this.shipping = $event;
  }

  receiveComment($event: string) {
    this.comment = $event;
  }

  receivePaymentInfo($event: any) {
    this.payment = $event;
  }

  submit() {
    let newCarts: any[] = [];
    this.cart.map((item: any) => {
      newCarts.push({ ...item, isOrdered: true });
    });

    let payload: Checkout = {
      userAddress: this.selectedUserAddress,
      carts: newCarts,
      comment: this.comment,
      shipping: this.shipping,
      payment: {
        cardType: this.payment.type,
        cardName: this.payment.cname,
        cardNumber: this.payment.cnum,
        expirationData: this.payment.exp,
        cvv: this.payment.cvv,
      },
      totalPrice: this.getCartTotalPrice() + this.shipping.price,
    }

    console.log(payload);

    this.orderService.createOrder(payload).subscribe({
      next: data => {
        if (data._id) {
          alert('order created');
          setTimeout(() => {
            this.router.navigate(['success', data._id]).then(() => {
              window.location.reload();
            });
          }, 500);
        }
      },
      error: err => {
        alert('order failed');
        console.log(err);
      }
    })
  }

  

}
