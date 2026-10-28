using Xunit;

namespace Moveo.Tests;

public class TripTests
{
    // Scenario 1 : un passager rejoint un voyage.
    [Fact]
    public void Notifie_le_conducteur_sans_que_le_domaine_connaisse_le_notifieur()
    {
        var trip = new Trip("trip-1");
        var notifications = new NotificationService();

        new JoinTrip(new Dictionary<string, Trip> { ["trip-1"] = trip })
            .Execute("trip-1", "jane");

        Assert.Contains("jane", trip.Passengers());
        Assert.Contains("trip-1:jane", notifications.Notified());
    }

    // Scenario 2 : a vous d'ecrire le test.
}
