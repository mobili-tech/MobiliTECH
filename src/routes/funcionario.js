var express = require("express");
var router = express.Router();

var funcionarioRouter = require("../controllers/funcionarioController");

router.get("/listarPorEmpresa/:idEmpresa", function (req, res) {
  funcionarioRouter.listarPorEmpresa(req, res);
});

router.get("/listarFuncionario/:idFuncionario", function (req, res) {
  funcionarioRouter.listarFuncionario(req, res);
});

router.post("/buscarFuncionario/:funcionario", function (req, res) {
  funcionarioRouter.buscarFuncionario(req, res);
});

router.post("/editar", function (req, res) {
  funcionarioRouter.editar(req, res);
});

router.post("/cadastrar", function (req, res) {
  funcionarioRouter.cadastrar(req, res);
});

router.post("/buscarVeiculoPorGrupo/:idGrupo", function (req, res) {
  funcionarioRouter.buscarVeiculoPorGrupo(req, res);
});

module.exports = router;
