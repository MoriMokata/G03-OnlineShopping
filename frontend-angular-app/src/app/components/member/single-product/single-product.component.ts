import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

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
    this.orderQuantity++;
  }

  decreaseQuantity() {
    if (this.orderQuantity <= 1) {
      return;
    }
    this.orderQuantity--;
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
        }
      },
      error: err => {
        console.log(err);
        alert('falied to adding to cart');
      }
    })
    
  }

}
