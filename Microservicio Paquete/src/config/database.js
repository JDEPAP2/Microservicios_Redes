const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Parcial123',
  database: 'paquetesDB',
  port: '3306'
});

module.exports = connection;