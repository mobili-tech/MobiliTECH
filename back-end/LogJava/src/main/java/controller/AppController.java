package controller;

import db.Conexao;
import model.LinhaOnibus;
import util.LoggerUtil;
import util.TempoUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

public class AppController {
    private final Scanner scanner = new Scanner(System.in);
    private final String user = "admin";
    private final String senha = "admin123";
    private Connection conn;

    public void iniciar() {
        try {
            conn = Conexao.conectar();
            LoggerUtil.log("Aplicação iniciada.");
            TempoUtil.esperar(1000);

            if (login()) {
                dashboard();
            } else {
                LoggerUtil.log("Finalizando aplicação.");
            }

        } catch (Exception e) {
            LoggerUtil.log("Erro ao iniciar a aplicação: " + e.getMessage());
        }
    }

    private boolean login() throws InterruptedException {
        LoggerUtil.log("Tela de login");

        System.out.print("Usuário: ");
        String entradaUser = scanner.nextLine();

        System.out.print("Senha: ");
        String entradaSenha = scanner.nextLine();

        TempoUtil.esperar(1000);

        if (user.equals(entradaUser) && senha.equals(entradaSenha)) {
            LoggerUtil.log("Login realizado com sucesso.");
            return true;
        } else {
            LoggerUtil.log("Usuário ou senha inválidos.");
            return false;
        }
    }

    private void dashboard() throws Exception {
        LoggerUtil.log("Entrando na Dashboard...");

        listarLinhas();

        System.out.print("Deseja cadastrar nova linha? (S/N): ");
        String resposta = scanner.nextLine();

        if (resposta.equalsIgnoreCase("S")) {
            System.out.print("Digite o número da linha: ");
            String numero = scanner.nextLine();

            cadastrarLinha(numero);
        }

        LoggerUtil.log("Aplicação finalizada.");
    }

    private void listarLinhas() throws Exception {
        String sql = "SELECT * FROM linhas";
        PreparedStatement stmt = conn.prepareStatement(sql);
        ResultSet rs = stmt.executeQuery();

        LoggerUtil.log("Linhas de ônibus cadastradas:");

        while (rs.next()) {
            String numero = rs.getString("numero");
            LoggerUtil.log(" - Linha: " + numero);
        }

        rs.close();
        stmt.close();
    }

    private void cadastrarLinha(String numero) throws Exception {
        String sql = "INSERT INTO linhas (numero) VALUES (?)";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, numero);
        stmt.executeUpdate();

        LoggerUtil.log("Linha " + numero + " cadastrada com sucesso.");
        stmt.close();
    }
}