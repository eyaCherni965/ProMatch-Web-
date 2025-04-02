-- Faites très attention à toutes modifications que vous devez faire
-- Ne supprimer pas de tables ou de colonnes svp
-- On essaye d'éviter les inserts pour employeur et étudiants, à cause du hashage des mots de passe








CREATE TABLE Stage_Etudiant (
  id_etudiant INT NOT NULL,
  id_stage INT NOT NULL,
  statut VARCHAR(50) (statut IN ('En attente', 'Acceptée', 'Refusée')),
  PRIMARY KEY (id_etudiant, id_stage),
  FOREIGN KEY (id_stage) REFERENCES Stage(id_stage),
  FOREIGN KEY (id_cv) INT REFERENCES CV(id_cv)
);