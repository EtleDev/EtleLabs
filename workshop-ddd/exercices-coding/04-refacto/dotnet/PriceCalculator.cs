namespace Moveo;

public interface IHttpClient
{
    RatioResponse Get(string url);
}

public record RatioResponse(decimal Ratio);

public class PriceCalculator
{
    private readonly IHttpClient _httpClient;

    public PriceCalculator(IHttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public decimal Calculate(decimal distance, string travelType)
    {
        var response = _httpClient.Get(
            "https://some-web-api.com/ratio?name=" + travelType);

        return distance * response.Ratio;
    }
}
