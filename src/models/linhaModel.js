var database = require("../database/config")

function listarPorEmpresa(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT 
            l.idLinha,
            l.nome AS linha,
            l.qtdViagensIda,
            l.qtdViagensVolta,
            g.idGrupo,
            g.tipo AS grupo,
            e.idEmpresa,
            e.razaoSocial AS empresa,
            SUM(r.qtdPassageiros) AS soma,
            ROUND(((SUM(r.qtdPassageiros) * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * AVG(v.capacidade))) * 100, 1) AS porcentagem_ocupacao
        FROM linha AS l
        LEFT JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        LEFT JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        LEFT JOIN registro AS r ON r.fkLinha = l.idLinha
        LEFT JOIN veiculoEmpresa AS ve ON ve.fkEmpresa = l.fkEmpresa AND ve.fkGrupo = l.fkGrupo
        LEFT JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        WHERE e.idEmpresa = ${idEmpresa}
        GROUP BY l.idLinha
        ORDER BY g.idGrupo, l.idLinha;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorLinha(idLinha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT l.idLinha,
		l.nome AS linha,
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

function buscarLinha(linha, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarLinha()");
    var instrucaoSql = `
        SELECT 
            l.idLinha,
            l.nome AS linha,
            l.qtdViagensIda,
            l.qtdViagensVolta,
            g.idGrupo,
            g.tipo AS grupo,
            e.idEmpresa,
            e.razaoSocial AS empresa,
            SUM(r.qtdPassageiros) AS soma,
            ROUND(((SUM(r.qtdPassageiros) * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * AVG(v.capacidade))) * 100, 1) AS porcentagem_ocupacao
        FROM linha AS l
        LEFT JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        LEFT JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        LEFT JOIN registro AS r ON r.fkLinha = l.idLinha
        LEFT JOIN veiculoEmpresa AS ve ON ve.fkEmpresa = l.fkEmpresa AND ve.fkGrupo = l.fkGrupo
        LEFT JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        WHERE e.idEmpresa = ${idEmpresa} AND (l.nome LIKE '%${linha}%' OR l.num LIKE '%${linha}%')
        GROUP BY l.idLinha
        ORDER BY g.idGrupo, l.idLinha;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVeiculoPorGrupo(idGrupo, idEmpresa, idLinha, dataInicio, dataFim) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarVeiculoPorLinha()");
    if (dataInicio != "" || dataFim != "") {
        var instrucaoSql = `
        SELECT
            ve.fkGrupo,
            g.tipo AS grupo,
            ve.fkVeiculo,
            v.tipo AS veiculo,
            SUM(v.capacidade) AS capacidade,
            ve.fkEmpresa,
		    ROUND(((SUM(r.qtdPassageiros) * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * v.capacidade)) * 100, 1) AS porcentagem,
            SUM(r.qtdPassageiros) as passageiros
        FROM veiculoEmpresa AS ve
        JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        JOIN linha AS l ON l.fkEmpresa = ve.fkEmpresa
        JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = ${idEmpresa}
        AND g.idGrupo = ${idGrupo}
        AND l.idLinha = ${idLinha}
        AND dtRegistro >= '${dataInicio}' && dtRegistro <= '${dataFim}'
        GROUP BY l.idLinha, v.idVeiculo, e.idEmpresa;
    `;
    } else {
        var instrucaoSql = `
        SELECT
            ve.fkGrupo,
            g.tipo AS grupo,
            ve.fkVeiculo,
            v.tipo AS veiculo,
            SUM(v.capacidade) AS capacidade,
            ve.fkEmpresa,
		    ROUND(((SUM(r.qtdPassageiros) * 1.0) / ((l.qtdViagensIda + l.qtdViagensVolta) * v.capacidade)) * 100, 1) AS porcentagem,
            SUM(r.qtdPassageiros) as passageiros
        FROM veiculoEmpresa AS ve
        JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        JOIN linha AS l ON l.fkEmpresa = ve.fkEmpresa
        JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = ${idEmpresa}
        AND g.idGrupo = ${idGrupo}
        AND l.idLinha = ${idLinha}
        AND MONTH(dtRegistro) = MONTH(CURDATE())
        AND YEAR(dtRegistro) = YEAR(CURDATE())
        GROUP BY l.idLinha, v.idVeiculo, e.idEmpresa;
    `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorMaisPassageiro(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorMaisPassageiro()");
    var instrucaoSql = `
        SELECT l.idLinha,
            l.nome AS linha,
            l.qtdViagensIda,
            l.qtdViagensVolta,
            g.idGrupo,
            g.tipo AS grupo,
            e.idEmpresa,
            e.razaoSocial AS empresa,
            SUM(r.qtdPassageiros) as soma
        FROM linha AS l
        LEFT JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        LEFT JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        LEFT JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = ${idEmpresa}
        AND r.qtdPassageiros > 0
        GROUP BY l.idLinha
        ORDER BY soma DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorMenosPassageiro(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorMenosPassageiro()");
    var instrucaoSql = `
        SELECT l.idLinha,
            l.nome AS linha,
            l.qtdViagensIda,
            l.qtdViagensVolta,
            g.idGrupo,
            g.tipo AS grupo,
            e.idEmpresa,
            e.razaoSocial AS empresa,
            SUM(r.qtdPassageiros) as soma
        FROM linha AS l
        LEFT JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        LEFT JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        LEFT JOIN registro AS r ON r.fkLinha = l.idLinha
        WHERE e.idEmpresa = ${idEmpresa}
        AND r.qtdPassageiros > 0
        GROUP BY l.idLinha
        ORDER BY soma;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorEmpresa,
    listarPorLinha,
    buscarLinha,
    buscarVeiculoPorGrupo,
    listarPorMaisPassageiro,
    listarPorMenosPassageiro
};