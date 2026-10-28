export class Price {
  constructor(private readonly value: number) {}

  amount(): number {
    return this.value;
  }
}

export class Journey {
  calculatePrice(distance: number): Price {
    return new Price(distance * 100);
  }
}
