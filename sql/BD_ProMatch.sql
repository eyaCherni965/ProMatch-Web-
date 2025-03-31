/*
-- Suppression des tables existantes (si nécessaire)
DROP TABLE IF EXISTS Stage_Etudiant;
DROP TABLE IF EXISTS Connexion;
DROP TABLE IF EXISTS CV;
DROP TABLE IF EXISTS Stage;
DROP TABLE IF EXISTS Etudiant;
DROP TABLE IF EXISTS Employeur;

-- Table Employeur
CREATE TABLE Employeur (
    id_employeur DECIMAL(10, 0) PRIMARY KEY, 
    nom_entreprise VARCHAR(50) NOT NULL      
);

-- Table Etudiant
CREATE TABLE Etudiant (
    id_etudiant DECIMAL(10, 0) PRIMARY KEY, 
    nom VARCHAR(50) NOT NULL,               
    prenom VARCHAR(50) NOT NULL
);

-- Table Stage
create table stage (
   
   id_stage     decimal(10,0) primary key,
   coordinateur varchar(50) not null,
   nom_poste    varchar(50) not null,
   duree        decimal(10,0) not null check ( duree > 0 ),
   description  varchar(500) not null,
   taux_horaire decimal(10,2) not null check ( taux_horaire > 0 ),
   adresse      varchar(100) not null unique,
   courriel     varchar(100) not null check ( courriel like '%@%.%' ),
   id_employeur decimal(10,0)
      references employeur ( id_employeur )
);

-- Table CV
CREATE TABLE CV (
    id_cv DECIMAL(10, 0) PRIMARY KEY,      
    fichier VARCHAR(255) NOT NULL,          
    id_etudiant DECIMAL(10, 0) REFERENCES Etudiant(id_etudiant) 
);

-- Table Connexion (pour gérer les comptes utilisateurs)
CREATE TABLE Connexion (
    id_connexion DECIMAL(10, 0) PRIMARY KEY, 
    courriel VARCHAR(100) NOT NULL UNIQUE, 
    mot_de_passe VARCHAR(255) NOT NULL,    
    id_etudiant DECIMAL(10, 0) REFERENCES Etudiant(id_etudiant), 
    id_employeur DECIMAL(10, 0) REFERENCES Employeur(id_employeur) 
);

-- Table de liaison Stage_Etudiant (many-to-many)
CREATE TABLE Stage_Etudiant (
    id_stage DECIMAL(10, 0) REFERENCES Stage(id_stage), 
    id_etudiant DECIMAL(10, 0) REFERENCES Etudiant(id_etudiant), 
    PRIMARY KEY (id_stage, id_etudiant) -- Clé primaire composée
); 

*/

SELECT * FROM Etudiant;
SELECT * FROM Connexion;





