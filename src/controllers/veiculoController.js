var veiculoModel = require("../models/veiculoModel");

function cadastrar(req, res) {
    var idGrupo = req.body.idGrupoServer;
    var idVeiculo = req.body.idVeiculoServer;
    var idEmpresa = req.body.idEmpresaServer;

    veiculoModel.cadastrar(idGrupo, idVeiculo, idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarPorEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;


    veiculoModel.listarPorEmpresa(idEmpresa)
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
                    "Houve um erro ao buscar os veículos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listar(req, res) {
    veiculoModel.listar()
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
                    "Houve um erro ao buscar os veículos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletar(req, res) {
    var idGrupo = req.body.idGrupoServer;
    var idVeiculo = req.body.idVeiculoServer;
    var idEmpresa = req.body.idEmpresaServer;

    veiculoModel.deletar(idGrupo, idVeiculo, idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    listarPorEmpresa,
    listar,
    deletar
}