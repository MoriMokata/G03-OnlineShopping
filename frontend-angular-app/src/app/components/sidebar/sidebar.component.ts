import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  show = new FormControl();
  constructor() { }

  ngOnInit(): void {
    console.log(this.show);
  }
  
  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
  onclick(number:any){
    return this.show=number;
  }
}
