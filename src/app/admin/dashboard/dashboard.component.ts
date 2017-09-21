import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  users: any;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.allUsers();
  }

  allUsers() {
    this.userService.getAllUsers().subscribe( res => this.users = res );
  }

}
