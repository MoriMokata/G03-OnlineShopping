import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wears',
  templateUrl: './wears.component.html',
  styleUrls: ['./wears.component.css']
})
export class WearsComponent implements OnInit {

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
