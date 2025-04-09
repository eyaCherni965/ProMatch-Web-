const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const candidaturesController = require('../controllers/candidaturesController')
const stagesController = require('../controllers/stagesController');

// Route d'inscription
router.post('/inscription', authController.inscription);

// Route de connexion
router.post('/connexion', authController.connexion);

// Route de deconnexion
router.post('/deconnexion', authController.deconnexion);

// Route de candidatures
router.get('/candidatures/:id_employeur', candidaturesController.getCandidats);
router.post('/candidatures/statut', candidaturesController.updateStatut);

// Route de stages
router.post('/stages', stagesController.stage);

//Route pour Connexion Etudiant (Android studio)
router.post('/connexionEtudiant', authController.connexionEtudiant);

//Route pour Inscription Etudiant
router.post("/inscriptionEtudiant", authController.inscriptionEtudiant);

// Route pour Statut Étudiant
router.post("/statutCandidature", candidaturesController.getStatutCandidature)


module.exports = router;