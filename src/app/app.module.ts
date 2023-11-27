import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { AppCategoriesComponent } from './components/app-categories/app-categories.component';
import { AppRecipeComponent } from './components/app-recipe/app-recipe.component';
import { AppFavoritesComponent } from './components/app-favorites/app-favorites.component';
import { AppCategoryRecipesComponent } from './components/app-category-recipes/app-category-recipes.component';
import { AppNewRecipeComponent } from './components/app-new-recipe/app-new-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeCategoriesEffect } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppCategoriesComponent,
    AppRecipeComponent,
    AppFavoritesComponent,
    AppCategoryRecipesComponent,
    AppNewRecipeComponent
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
