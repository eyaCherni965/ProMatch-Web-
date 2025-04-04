const { poolPromise, sql } = require("../sql/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;


// Afficher le profil

exports.profil = async (req, res) => {
    const id_employeur = req.params.id_employeur;

    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_employeur', sql.Int, id_employeur)
        .query(`
          SELECT * FROM Employeur
          WHERE id_employeur = @id_employeur
          `);

          res.json(result.recordset);
    }
    catch (err) {
    console.error("Erreur lors du chargement du profile :", err);
    return res.status(500).send("Erreur serveur lors du chargement.");
  }
}

// Update le statut

exports.updateProfil = async (req, res) => {
  const { id_employeur, nom, prenom, email, compagnie, mdp} = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input('id_employeur', sql.Int, id_employeur)
      .input('nom', sql.VarChar(50), nom)
      .input('prenom', sql.VarChar(50), prenom)
      .input('email', sql.VarChar(100), email)
      .input('compagnie', sql.VarChar(50), compagnie)
      .input('mdp', VarChar(255), mdp)
      .query(`
        UPDATE Employeur
        SET nom = @nom,
            prenom = @prenom,
            email = @email,
            compagnie = @compagnie,
            mdp = @mdp
        WHERE id_employeur = @id_employeur
      `);

    res.status(200).send("Profil mis à jour !");
  } catch (err) {
    console.error("Erreur update profile:", err);
    res.status(500).send("Erreur lors de la mise à jour du profile");
  }
};

// Android -- profil


// Afficher le profil android

exports.profilEtudiant = async (req, res) => {
  const id_etudiant = req.params.id_etudiant;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_etudiant', sql.Int, id_etudiant)
      .query(`
        SELECT * FROM Etudiant
        WHERE id_etudiant = @id_etudiant
        `);

        res.json(result.recordset);
  }
  catch (err) {
  console.error("Erreur lors du chargement du profile :", err);
  return res.status(500).send("Erreur serveur lors du chargement.");
}
}

// Update le statut android

exports.updateProfilEtudiant = async (req, res) => {
const { id_etudiant, nom, prenom, email, mdp} = req.body;

try {
  const pool = await poolPromise;

  await pool.request()
    .input('id_etudiant', sql.Int, id_etudiant)
    .input('nom', sql.VarChar(50), nom)
    .input('prenom', sql.VarChar(50), prenom)
    .input('email', sql.VarChar(100), email)
    .input('mdp', VarChar(255), mdp)
    .query(`
      UPDATE Etudiant
      SET nom = @nom,
          prenom = @prenom,
          email = @email,
          mdp = @mdp
      WHERE id_etudiant = @id_etudiant
    `);

  res.status(200).send("Profil mis à jour !");
} catch (err) {
  console.error("Erreur update profile:", err);
  res.status(500).send("Erreur lors de la mise à jour du profile");
}
};