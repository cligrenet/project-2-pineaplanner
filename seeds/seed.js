require("dotenv").config();
const mongoose = require('mongoose');
const axios = require('axios').default;
const recipeModel = require("../models/Recipe.model");
let amountOfRecipe = 2;
let query = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=${amountOfRecipe}`;
let recipes = [];

axios.get(query)
    .then((response)=>{
        let receivedRecipes = response.data.recipes;
        //console.log(`receivedRecipes`, receivedRecipes)
        let recipes = [];

        receivedRecipes.forEach((receivedRecipe)=>{
            let newRecipe = {};

            newRecipe.title             = receivedRecipe.title;
            newRecipe.summary           = receivedRecipe.summary;
            newRecipe.instructions      = receivedRecipe.instructions;
            newRecipe.image             = receivedRecipe.image;
            newRecipe.readyInMinutes    = receivedRecipe.readyInMinutes;
            newRecipe.healthScore       = receivedRecipe.healthScore;
            newRecipe.dishTypes         = receivedRecipe.dishTypes;
            newRecipe.cheap             = receivedRecipe.cheap;
            newRecipe.dairyFree         = receivedRecipe.dairyFree;
            newRecipe.glutenFree        = receivedRecipe.glutenFree;
            newRecipe.vegan             = receivedRecipe.vegan;
            newRecipe.vegetarian        = receivedRecipe.vegetarian;
            newRecipe.veryHealthy       = receivedRecipe.veryHealthy;
            newRecipe.veryPopular       = receivedRecipe.veryPopular;
            newRecipe.servings          = receivedRecipe.servings;
            newRecipe.ingredients =[];

            receivedRecipe.extendedIngredients.forEach((ingredient)=>{
                let newIngredient = {};
                newIngredient.name=ingredient.name;
                newIngredient.amount=ingredient.amount;
                newIngredient.unit=ingredient.measures.metric.unitLong;
                newRecipe.ingredients.push(newIngredient);
            });

            recipes.push(newRecipe);
        })

        	console.log(recipes[0].ingredients);

    })
    .catch((error)=>console.log(error));
