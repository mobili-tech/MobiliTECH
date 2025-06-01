function entrar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.ID_EMPRESA = json.idEmpresa;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.CARGO_USUARIO = json.tipo;

                input_email.style.border = `solid 2px green`;
                input_senha.style.border = `solid 2px green`;

                setTimeout(function () {
                    window.location = "./dashboard/dashboard.html";
                }, 1000);
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
                alerta(`Email ou senha inválido!`, 'erro');
                input_email.style.border = `solid 2px red`;
                input_senha.style.border = `solid 2px red`;
            });
        }
    }).catch(function (erro) {
        alerta(`${erro}: Erro interno ao realizar login!`, 'erro');
        console.log(erro);
    })

    return false;
}