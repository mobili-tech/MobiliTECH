// sessão
function validarSessao() {
  var cargo = sessionStorage.CARGO_USUARIO;
  var email = sessionStorage.EMAIL_USUARIO;
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var idUsuario = sessionStorage.ID_USUARIO;

  if (
    cargo == null ||
    email == null ||
    idEmpresa == null ||
    idUsuario == null
  ) {
    limparSessao();
  }
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "../login.html";
}

function validarTipoUsuario(pagina) {
  var cargo = sessionStorage.CARGO_USUARIO;

  if (cargo == "Analista de Frota") {
    if (pagina == "dashboard") {
      window.location.href = "./linhas.html";
    }

    if (pagina == "veiculo") {
      pencil1.style.display = "none";
      pencil2.style.display = "none";
      pencil3.style.display = "none";
    }

    if (pagina == "page-perfil") {
      div_edit_perfil.display = "none";
    }

    side_fun.style.display = "none";
    side_das.style.display = "none";
  } else if (cargo == "Gerente Operacional") {
    if (pagina == "linha") {
      div_kpis.style.display = "none";
      div_area_tabela.style.height = "75vh";
    }

    if (pagina == "page-perfil") {
      div_edit_perfil.display = "none";
    }

    side_fun.style.display = "none";
  } else {
  }
}
