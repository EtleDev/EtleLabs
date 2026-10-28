namespace Moveo;

public abstract class AggregateRoot
{
    private readonly List<object> _events = new();

    protected void Raise(object @event) => _events.Add(@event);

    public IReadOnlyList<object> PullEvents()
    {
        var pulled = _events.ToList();
        _events.Clear();
        return pulled;
    }
}

public class Trip : AggregateRoot
{
    private readonly List<string> _passengerIds = new();

    public Trip(string tripId)
    {
        TripId = tripId;
    }

    public string TripId { get; }

    public void Join(string passengerId)
    {
        // TODO scenario 1
    }

    public void KickPassenger(string passengerId)
    {
        // TODO scenario 2
    }

    public IReadOnlyList<string> Passengers() => _passengerIds;
}

public class JoinTrip
{
    private readonly IDictionary<string, Trip> _trips;

    public JoinTrip(IDictionary<string, Trip> trips)
    {
        _trips = trips;
    }

    public void Execute(string tripId, string passengerId)
    {
        // TODO scenario 1
    }
}

public class NotificationService
{
    private readonly List<string> _notified = new();

    // Appelee quand un passager rejoint
    public void NotifyDriverForNewPassenger(string tripId, string passengerId)
        => _notified.Add($"{tripId}:{passengerId}");

    public IReadOnlyList<string> Notified() => _notified;
}

// Vient du dehors : ce n'est PAS un domain event.
public record UserBanned(string UserId);
