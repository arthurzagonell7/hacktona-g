CREATE DATABASE habitos_hackathon;

USE habitos_hackathon;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);

CREATE TABLE habitos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  meta_diaria INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE progresso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  habito_id INT NOT NULL,
  data DATE NOT NULL,
  completado BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (habito_id) REFERENCES habitos(id)
);