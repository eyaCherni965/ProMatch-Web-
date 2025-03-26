
const express = require('express');
let testUser =[];

module.exports = (db) => {
    const router = express.Router();

//API connexion:
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `
      SELECT * FROM Connexion WHERE courriel = ? AND mot_de_passe = ?;
    `;
    db.query(query, [email, password], (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (results.length > 0) {
        res.send("Connexion réussie");
      } else {
        res.status(401).send("Adresse courriel ou mot de passe incorrect");
      }
    });
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
    const insertEmployeur = `INSERT INTO Employeur (id_employeur, nom_entreprise) VALUES (NULL, ?)`;
    db.query(insertEmployeur, [nomEntreprise], (err, employeurResult) => {
      if (err) return res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout de l\'employeur' });

      const id_employeur = employeurResult.insertId;

     
      const insertConnexion = `
        INSERT INTO Connexion (id_connexion, courriel, mot_de_passe, id_employeur)
        VALUES (NULL, ?, ?, ?)
      `;
      db.query(insertConnexion, [adresseCourriel, motDePasse, id_employeur], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Erreur lors de l\'inscription' });

        res.status(201).json({ success: true, message: 'Utilisateur créé avec succès!' });
      });
    });
  });

return router;
   
};
