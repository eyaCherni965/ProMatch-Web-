const { poolPromise, sql } = require('../sql/db');


//Affichage de la liste des étudiants

exports.getCandidats = async (req, res) => {
  console.log("Route /candidatures/:id_employeur bien atteinte !");
  const id_employeur = req.params.id_employeur;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('id_employeur', sql.Int, id_employeur)
      .query(`
        SELECT 
          C.id_candidature,
          C.statut,
          E.nom,
          E.prenom,
          E.url_cv,
          S.nom_poste
        FROM Candidature C
        JOIN Etudiant E ON C.id_etudiant = E.id_etudiant
        JOIN Stage S ON C.id_stage = S.id_stage
        WHERE S.id_employeur = @id_employeur
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Erreur lors de la récupération des candidatures :", err);
    res.status(500).send("Erreur serveur");
  }
};

// Update le statut

exports.updateStatut = async (req, res) => {
  const { id_candidature, statut } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input('id_candidature', sql.Int, id_candidature)
      .input('statut', sql.VarChar(50), statut)
      .query(`
        UPDATE Candidature
        SET statut = @statut
        WHERE id_candidature = @id_candidature
      `);

    res.status(200).send("Statut mis à jour !");
  } catch (err) {
    console.error("Erreur update statut :", err);
    res.status(500).send("Erreur lors de la mise à jour du statut");
  }
};

