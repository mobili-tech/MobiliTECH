var database = require("../database/config")

function listarQtdPassageiros(idEmpresa) {
    var instrucaoSql = `
        SELECT 
            SUM(qtdPassageiros) AS qtdPassageiros,
            MONTHNAME(dtRegistro) AS dtRegistro
            FROM registro AS r
            WHERE r.fkEmpresa = ${idEmpresa}
            GROUP BY 
                MONTHNAME(dtRegistro)
            ORDER BY MONTHNAME(dtRegistro);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarLinhasMes(idEmpresa) {
    var instrucaoSql = `
            SELECT 
                sub.mes,
                ROUND(COUNT(CASE WHEN sub.eficiencia BETWEEN 0.3 AND 0.9 THEN 1 END) * 100.0 / COUNT(*), 2) AS linhas_regulares,
                ROUND(COUNT(CASE WHEN sub.eficiencia > 0.9 THEN 1 END) * 100.0 / COUNT(*), 2) AS linhas_superlotadas,
                ROUND(COUNT(CASE WHEN sub.eficiencia < 0.3 THEN 1 END) * 100.0 / COUNT(*), 2) AS linhas_subutilizadas,
                COUNT(*) AS total_linhas
            FROM (
                SELECT 
                    l.idLinha, 
                    l.fkEmpresa,
                    DATE_FORMAT(r.dtRegistro, '%Y-%m') AS mes,
                    (
                        SUM(CASE WHEN r.qtdPassageiros IS NOT NULL THEN r.qtdPassageiros ELSE 0 END) /
                        NULLIF(
                            (l.qtdViagensIda + l.qtdViagensVolta) *
                            COUNT(DISTINCT r.dtRegistro),
                            0
                        )
                    ) / ve.capacidade AS eficiencia
                FROM linha l
                JOIN registro r ON r.fkLinha = l.idLinha AND r.dtRegistro IS NOT NULL
                JOIN (
                    SELECT ve.fkEmpresa, ve.fkGrupo, AVG(v.capacidade) AS capacidade
                    FROM veiculoEmpresa ve
                    JOIN veiculo v ON v.idVeiculo = ve.fkVeiculo
                    GROUP BY ve.fkEmpresa, ve.fkGrupo
                ) AS ve ON ve.fkEmpresa = l.fkEmpresa AND ve.fkGrupo = l.fkGrupo
                WHERE l.fkEmpresa = ${idEmpresa}
                GROUP BY l.idLinha, l.fkEmpresa, ve.capacidade, l.qtdViagensIda, l.qtdViagensVolta, DATE_FORMAT(r.dtRegistro, '%Y-%m')
            ) AS sub
            GROUP BY sub.mes
            ORDER BY sub.mes;
            `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarKpiGerente(idEmpresa, mes) {
    // console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorEmpresa()");
    var instrucaoSql = `
        SELECT 
            e.idEmpresa,
            COUNT(CASE 
                WHEN eficiencia BETWEEN 0.3 AND 0.9 THEN 1
            END) AS linhas_regulares,
            COUNT(CASE 
                WHEN eficiencia > 0.9 THEN 1
            END) AS linhas_superlotadas,
            COUNT(CASE 
                WHEN eficiencia < 0.3 THEN 1
            END) AS linhas_subutilizadas,
            COUNT(CASE 
                WHEN eficiencia IS NOT NULL THEN 1
            END) AS total_linhas,
            COUNT(CASE 
                WHEN eficiencia IS NULL THEN 1
            END) AS linhas_sem_dado -- opcional, só pra conferência
        FROM (
            SELECT 
                l.idLinha, 
                l.fkEmpresa,
                SUM(CASE WHEN r.dtRegistro LIKE '${mes}-%' THEN r.qtdPassageiros ELSE 0 END) AS total_passageiros,
                (l.qtdViagensIda + l.qtdViagensVolta) AS total_viagens,
                (
                    SUM(CASE WHEN r.dtRegistro LIKE '${mes}-%' THEN r.qtdPassageiros ELSE 0 END) / 
                    NULLIF((l.qtdViagensIda + l.qtdViagensVolta) * COUNT(DISTINCT CASE WHEN r.dtRegistro LIKE '${mes}-%' THEN r.dtRegistro END), 0)
                ) / ve.capacidade AS eficiencia
            FROM linha l
            LEFT JOIN registro r ON r.fkLinha = l.idLinha
            JOIN (
                SELECT ve.fkEmpresa, ve.fkGrupo, AVG(v.capacidade) AS capacidade
                FROM veiculoEmpresa ve
                JOIN veiculo v ON v.idVeiculo = ve.fkVeiculo
                GROUP BY ve.fkEmpresa, ve.fkGrupo
            ) AS ve ON ve.fkEmpresa = l.fkEmpresa AND ve.fkGrupo = l.fkGrupo
            WHERE (l.qtdViagensIda + l.qtdViagensVolta) > 0
            GROUP BY l.idLinha, l.fkEmpresa, ve.capacidade, l.qtdViagensIda, l.qtdViagensVolta
        ) AS sub
        JOIN empresa e ON e.idEmpresa = sub.fkEmpresa
        WHERE e.idEmpresa = ${idEmpresa}
        GROUP BY e.idEmpresa;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarQtdPassageiros,
    listarKpiGerente,
    listarLinhasMes
};