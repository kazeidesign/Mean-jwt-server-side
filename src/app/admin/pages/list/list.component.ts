import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services/page/page.service';
import { Page } from '../Page.class';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [PageService]
})
export class ListComponent implements OnInit {

  page: Page;
  pages: any[];

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getAllPages();
  }

  getAllPages() {
    this.pageService.getAllPages().subscribe(res => this.pages = res);
  }

}

