import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeShort } from 'src/app/types/recipe-short.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  @Input() recipes: RecipeShort[] = [];
  @Input() set recipeLimit(value: string) {
    this.limit = +value;
    this.currentLimit = +value;
  }

  // @Output() onRecipeClick = new EventEmitter<number>();

  private limit: number = 8;
  currentLimit = 8;

  // handleRecipeClick(recipeId: number) {
  //   this.onRecipeClick.emit(recipeId);
  // }

  handleAddMore() {
    this.currentLimit += this.limit;
  }
}
