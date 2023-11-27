import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';
import { AppState } from 'src/app/types/app-state.interface';
import * as RecipeCategoryActions from '../../store/actions';
import { RecipeCategory } from 'src/app/types/recipe-category.interface';
import { isLoadingRecipeCategorySelector, recipeCategoriesErrorSelector, recipeCategoriesSelector } from 'src/app/store/selectors';
import { FilterRecordsPipe } from 'src/app/pipes/filter-records.pipe';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FilterRecordsPipe
  ]
})
export class AppCategoriesComponent implements OnInit {

  recipeCategories$: Observable<RecipeCategory[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  recordsLimit: number = 8;

  constructor(public recipeDataStorage: RecipesDataStorageService, private store: Store<AppState>) {
    this.recipeCategories$ = this.store.pipe(select(recipeCategoriesSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingRecipeCategorySelector));
    this.error$ = this.store.pipe(select(recipeCategoriesErrorSelector));
  }

  ngOnInit(): void {
    this.recipeDataStorage.getAreas();
    this.store.dispatch(RecipeCategoryActions.getRecipeCategories());
  }

  handleAddMore() {
    this.recordsLimit += 8;
  }
}
