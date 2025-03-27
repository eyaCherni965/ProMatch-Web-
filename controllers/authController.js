const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Route d'inscription pour un employeur
exports.inscription = async (req, res) => {
  const { nom, prenom, email, mdp, password2, compagnie } = req.body;

  if (!nom || !prenom || !email || !mdp || !password2 || !compagnie) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  if (mdp !== password2) {
    return res.status(400).send("Les mots de passe ne correspondent pas.");
  }

  try {
    const pool = await poolPromise;

    // Vérifier si l’email existe déjà
    const existing = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT * FROM Employeur WHERE email = @email');

    if (existing.recordset.length > 0) {
      return res.status(409).send("Cet email est déjà utilisé.");
    }

    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

    // Insérer dans Employeur (et id_employeur s’auto-incrémente si tu l’as mis en IDENTITY)
    await pool.request()
      .input('nom', sql.VarChar(50), nom)
      .input('prenom', sql.VarChar(50), prenom)
      .input('email', sql.VarChar(100), email)
      .input('mdp', sql.VarChar(255), hashedPassword)
      .input('compagnie', sql.VarChar(100), compagnie)
      .query(`
        INSERT INTO Employeur (nom, prenom, email, mdp, compagnie)
        VALUES (@nom, @prenom, @email, @mdp, @compagnie)
      `);

    res.send("Inscription réussie !");
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).send("Erreur serveur lors de l'inscription.");
  }
};

// Route de connexion
exports.connexion = async (req, res) => {
  const { email, mdp } = req.body;

  if (!email || !mdp) {
    return res.status(400).send("Veuillez entrer un email et un mot de passe.");
  }

  try {
    const pool = await poolPromise;

    // 🔍 Recherche dans la table Employeur (et non Connexion)
    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT * FROM Employeur WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).send("Email introuvable.");
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(mdp, user.mdp);

    if (!passwordMatch) {
      return res.status(401).send("Mot de passe incorrect.");
    }

    res.redirect('/acceuil_TCH099.html');

  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).send("Erreur serveur lors de la connexion.");
  }
};
