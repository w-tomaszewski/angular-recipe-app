import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/navbar/navbar.component';
import { AppCategoriesComponent } from './components/categories/categories.component';
import { AppRecipeComponent } from './components/recipe/recipe.component';
import { AppFavoritesComponent } from './components/favorites/favorites.component';
import { AppCategoryRecipesComponent } from './components/category-recipes/category-recipes.component';
import { AppNewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeCategoriesEffect } from './store/effects';
import { FilterRecordsPipe } from './pipes/filter-records.pipe';
import { LoadMoreButtonComponent } from './shared/load-more-button/load-more-button.component';
import { RecipeListComponent } from './shared/recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppCategoriesComponent,
    AppRecipeComponent,
    AppFavoritesComponent,
    AppCategoryRecipesComponent,
    AppNewRecipeComponent,
    FilterRecordsPipe,
    LoadMoreButtonComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true, 
    }),
    StoreModule.forFeature('categoryState', reducers),
    EffectsModule.forFeature([RecipeCategoriesEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
