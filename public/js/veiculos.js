function listarGrupos() {
    div_infos.innerHTML = `
        <div class="div-linha">
            <div class="linha-titulo">
                <h2>Grupo Distribuicao</h2>

                <div class="pencil-icon" id="icone_editar" onclick="editarOnibus()">
                    <i class="bi bi-pencil"></i>
                </div>
            </div>

            <div class="div-row-onibus">
                <div class="div-onibus">
                    <div class="div-delete" id="delete_onibus" onclick="abrirModalDelete()">
                        <i class="bi bi-trash"></i>
                    </div>

                    <div class="div-img">
                        <img src="../assets/tiposOnibus/minionibus.png" alt="imagem-onibus">
                    </div>

                    <div class="div-title-onibus">
                        <h3>Miniônibus</h3>
                    </div>
                </div>

                <div class="div-onibus" id="div_adicionar">
                    <div class="add-icon" onclick="abrirModal()">
                        <i class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="div-linha">
            <div class="linha-titulo">
                <h2>Grupo estrutural</h2>

                <div class="pencil-icon">
                    <i class="bi bi-pencil"></i>
                </div>
            </div>

            <div class="div-row-onibus">
                <div class="div-onibus">
                    <div class="div-img">
                        <img src="../assets/tiposOnibus/basico.png" alt="imagem-onibus">
                    </div>

                    <div class="div-title-onibus">
                        <h3>Básico</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="div-linha">
            <div class="linha-titulo">
                <h2>Grupo articulacao regional</h2>

                <div class="pencil-icon">
                    <i class="bi bi-pencil"></i>
                </div>
            </div>

            <div class="div-row-onibus">
                <div class="div-onibus">
                    <div class="div-img">
                        <img src="../assets/tiposOnibus/articulado.png" alt="imagem-onibus">
                    </div>

                    <div class="div-title-onibus">
                        <h3>Articulado</h3>
                    </div>
                </div>

                <div class="div-onibus">
                    <div class="div-img">
                        <img src="../assets/tiposOnibus/biarticulado.png" alt="imagem-onibus">
                    </div>

                    <div class="div-title-onibus">
                        <h3>Biarticulado</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function editarOnibus() {
    const div_adicionar = document.getElementById("div_adicionar");
    const icone_editar = document.getElementById("icone_editar");
    const delete_onibus = document.getElementById("delete_onibus");

    if (div_adicionar.style.display == "none" || div_adicionar.style.display == "") {
        icone_editar.innerHTML = `<i class="bi bi-check"></i>`;
        div_adicionar.style.display = "flex";
        delete_onibus.style.display = "flex";
    } else {
        div_adicionar.style.display = "none";
        delete_onibus.style.display = "none";
        icone_editar.innerHTML = `<i class="bi bi-pencil"></i>`;
    }
}

function abrirModal() {
    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "flex";

        modal.innerHTML = `
            <div class="div-modal">
                <div class="header-modal">
                    <h2>Adicionar veículo</h2>

                    <button onclick="abrirModal()">X</button>
                </div>

                <div class="body-modal">
                    <h3><b>Grupo:</b> Distribuição</h3>

                    <div class="div-area-select">
                        <h3><b>Selecione o ônibus:</b></h3>

                        <div class="div-select-onibus">
                            <div class="div-onibus">
                                <div class="div-img">
                                    <img src="../assets/tiposOnibus/basico.png" alt="imagem-onibus">
                                </div>

                                <div class="div-title-onibus">
                                    <h3>Básico</h3>
                                </div>
                            </div>

                            <div class="div-info-onibus">
                                <h3><b>Ônibus básico</b></h3>
                                <h3><b>Assentos:</b> 40</h3>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="footer-modal">
                    <button class="btn-cancelar" onclick="abrirModal()">Cancelar</button>
                    <button class="btn-add" onclick="adicionarOnibus()">Adicionar</button>
                </div>
            </div>
        `;
    } else {
        modal.style.display = "none";
    }
}

function abrirModalDelete() {
    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "flex";
        modal.innerHTML = `
            <div class="div-modal" style="height: 30%; width: 40%; text-align: center;">
                <div class="header-modal">
                    <h2>Remover tipo de veículo</h2>

                    <button onclick="abrirModalDelete()">X</button>
                </div>

                <div class="body-modal">
                    <div class="div-area-select">
                        <h3>Deseja <b>remover</b> veículo <b>"Miniônibus"</b> do grupo de Distribuição?</h3>
                    </div>
                </div>

                <div class="footer-modal">
                    <button class="btn-cancelar" onclick="abrirModalDelete()">Cancelar</button>
                    <button class="btn-add" onclick="removerOnibus()">Remover</button>
                </div>
            </div>
        `;
    } else {
        modal.style.display = "none";
    }
}

function adicionarOnibus() {
    abrirModal();
    editarOnibus();
}

function removerOnibus() {
    abrirModal();
    editarOnibus();
}