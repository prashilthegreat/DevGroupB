package restaurant;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RestaurantDB {
    private JSONArray menu;
    private JSONArray menuorder;
    public RestaurantDB(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        String content = new String(Files.readAllBytes(path));
        menu = new JSONArray(content);
        String order = new String(Files.readAllBytes(path));
        menuorder = new JSONArray(order);
    }
    public List<JSONObject> getMenu() {
        return menu.toList().stream()
                .map(obj -> new JSONObject((Map) obj))
                .collect(Collectors.toList());
    }
    public void addOrder(double priceAfter, String name, String description) {
        JSONObject menuo = new JSONObject();
        menuo.put("Price", priceAfter);
        menuo.put("Name", name);
        menuo.put("Description", description);
        menuorder.put(menuo);

    }
}
