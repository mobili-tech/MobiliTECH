function listarGrupos() {
    fetch(`/veiculos/listarPorEmpresa/${sessionStorage.ID_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                // var feed = document.getElementById("feed_teste");
                // var mensagem = document.createElement("span");
                // mensagem.innerHTML = "Nenhum resultado encontrado."
                // feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            } else {
                resposta.json().then(function (resposta) {
                    var veiculosGrupo1 = [];
                    var veiculosGrupo2 = [];
                    var veiculosGrupo3 = [];

                    for (let i = 0; i < resposta.length; i++) {
                        if (resposta[i].fkGrupo == 1) {
                            veiculosGrupo1.push(resposta[i]);
                        } else if (resposta[i].fkGrupo == 2) {
                            veiculosGrupo2.push(resposta[i]);
                        } else if (resposta[i].fkGrupo == 3) {
                            veiculosGrupo3.push(resposta[i]);
                        }
                    }

                    for (let i = 0; i < veiculosGrupo1.length; i++) {
                        div_grupo1.innerHTML += `
                            <div class="div-onibus">
                                <div class="div-delete delete-onibus grupo1" onclick="abrirModalDelete(${veiculosGrupo1[i].fkGrupo}, ${veiculosGrupo1[i].fkVeiculo}, ${veiculosGrupo1[i].fkEmpresa}, '${veiculosGrupo1[i].veiculo}', '${veiculosGrupo1[i].grupo}')">
                                    <i class="bi bi-trash"></i>
                                </div>

                                <div class="div-img">
                                    <img src="../assets/tiposOnibus/${veiculosGrupo1[i].fkVeiculo}.png" alt="imagem-onibus">
                                </div>

                                <div class="div-title-onibus">
                                    <h3>${veiculosGrupo1[i].veiculo}</h3>
                                </div>
                            </div>
                        `;
                    }

                    for (let i = 0; i < veiculosGrupo2.length; i++) {
                        div_grupo2.innerHTML += `
                            <div class="div-onibus">
                                <div class="div-delete delete-onibus grupo2" onclick="abrirModalDelete(${veiculosGrupo2[i].fkGrupo}, ${veiculosGrupo2[i].fkVeiculo}, ${veiculosGrupo2[i].fkEmpresa}, '${veiculosGrupo2[i].veiculo}', '${veiculosGrupo2[i].grupo}')">
                                    <i class="bi bi-trash"></i>
                                </div>

                                <div class="div-img">
                                    <img src="../assets/tiposOnibus/${veiculosGrupo2[i].fkVeiculo}.png" alt="imagem-onibus">
                                </div>

                                <div class="div-title-onibus">
                                    <h3>${veiculosGrupo2[i].veiculo}</h3>
                                </div>
                            </div>
                        `;
                    }

                    for (let i = 0; i < veiculosGrupo3.length; i++) {
                        div_grupo3.innerHTML += `
                            <div class="div-onibus">
                                <div class="div-delete delete-onibus grupo3" onclick="abrirModalDelete(${veiculosGrupo3[i].fkGrupo}, ${veiculosGrupo3[i].fkVeiculo}, ${veiculosGrupo3[i].fkEmpresa}, '${veiculosGrupo3[i].veiculo}', '${veiculosGrupo3[i].grupo}')">
                                    <i class="bi bi-trash"></i>
                                </div>

                                <div class="div-img">
                                    <img src="../assets/tiposOnibus/${veiculosGrupo3[i].fkVeiculo}.png" alt="imagem-onibus">
                                </div>

                                <div class="div-title-onibus">
                                    <h3>${veiculosGrupo3[i].veiculo}</h3>
                                </div>
                            </div>
                        `;
                    }
                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function editarOnibus(idGrupo, icone_editar) {
    const div_adicionar = document.querySelector(`.div_adicionar.grupo${idGrupo}`);
    const mostrar = div_adicionar.style.display === "none" || div_adicionar.style.display === "";

    div_adicionar.style.display = mostrar ? "flex" : "none";
    icone_editar.innerHTML = mostrar ? `<i class="bi bi-check"></i>` : `<i class="bi bi-pencil"></i>`;

    const deleteButtons = document.querySelectorAll(`.delete-onibus.grupo${idGrupo}`);
    deleteButtons.forEach(btn => {
        btn.style.display = mostrar ? "flex" : "none";
    });
}

function abrirModal(idGrupo) {
    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "flex";

        listarVeiculos();

        modal.innerHTML = `
            <div class="div-modal" style="height: 50%">
                <div class="header-modal">
                    <h2>Adicionar veículo</h2>

                    <button onclick="abrirModal()">X</button>
                </div>

                <div class="body-modal">
                    <h3><b>Grupo:</b> Distribuição</h3>

                    <div class="div-area-select">
                        <h3><b>Selecione o ônibus:</b></h3>

                        <div class="div-select-onibus" id="selectVeiculo">
                            
                        </div>

                    </div>

                </div>

                <div class="footer-modal">
                    <button class="btn-cancelar" onclick="abrirModal()">Cancelar</button>
                    <button class="btn-add" onclick="adicionarOnibus(${idGrupo})">Adicionar</button>
                </div>
            </div>
        `;
    } else {
        modal.style.display = "none";
    }
}

function abrirModalDelete(idGrupo, idVeiculo, idEmpresa, nomeVeiculo, nomeGrupo) {
    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "flex";
        modal.innerHTML = `
            <div class="div-modal" style="height: 20%; width: 40%; text-align: center;">
                <div class="header-modal">
                    <h2>Remover tipo de veículo</h2>

                    <button onclick="abrirModalDelete()">X</button>
                </div>

                <div class="body-modal">
                    <div class="div-area-select" style="height: 100%; justify-content: center">
                        <h3>Deseja <b>remover</b> veículo <b>"${nomeVeiculo}"</b> do ${nomeGrupo}?</h3>
                    </div>
                </div>

                <div class="footer-modal">
                    <button class="btn-cancelar" onclick="abrirModalDelete()">Cancelar</button>
                    <button class="btn-add" onclick="removerOnibus(${idGrupo}, ${idVeiculo}, ${idEmpresa})">Remover</button>
                </div>
            </div>
        `;
    } else {
        modal.style.display = "none";
    }
}

function adicionarOnibus(idGrupo) {
    if (onibusSelecionado == null) {
        return false;
    }

    fetch(`/veiculos/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresaServer: sessionStorage.ID_EMPRESA,
            idGrupoServer: idGrupo,
            idVeiculoServer: onibusSelecionado,
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            alerta('Novo veiculo adicionado', 'sucesso');

            const nomeGrupo = idGrupo == 3 ? "Estrutural" : idGrupo == 1 ? "Articulado" : idGrupo == 2 ? "Distribuição" : "Desconhecido";
            notificarSlack("ação", `Adicionou veículo ${onibusSelecionado} ao grupo ${nomeGrupo}.`);

            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            abrirModal();
            editarOnibus();
            alerta('Houve um erro ao adicionar', 'erro');
        }

    }).catch(function (erro) {
        alerta(`${erro}: Houve um erro interno ao adicionar!`, 'erro');
        console.log(`#ERRO: ${erro}`);
    });
}

function removerOnibus(idGrupo, idVeiculo, idEmpresa) {
    fetch(`/veiculos/deletar`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idGrupoServer: idGrupo,
            idVeiculoServer: idVeiculo,
            idEmpresaServer: idEmpresa,
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            alerta('Veículo removido', 'sucesso');
            const nomeGrupo = idGrupo == 3 ? "Estrutural" : idGrupo == 1 ? "Articulado" : idGrupo == 2 ? "Distribuição" : "Desconhecido";
            notificarSlack("ação", `Removeu o veículo ${idVeiculo} ao grupo ${nomeGrupo}.`);

            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            abrirModal();
            editarOnibus();
            listarGrupos();
            alerta('Houve um erro ao remover', 'erro');
            throw "Houve um erro ao tentar remover!";
        }
    }).catch(function (erro) {
        // alerta(`${erro}: Houve um erro interno ao remover!`, 'erro');
        console.log(`#ERRO: ${erro}`);
    });

    return false;
}

var onibusSelecionado;

function obtemIdOnibus(idVeiculo, event) {
    onibusSelecionado = idVeiculo;

    const todosOnibus = document.querySelectorAll(".umOnibus");
    todosOnibus.forEach(onibus => {
        onibus.classList.remove("onibus-selecionado");
    });

    const clicado = event.currentTarget;
    clicado.classList.add("onibus-selecionado");
}

function listarVeiculos() {
    fetch(`/veiculos/listar/`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    const veiculo = resposta[i];

                    selectVeiculo.innerHTML += `
                        <div class="umOnibus" onclick="obtemIdOnibus(${veiculo.idVeiculo}, event)">
                            <div class="div-onibus">
                                <div class="div-img">
                                    <img src="../assets/tiposOnibus/${veiculo.idVeiculo}.png" alt="imagem-onibus">
                                </div>
                            </div>

                            <div class="div-info-onibus">
                                <div class="div-title-onibus">
                                    <h3>${veiculo.tipo}</h3>
                                </div>
                                <h3><b>${veiculo.tipo}</b></h3>
                                <h3><b>Assentos:</b> ${veiculo.capacidade}</h3>
                            </div>
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