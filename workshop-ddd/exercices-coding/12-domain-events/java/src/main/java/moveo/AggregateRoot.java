package moveo;

import java.util.ArrayList;
import java.util.List;

public abstract class AggregateRoot {
    private final List<Object> events = new ArrayList<>();

    protected void raise(Object event) {
        events.add(event);
    }

    public List<Object> pullEvents() {
        List<Object> pulled = List.copyOf(events);
        events.clear();
        return pulled;
    }
}
