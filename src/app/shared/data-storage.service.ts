import { AuthService } from './../auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://ng-course-recipe-book-ff2ba.firebaseio.com/recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
      return this.httpClient.get<Recipe[]>('https://ng-course-recipe-book-ff2ba.firebaseio.com/recipes.json').pipe(map(recipes => {
      return recipes.map(
        recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        }
      );
    }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
