function listarLinhas() {
    fetch(`/linhas/listarPorEmpresa/${sessionStorage.ID_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    const linha = resposta[i];

                    var nivelOcupacao;

                    if (linha.porcentagem <= 30) {
                        nivelOcupacao = 'Baixa';
                    } else if (linha.porcentagem < 90) {
                        nivelOcupacao = 'Ideal';
                    } else {
                        nivelOcupacao = 'Alta';
                    }

                    div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.numLinha}</span></div>
                            <div class="div-opcao-header"><span>${linha.empresa}</span></div>
                            <div class="div-opcao-header"><span>${linha.grupo}</span></div>
                            <div class="div-opcao-header"><span>${linha.soma}</span></div>
                            <div class="div-opcao-header"><span>Alta</span></div>
                            <div class="div-opcao-header ult" onclick="abrirModal(${linha.idLinha}, ${linha.idGrupo})"><span>...</span></div>
                        </div>
                    `;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function handle(idLinha, idGrupo) {
    abrirModal(idLinha, idGrupo);
}

function fecharModal() {
    modal.style.display = "none";
}

function abrirModal(idLinha, idGrupo) {
    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "flex";

        fetch(`/linhas/listarPorLinha/${idLinha}`).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    const linha = resposta[0];

                    modal.innerHTML = `
                            <div class="div-modal">
                                <div class="header-modal">
                                    <h2>Informações sobre a linha</h2>

                                    <button onclick="fecharModal()">X</button>
                                </div>

                                <div class="body-modal">
                                    <div class="div-sup-modal">
                                        <div style="display: flex;">
                                            <label for="input_dataInicio">Data Inicio</label>
                                            <input type="date" name="input_dataInicio" id="input_dataInicio">
                                            <label for="input_dataFim">Data Fim</label>
                                            <input type="date" name="input_dataFim" id="input_dataFim">
                                            <button onclick="handle(${idLinha}, ${idGrupo})">aaaaaaaaaaa</button>
                                        </div>
                                        <h3><b>Linha: ${linha.numLinha} - ${linha.linha}</b></h3>
                                        <h3><b>Grupo: ${linha.grupo}</b></h3>
                                        <h3><b>Viagens diárias: ${linha.qtdViagens}</b></h3>
                                    </div>

                                    <div class="div-inf-modal" id="div_veiculo">
                                        
                                    </div>
                                </div>
                            </div>
                        `;

                    var dataInicio = input_dataInicio.value;
                    var dataFim = input_dataFim.value;
                    buscarVeiculo(idLinha, idGrupo, dataInicio, dataFim);
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
    }
    else {
        var dataInicio = input_dataInicio.value;
        var dataFim = input_dataFim.value;
        buscarVeiculo(idLinha, idGrupo, dataInicio, dataFim);
    }
}

function buscarVeiculo(idLinha, idGrupo, dataInicio, dataFim) {
    console.log(idGrupo)
    console.log(dataInicio)
    div_veiculo.innerHTML = ``;
    fetch(`/linhas/buscarVeiculoPorGrupo/${idGrupo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idLinhaServer: idLinha,
            idEmpresaServer: sessionStorage.ID_EMPRESA,
            dataInicioServer: dataInicio != null ? dataInicio : "",
            dataFimServer: dataInicio != null ? dataFim : "",
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_veiculo.innerHTML += `<h3>Não possui registros nesse intervalo</h3>`;
            } else {
                resposta.json().then(function (resposta) {
                    for (let i = 0; i < resposta.length; i++) {
                        const veiculo = resposta[i];

                        var simbolo;
                        if (veiculo.porcentagem <= 30) {
                            simbolo = '<i class="bi bi-caret-down-fill" style="color: blue"></i>';
                        } else if (veiculo.porcentagem < 90) {
                            simbolo = '<i class="bi bi-dash" style="color: green"></i>';
                        } else {
                            simbolo = '<i class="bi bi-caret-up-fill" style="color: red"></i>';
                        }

                        div_veiculo.innerHTML += `
                            <div class="column-onibus">
                                <div class="div-onibus">
                                    <div class="div-img">
                                        <img src="../assets/tiposOnibus/minionibus.png" alt="imagem-onibus">
                                    </div>

                                    <div class="div-title-onibus">
                                        <h3>${veiculo.veiculo}</h3>
                                    </div>
                                </div>
                                <div class="area-porcent">
                                    <span style="font-size: 1rem;">${veiculo.capacidade} (Capacidade total)</span>
                                    <span style="font-size: 1rem;">${veiculo.passageiros} (Passageiros totais)</span>
                                    <p>${veiculo.porcentagem}%${simbolo}</p>
                                </div>
                            </div>
                        `;
                    }
                });
            }
        }
    }).catch(function (erro) {
        // alerta(`${erro}: Houve um erro interno ao remover!`, 'erro');
        console.log(`#ERRO: ${erro}`);
    });
}

function buscarLinha() {
    linha = input_buscar.value;

    if (linha.length >= 3) {
        fetch(`/linhas/buscarLinha/${linha}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idEmpresaServer: sessionStorage.ID_EMPRESA
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
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
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
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