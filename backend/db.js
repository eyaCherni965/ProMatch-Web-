const sql = require('mssql');
const config = require('./dbConfig');

async function connectToDb() {
  try {
    await sql.connect(config);
    console.log('Connected to Database');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

module.exports = { sql, connectToDb };