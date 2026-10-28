package moveo;

public class PriceCalculator {
    private final HttpClient httpClient;

    public PriceCalculator(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public double calculate(double distance, String travelType) {
        RatioResponse response = httpClient.get(
                "https://some-web-api.com/ratio?name=" + travelType);

        return distance * response.ratio();
    }
}
