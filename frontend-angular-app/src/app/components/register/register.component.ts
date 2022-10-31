import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    registerName : new FormControl(),
    registerUsername : new FormControl(),
    registerEmail : new FormControl(),
    registerPassword : new FormControl(),
    registerRepeatPassword : new FormControl(),
    registerCheck : new FormControl()
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
