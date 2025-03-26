-- Suppression des tables existantes (si nécessaire)
drop table if exists stage_etudiant;
drop table if exists connexion;
drop table if exists inscription;
drop table if exists cv;
drop table if exists stage;
drop table if exists etudiant;
drop table if exists employeur;

-- Table Employeur
create table employeur (
   id_employeur   decimal(10,0) primary key,
   nom_entreprise varchar(50) not null
);

-- Table Etudiant
create table etudiant (
   id_etudiant decimal(10,0) primary key,
   nom         varchar(50) not null,
   prenom      varchar(50) not null
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
create table cv (
   id_cv       decimal(10,0) primary key,
   fichier     varchar(255) not null,
   id_etudiant decimal(10,0)
      references etudiant ( id_etudiant )
);

-- Table Connexion (pour gérer les comptes utilisateurs)
create table connexion (
   id_connexion decimal(10,0) primary key,
   courriel     varchar(100) not null unique,
   mot_de_passe varchar(255) not null,
   id_etudiant  decimal(10,0)
      references etudiant ( id_etudiant ),
   id_employeur decimal(10,0)
      references employeur ( id_employeur )
);

-- Table Inscription 
create table inscription (
   id_inscription decimal(10,0) primary key,
   nom            varchar(40) not null,
   prenom         varchar(40) not null,
   courriel       varchar(100) not null unique,
   telephone      varchar(20) not null,
   mot_de_passe   varchar(50),
   id_etudiant    decimal(10,0)
      references etudiant ( id_etudiant ),
   id_employeur   decimal(10,0)
      references employeur ( id_employeur )
);

-- Table de liaison Stage_Etudiant (many-to-many)
create table stage_etudiant (
   id_stage    decimal(10,0)
      references stage ( id_stage ),
   id_etudiant decimal(10,0)
      references etudiant ( id_etudiant ),
   primary key ( id_stage,
                 id_etudiant ) -- Clé primaire composée
);