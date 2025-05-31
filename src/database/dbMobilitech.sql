CREATE DATABASE IF NOT EXISTS dbMobilitech;
USE dbMobilitech;

CREATE TABLE IF NOT EXISTS transporte (
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
CREATE TABLE IF NOT EXISTS log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,       -- Tipo de log: INFO, ERROR, WARNING, etc.
    informacao VARCHAR(255) NOT NULL, -- Informações gerais do log
    descricao TEXT NOT NULL,          -- Descrição detalhada do log
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- A data e hora em que o log foi registrado
);

CREATE TABLE IF NOT EXISTS empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    codVerificacao VARCHAR(5) NOT NULL UNIQUE,
    cnpj CHAR(18) UNIQUE,
    razaoSocial VARCHAR(45),
	nomeFantasia VARCHAR(45),
	email VARCHAR(45) UNIQUE,
	senha VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS funcionario (
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(100) UNIQUE,
	senha VARCHAR(25),
	cargo VARCHAR(45),
	fkEmpresa INT,
	CONSTRAINT fkEmpFunc FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) AUTO_INCREMENT = 301;

CREATE TABLE IF NOT EXISTS veiculo (
	idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(45),
	capacidade INT
);

CREATE TABLE IF NOT EXISTS grupo (
	idGrupo INT PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS veiculoEmpresa(
	fkGrupo INT,
    fkVeiculo INT,
    fkEmpresa INT,
	CONSTRAINT fkGrupoVeiculo FOREIGN KEY (fkGrupo) REFERENCES grupo(idGrupo),
    CONSTRAINT fkVeiculoVeiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(idVeiculo),
    CONSTRAINT fkEmpresaVeiculo FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    PRIMARY KEY (fkGrupo, fkVeiculo, fkEmpresa)
);

CREATE TABLE IF NOT EXISTS linha (
	idLinha INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	num VARCHAR(7),
	qtdViagensIda INT,
	qtdViagensVolta INT,
	fkEmpresa INT,
    fkGrupo INT,
	CONSTRAINT fkGrupoLinha FOREIGN KEY (fkGrupo) REFERENCES grupo(idGrupo),
	CONSTRAINT fkEmpLinha FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) AUTO_INCREMENT = 401;

CREATE TABLE IF NOT EXISTS registro (
	idRegistro INT PRIMARY KEY auto_increment,
	fkLinha INT,
	fkEmpresa INT,
	dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
	qtdPassageiros INT DEFAULT 0,
	CONSTRAINT fkRegEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
	CONSTRAINT fkRegLinha FOREIGN KEY (fkLinha) REFERENCES linha(idLinha)
) AUTO_INCREMENT = 1000;

INSERT INTO empresa (codVerificacao, nomeFantasia, email, senha) VALUES
('ABCDE', 'TransUnião', 'empresa@empresa.com', '123'),
('12345', 'GatoPreto', 'gato@preto.com', '123');

INSERT INTO funcionario (nome, email, senha, cargo, fkEmpresa) VALUES
('João da Silva', 'joao@transsp.com', '123', 'Gerente Operacional', 1),
('Maria Oliveira', 'maria@viaoeste.com', '123', 'Analista de Frota', 2);

-- Inserindo veículos
INSERT INTO veiculo (tipo, capacidade) VALUES
('Ônibus Articulado', 60),
('Miniônibus', 30),
('Ônibus Convencional', 50),
('Ônibus Biarticulado', 80),
('Ônibus Padron', 40),
('Ônibus Trolébus', 40);

-- Inserindo grupos
INSERT INTO grupo (tipo) VALUES
("Grupo Articulação"),
("Grupo Distribuição"),
("Grupo Estrutural");

-- Inserindo linhas
INSERT INTO linha (nome, num, qtdViagensIda, qtdViagensVolta, fkEmpresa, fkGrupo) VALUES
('Jd.Robru / Guaianazes', '2009-10', 22, 22, 1, 2),
('Sete além / Term. Capelinha', '666S-10', 8, 8, 2, 1);

-- Inserindo veiculoEmpresa
INSERT INTO veiculoEmpresa (fkGrupo, fkVeiculo, fkEmpresa) VALUES
(1, 1, 1),
(2, 2, 1),
(1, 1, 2);

-- Inserindo registros de passageiros
INSERT INTO registro (fkLinha, fkEmpresa, dtRegistro, qtdPassageiros) VALUES
(401, 1, '2025-04-15 08:00:00', 25),
(402, 2, '2025-04-13 08:30:00', 28),
(401, 1, '2025-04-13 12:00:00', 110),
(402, 2, '2025-04-15 17:45:00', 31);