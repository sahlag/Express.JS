const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// on définit le schéma (la structure) de notre recette
const recipeshema = new Schema({
    name: String,
    nbIndredients: Number,
    introduction: String,
    publishedAt: Date
});