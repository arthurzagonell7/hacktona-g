const express = require('express');
const db = require('./db_config');
const app = express();

app.use(express.json());

app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ id: result.insertId });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query(
    'SELECT id, nome FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (err, results) => {
      if (err || results.length === 0) return res.status(401).send();
      res.send(results[0]);
    }
  );
});

app.get('/habitos/:usuario_id', (req, res) => {
  db.query(
    'SELECT * FROM habitos WHERE usuario_id = ?',
    [req.params.usuario_id],
    (err, results) => res.send(results)
  );
});

app.post('/habitos', (req, res) => {
  const { usuario_id, nome, meta_diaria } = req.body;
  db.query(
    'INSERT INTO habitos (usuario_id, nome, meta_diaria) VALUES (?, ?, ?)',
    [usuario_id, nome, meta_diaria],
    (err, result) => res.status(201).send({ id: result.insertId })
  );
});

app.post('/progresso', (req, res) => {
  const { habito_id, data } = req.body;
  db.query(
    'INSERT INTO progresso (habito_id, data, completado) VALUES (?, ?, TRUE)',
    [habito_id, data],
    (err, result) => res.status(201).send({ id: result.insertId })
  );
});

app.get('/progresso/:habito_id', (req, res) => {
  db.query(
    'SELECT * FROM progresso WHERE habito_id = ? ORDER BY data DESC',
    [req.params.habito_id],
    (err, results) => res.send(results)
  );
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));