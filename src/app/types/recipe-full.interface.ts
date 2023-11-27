import { RecipeShort } from "./recipe-short.interface";

export interface RecipeFull extends RecipeShort {
    category: string;
    area: string;
    instructions: string;
    isFavorite?: boolean;
}