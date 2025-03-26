
const express = require('express');
let testUser =[];

module.exports = (db) => {
    const router = express.Router();

//API connexion:
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usager = testUser.find(u => u.adresseCourriel === email && u.motDePasse === password);
    if(usager){
        res.send("Connexion réussie");
    }else{
        res.status(401).send("Adresse courriel ou mot de passe incorrect");
    }
});

//API inscription
router.post('/inscription', (req, res) => {
    const {nom, prenom, adresseCourriel, motDePasse, confirmerMDP, nomEntreprise} = req.body;
    if (!nom || !prenom || !adresseCourriel || !motDePasse || !confirmerMDP || !nomEntreprise) {
        return res.status(400).json({success: false, message:'Veuillez remplir tous les champs!'});
    }

    if (motDePasse !== confirmerMDP) {
       return res.status(400).json({success: false, message:'Les mots de passe ne correspondent pas!'});
    }

    const userExistant = testUser.find(user => user.adresseCourriel === adresseCourriel);
    if(userExistant) {
        return res.status(400).json({success: false, message:'Adresse courriel déjà utilisée!'});

    }
    testUser.push({nom, prenom, adresseCourriel, motDePasse, nomEntreprise});
return res.status(201).json({success: true, message:'Utilisateur créé avec succès!'});
});

return router;
   
};
