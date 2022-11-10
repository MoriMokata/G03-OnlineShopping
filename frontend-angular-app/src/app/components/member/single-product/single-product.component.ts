import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  clr='#6f42c1';
  onClickPlus = true;
  onClickMinus = true;
  cl!: boolean;
  
  productId!: string | null;
  product = {
    _id: '',
    name: '',
    detail: '',
    type: '',
    price: 0,
    quantity: 0,
    img: '',
  };

  orderQuantity: number = 1;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getSingleProduct(this.productId);
    }
  }

  getSingleProduct(id: string) {
    this.productService.getProductsById(id).subscribe({
      next: data => {
        this.product = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  increaseQuantity() {
    if (this.orderQuantity >= this.product.quantity) {
      return;
    }
    this.orderQuantity++;
  }

  decreaseQuantity() {
    if (this.orderQuantity <= 1) {
      return;
    }
    this.orderQuantity--;
  }
  
  check1(){
    if(this.orderQuantity==this.product.quantity){
      this.onClickPlus=false;
    }else{
      this.onClickPlus=true;
    }
  }
  check2(){
    if(this.orderQuantity==1){
      this.onClickMinus=false;
    }else{
      this.onClickMinus=true;
    }
  }

  addToCart() {
    let payload = {
      userId: localStorage.getItem('id'),
      productId: this.productId,
      quantity: this.orderQuantity,
    }

    // console.log(payload);
    this.cartService.addToCart(payload).subscribe({
      next: data => {
        if (data._id) {
          alert('added to cart');
          window.location.reload();
        }
      },
      error: err => {
        console.log(err);
        alert('falied to adding to cart');
      }
    })
    
  }

}
