package moveo;

import java.util.ArrayList;
import java.util.List;

public class Trip extends AggregateRoot {
    private final String tripId;
    private final List<String> passengerIds = new ArrayList<>();

    public Trip(String tripId) {
        this.tripId = tripId;
    }

    public String tripId() {
        return tripId;
    }

    public void join(String passengerId) {
        // TODO scenario 1
    }

    public void kickPassenger(String passengerId) {
        // TODO scenario 2
    }

    public List<String> passengers() {
        return List.copyOf(passengerIds);
    }
}
