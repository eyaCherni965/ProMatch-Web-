const config = {
    user: 'azureuser', // Remplacez par votre nom d'utilisateur SQL
    password: 'Promatch123.', // Remplacez par votre mot de passe SQL
    server: 'mysqlserver0411.database.windows.net', // Remplacez par le nom du serveur Azure SQL
    database: 'mySampleDatabase', // Remplacez par le nom de votre base de données
    options: {
      encrypt: true, // Utiliser le chiffrement pour Azure SQL
      trustServerCertificate: false // Ne pas faire confiance au certificat du serveur
    }
  };
  
  module.exports = config;