import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent implements OnInit {

  pageTitle: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public recipeDataSourceService: RecipesDataStorageService) {
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.pageTitle = data['name'];
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.recipeDataSourceService.previousUrls.find(url => event.url === url) && !['/', '/categories', '/favorites'].includes(event.url)) {
          this.recipeDataSourceService.previousUrls.push(event.url);
        }
      }
    });
  }

  goBack(): void {
    const length = this.recipeDataSourceService.previousUrls.length;
    const urlToNavigate = length > 1 ? this.recipeDataSourceService.previousUrls[length - 2] : '/';
    this.recipeDataSourceService.previousUrls = [];
    this.router.navigateByUrl(urlToNavigate, { skipLocationChange: true });
  }

}
