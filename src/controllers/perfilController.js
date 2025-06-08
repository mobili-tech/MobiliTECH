var perfilModel = require("../models/perfilModel");

function buscarUsuario(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var cargo = req.query.cargo;
  var idUsuario = req.query.idUsuario;

  perfilModel
    .buscarInfos(idEmpresa, cargo, idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as linhas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarEmpresaPorId(req, res) {
  var idEmpresa = req.params.idEmpresa;
  var cargo = req.query.cargo;
  var idUsuario = req.query.idUsuario;

  perfilModel
    .buscarInfos(idEmpresa, cargo, idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar empresa: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarUsuario,
  buscarEmpresaPorId,
};
