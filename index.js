const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authController');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'code initial')));
app.use('/', authCRoutes); // Routes d'inscription

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express !');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`);
});
