package moveo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class JourneyTest {

    // Regle 1 : prix = distance x 100.
    @Test
    void facture_100_par_kilometre() {
        assertEquals(3000.0, new Journey().calculatePrice(30).amount(), 0.001);
    }
}
