import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/api/user.service';
import { User } from '../models/data';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss'],
})
export class ShowUsersComponent  implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Implement the function to generate QR code for a user
  generateQRCode(user: User) {
    // Implement the logic to generate QR code for the user
  }

}