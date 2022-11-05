import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  products: any;

  constructor(private ps: ProductService) {
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading() {
    this.ps.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteProduct(productId: string) {
    if (confirm('are you sure ?') == false) {
      return;
    }

    this.ps.deleteProduct(productId).subscribe({
      next: data => {
        if (data.deletedCount > 0) {
          alert('product deleted');
          this.onLoading();
        } else {
          alert('failed to delete');
        }
      },
      error: err => {
        alert('failed to delete');
        console.log(err);
      }
    });
  }

}
