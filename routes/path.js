const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const candidaturesController = require('../controllers/candidaturesController')

// Route d'inscription
router.post('/inscription', authController.inscription);

// Route de connexion
router.post('/connexion', authController.connexion);

// Route de candidatures
router.get('/employeur/:id/candidats', candidaturesController.getCandidats);

module.exports = router;