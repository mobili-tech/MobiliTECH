function listarLinhas() {
    fetch(`/linhas/listarPorEmpresa/${sessionStorage.ID_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    const linha = resposta[i];

                    div_linhas.innerHTML += `
                        <div class="linha-tabela">
                            <div class="div-opcao-header"><span>${linha.numLinha}</span></div>
                            <div class="div-opcao-header"><span>${linha.empresa}</span></div>
                            <div class="div-opcao-header"><span>${linha.grupo}</span></div>
                            <div class="div-opcao-header"><span>12.345</span></div>
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
}

function abrirModal(idLinha) {
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

                                    <button onclick="abrirModal()">X</button>
                                </div>

                                <div class="body-modal">
                                    <div class="div-sup-modal">
                                        <h3><b>Linha: ${linha.numLinha} - ${linha.linha}</b></h3>
                                        <h3><b>Grupo: ${linha.grupo}</b></h3>
                                        <h3><b>Viagens diárias: ${linha.qtdViagens}</b></h3>
                                    </div>

                                    <div class="div-inf-modal">
                                        <div class="column-onibus">
                                            <div class="div-onibus">
                                                <div class="div-img">
                                                    <img src="../assets/tiposOnibus/minionibus.png" alt="imagem-onibus">
                                                </div>

                                                <div class="div-title-onibus">
                                                    <h3></h3>
                                                </div>
                                            </div>
                                            <div class="area-porcent">
                                                118%<i class="bi bi-arrow-up"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
    } else {
        modal.style.display = "none";
    }
}

function buscarLinha() {
    linha = input_buscar.value;

    if (linha.length >= 3) {
        fetch(`/linhas/buscarLinha/${linha}`).then(function (resposta) {
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
                            <div class="div-opcao-header"><span>12.345</span></div>
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