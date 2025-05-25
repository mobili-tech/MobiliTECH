var express = require("express");
var router = express.Router();

var linhaController = require("../controllers/linhaController");

router.get("/listarPorEmpresa/:idEmpresa", function (req, res) {
    linhaController.listarPorEmpresa(req, res);
});

router.get("/listarPorLinha/:idLinha", function (req, res) {
    linhaController.listarPorLinha(req, res);
});

router.get("/buscarLinha/:linha", function (req, res) {
    linhaController.buscarLinha(req, res);
});

router.post("/buscarVeiculoPorGrupo/:idGrupo", function (req, res) {
    linhaController.buscarVeiculoPorGrupo(req, res);
});


module.exports = router;