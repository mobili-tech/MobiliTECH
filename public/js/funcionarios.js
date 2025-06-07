const { get } = require("../../src/routes/funcionario");

function listarFuncionarios() {
  fetch(`/funcionario/listarPorEmpresa/${sessionStorage.ID_EMPRESA}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          for (let i = 0; i < resposta.length; i++) {
            const funcionario = resposta[i];

            div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${funcionario.idFuncionario}</span></div>
                            <div class="div-opcao-header"><span>${funcionario.nome}</span></div>
                            <div class="div-opcao-header"><span>${funcionario.email}</span></div>
                            <div class="div-opcao-header"><span>${funcionario.cargo}</span></div>
                            <div class="div-opcao-header ult" onclick="abrirModal(${funcionario.idFuncionario})"><span>
                                            <i class="bi bi-pencil" style="font-size: 1rem;"></i>
                                            </span>
                            </div>
                        </div>
                    `;
          }
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function fecharModal() {
  modal.style.display = "none";
}

function abrirModal(idFuncionario) {
  if (modal.style.display == "none" || modal.style.display == "") {
    modal.style.display = "flex";

    fetch(`/funcionario/listarFuncionario/${idFuncionario}`)
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
                                        <span><b>Cargo:</b> </span>
                                        <input type="text" id="editar_cargo" class="ipt_edit">
                                    </div>
                                    
                                     <div class="div_btn_gravar">
                                        <button id="btn_gravar_edit" class="btn_gravar" onclick="editarFuncionario(${idFuncionario})">Gravar</button>
                                    </div>
                                </div>
                            </div>
                        `;

            editar_nome.value = funcionario.nome;
            editar_email.value = funcionario.email;
            editar_cargo.value = funcionario.cargo;
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

function modalAddFuncionario() {
  if (modal.style.display == "none" || modal.style.display == "") {
    modal.style.display = "flex";
    modal.innerHTML = `
                            <div class="div-modal">
                                <div class="header-modal">
                                    <h2>Informações sobre o funcionario</h2>

                                    <button onclick="fecharModal()">X</button>
                                </div>

                                <div class="body-modal">
                                    <div class="div-sup-modal">
                                        <span><b>Nome:</b> </span>
                                        <input type="text" id="cadastrar_nome" class="ipt_edit" >
                                        <span><b>Email:</b> </span>
                                        <input type="text" id="cadastrar_email" class="ipt_edit">
                                        <span><b>Senha:</b> </span>
                                        <input type="text" id="cadastrar_senha" class="ipt_edit">
                                        <span><b>Cargo:</b> </span>
                                        <input type="text" id="cadastrar_cargo" class="ipt_edit">
                                    </div>
                                    
                                     <div class="div_btn_gravar">
                                        <button id="btn_gravar_edit" class="btn_gravar" onclick="cadastrarFuncionario()">Gravar</button>
                                    </div>
                                </div>
                            </div>
                        `;
  }
}

function cadastrarFuncionario() {
  const nome = document.getElementById("cadastrar_nome");
  const email = document.getElementById("cadastrar_email");
  const senha = document.getElementById("cadastrar_senha");
  const cargo = document.getElementById("cadastrar_cargo");

  fetch(`/funcionario/cadastrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEmpresa: sessionStorage.ID_EMPRESA,
      nome: nome.value,
      email: email.value,
      senha: senha.value,
      cargo: cargo.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        location.reload();
      }
      abrirModal();
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}

function editarFuncionario(idFuncionario) {
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
      abrirModal();
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });
}

function buscarFuncionario() {
  funcionario = input_buscar.value;

  if (funcionario.length >= 1) {
    fetch(`/funcionario/buscarFuncionario/${funcionario}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idEmpresaServer: sessionStorage.ID_EMPRESA,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then(function (resposta) {
            div_linhas.innerHTML = `
                <div class="header-tabela">
                    <div class="div-opcao-header">
                        <h3>ID</h3>
                    </div>
                    <div class="div-opcao-header">
                        <h3>Nome</h3>
                    </div>
                    <div class="div-opcao-header">
                        <h3>E-mail</h3>
                    </div>
                    <div class="div-opcao-header">
                        <h3>Cargo</h3>
                    </div>
                    <div class="div-opcao-header ult"></div>

                </div>`;

            for (let i = 0; i < resposta.length; i++) {
              const funcionario = resposta[i];

              div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${funcionario.idFuncionario}</span></div>
                            <div class="div-opcao-header"><span>${funcionario.nome}</span></div>
                            <div class="div-opcao-header"><span>${funcionario.email}</span></div>
                            <div class="div-opcao-header"><span>${funcionario.cargo}</span></div>
                            <div class="div-opcao-header ult" onclick="abrirModal(${funcionario.idFuncionario})"><span>...</span></div>
                        </div>
                    `;
            }
          });
        } else {
          throw "Houve um erro na API!";
        }
      })
      .catch(function (resposta) {
        console.error(resposta);
      });
  } else {
    div_linhas.innerHTML = `
                <div class="header-tabela">
                    <div class="div-opcao-header">
                        <h3>ID</h3>
                    </div>
                    <div class="div-opcao-header">
                        <h3>Nome</h3>
                    </div>
                    <div class="div-opcao-header">
                        <h3>E-mail</h3>
                    </div>
                    <div class="div-opcao-header">
                        <h3>Cargo</h3>
                    </div>
                    <div class="div-opcao-header ult"></div>

                </div>`;
    listarFuncionarios();
  }
}
