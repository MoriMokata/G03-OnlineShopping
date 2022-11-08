import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../../services/product.service'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productType: string[] = ['Electronics', 'Wears', 'Furniture', 'Food'];

  files: any[] = [];

  productForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100000)]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
  }
  get detail() { return this.productForm.get('detail'); }
  get price() { return this.productForm.get('price'); }

  addProduct() {
    if (!this.productForm.valid) {
      alert('Please check product form again!');
      return;
    }

    this.ps.addProduct(this.productForm.value).subscribe({
      next: data => {
        if (data._id) {
          alert('Product added successfully');
          this.productForm.reset();
        } else {
          alert('Product added failed');
        }
      },
      error: err => {
        console.log(err);
        alert('Product added failed');
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

  resetForm() {
    this.productForm.reset();
    this.previewLoaded = false;
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

}
