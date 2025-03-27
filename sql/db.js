const sql = require('mssql');

const config = {
  user: 'azureuser',
  password: 'Promatch123.',
  server: 'mysqlserver0411.database.windows.net',
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
