const { poolPromise, sql } = require('../sql/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Affichage de la liste des étudiants / Usager:

exports.getCandidats = async (req, res) => {
  const id_employeur = req.params.id;

  const query = `
  SELECT * FROM Candidature;
`;


  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_employeur', sql.Decimal(10, 0), Number(id_employeur))
      .query(query);

      console.log(JSON.stringify(result.recordset, null, 2));
      
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des candidats");
  }
};
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
        UPDATE Candidature
        SET nom = @nom
        WHERE nom = @nom
        SET prenom = @prenom
        WHERE prenom = @prenom
        SET CV = @CV
        WHERE CV = @CV
      `);

    res.status(200).send("Statut mis à jour !");
  } catch (err) {
    console.error("Erreur update statut :", err);
    res.status(500).send("Erreur lors de la mise à jour du statut");
  }
};

