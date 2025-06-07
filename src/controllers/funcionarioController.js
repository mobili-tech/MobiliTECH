var funcionarioModel = require("../models/funcionarioModel");

function listarPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  funcionarioModel
    .listarPorEmpresa(idEmpresa)
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

function listarFuncionario(req, res) {
  var idFuncionario = req.params.idFuncionario;

  funcionarioModel
    .listarFuncionario(idFuncionario)
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

function buscarFuncionario(req, res) {
  var funcionario = req.params.funcionario;
  var idEmpresa = req.body.idEmpresaServer;

  funcionarioModel
    .buscarFuncionario(funcionario, idEmpresa)
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

function editar(req, res) {
  const idFuncionario = req.body.idFuncionario;
  const nome = req.body.nome;
  const email = req.body.email;
  const cargo = req.body.cargo;

  funcionarioModel
    .editar(idFuncionario, nome, email, cargo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao editar o funcionario: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  const idEmpresa = req.body.idEmpresa;
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const cargo = req.body.cargo;

  funcionarioModel
    .cadastrar(idEmpresa, nome, email, senha, cargo)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao editar o funcionario: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarPorEmpresa,
  listarFuncionario,
  buscarFuncionario,
  editar,
  cadastrar,
};
