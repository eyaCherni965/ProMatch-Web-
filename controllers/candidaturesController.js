const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Affichage de la liste des étudiants / Usager:

exports.getCandidats = async (req, res) => {
  const id_employeur = req.params.id;

  const query = `
    SELECT 
      e.id_etudiant, 
      e.nom, 
      e.prenom, 
      cv.fichier AS CV, 
      s.nom_poste, 
      c.statut, 
      c.id_candidature
    FROM Candidature c
      JOIN Stage_Etudiant se ON c.id_stage_etudiant = se.id_stage_etudiant
      JOIN Etudiant e ON se.id_etudiant = e.id_etudiant
      JOIN Stage s ON se.id_stage = s.id_stage
      JOIN CV cv ON c.id_cv = cv.id_cv
    WHERE s.id_employeur = @id_employeur
  `;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_employeur', sql.Decimal, id_employeur)
      .query(query);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des candidats");
  }
};
