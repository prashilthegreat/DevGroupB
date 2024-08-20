package restaurant;
import java.util.Scanner;

public class AdminInterface{

    private Scanner scanner = new Scanner(System.in);

    public int Greeting() {
        System.out.println("Options:\n1. Add item \n2. Update item \n3. Delete item\n");
        return scanner.nextInt();
    }
}
