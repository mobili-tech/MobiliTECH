package org.example;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Date;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ImportadorExcel {

    public static void main(String[] args) {
        String pasta = "dados/"; // Caminho da pasta com os arquivos .xlsx
        File dir = new File(pasta);

        File[] arquivosXLSX = dir.listFiles((d, name) -> name.toLowerCase().endsWith(".xlsx"));

        if (arquivosXLSX == null || arquivosXLSX.length == 0) {
            System.out.println("Nenhum arquivo .xlsx encontrado na pasta.");
            return;
        }

        for (File arquivo : arquivosXLSX) {
            System.out.println("\n🔄 Processando: " + arquivo.getName());
            importarArquivo(arquivo.getAbsolutePath());
        }

        System.out.println("\n✅ Todos os arquivos foram processados.");
    }

    // Importa os dados do arquivo Excel e insere no banco de dados
    public static void importarArquivo(String caminhoArquivo) {
        String jdbcUrl = "jdbc:mysql://localhost:3306/mobilitech";
        String usuario = "root";
        String senha = "Felipe1404";

        try (Connection conn = DriverManager.getConnection(jdbcUrl, usuario, senha);
             FileInputStream fis = new FileInputStream(caminhoArquivo);
             Workbook workbook = getWorkbook(fis, caminhoArquivo)) {

            if (workbook == null) {
                System.err.println("❌ Não foi possível abrir o arquivo: " + caminhoArquivo);
                return;
            }

            Sheet sheet = workbook.getSheetAt(0); // Lê a primeira aba do Excel
            int count = 0;

            // Começa a leitura a partir da 4ª linha (índice 3)
            for (int i = 3; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                try (PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO transporte (data, grupo, lote, empresa, linha, " +
                                "passageiros_dinheiro, passageiros_comum_vt, passageiros_comum_m, " +
                                "passageiros_estudante, passageiros_estudante_mensal, passageiros_vt_mensal, " +
                                "passageiros_pagantes, passageiros_integracao, passageiros_gratuidade, passageiros_total, " +
                                "partidas_ponto_inicial, partidas_ponto_final) " +
                                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                    java.util.Date dataPlanilha = getDate(row, 0);
                    if (dataPlanilha == null) continue;

                    stmt.setDate(1, new Date(dataPlanilha.getTime()));
                    stmt.setString(2, getString(row, 1));
                    stmt.setString(3, getString(row, 2));
                    stmt.setString(4, getString(row, 3));
                    stmt.setString(5, getString(row, 4));

                    for (int j = 6; j <= 14; j++) {
                        stmt.setInt(j, getInt(row, j));
                    }

                    stmt.setInt(15, getInt(row, 15));
                    stmt.setInt(16, getInt(row, 16));
                    stmt.setInt(17, getInt(row, 17));

                    stmt.executeUpdate();
                    count++;
                }
            }

            System.out.println("✅ Inseridos " + count + " registros de " + caminhoArquivo);

        } catch (Exception e) {
            System.err.println("❌ Erro ao processar " + caminhoArquivo);
            e.printStackTrace();
        }
    }

    // Obtém o Workbook a partir de um arquivo .xlsx
    private static Workbook getWorkbook(FileInputStream fis, String caminhoArquivo) {
        try {
            if (caminhoArquivo.toLowerCase().endsWith(".xlsx")) {
                return new XSSFWorkbook(fis); // Somente para arquivos .xlsx
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao abrir o arquivo: " + caminhoArquivo + " - " + e.getMessage());
        }
        return null; // Retorna null se não conseguir abrir o arquivo
    }

    // Obtém a data de uma célula, caso esteja no formato correto
    private static Date getDate(Row row, int columnIndex) {
        Cell cell = row.getCell(columnIndex);
        if (cell != null && cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
            return new Date(cell.getDateCellValue().getTime());
        }
        return null; // Retorna null se a célula não for uma data válida
    }

    // Obtém o valor da célula como String
    private static String getString(Row row, int columnIndex) {
        Cell cell = row.getCell(columnIndex);
        return cell != null ? cell.toString().trim() : ""; // Retorna uma string vazia se a célula for nula
    }

    // Obtém o valor da célula como inteiro
    private static int getInt(Row row, int columnIndex) {
        Cell cell = row.getCell(columnIndex);
        if (cell != null && cell.getCellType() == CellType.NUMERIC) {
            return (int) cell.getNumericCellValue(); // Retorna o valor inteiro da célula
        }
        return 0; // Retorna 0 se a célula não for um número válido
    }
}
