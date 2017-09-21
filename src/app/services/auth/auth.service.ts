import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class AuthService {

  constructor(private cookieService: CookieService) { }

  getAuth() {
    const token = this.cookieService.get('cms_token');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);
    return new RequestOptions({ headers: myHeaders });
  }

}
