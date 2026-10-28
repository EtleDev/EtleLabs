import { describe, expect, it } from "vitest";
import { JoinTrip, NotificationService, Trip } from "../src/trip";

describe("Scenario 1 — un passager rejoint un voyage", () => {
  it("notifie le conducteur sans que le domaine connaisse le notifieur", () => {
    const trip = new Trip("trip-1");
    const notifications = new NotificationService();
    const trips = new Map([["trip-1", trip]]);

    new JoinTrip(trips).execute({ tripId: "trip-1", passengerId: "jane" });

    expect(trip.passengers()).toContain("jane");
    expect(notifications.notified).toContain("trip-1:jane");
  });
});

// Scenario 2 : a vous d'ecrire le test.
