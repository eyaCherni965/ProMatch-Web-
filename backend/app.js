const express = require('express');
const { sql, connectToDb } = require('./db'); // Importez la connexion

const app = express();
const port = 3000;

// Route pour récupérer les utilisateurs
app.get('/users', async (req, res) => {
  try {
    await connectToDb(); // Établir la connexion à la base de données
    const result = await sql.query('SELECT * FROM Users'); // Exécuter la requête
    res.json(result.recordset); // Renvoyer les résultats en JSON
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Server error');
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});