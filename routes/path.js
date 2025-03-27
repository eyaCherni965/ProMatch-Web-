const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const candidaturesController = require('../controllers/candidaturesController')
const stagesController = require('../controllers/stagesController');

// Route d'inscription
router.post('/inscription', authController.inscription);

// Route de connexion
router.post('/connexion', authController.connexion);

// Route de candidatures
router.get('/candidatures/:id_employeur', candidaturesController.getCandidats);
router.post('/candidature/statut', candidaturesController.updateStatut);

// Route de stages
router.post('/stages', stagesController.stage);

module.exports = router;