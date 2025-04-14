package school.sptech;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        String dataHora;

        List<String> linhaOnibus = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        String user = "Mobilitech@admin";
        String senha = "admin123";

        dataHora = obterDataHoraAtual();
        System.out.println(dataHora +" -- "+"Iniciando aplicação!!!" );

        Thread.sleep(3000);
        dataHora = obterDataHoraAtual();
        System.out.println(dataHora+ " -- " + "direcionando ao login.....");
        Thread.sleep(3000);

        try {

            dataHora  = obterDataHoraAtual();
            System.out.println(dataHora + " -- " + "LOGIN");
            System.out.println("---------------------------");

            System.out.println("Usuário: ");
            String entradaUser = scanner.nextLine();
            scanner.nextLine();

            System.out.println("Senha: ");
            String entradaSenha = scanner.nextLine();
            scanner.nextLine();


            Thread.sleep(5000);

            if (user.equals(entradaUser) && senha.equals(entradaSenha)){
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora+" -- " + "Login realizado com sucesso!!");
                System.out.println();
                System.out.println(dataHora+ " -- " + "Usuario: " + entradaUser);
                System.out.println(dataHora+ " -- " + "Senha: " + entradaSenha);
                System.out.println();

                Thread.sleep(5000);

                dataHora = obterDataHoraAtual();
                System.out.println(dataHora+ " -- " + "Direcionando para Dashboards....");

            } else {
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora+ " -- " + "Não foi possível realizar o login!");

                Thread.sleep(3000);
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " -- " + "Finalizando Aplicação!!");

                return;
            }

            Thread.sleep(3000);

            dataHora = obterDataHoraAtual();
            System.out.println(dataHora+ " -- " + "Entrando na Dashboard.....");

            Thread.sleep(3000);

            dataHora = obterDataHoraAtual();
            System.out.println(dataHora+ " -- " + "Pagina de DashBoard:");
            System.out.println("--------------------------------------------");

            if (linhaOnibus.isEmpty()){
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora+ " -- " + "Suas linhas: ");

                for (int i = 0; i < linhaOnibus.size(); i++) {
                    dataHora = obterDataHoraAtual();

                    System.out.println(dataHora + " -- " + i +1 + "° - " + linhaOnibus.get(i));
                }
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora+ " -- " + "Lista finalizada!");

            } else {

                dataHora = obterDataHoraAtual();
                System.out.println(dataHora+ " -- " + "Não há linhas cadastradas!!");
            }

            dataHora = obterDataHoraAtual();
            System.out.println(dataHora+ " -- " + "Deseja cadastrar mais linhas? S/N");
            String respCadastrar = scanner.next();
            scanner.nextLine();

            if (respCadastrar.equals("S")){
                Thread.sleep(3000);
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " -- " + "Digite o número da linha: ");
                String linhaCadastro = scanner.nextLine();

                linhaOnibus.add(linhaCadastro);
                Thread.sleep(3000);

                if (linhaOnibus.size() > 0){

                    dataHora = obterDataHoraAtual();
                    System.out.println(dataHora + " -- " + "Linha "+ linhaCadastro + ", cadastrada com sucesso!!");

                } else {

                    dataHora = obterDataHoraAtual();
                    System.out.println(dataHora + " -- " + "Erro ao cadastrar a linha!");
                }

                Thread.sleep(3000);
                dataHora = obterDataHoraAtual();
                System.out.println(dataHora + " -- " + "Aplicação finalizada!!");
                return;

            } else {

                dataHora = obterDataHoraAtual();
                System.out.println(dataHora  + " -- " + "Apliccação finalizada!!");
                return;
            }


        }catch (InterruptedException e){
            dataHora = obterDataHoraAtual();
            System.out.println(dataHora + "A thread foi interrompida!!" + e);
        }
    }


    private static String obterDataHoraAtual() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.now().format(formatter);
    }
}