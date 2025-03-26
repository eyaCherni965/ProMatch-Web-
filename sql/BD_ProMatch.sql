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
CREATE TABLE Stage (
    id_stage DECIMAL(10, 0) PRIMARY KEY,    
    coordinateur VARCHAR(50) NOT NULL,
    nom_departement VARCHAR(50) NOT NULL, 
    nom_poste VARCHAR(50) NOT NULL,
    duree DECIMAL(10, 0) NOT NULL CHECK (duree > 0), 
    desc_poste VARCHAR(500) NOT NULL, 
    taux_horaire DECIMAL(10, 2) NOT NULL CHECK (taux_horaire > 0), 
    adresse VARCHAR(100) NOT NULL UNIQUE,
    courriel VARCHAR(100) NOT NULL CHECK (courriel LIKE '%@%.%'), 
    id_employeur DECIMAL(10, 0) REFERENCES Employeur(id_employeur),
    url_image VARCHAR(200) NULL
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