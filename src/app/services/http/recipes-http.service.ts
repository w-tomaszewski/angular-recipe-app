import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RecipeCategory } from '../../types/recipe-category.interface';
import { RecipeShort } from 'src/app/types/recipe-short.interface';
import { RecipeFull } from 'src/app/types/recipe-full.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesHttpService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<RecipeCategory[]> {
    console.log('get');
    return this.http.get('https://www.themealdb.com/api/json/v1/1/categories.php').pipe(map((response: any) => {
        return response.categories.map((category: any) => {
          return {
            id: Number(category.idCategory),
            name: category.strCategory,
            image: category.strCategoryThumb,
            description: category.strCategoryDescription,
          } as RecipeCategory;
        });
    }));
  }

  getAreas(): Observable<string[]> {
    return this.http.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .pipe(map((response: any) => response.meals.map((meal: any) => meal.strArea)));
  }

  getCategoryRecipes(categoryName: string): Observable<RecipeShort[]> {
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`).pipe(map((response: any) => {
        return response.meals.map((meal: any) => {
          return {
            id: Number(meal.idMeal),
            name: meal.strMeal,
            image: meal.strMealThumb,
          } as RecipeShort;
        });
    }));
  }

  getRecipe(recipeId: number): Observable<RecipeFull> {
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`).pipe(map((response: any) => {
        return response.meals.map((meal: any) => {
          return {
            id: Number(meal.idMeal),
            name: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea,
            instructions: meal.strInstructions,
          } as RecipeFull;
        })[0];
    }));
  }
}
