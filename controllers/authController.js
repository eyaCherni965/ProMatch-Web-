const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');
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
    console.error("💥 Erreur complète lors de l'inscription :", err);
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

//Android Studio -> connexion
exports.connexionEtudiant = async (req, res) => {
  const { email, mdp } = req.body;

  console.log("🔍 Requête de connexion reçue :", req.body); // Affiche l'objet reçu

  if (!email || !mdp) {
    return res.status(400).json({ message: "Veuillez entrer un email et un mot de passe." });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT * FROM Connexion WHERE courriel = @email');

    if (result.recordset.length === 0) {
      console.log("⚠️ Échec de connexion : email introuvable");
      return res.status(401).json({ message: "Email introuvable." });
    }

    const compte = result.recordset[0];

    // ✅ LOGS AJOUTÉS ICI :
    console.log("📥 mdp reçu :", mdp);
    console.log("🔐 mdp stocké (hashé) :", compte.mot_de_passe);
    console.log("🔑 Toutes les clés de compte:", Object.keys(compte)); // <--- cette ligne manque
    console.log("🧪 Résultat comparaison bcrypt :", await bcrypt.compare(mdp, compte.mot_de_passe)); // <--- cette ligne manque

    const match = await bcrypt.compare(mdp, compte.mot_de_passe);

    if (!match) {
      console.log("❌ Échec de connexion : mot de passe incorrect");
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    console.log("✅ Connexion réussie pour :", compte.courriel);
    return res.status(200).json({
      id_etudiant: compte.id_etudiant,
      email: compte.courriel
    });

  } catch (err) {
    console.error("❗Erreur connexion étudiant :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

//Android Studio -> isncription étudiant;
exports.inscriptionEtudiant = async (req, res) => {
  const { nom, prenom, email, mdp, password2 } = req.body;

  // 1. Validation des champs
  if (!nom || !prenom || !email || !mdp || !password2) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  if (mdp !== password2) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const pool = await poolPromise;

    // 2. Vérifier si le courriel est déjà utilisé dans Connexion
    const existing = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT * FROM Connexion WHERE courriel = @email');

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: "Ce courriel est déjà utilisé." });
    }

    // 3. Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

    // 4. Insertion dans la table Etudiant (sans id_etudiant)
    await pool.request()
      .input('nom', sql.VarChar(50), nom)
      .input('prenom', sql.VarChar(50), prenom)
      .input('email', sql.VarChar(100), email)
      .query(`
        INSERT INTO Etudiant (nom, prenom, email)
        VALUES (@nom, @prenom, @email)
      `);

    // 5. Récupérer l’id auto-généré (via le courriel)
    const idResult = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query('SELECT id_etudiant FROM Etudiant WHERE email = @email');

    const idEtudiant = idResult.recordset[0].id_etudiant;

    // 6. Insertion dans la table Connexion
    await pool.request()
      .input('id_connexion', sql.Decimal(10, 0), idEtudiant) // même id utilisé comme id_connexion
      .input('courriel', sql.VarChar(100), email)
      .input('mot_de_passe', sql.VarChar(255), hashedPassword)
      .input('id_etudiant', sql.Decimal(10, 0), idEtudiant)
      .query(`
        INSERT INTO Connexion (id_connexion, courriel, mot_de_passe, id_etudiant)
        VALUES (@id_connexion, @courriel, @mot_de_passe, @id_etudiant)
      `);

    return res.status(200).json({ message: "Inscription étudiant réussie !" });

  } catch (err) {
    console.error("💥 Erreur serveur lors de l'inscription étudiant :", err);
    return res.status(500).json({ message: "Erreur serveur lors de l'inscription étudiant." });
  }
};

  




