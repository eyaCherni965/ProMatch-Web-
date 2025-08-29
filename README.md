README – Web (ProMatch-Web)
#  ProMatch – Web (Employeurs)

##  Description
ProMatch est une plateforme conçue pour faciliter la mise en relation entre **employeurs** et **étudiants** à la recherche de stages.  
Cette partie du projet correspond à **l’application web**, utilisée par les employeurs pour **publier, gérer et analyser** les candidatures aux offres de stage.

##  Équipe
Projet réalisé par :  
Eya Cherni, Jyotsna Bhunjun, Éléa Charier,Aurélie Fidélia, Sara Hamed & Neda Javaheri.

## Fonctionnalités principales (Web)
- Connexion / Inscription employeur
- Création et gestion d’offres de stage
- Consultation et analyse des candidatures reçues
- Accès aux CVs des étudiants
- Modification du profil et du mot de passe
- Pages statiques : présentation, pourquoi, comment, nouveautés

##  Technologies utilisées
- **Frontend Web** : HTML, CSS, JavaScript, Tailwind CSS  
- **Backend** : Node.js, Express.js, JWT, Bcrypt  
- **Base de données** : SQL Server (hébergé sur Azure)  

## Structure du projet


/frontend → pages web (HTML, CSS, JS)
/backend → serveur Express.js et API REST
/database → scripts SQL


## Installation & exécution
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/eyaCherni965/ProMatch-Web-.git
   cd ProMatch-Web-


Installer les dépendances backend :

npm install


Configurer le fichier .env avec les infos SQL Server :

DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=...
JWT_SECRET=...


Lancer le serveur :
node index.js
Accéder à l’application via :
http://localhost:3000

## Références
W3Schools – Navigation Bar CSS
Node.js Foundation – Node.js
FreeFrontend – Exemples CSS
Figma – Mockups & Logos
CodeHal & Sheryians Coding – inspirations pour la page index et la page connexion
