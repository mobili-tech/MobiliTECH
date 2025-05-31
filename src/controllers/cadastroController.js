var aquarioModel = require("../models/cadastroModel");

// function buscarAquariosPorEmpresa(req, res) {
//   var idUsuario = req.params.idUsuario;

//   aquarioModel.buscarAquariosPorEmpresa(idUsuario).then((resultado) => {
//     if (resultado.length > 0) {
//       res.status(200).json(resultado);
//     } else {
//       res.status(204).json([]);
//     }
//   }).catch(function (erro) {
//     console.log(erro);
//     console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
//     res.status(500).json(erro.sqlMessage);
//   });
// }


function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idEmpresa = req.body.idEmpresa;
  var RazaoSocial = req.body.RazaoSocial;
  var NomeFantasia = req.body.NomeFantasia;
  var CNPJ = req.body.CNPJ;
  var CEP = req.body.CEP;
  var Cidade = req.body.Cidade;
  var Logradouro = req.body.Logradouro;
  var Numero = req.body.Numero;
  var Complemento = req.body.Complemento;
  var Bairro = req.body.Bairro;
  var Email = req.body.Email;
  var Senha = req.body.Senha;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else {

cadastroModel.cadastrar(

idEmpresa,
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
Senha)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar
}