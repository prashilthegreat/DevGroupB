package restaurant;

import org.json.JSONObject;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class App {

    public static void runApp() {
        Scanner scanner = new Scanner(System.in);
        AdminInterface adminInterface = new AdminInterface();
        int choice = adminInterface.Greeting();

        switch (choice) {
            case 1:
                new AddItem().additem();
                break;
            case 2:
                new UpdateItem().execute();
                break;
            case 3:
                new DeleteItem().deleteitem();
                break;
            default:
                System.out.println("Invalid choice");
        }
    }

    public static void main(String[] args) {
        runApp();
    }
}
