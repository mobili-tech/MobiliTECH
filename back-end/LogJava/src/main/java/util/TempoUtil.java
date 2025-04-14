package util;

public class TempoUtil {
    public static void esperar(int ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            LoggerUtil.log("Thread interrompida: " + e.getMessage());
        }
    }
}