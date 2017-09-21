import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PageService {

  pageRoute: any = '/api/pages';

  constructor(private http: Http) { }

  getAllPages() {
    return this.http.get(this.pageRoute)
      .map((res: Response) => res.json().data);
  }

  getOnePages(slug) {
    return this.http.get(this.pageRoute + "/" + slug )
      .map((res: Response) => res.json().data);
  }
}
