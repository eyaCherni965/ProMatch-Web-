const express = require('express');
const app = express();
const sql = require('mssql');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express !');
  });
<<<<<<< HEAD


  
=======
  
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
      console.log('✅ Connecté à SQL Server');
    })
    .catch(err => {
      console.error('❌ Erreur de connexion :', err);
    });
  
  
  
>>>>>>> 87ce3db38451ee2ad3a822f3c5ab710da841119b
