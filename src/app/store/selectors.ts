import { createSelector } from "@ngrx/store";
import { AppState } from "../types/app-state.interface";
import { initialState } from "./reducers";

export const selectRecipeCategory = (state: AppState) => state.categoryState ?? initialState;
export const recipeCategoriesSelector = createSelector(selectRecipeCategory, (state) => state.recipeCategories);
export const isLoadingRecipeCategorySelector = createSelector(selectRecipeCategory, (state) => state.isLoading);
export const recipeCategoriesErrorSelector = createSelector(selectRecipeCategory, (state) => state.error);