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
            e.nomeFantasia AS empresa
        FROM linha AS l
        JOIN grupo AS g ON g.idGrupo = l.fkGrupo
        JOIN empresa AS e ON e.idEmpresa = l.fkEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
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

module.exports = {
    listarPorEmpresa,
    listarPorLinha,
    buscarLinha,
};