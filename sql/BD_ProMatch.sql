-- Faites très attention à toutes modifications que vous devez faire
-- Ne supprimer pas de tables ou de colonnes svp
-- On essaye d'éviter les inserts pour employeur et étudiants, à cause du hashage des mots de passe

INSERT INTO Candidature (statut, id_etudiant, id_stage)
VALUES 
('En attente', 2, 5)

SELECT * FROM Employeur;