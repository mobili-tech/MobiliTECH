var database = require("../database/config");

function listarPorEmpresa(idEmpresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()"
  );
  var instrucaoSql = `
        SELECT 
            idFuncionario, 
            nome, 
            email, 
            cargo 
            FROM funcionario
            where fkEmpresa = ${idEmpresa};  
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarFuncionario(idFuncionario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()"
  );
  var instrucaoSql = `
        SELECT 
            nome, 
            email, 
            cargo 
            FROM funcionario
            where idFuncionario = ${idFuncionario};  
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarFuncionario(funcionario, idEmpresa) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarLinha()"
  );
  var instrucaoSql = `
        SELECT 
            idFuncionario, 
            nome, 
            email, 
            cargo 
        FROM funcionario
            where fkEmpresa = ${idEmpresa} 
            AND nome LIKE ${funcionario}; 
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarVeiculoPorGrupo(
  idGrupo,
  idEmpresa,
  idLinha,
  dataInicio,
  dataFim
) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarVeiculoPorLinha()"
  );
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
        GROUP BY l.idLinha, v.idVeiculo, e.idEmpresa;
    `;
  }
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listarPorEmpresa,
  listarFuncionario,
  buscarFuncionario,
};
