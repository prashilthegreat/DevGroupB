package restaurant;
import java.util.Scanner;
public class UserInterface {
    private Scanner scanner;
    public UserInterface() {
        scanner = new Scanner(System.in);
    }
    public int Greeting() {
        System.out.println("---------------------------------------------");
        System.out.println("\nWELCOME TO OUR RESTAURANT!! WOHHOO \n");
        System.out.println("---------------------------------------------");
        System.out.println("Options:\n1. Display menu \n2. Do you wish to Order?\n3. Do you wish to pay?\n4. Do you wish to leave?\n");
        return scanner.nextInt();
    }
    public double promptQuantity() {
        System.out.print("Enter Quantity Please: ");
        return scanner.nextDouble();
    }
    public double promptPrice() {
        System.out.print("Could you enter the price of the item: ");
        return scanner.nextDouble();
    }
    public String promptName() {
        System.out.print("Enter Name of order please: ");
        scanner.nextLine();  // Consume newline left from the previous input
        return scanner.nextLine();
    }
    public String promptDescription() {
        System.out.print("Enter One word description please: ");
        return scanner.nextLine();
    }
    public String promptPayment(){
        System.out.println("How would you like to pay (cash/ card): ");
        scanner.nextLine();
        return scanner.nextLine();
    }
    public double promptPaymentAmount(){
        System.out.print("Type in the amount you will be transferring: ");
        return scanner.nextDouble();
    }

}
