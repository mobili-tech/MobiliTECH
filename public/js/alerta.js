function alerta(textoAlerta, tipo) {
    var icone = 'bi bi-check-circle-fill';
    var cor = 'green';

    if (tipo == 'erro') {
        icone = 'bi bi-exclamation-triangle-fill';
        cor = 'red';
    }

    div_alerta.innerHTML = `
        <i class="${icone}"></i>

        <h4>${textoAlerta}</h4>
    `;

    div_alerta.style.background = `${cor}`;
    div_alerta.style.display = 'flex';

    setTimeout(() => {
        div_alerta.style.display = 'none';
    }, "2000");
}

function listarNotificacoes() {
    if (div_notificacao.style.display == 'flex') {
        div_notificacao.style.display = 'none';
    } else {
        div_notificacao.style.display = 'flex';

        for (let i = 0; i < 7; i++) {
            div_notificacao.innerHTML += `
                <div class="div-notif">
                    <div class="div-area-icon-notif">
                        <i class="bi bi-bell" style="font-size: 1.2rem;"></i>
                    </div>
                    
                    <div class="div-area-mensagem-notif">
                        <div>
                            <h4>Linha acima do esperado</h4>
                            <span>20min</span>
                        </div>
                        <span>A linha 2009-10 está acima do esperado</span>
                    </div>
                </div>
            `;
        }
    }
}