var express = require("express");
var router = express.Router();

var perfilRouter = require("../controllers/perfilController");

router.get("/buscarUsuario/:idEmpresa", function (req, res) {
  perfilRouter.buscarUsuario(req, res);
});

router.post("/carregarTela/:idEmpresa", function (req, res) {
  perfilRouter.buscarUsuario(req, res);
});

router.post("/editar", function (req, res) {
  perfilRouter.editar(req, res);
});

module.exports = router;
