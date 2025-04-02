const sql = require('mssql');

const config = {
  user: 'azureuser',
  password: 'TCH099Promatch',
  server: 'promatch.database.windows.net',
  database: 'mySampleDatabase',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connexion MSSQL réussie !");
    return pool;
  })
  .catch(err => {
    console.error("Erreur connexion MSSQL :", err);
  });

module.exports = {
  sql,
  poolPromise
};
