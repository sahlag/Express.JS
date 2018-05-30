const express = require('express');
const router = express.Router();

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
  res.send('Produit créé');
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
