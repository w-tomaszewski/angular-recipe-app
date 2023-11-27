import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';
import { RecipeShort } from 'src/app/types/recipe-short.interface';

@Component({
  selector: 'app-category-recipes',
  templateUrl: './category-recipes.component.html',
  styleUrls: ['./category-recipes.component.scss']
})
export class AppCategoryRecipesComponent implements OnInit {

  categoryName: string | null = null;
  categoryRecipes$: Observable<RecipeShort[]> = of([]);

  constructor(private route: ActivatedRoute, public recipeDataStorage: RecipesDataStorageService) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
    if (!this.categoryName) {
      return;
    }
    this.categoryRecipes$ = this.recipeDataStorage.getCategoryRecipes(this.categoryName);
  }
}
