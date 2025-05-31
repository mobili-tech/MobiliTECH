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
                                        <span><b>Nome:</b> ${funcionario.nome}</span>
                                        <span><b>Email:</b> ${funcionario.email}</span>
                                        <span><b>Cargo:</b> ${funcionario.cargo}</span>
                                    </div>
                                </div>
                            </div>
                        `;

            var dataInicio = input_dataInicio.value;
            var dataFim = input_dataFim.value;
            buscarVeiculo(idLinha, idGrupo, dataInicio, dataFim);
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

function buscarFuncionario() {
  console.log("passando no js");

  funcionario = input_buscar.value;

  if (linha.length >= 3) {
    fetch(`/Funcionario/buscarFuncionario/${funcionario}`, {
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
              const linha = resposta[i];

              div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.numLinha}</span></div>
                            <div class="div-opcao-header"><span>${linha.empresa}</span></div>
                            <div class="div-opcao-header"><span>${linha.grupo}</span></div>
                            <div class="div-opcao-header"><span>${linha.soma}</span></div>
                            <div class="div-opcao-header"><span>Alta</span></div>
                            <div class="div-opcao-header ult" onclick="abrirModal(${linha.idLinha})"><span>...</span></div>
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
                            <h3>Linha</h3>
                        </div>
                        <div class="div-opcao-header">
                            <h3>Empresa</h3>
                        </div>
                        <div class="div-opcao-header">
                            <h3>Grupo</h3>
                        </div>
                        <div class="div-opcao-header">
                            <h3>Passageiros</h3>
                        </div>
                        <div class="div-opcao-header">
                            <h3>Ocupação</h3>
                        </div>
                        <div class="div-opcao-header ult"></div>
                    </div>`;

    listarLinhas();
  }
}
