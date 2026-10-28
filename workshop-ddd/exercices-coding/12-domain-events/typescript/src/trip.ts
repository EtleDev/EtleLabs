export abstract class AggregateRoot {
  private readonly events: object[] = [];

  protected raise(event: object): void {
    this.events.push(event);
  }

  pullEvents(): object[] {
    return this.events.splice(0, this.events.length);
  }
}

export class Trip extends AggregateRoot {
  private readonly passengerIds: string[] = [];

  constructor(readonly tripId: string) {
    super();
  }

  join(passengerId: string): void {
    // TODO scenario 1
  }

  kickPassenger(passengerId: string): void {
    // TODO scenario 2
  }

  passengers(): readonly string[] {
    return this.passengerIds;
  }
}

export class JoinTrip {
  constructor(private readonly trips: Map<string, Trip>) {}

  execute({ tripId, passengerId }: { tripId: string; passengerId: string }): void {
    // TODO scenario 1
  }
}

export class NotificationService {
  readonly notified: string[] = [];

  // Appelee quand un passager rejoint
  notifyDriverForNewPassenger({ tripId, passengerId }: { tripId: string; passengerId: string }): void {
    this.notified.push(`${tripId}:${passengerId}`);
  }
}

// Vient du dehors : ce n'est PAS un domain event.
export class UserBanned {
  constructor(readonly userId: string) {}
}
