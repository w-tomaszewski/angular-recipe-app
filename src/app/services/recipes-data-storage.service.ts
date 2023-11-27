import { Injectable } from '@angular/core';
import { RecipesHttpService } from './http/recipes-http.service';
import { RecipeCategory } from '../types/recipe-category.interface';
import { Observable, map, of, tap, throwError } from 'rxjs';
import { RecipeShort } from '../types/recipe-short.interface';
import { RecipeFull } from '../types/recipe-full.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesDataStorageService {

  favoriteRecipesIdsSet: Set<number> = new Set();
  favoriteRecipes: Map<number, RecipeFull> = new Map();
  recipeCategories: RecipeCategory[] = [];
  customRecipes: RecipeFull[] = [];
  recipeAreas: string[] = [];
  previousUrls: string[] = [];

  constructor(private recipesHttpService: RecipesHttpService) { }

  getCategories(): Observable<RecipeCategory[]> {
    return this.recipesHttpService.getCategories().pipe(tap((categories: RecipeCategory[]) => {
      this.recipeCategories = categories;
    }));
  }

  getAreas(): void {
    this.recipesHttpService.getAreas().subscribe(areas => {
      this.recipeAreas = areas;
    });
  }

  getCategoryRecipes(categoryName: string): Observable<RecipeShort[]> {
    return this.recipesHttpService.getCategoryRecipes(categoryName).pipe(map(categoryRecipes => {
      const customRecipes = this.customRecipes.filter(recipe => recipe.category === categoryName);
      if (customRecipes.length > 0) {
        return [...categoryRecipes, ...customRecipes];
      }
      else {
        return categoryRecipes;
      }
    }));
  }

  getRecipe(recipeId: number): Observable<RecipeFull> {
    if (recipeId < 0) {
      const customRecipe = this.customRecipes.find(recipe => recipe.id === recipeId);
      if (!customRecipe) {
        return throwError(() => new Error("Cannot get recipe"));
      }

      return of({...customRecipe, isFavorite: this.favoriteRecipesIdsSet.has(customRecipe.id)});
    }
    return this.recipesHttpService.getRecipe(recipeId).pipe(map((recipe: RecipeFull) => {
      return {...recipe, isFavorite: this.favoriteRecipesIdsSet.has(recipe.id)};
    }));
  }

  toogleFavoriteId(recipe: RecipeFull): boolean {
    if (this.favoriteRecipesIdsSet.has(recipe.id)) {
      this.favoriteRecipesIdsSet.delete(recipe.id);
      this.favoriteRecipes.delete(recipe.id);
      return false;
    }
    else {
      this.favoriteRecipesIdsSet.add(recipe.id);
      this.favoriteRecipes.set(recipe.id, recipe);
      return true;
    }
  }

  createNewRecipe(recipe: Omit<RecipeFull, 'id' | 'image'>) {
    let minId: number = this.customRecipes.reduce((min, recipe) => {
      return (!min || recipe.id < min) ? recipe.id : min;
    }, -1);
    this.customRecipes.push({...recipe, id: --minId, image: 'https://www.themealdb.com/images/ingredients/Lime.png'});
  }
}
