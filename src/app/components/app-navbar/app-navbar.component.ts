import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  pageTitle: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.pageTitle = data['name'];
    });
  }

}
