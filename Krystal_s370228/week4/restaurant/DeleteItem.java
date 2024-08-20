package restaurant;


import org.json.JSONArray;
import org.json.JSONObject;
import java.io.*;
import java.util.Scanner;

public class DeleteItem {

    private String filename = "Menu.json";

    public void setFileName(String filename) {
        this.filename = filename;
    }

    public void deleteitem() {
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

                // get user's input
                Scanner scanner = new Scanner(System.in);
                System.out.println("\nPlease enter the number of the item you want to delete:");
                int itemNumber = scanner.nextInt();

                if (itemNumber > 0 && itemNumber <= itemsArray.length()) {
                    itemsArray.remove(itemNumber - 1);

                    // update menu
                    try (FileWriter fileWriter = new FileWriter(filename)) {
                        fileWriter.write(itemsArray.toString(2));
                    }

                    System.out.println("successfully!");
                } else {
                    System.out.println("Invalid input");
                }

            } else {
                System.out.println("Menu is empty. No items to delete.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
