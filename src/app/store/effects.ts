import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipeCategoryActions from '../store/actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RecipesHttpService } from '../services/http/recipes-http.service';
import { RecipesDataStorageService } from '../services/recipes-data-storage.service';

@Injectable()
export class RecipeCategoriesEffect {

  recipesDataStorage = inject(RecipesDataStorageService);

  getRecipeCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeCategoryActions.getRecipeCategories),
      mergeMap(() =>
        this.recipesHttpService.getCategories().pipe(
          map((recipeCategories) => {
           this.recipesDataStorage.recipeCategories = recipeCategories;
           return RecipeCategoryActions.getRecipeCategoriesSuccess({
              recipeCategories: recipeCategories,
            });
            }),
          catchError((error) =>
            of(
              RecipeCategoryActions.getRecipeCategoriesFailure({ error: error })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipesHttpService: RecipesHttpService
  ) {}
}
