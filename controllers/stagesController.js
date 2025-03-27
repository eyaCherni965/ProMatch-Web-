const { poolPromise, sql } = require('../sql/db');

exports.stage = async (req, res) => {
  const {
    coordinateur,
    nom_departement,
    nom_poste,
    duree,
    desc_poste,
    taux_horaire,
    adresse,
    courriel,
    id_employeur,
    url_image
  } = req.body;

  // Validation
  if (!coordinateur || !nom_departement || !nom_poste || !duree || !desc_poste || !taux_horaire || !adresse) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  try {
    const pool = await poolPromise;

    if (!pool) {
      return res.status(500).send("Impossible de se connecter à la base de données.");
    }

    await pool.request()
      .input('coordinateur', sql.VarChar(50), coordinateur)
      .input('nom_departement', sql.VarChar(100), nom_departement)
      .input('nom_poste', sql.VarChar(100), nom_poste)
      .input('duree', sql.Int, duree)
      .input('desc_poste', sql.VarChar(500), desc_poste)
      .input('taux_horaire', sql.Decimal(10, 2), taux_horaire)
      .input('adresse', sql.VarChar(255), adresse)
      .input('courriel', sql.VarChar(50), courriel)
      .input('id_employeur', sql.VarChar(10), id_employeur)
      .input('url_image', sql.VarChar(30), url_image)
      .query(`
        INSERT INTO Stage (coordinateur, nom_departement, nom_poste, duree, desc_poste, taux_horaire, adresse, courriel, id_employeur, url_image)
        VALUES (@coordinateur, @nom_departement, @nom_poste, @duree, @desc_poste, @taux_horaire, @adresse, @courriel, @id_employeur, @url_image)
      `);

    return res.status(200).send("Stage déposé !");
  } catch (err) {
    console.error("Erreur lors du dépot du stage :", err);
    return res.status(500).send("Erreur serveur lors du dépot du stage.");
  }
};
