import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  products: any = [];
  productForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(1000000)]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });
  productType: string[] = ['Electronics', 'Wears', 'Furniture', 'Food'];

  files: any[] = [];

  previewLoaded: boolean = false;

  constructor(private ps: ProductService) {
    this.onLoading();
  }

  ngOnInit(): void {
  }

  get detail() { return this.productForm.get('detail'); }
  get price() { return this.productForm.get('price'); }
  get name() { return this.productForm.get('name'); }
  get type() { return this.productForm.get('type'); }
  get quantity() { return this.productForm.get('quantity'); }
  get file() { return this.productForm.get('file'); }
  get img() { return this.productForm.get('img'); }

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

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.productForm.patchValue({
          img: reader.result?.toString()
        })
      }
    }
  }

  onFileSelected(event:any) {
    // Iterate over selected files
    for (let file of event.target.files) {
      // Delete prev lis
      this.files.splice(0,1)
      // Append to a list
      this.files.push({
        name: file.name
        // Other specs
      });
    }
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

  selectProduct(index: number) {
    let selectedProduct = this.products[index];
    this.productForm.patchValue({
      id: selectedProduct._id,
      type: selectedProduct.type,
      name: selectedProduct.name,
      detail: selectedProduct.detail,
      quantity: selectedProduct.quantity,
      price: selectedProduct.price,
      file: '',
      img: selectedProduct.img, 
    });
  }

  updateProduct() {
    let payload = { ...this.productForm.value };
    delete payload.file;

    // console.log(payload);
    this.ps.updateProduct(payload).subscribe({
      next: data => {
        if (data._id) {
          alert('update completed');
          this.onLoading();
        }
      },
      error: err => {
        alert('update failed');
        console.log(err);
      }
    });

  }

  resetForm() {
    this.productForm.reset();
    // this.previewLoaded = false;
    // this.files.splice(0,1);
  }

}
