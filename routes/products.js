const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
  publishedAt: new Date(),
  ingredients:[
    { name: "sucre cassonade", quantity: 100, unit: "g" },
    { name: "levure chimique", quantity: 0.5, unit: "sachet" },
    { name: "oeufs", quantity: 4, unit: "pieces" },
    { name: "chocolat", quantity: 100, unit: "g" },
    { name: "farine", quantity: 300, unit: "g" },
    { name: "praliné", quantity: 100, unit: "g" },
    { name: "fleure de sel", quantity: 1, unit: "pincée" }
  ]
},(err, recette) => {
    if(err) {
      console.log(err);
    } else {
      console.log(recipe);
    }
  });
  res.send('<h1>Recette créé</h1>'); 
});

router.get('/', (req, res)=>{
  // Récupération des recettes
  Recipe.find(
    (err, recipes)=>{
      if(err){
        next(err)// il cherche le meddelwere qui gére le erreurs 
      }else{
        console.log ('Recettes récupérées');
        console.log(recipes)
        //Renvoi vers une vue (pour afficher la recette)
        res.render('produits/list',{recipes:recipes});
      }
    }
  );
  
})
//Modifier un produit
router.route('/modification/:id')
.get(
 (req, res, next) => {
   const id = req.params.id;
 // on propose un formulaire pour chander le nom du produit
 res.render('produits/edit');
}
)

.post(
  (req, res)=>{
  //Mise à jour du nom du produit
  }
);
// suppremer un produit
router.delete('/suppression', (req, res) =>{
});
// utilisation de plusieur callbacks.
router.get('/detail/:id',(req, res, next)=>{
  console.log("[spy]: Accès au detail du produit");
   // on passe au middleware suivant
   next();
},
(req, res, next )=>{
  const id = req.params.id;
  getRecipeById(id, 'produits/edit', res, next);
}
);
/**
 * Fonctionqui retourne le recette correspondante
 */

function getRecipeById(id, filenameView, res, next){
  const isIdValid = mongoose.Types.ObjectId.isValid(id);
  if(isIdValid){
    // find avec id
    Recipe.findOne(
      {'_id' : id},
      (err, recipe)=>{
        if(err)
        { next(err); }
          else{
            console.log('Recett récupétée');
            console.log(recipe);
            res.render(filenameView, { recipe: recipe });
      } 
      }
    );
  } else {
    next(createError(404));
    
  
  }

}

// export du module 
module.exports = router;
