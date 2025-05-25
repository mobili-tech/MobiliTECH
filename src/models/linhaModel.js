var database = require("../database/config")

function listarPorEmpresa(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT l.idLinha,
            l.nome AS linha,
            l.num AS numLinha,
            l.qtdViagensIda,
            l.qtdViagensVolta,
            g.idGrupo,
            g.tipo AS grupo,
            e.idEmpresa,
            e.nomeFantasia AS empresa,
            SUM(r.qtdPassageiros) as soma
        FROM linha AS l
        LEFT JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        LEFT JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        LEFT JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = ${idEmpresa}
        GROUP BY l.idLinha;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorLinha(idLinha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT l.idLinha,
		l.nome AS linha,
		l.num AS numLinha,
        (l.qtdViagensIda + l.qtdViagensVolta) AS qtdViagens,
		g.idGrupo,
        g.tipo AS grupo
        FROM linha AS l
        JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        WHERE l.idLinha = ${idLinha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarLinha(linha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT l.idLinha,
            l.nome AS linha,
            l.num AS numLinha,
            l.qtdViagensIda,
            l.qtdViagensVolta,
            g.idGrupo,
            g.tipo AS grupo,
            e.idEmpresa,
            e.nomeFantasia AS empresa
        FROM linha AS l
        JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        WHERE e.idEmpresa = 1 AND (l.nome LIKE '%${linha}%' OR l.num LIKE '%${linha}%');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVeiculoPorGrupo(idGrupo, idEmpresa, idLinha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarVeiculoPorLinha()");
    var instrucaoSql = `
        SELECT
            ve.fkGrupo,
            g.tipo AS grupo,
            ve.fkVeiculo,
            v.tipo AS veiculo,
            v.capacidade,
            ve.fkEmpresa,
            ROUND(((r.qtdPassageiros * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * v.capacidade)) * 100, 1) AS porcentagem
        FROM veiculoEmpresa AS ve
        JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        JOIN linha AS l ON l.fkEmpresa = ve.fkEmpresa
        JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = ${idEmpresa}
        AND g.idGrupo = ${idGrupo}
        AND l.idLinha = ${idLinha}
        AND dtRegistro LIKE '2025-05-20 %';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorEmpresa,
    listarPorLinha,
    buscarLinha,
    buscarVeiculoPorGrupo
};