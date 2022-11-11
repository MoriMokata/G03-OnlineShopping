import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  
  users: any = [];

  constructor(private userService: UserService) {
    this.onLoading();
    console.log(this.users);
   }

  ngOnInit(): void {
  }

  onLoading() {
    this.userService.getListUser().subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
    deleteUser(userId: string) {
      if (confirm('are you sure ?') == false) {
        return;
      }

      if (userId === localStorage.getItem('id')) {
        alert('cannot delete yourself');
        return;
      }
  
      this.userService.deleteUser(userId).subscribe({
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

    
  }



