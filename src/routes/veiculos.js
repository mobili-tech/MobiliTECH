var express = require("express");
var router = express.Router();

var veiculoController = require("../controllers/veiculoController");

router.post("/cadastrar", function (req, res) {
    veiculoController.cadastrar(req, res);
})

router.get("/listarPorEmpresa/:idEmpresa", function (req, res) {
    veiculoController.listarPorEmpresa(req, res);
});

router.get("/listar", function (req, res) {
    veiculoController.listar(req, res);
});

router.delete("/deletar", function (req, res) {
    veiculoController.deletar(req, res);
});

module.exports = router;