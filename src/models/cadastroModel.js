var database = require("../database/config");

// function buscarAquariosPorEmpresa(empresaId) {

//   var instrucaoSql = `SELECT * FROM aquario a WHERE fk_empresa = ${empresaId}`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }

function cadastrar(idEmpresa,
RazaoSocial, 
NomeFantasia, 
CNPJ, 
CEP, 
Cidade, 
Logradouro, 
Numero, 
Complemento, 
Bairro, 
Email, 
Senha) {
  
  var instrucaoSql = `INSERT INTO (idEmpresa
RazaoSocial, 
NomeFantasia, 
CNPJ, 
CEP, 
Cidade, 
Logradouro, 
Numero, 
Complemento, 
Bairro, 
Email, 
Senha ) aquario VALUES (${idEmpresa}, ${RazaoSocial}, ${NomeFantasia}, ${CNPJ}, ${CEP}, ${Cidade}, ${Logradouro}, ${Numero}, ${Complemento}, ${Bairro}, ${Email}, ${Senha})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  cadastrar
}
