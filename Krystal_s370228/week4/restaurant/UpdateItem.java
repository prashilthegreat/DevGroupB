package restaurant;


import org.json.JSONArray;
import org.json.JSONObject;
import java.io.*;
import java.util.Scanner;


public class UpdateItem {
    private String filename = "Menu.json";
    public void setFileName(String filename) {
        this.filename = filename;
    }
    public void execute() {
        try {
            File file = new File(filename);
            if (file.exists() && file.length() != 0) {
                BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
                String line;
                StringBuilder items = new StringBuilder();
                // show all items
                while ((line = bufferedReader.readLine()) != null) {
                    items.append(line);
                }
                bufferedReader.close();

                String content = items.toString();
                JSONArray itemsArray = new JSONArray(content);

                System.out.println("Available items:");
                for (int i = 0; i < itemsArray.length(); i++) {
                    JSONObject item = itemsArray.getJSONObject(i);
                    System.out.println((i + 1) + ". " + item.getString("item") + " - " + item.getString("price")
                            + " - "+ item.getString("description"));
                }

                // get input
                Scanner scanner = new Scanner(System.in);
                System.out.println("\nPlease enter the number of the item you want to update:");
                int itemNumber = scanner.nextInt();

                if (itemNumber > 0 && itemNumber <= itemsArray.length()) {
                    System.out.println("Which part do you want to update?");
                    System.out.println("1. Name\n2. Price\n3. Description");
                    int choice = scanner.nextInt();
                    scanner.nextLine();

                    String updatedValue;
                    String attributeName = "";

                    switch (choice) {
                        case 1:
                            attributeName = "item";
                            System.out.println("Please enter the new item name:");
                            break;
                        case 2:
                            attributeName = "price";
                            System.out.println("Please enter the new price:");
                            break;
                        case 3:
                            attributeName = "description";
                            System.out.println("Please enter the new description:");
                            break;
                        default:
                            System.out.println("Invalid selection. No attribute updated.");
                            return;
                    }

                    updatedValue = scanner.nextLine();
                    if (attributeName.equals("price")) {
                        updatedValue = "$" + updatedValue;
                    }

                    // replace attribute
                    itemsArray.getJSONObject(itemNumber - 1).put(attributeName, updatedValue);

                    // update menu
                    try (FileWriter fileWriter = new FileWriter(filename)) {
                        fileWriter.write(itemsArray.toString(2));
                    }

                    System.out.println("successfully!");
                } else {
                    System.out.println("Invalid input");
                }

            } else {
                System.out.println("Menu is empty. No items to update.");
            }

        }catch (IOException e) {
            e.printStackTrace();
        }
    }
}
