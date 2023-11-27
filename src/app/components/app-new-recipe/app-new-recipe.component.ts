import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesDataStorageService } from 'src/app/services/recipes-data-storage.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './app-new-recipe.component.html',
  styleUrls: ['./app-new-recipe.component.scss']
})
export class AppNewRecipeComponent {

  constructor(private formBuilder: FormBuilder, public recipeDataSource: RecipesDataStorageService, private router: Router) {}

  recipeForm = this.formBuilder.group({
    name: new FormControl(),
    category: new FormControl(),
    area: new FormControl(),
    instructions: new FormControl(),
  });

  handleSubmit() {
    this.recipeDataSource.createNewRecipe({
      name: this.recipeForm.get('name')?.value,
      category: this.recipeForm.get('category')?.value,
      area: this.recipeForm.get('area')?.value,
      instructions: this.recipeForm.get('instructions')?.value,
    });
    this.router.navigate(['/']);
  }
}
