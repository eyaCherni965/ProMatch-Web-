// Importer la connexion à la base de données
const { sql, connectToDb } = require('./db');

// Fonction pour tester la base de données
async function testDatabase() {
  try {
    // Se connecter à la base de données
    await connectToDb();
    console.log('Connected to the database');

    // Exécuter une requête SQL
    const result = await sql.query(`SELECT * FROM Etudiant`); 
    console.log('Query result:', result.recordset); // Afficher les résultats

    // Fermer la connexion (optionnel, mais recommandé)
    await sql.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error during database test:', err);
  }
}

// Appeler la fonction de test
testDatabase();