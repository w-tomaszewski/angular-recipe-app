import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './app-favorites.component.html',
  styleUrls: ['./app-favorites.component.scss']
})
export class AppFavoritesComponent {

  constructor(public recipeDataStorage: RecipesDataStorageService) {}
}
