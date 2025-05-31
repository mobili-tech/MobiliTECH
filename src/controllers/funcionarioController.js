var funcionarioModel = require("../models/funcionarioModel");

function listarPorEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    funcionarioModel.listarPorEmpresa(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as linhas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarFuncionario(req, res) {
    var idFuncionario = req.params.idFuncionario;

    funcionarioModel.listarFuncionario(idFuncionario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as linhas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarFuncionario(req, res) {
    var funcionario = req.params.nome;
    var idEmpresa = req.body.idEmpresaServer;

    funcionarioModel.buscarFuncionario(funcionario, idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as linhas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarVeiculoPorGrupo(req, res) {
    var idGrupo = req.params.idGrupo;
    var idEmpresa = req.body.idEmpresaServer;
    var idLinha = req.body.idLinhaServer;
    var dataInicio = req.body.dataInicioServer;
    var dataFim = req.body.dataFimServer;

    linhaModel.buscarVeiculoPorGrupo(idGrupo, idEmpresa, idLinha, dataInicio, dataFim)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as linhas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarPorEmpresa,
    listarFuncionario,
    buscarFuncionario
}