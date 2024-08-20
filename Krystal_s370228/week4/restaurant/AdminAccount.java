package restaurant;

import java.util.*;
import java.nio.file.*;
import java.io.*;
import static java.nio.file.StandardOpenOption.*;

public class AdminAccount {
    Scanner scan = new Scanner(System.in);
    String file = "admins.txt";
    public AdminAccount() {
        try{
            System.out.println("--------------------------------");
            System.out.println("------------WELCOME!------------");
            System.out.println("Please choose from one of the following options:");
            System.out.println("1. Continue as Guest");
            System.out.println("2. Create Admin account");
            System.out.println("3. Login as Admin");
            System.out.println("--------------------------------");
            System.out.print("Enter choice: ");
            String choice = scan.nextLine();
            if(choice.equals("1")){
                System.out.println("");                
                System.out.println("Continuing as guest...");  
                RestaurantManager.start();           
            }else if(choice.equals("2")){
                CreateAccount();
            }else if(choice.equals("3")){
                AdminLogin();
            }else{
                System.out.println("");                
                System.out.println("Invalid choice!");
                System.out.println("Press enter key to continue...");
                String proc = scan.nextLine();
                new AdminAccount();
            }
        }catch (Exception ex){
            System.out.print(ex.getStackTrace());   
        }
    }

    void AdminLogin(){
		BufferedReader reader;
        try{
			reader = new BufferedReader(new FileReader("admins.txt"));
			String line = reader.readLine();
            System.out.println("");
            System.out.print("Enter username: ");
            String username = scan.nextLine();
            System.out.print("Enter password: ");
            String password = scan.nextLine();
            String _user;
            String _pass;
            boolean found = false;
            while(line != null){
                String[] account = line.split(",");
                _user = account[0];
                _pass = account[1];
                if(_user.equals(username)&&_pass.equals(password)){
                    found = true;
                }
                line = reader.readLine();
            }

            if (found==true){
                System.out.println("");                
                System.out.println("Access granted!");
                System.out.println("Press enter key to continue...");
                String proc = scan.nextLine();
                App.runApp();
            }else{
                System.out.println("");                
                System.out.println("Access denied! Invalid username or password!");
                System.out.println("Press enter key to continue...");
                String proc = scan.nextLine();
                new AdminAccount();            }
        }catch(Exception ex){
            System.out.print(ex.getStackTrace());   
        }
    }

    void CreateAccount(){
        try{
            Path path = Paths.get(file.toString());
            OutputStream output = new BufferedOutputStream(Files.newOutputStream(path, APPEND));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(output));
            System.out.println("");
            System.out.print("Enter username: ");
            String username = scan.nextLine();
            System.out.print("Enter password: ");
            String password = scan.nextLine();

            writer.write(username + "," + password);
            writer.newLine();
            System.out.println("");
            System.out.println("Account has been added successfully!");
            writer.close();
            output.close();
            System.out.println("Press enter key to continue...");
            String proc = scan.nextLine();

            new AdminAccount();
        }catch(Exception ex){
            System.out.print(ex.getStackTrace());
        }
    }

    public static void main(String[] args){
        new AdminAccount();
    }
}