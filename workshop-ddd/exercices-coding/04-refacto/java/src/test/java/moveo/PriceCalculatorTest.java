package moveo;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

// Filet de securite : le prix ne doit pas bouger pendant la refacto.
class PriceCalculatorTest {

    private static final Map<String, Double> RATIOS = Map.of("urban", 1.20, "rural", 1.65);

    private final HttpClient httpClient = url -> {
        String name = url.substring(url.indexOf("name=") + 5);
        return new RatioResponse(RATIOS.get(name));
    };

    @Test
    void facture_1_20_du_km_en_intra_muros() {
        assertEquals(12.0, new PriceCalculator(httpClient).calculate(10, "urban"), 0.001);
    }

    @Test
    void facture_1_65_du_km_en_extra_muros() {
        assertEquals(16.5, new PriceCalculator(httpClient).calculate(10, "rural"), 0.001);
    }
}
