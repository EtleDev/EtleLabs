package moveo;

public class Journey {
    public Price calculatePrice(double distance) {
        return new Price(distance * 100);
    }
}
