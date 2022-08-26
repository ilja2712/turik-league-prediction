import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users-request',
  templateUrl: './users-request.component.html',
  styleUrls: ['./users-request.component.css']
})
export class UsersRequestComponent implements OnInit {

  users?: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data.filter(user => user.confirm_reg == false);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  confirmEmail(username: string): void {
    console.log("Подтверждено: " + username);
  }

  cancelEmail(username: string): void {
    console.log("Отказано: " + username);
  }

}
