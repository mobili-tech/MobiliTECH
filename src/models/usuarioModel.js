var database = require("../database/config")

function autenticar(email, senha) {
    console.log("Autenticando usuário:", email);
    var instrucaoSql = `
        (
            SELECT
                idEmpresa AS id,
                email,
                cnpj,
                razaoSocial,
                nomeFantasia AS nome,
                NULL AS cargo,
                NULL AS idEmpresaOrigem,
                'empresa' AS tipo
            FROM empresa
            WHERE email = '${email}' AND senha = '${senha}'
        )
        UNION
        (
            SELECT
                idFuncionario AS id,
                email,
                NULL AS cnpj,
                NULL AS razaoSocial,
                nome,
                cargo,
                fkEmpresa AS idEmpresaOrigem,
                'funcionario' AS tipo
            FROM funcionario
            WHERE email = '${email}' AND senha = '${senha}'
        );
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES ('${nome}', '${email}', '${senha}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};