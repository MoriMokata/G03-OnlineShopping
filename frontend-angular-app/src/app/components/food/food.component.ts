import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  products = [
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
    {
      photo: "assets/img/black-logo.png",
      href: "single-product",
      name: "Example",
      description: "description description description description description",
      price: 250,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
