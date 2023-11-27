import { createAction, props } from "@ngrx/store";
import { RecipeCategory } from "../types/recipe-category.interface";

export const getRecipeCategories = createAction('[GET] Get recipe categories');
export const getRecipeCategoriesSuccess = createAction('[GET] Get recipe categories success', props<{recipeCategories: RecipeCategory[]}>())
export const getRecipeCategoriesFailure = createAction('[GET] Get recipe categories failure', props<{error: string}>());