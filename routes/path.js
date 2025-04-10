const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const candidaturesController = require('../controllers/candidaturesController');
const stagesController = require('../controllers/stagesController');
const profilController = require('../controllers/profilController');

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

// Route profil Employeur
router.get("/profil/:id_employeur", profilController.profil)
router.post("/profil", profilController.updateProfil)

/********************************************************ROUTES ANDROID ************************************************************************/
// Route pour Connexion Etudiant (Android studio)
router.post('/connexionEtudiant', authController.connexionEtudiant);

// Route pour Inscription Etudiant
router.post("/inscriptionEtudiant", authController.inscriptionEtudiant);

// Route pour Déconnexion Étudiant
router.post('/deconnexionEtudiant', authController.deconnexionEtudiant);

// Route pour Statut Étudiant
router.post("/candidatures/:id_etudiant", candidaturesController.getStatutCandidature)

// Route pour profil Étudiant
router.get("/profilEtudiant", profilController.profilEtudiant)
router.post("/profilEtudiant", profilController.updateProfilEtudiant)

//Route pour stage -> Android
router.get('/stages', stagesController.getAllStages);

module.exports = router;