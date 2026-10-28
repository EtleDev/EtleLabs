export interface HttpClient {
  get(url: string): { ratio: number };
}

export class PriceCalculator {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  calculate(distance: number, travelType: "urban" | "rural"): number {
    const { ratio } = this.httpClient.get(
      "https://some-web-api.com/ratio?name=" + travelType
    );

    return distance * ratio;
  }
}
