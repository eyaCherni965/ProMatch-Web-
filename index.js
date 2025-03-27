const express = require('express');
const app = express();
const path = require('path');
const inscRoutes = require('./routes/insc');

// 👉 Middleware pour parser les formulaires HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 👉 Dossier des fichiers statiques (HTML, CSS...)
app.use(express.static(path.join(__dirname, 'codeInitial')));

// 👉 Routes personnalisées
app.use('/', inscRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express !');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`);
});

