var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarLinhasMes/:idEmpresa", function (req, res) {
    dashboardController.listarLinhasMes(req, res);
});

router.get("/listarQtdPassageiros/:idEmpresa", function (req, res) {
    dashboardController.listarQtdPassageiros(req, res);
});

router.get("/listarKpiGerente/:idEmpresa", function (req, res) {
    dashboardController.listarKpiGerente(req, res);
});

module.exports = router;