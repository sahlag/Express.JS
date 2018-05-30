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
// export du module 
module.exports = router;
