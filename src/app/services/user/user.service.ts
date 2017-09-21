import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  options: any;

  constructor(private http: Http, private auth: AuthService) { }

  getAuth(item) {
    return this.http.get('/api/users/' + item.email + '/' + item.password)
      .map((res: Response) => res.json());
  }

  getAllUsers() {
    return this.http.get('/back/users', this.auth.getAuth())
      .map((res: Response) => res.json().data);
  }
}
