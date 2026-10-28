namespace Moveo;

public class Price
{
    private readonly decimal _value;

    public Price(decimal value)
    {
        _value = value;
    }

    public decimal Amount() => _value;
}

public class Journey
{
    public Price CalculatePrice(decimal distance)
    {
        return new Price(distance * 100);
    }
}
