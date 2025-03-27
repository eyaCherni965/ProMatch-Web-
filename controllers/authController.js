const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');

exports.inscription = async (req, res) => {
  const { nom, prenom, id_employeur, compagnie, email, mdp, password2 } = req.body;

  if (mdp !== password2) {
    return res.status(400).send("Les mots de passe ne correspondent pas.");
  }

  try {
    const hashedPassword = await bcrypt.hash(mdp, 10);
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

    res.send('Inscription réussie !');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l\'inscription.');
  }
};
