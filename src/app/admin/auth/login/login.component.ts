import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../services/user/user.service';

class User {
  email: String;
  password: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  token: string;
  user: User;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getToken();
    this.user = new User;
  }

  auth(item) {
    console.log('component ', this.user);
    this.userService.getAuth(this.user).subscribe(res => {
      this.user = res[0];
      this.getToken();
      localStorage.setItem('cms_token', this.token.toString());
      this.goToAdmin();
    });
  }

  getToken() {
    this.token = this.cookieService.get('cms_token');
  }

  goToAdmin() {
    this.router.navigate(['/admin'], { relativeTo: this.route });
  }
}
