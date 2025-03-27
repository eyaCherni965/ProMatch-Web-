const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Route d'inscription
exports.inscription = async (req, res) => {
  console.log("Données reçues :", req.body);

  const { nom, prenom, id_employeur, compagnie, email, mdp, password2 } = req.body;

  if (!mdp || !password2) {
    return res.status(400).send("Mot de passe manquant.");
  }

  if (mdp !== password2) {
    return res.status(400).send("Les mots de passe ne correspondent pas.");
  }

  try {
    const hashedPassword = await bcrypt.hash(mdp, saltRounds);
    const pool = await poolPromise;

    await pool.request()
      .input('nom', sql.VarChar, nom)
      .input('prenom', sql.VarChar, prenom)
      .input('id_employeur', sql.VarChar, id_employeur)
      .input('compagnie', sql.VarChar, compagnie)
      .input('email', sql.VarChar, email)
      .input('mdp', sql.VarChar, hashedPassword)
      .query(`
        INSERT INTO employeurs (nom, prenom, id_employeur, compagnie, email, mdp)
        VALUES (@nom, @prenom, @id_employeur, @compagnie, @email, @mdp)
      `);

    res.send("Inscription réussie !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de l'inscription.");
  }
};


// Route de connexion
exports.connexion = async (req, res) => {
  const { email, mdp } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM employeurs WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).send("Utilisateur introuvable");
    }

    const user = result.recordset[0];
    const isPasswordValid = await bcrypt.compare(mdp, user.mdp);

    if (!isPasswordValid) {
      return res.status(401).send("Mot de passe incorrect");
    }

    res.send("Connexion réussie !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la connexion.");
  }
};
