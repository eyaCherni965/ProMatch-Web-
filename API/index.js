const express = require('express');
const app = express();
const sql = require('mssql');
require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express !');
  });
  
  const config = {
    user: 'azureuser',
    password: 'Promatch123.',
    server: 'mysqlserver0411.database.windows.net',
    database: 'mySampleDatabase',
    options: {
      encrypt: true, 
      trustServerCertificate: false
    }
  };
  
  sql.connect(config)
    .then(() => {
      console.log('Connecté à SQL Server');
    })
    .catch(err => {
      console.error('Erreur de connexion :', err);
    });

const PORT = 8080;

app.use(express.json());          
app.use('/', routes);             

app.listen(PORT, () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`);
});