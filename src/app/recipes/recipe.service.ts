import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // private recipes: Recipe[]; = [
  //   new Recipe(
  //     'Lasagna',
  //     'Lasagne are a type of wide, flat pasta',
  //     'https://www.simplyrecipes.com/wp-content/uploads/2004/12/lasagna-horiz-a-2000.jpg',
  //     [
  //       new Ingredient('Bread', 1),
  //       new Ingredient('Carrot', 2)
  //     ]),
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is a test Recipe',
  //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
  //     [
  //       new Ingredient('Flour', 1),
  //       new Ingredient('Dhaniya', 2)
  //     ])
  //   ];

  constructor(
    private store: Store<fromShoppingList.AppState>) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
