import { RecipeCategory } from "./recipe-category.interface";

export interface CategoryState {
    isLoading: boolean;
    recipeCategories: RecipeCategory[];
    error: string | null;
}