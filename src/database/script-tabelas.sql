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
    codVerificacao VARCHAR(5) NOT NULL,
    cnpj CHAR(18),
    razaoSocial VARCHAR(45),
	nomeFantasia VARCHAR(45),
	email VARCHAR(45),
	senha VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	cep CHAR(9),
	numero CHAR(5),
	cidade VARCHAR(45),
	estado VARCHAR(45),
	logradouro VARCHAR(45),
	complemento VARCHAR(45),
	fkEmpresa INT,
	CONSTRAINT fkEndEmp FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) AUTO_INCREMENT = 101;

CREATE TABLE IF NOT EXISTS funcionarios (
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(100),
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

INSERT INTO funcionario (nome, email, cargo, fkEmpresa) VALUES
('João da Silva', 'joao@transsp.com', 'Gerente Operacional', 1),
('Maria Oliveira', 'maria@viaoeste.com', 'Coordenadora de Frota', 2);

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
(1, 2, 1),
(1, 1, 2);

-- Inserindo registros de passageiros
INSERT INTO registro (fkLinha, fkEmpresa, dtRegistro, qtdPassageiros) VALUES
(401, 1, '2025-04-15 08:00:00', 25),
(402, 2, '2025-04-13 08:30:00', 28),
(401, 1, '2025-04-13 12:00:00', 110),
(402, 2, '2025-04-15 17:45:00', 31);

        SELECT
            ve.fkGrupo,
            g.tipo AS grupo,
            ve.fkVeiculo,
            v.idVeiculo,
            v.tipo AS veiculo,
            SUM(v.capacidade) AS capacidade,
            ve.fkEmpresa,
		ROUND(((SUM(r.qtdPassageiros) * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * v.capacidade)) * 100, 1) AS porcentagem
        FROM veiculoEmpresa AS ve
        JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        JOIN linha AS l ON l.fkEmpresa = ve.fkEmpresa
        JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = 1
        AND g.idGrupo = 2
        AND l.idLinha = 401
        AND dtRegistro >= '2025-04-01' AND dtRegistro <= '2025-04-16'
        GROUP BY l.idLinha, v.idVeiculo, e.idEmpresa;
        
        
        SELECT
            ve.fkGrupo,
            g.tipo AS grupo,
            ve.fkVeiculo,
            v.tipo AS veiculo,
            SUM(v.capacidade) as capacidade,
            ve.fkEmpresa,
            ROUND(((SUM(r.qtdPassageiros) * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * v.capacidade)) * 100, 1) AS porcentagem,
            (SELECT SUM(r.qtdPassageiros) FROM registro
            JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        JOIN linha AS l ON l.fkEmpresa = ve.fkEmpresa
        JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = 1
        AND g.idGrupo = 2
        AND l.idLinha = 401) as passageiros
        FROM veiculoEmpresa AS ve
        JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        JOIN linha AS l ON l.fkEmpresa = ve.fkEmpresa
        JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = 1
        AND g.idGrupo = 2
        AND l.idLinha = 401
        GROUP BY l.idLinha, v.idVeiculo, e.idEmpresa;
        
        select * from registro;