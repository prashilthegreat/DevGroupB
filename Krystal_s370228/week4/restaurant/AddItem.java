package restaurant;

import org.json.JSONObject;
import java.io.IOException;
import java.io.FileWriter;
import org.json.JSONArray;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Scanner;

public class AddItem {

    private String filename = "Menu.json";

    public void setFileName(String filename) {
        this.filename = filename;
    }

    public void additem() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Please enter item: ");
        String item = scanner.nextLine();

        System.out.println("please enter price: ");
        String price = scanner.nextLine();

        System.out.println("please enter description: ");
        String description = scanner.nextLine();

        JSONObject newitem = new JSONObject();
        newitem.put("item", item);
        newitem.put("price", "$" + price);
        newitem.put("description", description);

        JSONArray itemsArray;
        File file = new File(filename);

        try {
            if (file.exists() && file.length() != 0) {
                String content = new String(Files.readAllBytes(Paths.get(filename)));
                itemsArray = new JSONArray(content);
            } else {
                itemsArray = new JSONArray();
            }

            itemsArray.put(newitem);

            try (FileWriter fileWriter = new FileWriter(filename)) {
                fileWriter.write(itemsArray.toString(2));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
