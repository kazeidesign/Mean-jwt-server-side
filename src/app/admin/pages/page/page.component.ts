import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services/page/page.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../Page.class';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [PageService]
})
export class PageComponent implements OnInit {

  page: Page = new Page;
  slug: any;
  subscriberParam: any;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscriberParam = this.activatedRoute.params.subscribe( params => {
      const displayParam = params['slug'];
      this.getOnePage(displayParam);
      });

  }

  getOnePage(slug) {
    this.pageService.getOnePages(slug).subscribe(data => this.page = data[0]);
  }
}
