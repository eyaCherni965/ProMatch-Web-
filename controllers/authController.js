const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.inscription = async (req, res) => {
  const { nom, prenom, email, mdp, password2, compagnie } = req.body;

  // 🛡 Validation
  if (!nom || !prenom || !email || !mdp || !password2 || !compagnie) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  if (mdp !== password2) {
    return res.status(400).send("Les mots de passe ne correspondent pas.");
  }

  try {
    const pool = await poolPromise;

    // 🔎 Vérifie si l’email existe déjà
    const existing = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT * FROM Employeur WHERE email = @email');

    if (existing.recordset.length > 0) {
      return res.status(409).send("Cet email est déjà utilisé.");
    }

    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

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

    return res.status(200).send("Inscription réussie !");
  } catch (err) {
    console.error(" Erreur lors de l'inscription :", err);
    return res.status(500).send("Erreur serveur lors de l'inscription.");
  }
};

exports.connexion = async (req, res) => {
  const { email, mdp } = req.body;

  if (!email || !mdp) {
    return res.status(400).json({ message: "Veuillez entrer un email et un mot de passe." });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT * FROM Employeur WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Email introuvable." });
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(mdp, user.mdp);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    return res.status(200).json({
      message: "Connexion réussie !",
      id_employeur: user.id_employeur,
      compagnie: user.compagnie,
      prenom: user.prenom 
    });

  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    return res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};
