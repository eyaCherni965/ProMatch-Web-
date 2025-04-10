-- Faites très attention à toutes modifications que vous devez faire
-- Ne supprimer pas de tables ou de colonnes svp
-- On essaye d'éviter les inserts pour employeur et étudiants, à cause du hashage des mots de passe


SELECT * FROM Etudiant

INSERT INTO Candidature (statut, id_etudiant, id_stage) VALUES
('refusée',    13, 7),   -- Linh Nguyen postule à un autre stage
('acceptée',   13, 5),   -- Alexandre Dubois a été accepté ailleurs
('en attente', 13, 10),   -- Fatou Koulibaly attend une réponse pour un nouveau stage
('en attente', 13, 9);