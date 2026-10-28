package moveo;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

class TripTest {

    // Scenario 1 : un passager rejoint un voyage.
    @Test
    void notifie_le_conducteur_sans_que_le_domaine_connaisse_le_notifieur() {
        Trip trip = new Trip("trip-1");
        NotificationService notifications = new NotificationService();

        new JoinTrip(Map.of("trip-1", trip)).execute("trip-1", "jane");

        assertTrue(trip.passengers().contains("jane"));
        assertTrue(notifications.notified().contains("trip-1:jane"));
    }

    // Scenario 2 : a vous d'ecrire le test.
}
