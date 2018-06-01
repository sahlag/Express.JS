const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// on définit le schema des indrédients(schema secondaire)

const ingredientSchema = new Schema({
    name: String,
    unit: String,
    quantity: Number
});
// on définit le schéma (la structure) de notre recette
const recipeSchema = new Schema({
    name: String,
    nbIngredients: Number,
    introduction: String,
    publishedAt: Date,
    ingredients: [ingredientSchema]
});

// On créé le modèle (classe qui fait des actions)
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.Recipe = Recipe;