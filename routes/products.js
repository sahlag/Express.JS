const express = require('express');
const router = express.Router();

const recipeFile = require('../model/recipe');
const Recipe = recipeFile.Recipe;

// Création d'un produit
router.route('/creation')
.get((req, res) =>{
 res.send(`Formulaire nouveau produit
 <form method="post">
 <label for="name">Nom du produit</label>
 <input type="text" name="name" id="name" />
 <input type="submit" value="Créer" />
 </form>
 `);
})
.post((req, res) =>{
   // Ajout de la recette en BDD méthode 1
  /* const maRecette = new Recipe({
    name: 'Cookies au chocolat praliné',
    introduction: 'Recette de cookies de ma grand-mère, elle est super bonne. Créée en 1840 et transmise de génération en génération.',
    nbIngredients: 7,
    publishedAt: new Date()
  });
  // Sauvgarde
  maRecette.save((err, recipe) => {
    if(err) {
      console.log(err);
    } else {
      console.log(recipe);
    }
  });
  res.send('<h1>Recette créé</h1>');
});*/ 
// méthode 2
Recipe.create({
  name: 'Cookies au chocolat praliné',
  introduction: 'Recette de cookies de ma grand-mère, elle est super bonne. Créée en 1840 et transmise de génération en génération.',
  nbIngredients: 7,
  publishedAt: new Date()
},(err, recipe) => {
    if(err) {
      console.log(err);
    } else {
      console.log(recipe);
    }
  });
  res.send('<h1>Recette créé</h1>'); 
});

//Modifier un produit
router.put('/Modification', (req, res) =>{
  res.send('produit modifier');
});
// suppremer un produit
router.delete('/suppression', (req, res) =>{
  res.send('Produit supprimé');
});
// utilisation de plusieur callbacks.
router.get('/detail/:name',(req, res, next)=>{
  console.log("[spy]: Accès au detail du produit");
   // on passe au middleware suivant
   next();
},(req, res, )=>{
  res.send(`<h1>Detait du produit: ${req.params.name}</h1>`);
}
);

// export du module 
module.exports = router;
