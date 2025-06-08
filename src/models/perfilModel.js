var database = require("../database/config");

function buscarInfos(idEmpresa, cargo, idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarVeiculoPorLinha()"
  );
  if (cargo == "empresa") {
    var instrucaoSql = `
        SELECT *, nomeFantasia as nome
        FROM empresa
        WHERE idEmpresa = ${idEmpresa};
    `;
  } else {
    var instrucaoSql = `
        SELECT 
            nome, 
            email, 
            cargo,
            senha 
            FROM funcionario
            where idFuncionario = ${idUsuario};  
    `;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editar(idEmpresa, nome, email, senha) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()"
  );
  var instrucaoSql = `
        UPDATE 
            empresa
            SET nomeFantasia = "${nome}", 
            email = "${email}", 
            senha = "${senha}"
            WHERE idEmpresa = ${idEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarInfos,
  editar,
};
