import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeFull } from 'src/app/types/recipe-full.interface';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class AppRecipeComponent implements OnInit {

  recipe: RecipeFull | null = null;

  constructor(
    private route: ActivatedRoute,
    public recipesDataSource: RecipesDataStorageService
  ) {}

  ngOnInit(): void {
    const recipeId: string | null =
      this.route.snapshot.paramMap.get('recipeId');
    if (!recipeId) {
      return;
    }
    this.recipesDataSource
      .getRecipe(Number(recipeId))
      .subscribe({
        next: (recipeResponse: RecipeFull) => {
          this.recipe = recipeResponse;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  handleFavoriteToggleClick(): void {
    if (!this.recipe) {
      return;
    }
    const isFavorite: boolean = this.recipesDataSource.toogleFavoriteId(
      this.recipe
    );
    this.recipe = { ...this.recipe, isFavorite: isFavorite };
  }
}
