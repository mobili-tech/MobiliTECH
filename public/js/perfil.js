const idEmpresa = sessionStorage.ID_EMPRESA;
const cargo = sessionStorage.CARGO_USUARIO;
const idUsuario = sessionStorage.ID_USUARIO;

function editar(idFuncionario) {
  const nome = document.getElementById("editar_nome");
  const email = document.getElementById("editar_email");
  const cargo = document.getElementById("editar_cargo");

  fetch(`/funcionario/editar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idFuncionario: idFuncionario,
      nome: nome.value,
      email: email.value,
      cargo: cargo.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        location.reload();
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}

function abrir() {
  if (modal.style.display == "none" || modal.style.display == "") {
    modal.style.display = "flex";

    fetch(
      `/perfil/buscarUsuario/${idEmpresa}?cargo=${cargo}&idUsuario=${idUsuario}`
    )
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            const funcionario = resposta[0];

            modal.innerHTML = `
                            <div class="div-modal">
                                <div class="header-modal">
                                    <h2>Informações sobre o funcionario</h2>

                                    <button onclick="fecharModal()">X</button>
                                </div>

                                <div class="body-modal">
                                    <div class="div-sup-modal">
                                        <span><b>Nome:</b> </span>
                                        <input type="text" id="editar_nome" class="ipt_edit" >
                                        <span><b>Email:</b> </span>
                                        <input type="text" id="editar_email" class="ipt_edit">
                                        <span><b>Senha:</b> </span>
                                        <input type="text" id="editar_senha" class="ipt_edit">
                                    </div>
                                    
                                     <div class="div_btn_gravar">
                                        <button id="btn_gravar_edit" class="btn_gravar" onclick="editar(${idEmpresa})">Editar</button>
                                    </div>
                                </div>
                            </div>
                        `;

            editar_nome.value = funcionario.nome;
            editar_email.value = funcionario.email;
            editar_senha.value = funcionario.senha;
          });
        } else {
          throw "Houve um erro na API!";
        }
      })
      .catch(function (resposta) {
        console.error(resposta);
      });
  }
}

function fecharModal() {
  modal.style.display = "none";
}

function carregarTela() {
  if (!idEmpresa) {
    console.error("ID da empresa não encontrado na sessionStorage.");
    return;
  }

  fetch(
    `/perfil/buscarEmpresaPorId/${idEmpresa}?cargo=${cargo}&idUsuario=${idUsuario}`
  )
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          const empresa = resposta[0];
          nome_span.innerHTML = empresa.nome;
          email_span.innerHTML = empresa.email;
        });
      } else {
        console.error("Erro ao buscar empresa: ", resposta.statusText);
      }
    })
    .catch(function (erro) {
      console.error("Erro na requisição fetch: ", erro);
    });
}

function editar(idEmpresa) {
  const nome = document.getElementById("editar_nome");
  const email = document.getElementById("editar_email");
  const senha = document.getElementById("editar_senha");

  fetch(`/perfil/editar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresa: idEmpresa,
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        location.reload();
      }
      abrir();
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}
