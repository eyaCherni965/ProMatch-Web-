const { poolPromise, sql } = require("../sql/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.inscription = async (req, res) => {
  const { nom, prenom, email, mdp, password2, compagnie } = req.body;

  // Validation
  if (!nom || !prenom || !email || !mdp || !password2 || !compagnie) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  if (mdp !== password2) {
    return res.status(400).send("Les mots de passe ne correspondent pas.");
  }

  try {
    const pool = await poolPromise;

    // Vérifie si l’email existe déjà
    const existing = await pool
      .request()
      .input("email", sql.VarChar(100), email)
      .query("SELECT * FROM Employeur WHERE email = @email");

    if (existing.recordset.length > 0) {
      return res.status(409).send("Cet email est déjà utilisé.");
    }

    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

    await pool
      .request()
      .input("nom", sql.VarChar(50), nom)
      .input("prenom", sql.VarChar(50), prenom)
      .input("email", sql.VarChar(100), email)
      .input("mdp", sql.VarChar(255), hashedPassword)
      .input("compagnie", sql.VarChar(100), compagnie).query(`
        INSERT INTO Employeur (nom, prenom, email, mdp, compagnie)
        VALUES (@nom, @prenom, @email, @mdp, @compagnie)
      `);

    return res.status(200).send("Inscription réussie !");
  } catch (err) {
    console.error("Erreur complète lors de l'inscription :", err);
    return res.status(500).send("Erreur serveur lors de l'inscription.");
  }
};

exports.connexion = async (req, res) => {
  const { email, mdp } = req.body;

  if (!email || !mdp) {
    return res
      .status(400)
      .json({ message: "Veuillez entrer un email et un mot de passe." });
  }

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("email", sql.VarChar(100), email)
      .query("SELECT * FROM Employeur WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Email introuvable." });
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(mdp, user.mdp);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    req.session.user = {
      id_employeur: user.id_employeur,
      compagnie: user.compagnie,
      prenom: user.prenom,
    };

    return res.status(200).json({
      message: "Connexion réussie !",
      id_employeur: user.id_employeur,
      compagnie: user.compagnie,
      prenom: user.prenom,
    });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la connexion." });
  }
};

// Déconnexion

exports.deconnexion = (req, res) => {
  console.log(" Route POST /deconnexion appelée");
  if (!req.session) {
    return res.status(200).json({
      message: "Aucune session active.",
      id_employeur: null,
      compagnie: null,
      prenom: null,
    });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la destruction de la session :", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la déconnexion." });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Déconnexion réussie !",
      id_employeur: null,
      compagnie: null,
      prenom: null,
    });
  });
};

// Android Studio -> connexion étudiant
exports.connexionEtudiant = async (req, res) => {
  const { email, mdp } = req.body;

  console.log("Connexion requise avec :", req.body);

  if (!email || !mdp) {
    return res
      .status(400)
      .json({ message: "Veuillez entrer un email et un mot de passe." });
  }

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("email", sql.VarChar(100), email)
      .query("SELECT * FROM Etudiant WHERE email = @email");

    if (result.recordset.length === 0) {
      console.log("Aucun compte trouvé pour :", email);
      return res.status(401).json({ message: "Email introuvable." });
    }

    const compte = result.recordset[0];

    const match = await bcrypt.compare(mdp, compte.mdp);

    if (!match) {
      console.log("Mot de passe incorrect");
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    console.log("Connexion réussie pour :", compte.email);

    // Gestion de session avec JWT
    const token = jwt.sign({
      id_etudiant: compte.id_etudiant,
      email: compte.courriel
    }, 'ta_clef_secrete_super_secure', { expiresIn: '2h' });

    console.log("Connexion réussie pour :", compte.courriel);
    return res.status(200).json({
      message: "Connexion réussie",
      token,
      id_etudiant: compte.id_etudiant,
      email: compte.courriel
    }, 'ta_clef_secrete_super_secure', { expiresIn: '2h' });

    console.log("Connexion réussie pour :", compte.courriel);
    return res.status(200).json({
      message: "Connexion réussie",
      token,
      id_etudiant: compte.id_etudiant,
      nom: compte.nom,
      prenom: compte.prenom,
      email: compte.email,
      url_cv: compte.url_cv,
    });
  } catch (err) {
    console.error("Erreur serveur :", err.message);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// Android Studio -> inscription étudiant
exports.inscriptionEtudiant = async (req, res) => {
  const { nom, prenom, email, mdp, url_cv } = req.body;

  if (!nom || !prenom || !email || !mdp || !url_cv) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const pool = await poolPromise;

    const existing = await pool
      .request()
      .input("email", sql.VarChar(100), email)
      .query("SELECT * FROM Etudiant WHERE email = @email");

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: "Ce courriel est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

    await pool
      .request()
      .input("nom", sql.VarChar(50), nom)
      .input("prenom", sql.VarChar(50), prenom)
      .input("email", sql.VarChar(100), email)
      .input("mdp", sql.VarChar(255), hashedPassword)
      .input("url_cv", sql.VarChar(255), url_cv).query(`
        INSERT INTO Etudiant (nom, prenom, email, mdp, url_cv)
        VALUES (@nom, @prenom, @email, @mdp, @url_cv)
      `);

    const idResult = await pool
      .request()
      .input("email", sql.VarChar(100), email)
      .query("SELECT id_etudiant FROM Etudiant WHERE email = @email");

    const idEtudiant = idResult.recordset[0].id_etudiant;

    return res.status(200).json({ message: "Inscription étudiant réussie !" });
  } catch (err) {
    console.error("Erreur serveur lors de l'inscription étudiant :", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'inscription étudiant." });
  }
};

//Android studio -- deconnexion
exports.deconnexionEtudiant = (res) => {
  return res.status(200).json({ message: "Déconnexion réussie" });
};
