import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Schabowy z ziemniakami',
      '1) Ziemniaki obieramy, myjemy i gotujemy w osolonej wodzie.\n' +
      '2) Schab dzielimy na kotlety około 200 g na 1 porcje.\n' +
      '3) Kawałek mięsa umieszczamy między dwoma kawałkami foli do żywności i za pomocą tłuczka do mięsa rozbijamy nasze kotlety z obu stron.\n'+
      '4) Następnie rozbite kotlety doprawiamy solą i pieprzem. Kolejno obtaczamy je w mące , potem w roztrzepanym jajku a na koniec w bułce tartej.\n'+
      '5) Panierowane mięso smażymy na złoty kolor na mocno rozgrzanym smalcu.\n'+
      '6) Ogórki myjemy, obieramy ze skórki i kroimy w plastry o grubości około 0,5 cm. Następnie dodajemy do nich śmietanę. Doprawiamy solą i pieprzem. Dekorujemy pokrojonym szczypiorem.\n'+
      '7) Kotleta podajemy z ugotowanymi ziemniakami obsypanymi koprem i schłodzoną mizerią.',
      'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0008/49/schabowy-z-ziemniakami-i-buraczkami.jpeg',
      [
        new Ingredient('Schab', 1),
        new Ingredient('Młode ziemniaki', 20),
        new Ingredient('Smalec', 1),
        new Ingredient('Jaja', 2)
      ]),
    new Recipe('Burger',
      '1) Mięso smażyć beztłuszczowo na bardzo dobrze rozgrzanej patelni grilowej (najlepiej żeliwnej) przez ok. 2 i pół minuty z każdej strony (lub piec w piekarniku w 190 stopniach, na blasze, przez ok. 4 minut z każdej strony). Tuż przed smażeniem posolić solą morską (ale tylko z tej strony, na której będziemy za chwilę smażyć, drugą stronę posolić dopiero na patelni tuż przed odwróceniem burgera).\n'+
      '2) Po odwróceniu burgera na patelni położyć na niego plasterek sera. Bułki przekroić na połówki, opiec w tosterze lub zrumienić na patelni, ewentualnie włożyć pod rozgrzany grill w piekarniku.\n' +
      '3) Połówki bułki posmarować cienko majonezem, na dolnej połówce bułki ułożyć plasterek ogórka kiszonego i zgrillowanego burgera. Doprawić młotkowanym pieprzem, posmarować ketchupem i ułożyć warzywa: pomidora, sałatę pół cieniutkiego plasterka czerwonej cebuli. Przykryć drugą połówką bułki i lekko docisnąć.',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Bułka', 1),
        new Ingredient('Mięso mielone wołowe', 1),
        new Ingredient('Ser żółty', 2),
        new Ingredient('Pomidor', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
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
