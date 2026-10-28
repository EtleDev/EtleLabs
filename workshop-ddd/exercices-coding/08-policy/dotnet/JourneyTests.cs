using Xunit;

namespace Moveo.Tests;

public class JourneyTests
{
    // Regle 1 : prix = distance x 100.
    [Fact]
    public void Facture_100_par_kilometre()
    {
        Assert.Equal(3000m, new Journey().CalculatePrice(30).Amount());
    }
}
