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