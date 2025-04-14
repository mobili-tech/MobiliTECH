create database mobilitech;
use mobilitech;
CREATE TABLE transporte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATE,
    grupo TEXT,
    lote CHAR(3),
    empresa TEXT,
    linha VARCHAR(255),
    
    passageiros_dinheiro INT,
    passageiros_comum_vt INT,
    passageiros_comum_m INT,
    passageiros_estudante INT,
    passageiros_estudante_mensal INT,
    passageiros_vt_mensal INT,
    passageiros_pagantes INT,
    passageiros_integracao INT,
    passageiros_gratuidade INT,
    passageiros_total INT,
    
    partidas_ponto_inicial INT,
    partidas_ponto_final INT
);
SELECT * FROM transporte LIMIT 1000 OFFSET 0;
SELECT * FROM transporte LIMIT 1000 OFFSET 1000;
SELECT * FROM transporte LIMIT 1000 OFFSET 2000;
