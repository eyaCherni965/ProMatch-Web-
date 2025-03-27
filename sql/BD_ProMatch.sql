INSERT INTO Stage (
  id_stage, coordinateur, nom_departement, nom_poste, duree, desc_poste,
  taux_horaire, adresse, courriel, id_employeur, url_image)
 VALUES (
  3001, 'Lea Lalonde', 'Informatique', 'Développeur Web Junior', 4,
  'Développement d’une application Express.js.',
  25.00, '123 rue Code, Montréal', 'rh@entreprise.com', 100232, NULL
);

SELECT * FROM Stage;


