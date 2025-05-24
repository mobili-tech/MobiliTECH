var database = require("../database/config")

function cadastrar(idGrupo, idVeiculo, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idGrupo, idVeiculo, idEmpresa);
    var instrucaoSql = `
        INSERT INTO veiculoEmpresa (fkGrupo, fkVeiculo, fkEmpresa) VALUES ('${idGrupo}', '${idVeiculo}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorEmpresa(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT ve.fkGrupo,
        g.tipo AS grupo,
        ve.fkVeiculo,
        v.tipo AS veiculo,
        v.capacidade,
        ve.fkEmpresa
        FROM veiculoEmpresa AS ve
        JOIN grupo AS g ON g.idGrupo = ve.fkGrupo
        JOIN veiculo AS v ON v.idVeiculo = ve.fkVeiculo
        JOIN empresa AS e ON e.idEmpresa = ve.fkEmpresa
        WHERE e.idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT ve.idVeiculo,
        ve.tipo,
        ve.capacidade
        FROM veiculo AS ve;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idGrupo, idVeiculo, idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idGrupo, idVeiculo, idEmpresa);
    var instrucaoSql = `
        DELETE FROM veiculoEmpresa WHERE fkGrupo = ${idGrupo} AND fkVeiculo = ${idVeiculo} AND fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listarPorEmpresa,
    listar,
    deletar
};