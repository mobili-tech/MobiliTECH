const cargo = sessionStorage.CARGO;
const idUsuario = sessionStorage.ID_FUNCIONARIO;

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
    const idEmpresa = sessionStorage.ID_EMPRESA;

    console.log(idEmpresa);
    fetch(`/perfil/buscarUsuario/${idEmpresa}`)
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
                                        <button id="btn_gravar_edit" class="btn_gravar" onclick="editarFuncionario()">Editar</button>
                                    </div>
                                </div>
                            </div>
                        `;

            editar_nome.value = funcionario.nomeFantasia;
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
