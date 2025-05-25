var linhaModel = require("../models/linhaModel");

function listarPorEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    linhaModel.listarPorEmpresa(idEmpresa)
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

function listarPorLinha(req, res) {
    var idLinha = req.params.idLinha;

    linhaModel.listarPorLinha(idLinha)
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

function buscarLinha(req, res) {
    var linha = req.params.linha;

    linhaModel.buscarLinha(linha)
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

    linhaModel.buscarVeiculoPorGrupo(idGrupo, idEmpresa, idLinha)
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
    listarPorLinha,
    buscarLinha,
    buscarVeiculoPorGrupo
}