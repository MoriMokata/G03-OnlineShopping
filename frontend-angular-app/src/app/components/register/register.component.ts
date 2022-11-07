import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    registerName : new FormControl(),
    registerEmail : new FormControl(),
    registerPassword : new FormControl(),
    registerRepeatPassword : new FormControl(),
    registerCheck : new FormControl()
  });
  
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    let payload = {
      username: this.registerForm.value.registerName,
      email: this.registerForm.value.registerEmail,
      password: this.registerForm.value.registerPassword,
      role: "Member"
    }

    this.userService.userSignup(payload).subscribe({
      next: res => {
        if (res._id) {
          alert('Sign up successfully');
        } else {
          alert('Sign up failed');
        }
      },
      error: err => {
        console.log(err.error);
        alert('Sign up failed');
      }
    });
  }

}
