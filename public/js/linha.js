let mesPesquisa = input_mes.value;

function mes() {
    mesPesquisa = input_mes.value;
    listarLinhas();
    listarKpis();
}

function listarKpis() {
    fetch(`/dashboards/listarKpiGerente/${sessionStorage.ID_EMPRESA}?mes=${input_mes.value}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                // var feed = document.getElementById("feed_teste");
                // var mensagem = document.createElement("span");
                // mensagem.innerHTML = "Nenhum resultado encontrado."
                // feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            } else {
                resposta.json().then(function (resposta) {
                    var dadosKpi = resposta[0];

                    div_kpis.innerHTML = `
                        <div class="card-kpi">
                            <div class="div-titulo-kpi">
                                <span class="titulo-kpi">Linhas Regulares</span>
                            </div>

                            <div class="div-dados-kpi">
                                <span class="dados-kpi"><span style="color: green">${dadosKpi.linhas_regulares}</span> / ${dadosKpi.total_linhas}</span>
                            </div>
                        </div>

                        <div class="card-kpi">
                            <div class="div-titulo-kpi">
                                <span class="titulo-kpi">Linhas Subutilizadas</span>
                            </div>

                            <div class="div-dados-kpi">
                                <span class="dados-kpi"><span style="color: blue">${dadosKpi.linhas_subutilizadas}</span> / ${dadosKpi.total_linhas}</span>
                            </div>
                        </div>

                        <div class="card-kpi">
                            <div class="div-titulo-kpi">
                                <span class="titulo-kpi">Linhas Superlotadas</span>
                            </div>

                            <div class="div-dados-kpi">
                                <span class="dados-kpi"><span style="color: red">${dadosKpi.linhas_superlotadas}</span> / ${dadosKpi.total_linhas}</span>
                            </div>
                        </div>
                    `;
                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function listarLinhas() {
    fetch(`/linhas/listarPorEmpresa/${sessionStorage.ID_EMPRESA}?mes=${mesPesquisa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    const linha = resposta[i];

                    var nivelOcupacao;

                    if (linha.porcentagem_ocupacao <= 30) {
                        nivelOcupacao = 'Baixa';
                    } else if (linha.porcentagem_ocupacao < 90) {
                        nivelOcupacao = 'Ideal';
                    } else {
                        nivelOcupacao = 'Alta';
                    }

                    div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.linha}</span></div>
                            <div class="div-opcao-header"><span>${linha.empresa}</span></div>
                            <div class="div-opcao-header"><span>${linha.grupo}</span></div>
                            <div class="div-opcao-header"><span>${linha.soma}</span></div>
                            <div class="div-opcao-header"><span>${nivelOcupacao}</span></div>
                            <div class="div-opcao-header ult" onclick="abrirModal(${linha.idLinha}, ${linha.idGrupo})"><i class="bi bi-eye-fill"></i></div>
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

function handleLinha(idLinha, idGrupo) {
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
                                        <span><b>Linha:</b> ${linha.linha}</span>
                                        <span><b>Grupo:</b> ${linha.grupo}</span>
                                        <span><b>Viagens diárias:</b> ${linha.qtdViagens}</span>
                                        <div class="div-data">
                                            <label for="input_dataInicio"><b>Data Inicio: </b></label>
                                            <input type="date" name="input_dataInicio" id="input_dataInicio" class="input-data">
                                            <label for="input_dataFim"><b>Data Fim: </b></label>
                                            <input type="date" name="input_dataFim" id="input_dataFim" class="input-data">
                                            <button onclick="handleLinha(${idLinha}, ${idGrupo})" class="btn-data"><i class="bi bi-search"></i></button>
                                        </div>
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
    div_veiculo.innerHTML = ``;

    fetch(`/linhas/buscarVeiculoPorGrupo/${idGrupo}?mes=${mesPesquisa}`, {
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
                        if (veiculo.porcentagem_ocupacao <= 40) {
                            simbolo = '<i class="bi bi-caret-down-fill" style="color: blue"></i>';
                        } else if (veiculo.porcentagem_ocupacao < 90) {
                            simbolo = '<i class="bi bi-dash" style="color: green"></i>';
                        } else {
                            simbolo = '<i class="bi bi-caret-up-fill" style="color: red"></i>';
                        }

                        div_veiculo.innerHTML += `
                            <div class="column-onibus">
                                <div class="div-onibus">
                                    <div class="div-img">
                                        <img src="../assets/tiposOnibus/${veiculo.fkVeiculo}.png" alt="imagem-onibus">
                                    </div>

                                    <div class="div-title-onibus">
                                        <h3>${veiculo.veiculo}</h3>
                                    </div>
                                </div>
                                <div class="area-porcent">
                                    <span style="font-size: 1rem;">${veiculo.capacidade} (Capacidade total)</span>
                                    <span style="font-size: 1rem;">${veiculo.passageiros} (Passageiros totais)</span>
                                    <p>${veiculo.porcentagem_ocupacao}%${simbolo}</p>
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
        fetch(`/linhas/buscarLinha/${linha}?mes=${mesPesquisa}`, {
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

                        var nivelOcupacao;

                        if (linha.porcentagem_ocupacao <= 40) {
                            nivelOcupacao = 'Baixa';
                        } else if (linha.porcentagem_ocupacao > 100) {
                            nivelOcupacao = 'Alta';
                        } else {
                            nivelOcupacao = 'Ideal';
                        }

                        div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.linha}</span></div>
                            <div class="div-opcao-header"><span>${linha.empresa}</span></div>
                            <div class="div-opcao-header"><span>${linha.grupo}</span></div>
                            <div class="div-opcao-header"><span>${linha.soma}</span></div>
                            <div class="div-opcao-header"><span>${nivelOcupacao}</span></div>
                            <div class="div-opcao-header ult" onclick="abrirModal(${linha.idLinha}, ${linha.idGrupo})"><i class="bi bi-eye-fill"></i></div>
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