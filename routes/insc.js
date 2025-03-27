const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route d'inscription
router.post('/inscription', authController.inscription);

// Route de connexion
router.post('/connexion', authController.connexion);

module.exports = router;
