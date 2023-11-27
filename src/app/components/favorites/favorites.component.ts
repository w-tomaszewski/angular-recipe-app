import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';
import { RecipeFull } from 'src/app/types/recipe-full.interface';
import { RecipeShort } from 'src/app/types/recipe-short.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class AppFavoritesComponent implements OnInit {

  recipes: RecipeShort[] = [];

  constructor(public recipeDataStorage: RecipesDataStorageService) {}

  ngOnInit(): void {
    this.recipes = Array.from(this.recipeDataStorage.favoriteRecipes.values()).map((recipe: RecipeFull) => recipe as RecipeShort);
  }
}
