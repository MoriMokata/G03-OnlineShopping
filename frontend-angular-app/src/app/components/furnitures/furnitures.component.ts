import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-furnitures',
  templateUrl: './furnitures.component.html',
  styleUrls: ['./furnitures.component.css']
})
export class FurnituresComponent implements OnInit {

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
