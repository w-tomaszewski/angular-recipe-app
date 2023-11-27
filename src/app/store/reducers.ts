import { createReducer, on } from "@ngrx/store";
import { CategoryState } from "../types/recipes-state.interface";
import * as RecipeCategoryActions from '../store/actions';

export const initialState: CategoryState = {
    isLoading: false,
    recipeCategories: [],
    error: null,
}

export const reducers = createReducer(initialState, 
    on(RecipeCategoryActions.getRecipeCategories, (state) => ({
        ...state,
        isLoading: true
    })),
    on(RecipeCategoryActions.getRecipeCategoriesSuccess, (state, action) => ({
        ...state, 
        isLoading: false, 
        recipeCategories: action.recipeCategories,
    })),
    on(RecipeCategoryActions.getRecipeCategoriesFailure, (state) => ({
        ...state,
        isLoading: false
    })),
);