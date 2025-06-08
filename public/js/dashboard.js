let mesPesquisa = input_mes.value;

function handle() {
    mesPesquisa = input_mes.value;

    listarKpis();
    listarPassageiroGrafico();
    listarLinhaGrafico();
    listarPorMaisPassageiro();
    listarPorMenosPassageiro();
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

let proximaAtualizacaoPassageiros;

function listarPassageiroGrafico() {
    if (proximaAtualizacaoPassageiros != undefined) {
        clearTimeout(proximaAtualizacaoPassageiros);
    }

    fetch(`/dashboards/listarQtdPassageiros/${sessionStorage.ID_EMPRESA}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                setTimeout(() => {
                    listarPassageiroGrafico()
                }, 2000);
            } else {
                resposta.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGraficoPassageiro(resposta);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoPassageiro(resposta) {
    let labelsPassageiro = [];

    let dadosPassageiro = {
        labels: labelsPassageiro,
        datasets: [{
            label: 'Passageiros',
            data: [],
            fill: false,
            borderColor: '#fe5000',
            backgroundColor: '#fe5000',
            borderRadius: 10
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];

        labelsPassageiro.push(registro.dtRegistro);
        dadosPassageiro.datasets[0].data.push(registro.qtdPassageiros);
    }

    // Criando estrutura para plotar gráfico - config
    const configPassageiro = {
        type: 'bar',
        data: dadosPassageiro,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '(Mês)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(Passageiros)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChartPassageiro = new Chart(
        document.getElementById(`dash-status-mensal`),
        configPassageiro
    );
}

let proximaAtualizacaoLinhas;

function listarLinhaGrafico() {
    if (proximaAtualizacaoLinhas != undefined) {
        clearTimeout(proximaAtualizacaoLinhas);
    }

    fetch(`/dashboards/listarLinhasMes/${sessionStorage.ID_EMPRESA}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                setTimeout(() => {
                    listarLinhaGrafico()
                }, 2000);
            } else {
                resposta.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGraficoLinha(resposta);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoLinha(resposta) {
    let labelsLinha = [];

    let dadosLinha = {
        labels: labelsLinha,
        datasets: [{
            label: 'Linhas Regulares',
            data: [],
            fill: false,
            borderColor: '#00ff0f',
            backgroundColor: '#00ff0f',
            borderRadius: 10
        },
        {
            label: 'Linhas Superlotadas',
            data: [],
            fill: false,
            borderColor: '#ff0000',
            backgroundColor: '#ff0000',
            borderRadius: 10
        },
        {
            label: 'Linhas SubUtilizadas',
            data: [],
            fill: false,
            borderColor: '#0017ff',
            backgroundColor: '#0017ff',
            borderRadius: 10
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];

        labelsLinha.push(registro.mes);
        dadosLinha.datasets[0].data.push(registro.linhas_regulares);
        dadosLinha.datasets[1].data.push(registro.linhas_superlotadas);
        dadosLinha.datasets[2].data.push(registro.linhas_subutilizadas);
    }

    // Criando estrutura para plotar gráfico - config
    const configLinha = {
        type: 'bar',
        data: dadosLinha,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '(Mês)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(Percentual %)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChartLinha = new Chart(
        document.getElementById(`dash-status-semanal`),
        configLinha
    );
}

function listarPorMaisPassageiro() {
    div_linhas_alto.innerHTML = `
                    <div class="header-tabela">
                  <div class="div-opcao-header">
                    <h3>Linha</h3>
                  </div>
                  <div class="div-opcao-header">
                    <h3>Passageiros</h3>
                  </div>
                </div>
    `;

    fetch(`/linhas/listarPorMaisPassageiro/${sessionStorage.ID_EMPRESA}?mes=${input_mes.value}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < 3; i++) {
                    const linha = resposta[i];

                    div_linhas_alto.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.linha}</span></div>
                            <div class="div-opcao-header"><span>${linha.soma}</span></div>
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

function listarPorMenosPassageiro() {
    div_linhas_baixo.innerHTML = `
                    <div class="header-tabela">
                  <div class="div-opcao-header">
                    <h3>Linha</h3>
                  </div>
                  <div class="div-opcao-header">
                    <h3>Passageiros</h3>
                  </div>
                </div>
    `;

    fetch(`/linhas/listarPorMenosPassageiro/${sessionStorage.ID_EMPRESA}?mes=${input_mes.value}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < 3; i++) {
                    const linha = resposta[i];

                    div_linhas_baixo.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.linha}</span></div>
                            <div class="div-opcao-header"><span>${linha.soma}</span></div>
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