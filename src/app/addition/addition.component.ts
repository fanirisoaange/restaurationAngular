import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit {

  recipes: any;
  recipe: any;
  drinks: any;
  recipeTotalPrice = 0;
  drinkTotalPrice = 0;
  totalPrice = 0;
  DISCOUNT = 20;
  discountMessage = '';
  recipeFilterKey: Int16Array;

  constructor() { }

  ngOnInit() {
    this.initRecipe();
    this.initDrink();
  }

  initRecipe() {
    this.recipes = [
      {
        key: 0,
        value: 'Soupe',
        ingredients: [
          { value: 'Laitue', price: 0 },
          { value: 'tomates', price: 0 },
          { value: 'fromages', price: 0 },
          { value: 'pain complet', price: 0 }
        ]
      },
      {
        key: 1,
        value: 'Pizza',
        ingredients: [
          { value: 'Jarret', price: 0 },
          { value: 'pommes de terres', price: 0 },
          { value: 'carottes', price: 0 },
          { value: 'champignons', price: 0 },
          { value: 'Courgettes', price: 0 },
          { value: 'Curry', price: 0 }
        ]
      },
      {
        key: 2,
        value: 'Salade',
        ingredients: [
          { value: 'fromages', price: 0 },
          { value: 'olives', price: 0 },
          { value: 'crevettes', price: 0 },
          { value: 'thon', price: 0 },
          { value: 'tomates', price: 0 }
        ]
      }
    ];
    this.recipe = this.recipes[0];
    this.recipeFilterKey = this.recipe.key;
  }

  initDrink() {
    this.drinks = [
      { value: '', price: 0 }
    ];
  }

  addIngredient(): void {
    this.recipes = this.recipes.map(recipe => {
      if (recipe.key === this.recipe.key) {
        recipe.ingredients.push({ value: '', price: 0 });
      }
      return recipe;
    });
  }

  deleteIngredient(item): void {
    this.recipes = this.recipes.map(recipe => {
      if (recipe.key === this.recipe.key) {
        recipe.ingredients.splice(item, 1);
      }
      return recipe;
    });
    this.setIngredientTotalPrice();
  }

  setIngredientTotalPrice() {
    this.recipeTotalPrice = this.recipes.find(recipe => recipe.key === this.recipe.key).ingredients
      .reduce((accumulateur, current) => accumulateur + +current.price, 0);
    this.setTotalPrice();
  }

  onChangeRecipe(event) {
    this.recipe = this.recipes.find(recipe => recipe.key === +event.value);
    this.setIngredientTotalPrice();
  }

  addDrink(): void {
    this.drinks.push({ value: '', price: 0 });
  }

  deleteDrink(item): void {
    this.drinks.splice(item, 1);
    this.setDrinkTotalPrice();
  }

  setDrinkTotalPrice(): void {
    this.drinkTotalPrice = this.drinks
      .reduce((accumulateur, current) => accumulateur + +current.price, 0);
    this.setTotalPrice();
  }

  setTotalPrice() {
    const total = this.drinkTotalPrice + this.recipeTotalPrice;
    this.totalPrice = this.drinkTotalPrice <= 100000 ? total : (total - (total * this.DISCOUNT / 100));
    this.discountMessage = this.drinkTotalPrice <= 100000 ? `` : `(Remise de ${this.DISCOUNT}%)`;
  }

}
