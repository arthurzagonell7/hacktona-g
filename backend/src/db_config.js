const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'habitos_hackathon'
});

connection.connect(err => {
  if (err) console.error('Erro ao conectar:', err);
  else console.log('Conectado ao MySQL');
});

module.exports = connection;