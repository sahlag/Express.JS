const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// on définit le schéma (la structure) de notre recette
const recipeSchema = new Schema({
    name: String,
    nbIngredients: Number,
    introduction: String,
    publishedAt: Date
});

// On créé le modèle (classe qui fait des actions)
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.Recipe = Recipe;