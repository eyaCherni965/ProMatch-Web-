-- Faites très attention à toutes modifications que vous devez faire
-- Ne supprimer pas de tables ou de colonnes svp
-- On essaye d'éviter les inserts pour employeur et étudiants, à cause du hashage des mots de passe


SELECT * FROM Etudiant

INSERT INTO Candidature (statut, id_etudiant, id_stage) VALUES
('en attente',    1, 7)