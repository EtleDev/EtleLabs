using Xunit;

namespace Moveo.Tests;

// Filet de securite : le prix ne doit pas bouger pendant la refacto.
public class PriceCalculatorTests
{
    private static readonly Dictionary<string, decimal> Ratios = new()
    {
        ["urban"] = 1.20m,
        ["rural"] = 1.65m
    };

    private sealed class FakeHttpClient : IHttpClient
    {
        public RatioResponse Get(string url)
        {
            var name = url[(url.IndexOf("name=", StringComparison.Ordinal) + 5)..];
            return new RatioResponse(Ratios[name]);
        }
    }

    [Fact]
    public void Facture_1_20_du_km_en_intra_muros()
    {
        Assert.Equal(12.0m, new PriceCalculator(new FakeHttpClient()).Calculate(10, "urban"));
    }

    [Fact]
    public void Facture_1_65_du_km_en_extra_muros()
    {
        Assert.Equal(16.5m, new PriceCalculator(new FakeHttpClient()).Calculate(10, "rural"));
    }
}
