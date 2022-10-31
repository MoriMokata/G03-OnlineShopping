import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {

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
