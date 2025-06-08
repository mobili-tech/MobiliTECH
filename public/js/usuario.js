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

function buscarPorIdentificador() {
    var identificadorEmpresa = input_identificador.value;

    fetch(`/usuarios/buscarEmpresaPorIdentificador/${identificadorEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                const empresa = resposta[0];

                div_conteudo.style.display = 'flex';
                div_identificador.style.display = 'none';

                input_nome.value = empresa.nomeFantasia;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function cadastrarEmpresa() {
    var razaoSocial = input_nome.value;
    // var razaoSocial = input_razao_social.value;
    var idEmpresa = input_identificador.value;
    var cnpj = input_cnpj.value;
    var email = input_email.value;
    var senha = input_senha.value;

    fetch(`/usuarios/cadastrarEmpresa`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            razaoSocialServer: razaoSocial,
            idEmpresaServer: idEmpresa,
            cnpjServer: cnpj,
            emailServer: email,
            senhaServer: senha,
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            setTimeout(() => {
                window.location.href = "./login.html";
            }, 1000);
        } else {
            alerta('Houve um erro ao cadastrar empresa', 'erro');
        }

    }).catch(function (erro) {
        alerta(`${erro}: Houve um erro interno ao cadastrar!`, 'erro');
        console.log(`#ERRO: ${erro}`);
    });
}