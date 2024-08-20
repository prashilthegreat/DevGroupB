package restaurant;

import java.io.IOException;
import java.util.Iterator;
import java.util.*;

import org.json.JSONObject;

public class RestaurantManager{
    public RestaurantManager(){
    }
    public static void start() throws IOException {
        RestaurantDB db = new RestaurantDB("menu.json");
        UserInterface ui = new UserInterface();
        RestaurantDB mo = new RestaurantDB("menuorder.json");
        Map<String, ArrayList<String>> Order = new HashMap<String, ArrayList<String>>();
        Order.put("Price", new ArrayList<String>());
        Order.put("Description", new ArrayList<String>());
        Order.put("Name", new ArrayList<String>());
        double priceAfter = 0.0;
        while(true){
            int choice = ui.Greeting();
            switch (choice){
                case 1:
                    System.out.println("---------------------------------------------");
                    System.out.printf("%-5s %-10s %-14s\n", "Price", "Name", "Description");
                    System.out.println("---------------------------------------------");

                    for (JSONObject obj : db.getMenu()) {
                        JSONObject Menu = (JSONObject) obj;
                        System.out.printf("%-5.2f %-10s %-20s\n",
                                Menu.getDouble("Price"),
                                Menu.getString("Name"),
                                Menu.getString("Description"));
                    }
                    System.out.println("---------------------------------------------\n");
                    break;
                case 2:
                        double quantity = ui.promptQuantity();
                        double price = ui.promptPrice();
                        priceAfter += quantity * price;
                        String Name = ui.promptName();
                        String Description = ui.promptDescription();
                        // list
//                        System.out.println(Order.get("Price").getClass());
                        Order.get("Price").add(Double.toString(priceAfter));
                        Order.get("Name").add(Name);
                        Order.get("Description").add(Description);


//                        for (Map.Entry<String, Object> set : Order.entrySet()) {
//                            System.out.println(set.getKey() + " = " + set.getValue());
//                        }
                        System.out.println("---------------------------------------------");
                        System.out.println("Your order:");
                        for(int i = 0; i < Order.get("Price").size(); i++) {
                            final int temp = i;
                            Order.forEach((key, value) -> {
                                System.out.println("\t" + key + " : " + value.get(temp));
                            });
                        }
                        break;
                case 3:
                    String paymentName = ui.promptPayment();
                    System.out.println("Thank you choosing " + paymentName + " as your payment method");
                    if("card".equalsIgnoreCase(paymentName) || "cash".equalsIgnoreCase(paymentName)) {
                        boolean validpayment = false;
                        while (!validpayment) {
                            double PaymentAmount = ui.promptPaymentAmount();
                            System.out.println("PaymentAmount entered: " + PaymentAmount);
                            if (priceAfter == PaymentAmount) {
                                System.out.println("Thank you dining in with us, hope you have a great day! ");
                                validpayment = true;
                                break;
                            } else if (priceAfter < PaymentAmount) {
                                double remainder = priceAfter - PaymentAmount;
                                System.out.println(" Youre change will be: " + remainder + " .");
                                validpayment = true;
                                break;
                            } else {
                                double missing = priceAfter - PaymentAmount;
                                System.out.println(" You havent paid " + missing + " amount");
                                priceAfter = missing;
                                continue;
                            }
                        }
                    } else{
                        System.out.println("Invalid input");
                    }
                    break;
                case 4:
                    System.out.println("Goodbye hope to see you soon!");
                    System.exit(0);
                    break;

                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}
