package moveo;

import java.util.ArrayList;
import java.util.List;

public class NotificationService {
    private final List<String> notified = new ArrayList<>();

    // Appelee quand un passager rejoint
    public void notifyDriverForNewPassenger(String tripId, String passengerId) {
        notified.add(tripId + ":" + passengerId);
    }

    public List<String> notified() {
        return List.copyOf(notified);
    }
}
