CREATE DATABASE dbMobilitech;
USE dbMobilitech;

CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(18),
    razaoSocial VARCHAR(45),
	nomeFantasia VARCHAR(45),
	email VARCHAR(45),
	senha VARCHAR(25)
);

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY,
Cep char(9),
Numero char(5),
Cidade varchar(45),
Estado varchar(45),
Logradouro varchar(45),
Complemento varchar(45),
fkEmpresa INT UNIQUE,
CONSTRAINT fkEndEmp FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) auto_increment = 101;

CREATE TABLE funcionarios (
idFuncionario INT PRIMARY KEY,
nome VARCHAR(45),
email VARCHAR(100),
cargo VARCHAR(45),
fkEmpresa INT UNIQUE,
CONSTRAINT fkEmpFunc FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) auto_increment = 301;

CREATE TABLE linha(
idLinha INT PRIMARY KEY,
nome VARCHAR(45),
num VARCHAR(7),
qtdViagensIda INT,
qtdViagensVolta INT,
fkEmpresa INT UNIQUE,
CONSTRAINT fkEmpLinha FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
) auto_increment = 401;

CREATE TABLE registro(
idRegistro INT PRIMARY KEY,
fkLinha INT,
fkEmpresa INT,
dtRegistro DATETIME,
qtdPassageiros INT,
CONSTRAINT fkRegEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkRegLinha FOREIGN KEY (fkLinha) REFERENCES linha(idLinha)
) auto_increment = 1000;

CREATE TABLE veiculo(
idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(45),
capacidade INT
);

CREATE TABLE grupo(
idGrupo INT PRIMARY KEY AUTO_INCREMENT,
fkLinha INT,
fkVeiculo INT,
tipo VARCHAR(45),
CONSTRAINT fkGrupoLinha FOREIGN KEY (fkLinha) REFERENCES linha(idLinha),
CONSTRAINT fkGrupoVeiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(idVeiculo)
);

-- Inserindo empresas
INSERT INTO empresa (cnpj, razaoSocial, nomeFantasia, email, senha) VALUES
('12.345.678/0001-90', 'Transportes Urbanos SP Ltda', 'TransSP', 'contato@transsp.com', 'senha123'),
('98.765.432/0001-10', 'Via Oeste Mobilidade', 'ViaOeste', 'suporte@viaoeste.com', 'senha456');

-- Inserindo endereços
INSERT INTO endereco (idEndereco, Cep, Numero, Cidade, Estado, Logradouro, Complemento, fkEmpresa) VALUES
(101, '01001-000', '1000', 'São Paulo', 'SP', 'Av. Paulista', '10º andar', 1),
(102, '06233-000', '200', 'Osasco', 'SP', 'Rua das Rosas', 'Próximo ao terminal', 2);

-- Inserindo funcionários
INSERT INTO funcionarios (idFuncionario, nome, email, cargo, fkEmpresa) VALUES
(301, 'João da Silva', 'joao@transsp.com', 'Gerente Operacional', 1),
(302, 'Maria Oliveira', 'maria@viaoeste.com', 'Coordenadora de Frota', 2);

-- Inserindo linhas
INSERT INTO linha (idLinha, nome, num, qtdViagensIda, qtdViagensVolta, fkEmpresa) VALUES
(401, 'Linha Centro-Bairro', 'C001', 12, 12, 1),
(402, 'Linha Oeste-Leste', 'O123', 8, 8, 2);

-- Inserindo veículos
INSERT INTO veiculo (tipo, capacidade) VALUES
('Ônibus Articulado', 120),
('Micro-ônibus', 30),
('Ônibus Convencional', 50);

-- Inserindo grupos (linha + veículo)
INSERT INTO grupo (fkLinha, fkVeiculo, tipo) VALUES
(401, 1, "Distribuição"),
(401, 3, "Distribuição"),
(402, 2, "Articulado");

-- Inserindo registros de passageiros
INSERT INTO registro (idRegistro, fkLinha, fkEmpresa, dtRegistro, qtdPassageiros) VALUES
(1000, 401, 1, '2025-04-14 08:00:00', 95),
(1001, 402, 2, '2025-04-14 08:30:00', 28),
(1002, 401, 1, '2025-04-14 12:00:00', 110),
(1003, 402, 2, '2025-04-14 17:45:00', 31);