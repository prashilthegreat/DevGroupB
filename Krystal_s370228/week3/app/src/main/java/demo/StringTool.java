package demo;

public class StringTool {
    public static void main(String[] args) {
        String test = "Hello World";
        System.out.println("Lower: " + lower(test));

    }
    // Convert string to lower case
    public static String lower(String s) {
        return s.toLowerCase();
    }

}
