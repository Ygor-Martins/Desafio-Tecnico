CREATE DATABASE IF NOT EXISTS desafio_fullstack;

USE desafio_fullstack;


CREATE TABLE users(
    id INT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(150) NOT NULL,
    CREATED_AT DATE NOT NULL
);
INSERT INTO users (id, name, email, created_at)
VALUES
    (1, 'Ana', 'ana@email.com', '2024-01-01'),
    (2, 'Pedro', 'pedro@email.com', '2024-02-01'),
    (3, 'Maria', 'maria@email.com', '2024-02-15');