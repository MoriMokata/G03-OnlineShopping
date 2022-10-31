import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit,DoCheck {

  paymentForm = new FormGroup({
    nameCard : new FormControl("",[Validators.required]),
    cardNumber : new FormControl("",[Validators.required,Validators.maxLength(16),Validators.minLength(16)]),
    expiry : new FormControl(""),
    cvv : new FormControl(""),
    billingAddress : new FormGroup({
      streetAddress : new FormControl(""),
      city : new FormControl(""),
      state : new FormControl(""),
      zipCode : new FormControl("")
    })

  })
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
      console.log(this.paymentForm.value.cvv)
      
      
  }

  getFormat() {
    return (this.paymentForm.value.cardNumber)?.toString().replace(/\d{4}(?=.)/g, '$& ');
  }

}

