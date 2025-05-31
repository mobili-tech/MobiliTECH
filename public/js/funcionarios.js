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