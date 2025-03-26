const express = require('express');
const app = express();

app.listen(8080, () => {
  console.log('Serveur écoute sur le port 8080');
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express !');
  });
  