import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCategoriesComponent } from './components/categories/categories.component';
import { AppFavoritesComponent } from './components/favorites/favorites.component';
import { AppCategoryRecipesComponent } from './components/category-recipes/category-recipes.component';
import { AppRecipeComponent } from './components/recipe/recipe.component';
import { AppNewRecipeComponent } from './components/new-recipe/new-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: AppCategoriesComponent,
    data: {
      name: "Categories"
    },
  },
  {
    path: 'categories',
    component: AppCategoriesComponent,
    data: {
      name: "Categories"
    },
  },
  {
    path: 'category',
    component: AppCategoryRecipesComponent,
    data: {
      name: "Category Recipes"
    },
  },
  {
    path: 'recipe',
    component: AppRecipeComponent,
    data: {
      name: "Recipe"
    },
  },
  {
    path: 'favorites',
    component: AppFavoritesComponent,
    data: {
      name: "Favorites"
    }
  },
  {
    path: 'new-recipe',
    pathMatch: "full",
    component: AppNewRecipeComponent,
    data: {
      name: "Create recipe"
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
