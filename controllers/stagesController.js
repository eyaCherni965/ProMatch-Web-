const { poolPromise, sql } = require('../sql/db');

exports.stage = async (req, res) => {
  const {
    compagnie,
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
  if (!compagnie || !coordinateur || !nom_departement || !nom_poste || !duree || !desc_poste || !taux_horaire || !adresse) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  console.log("Données envoyées :", req.body);
  
  try {
    const pool = await poolPromise;

    if (!pool) {
      return res.status(500).send("Impossible de se connecter à la base de données.");
    }

    await pool.request()
      .input('compagnie', sql.VarChar(50), compagnie)
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
        INSERT INTO Stage (compagnie, coordinateur, nom_departement, nom_poste, duree, desc_poste, taux_horaire, adresse, courriel, id_employeur, url_image)
        VALUES (@compagnie, @coordinateur, @nom_departement, @nom_poste, @duree, @desc_poste, @taux_horaire, @adresse, @courriel, @id_employeur, @url_image)
      `);

    return res.status(200).send("Stage déposé !");

  } catch (err) {
    console.error("Erreur lors du dépot du stage :", err);
    return res.status(500).send("Erreur serveur lors du dépot du stage.");
  }
};

// Android -> stage

exports.getAllStages = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Stage");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Erreur lors de la récupération des stages :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
