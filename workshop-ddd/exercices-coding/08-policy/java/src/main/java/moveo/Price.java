package moveo;

public class Price {
    private final double value;

    public Price(double value) {
        this.value = value;
    }

    public double amount() {
        return value;
    }
}
