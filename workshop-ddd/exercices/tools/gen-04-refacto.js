// Exercice 4 — Refacto du PriceCalculator (séance 2, chapitre « Domain objects »)
// Reprend le dispositif du master board : le code de départ, puis cinq ateliers
// « code + message de commit », pour forcer des pas de refacto très courts.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const CODE_FS = 12, STEP_FS = 11;
const code = (o) => text({ fontFamily: 3, fontSize: CODE_FS, strokeColor: '#1864ab', ...o });

const DEPART = `class PriceCalculator {
  private httpClient: HttpClient;

  calculate(
    distance: number,
    travelType: "urban" | "rural"
  ): number {
    const { ratio } = this.httpClient.get(
      "https://some-web-api.com/ratio?name=" + travelType
    );

    return distance * ratio;
  }
}`;

const BRIEF = [
  "Pour calculer le prix d'un trajet,",
  "l'algorithme prend la distance parcourue",
  "et la multiplie par un taux fixe.",
  '',
  'Ce taux varie selon que la course est',
  'intra-muros ou extra-muros :',
  '  · intra-muros  →  1.20 € / km',
  '  · extra-muros  →  1.65 € / km',
];

// ----- colonne de gauche : brief + consignes
const briefBox = (() => {
  const w = 380, pad = 16, h = pad * 2 + 17 * 1.25 + 10 + BRIEF.length * 13 * 1.25;
  return [
    rect({ x: 0, y: 0, width: w, height: h, backgroundColor: '#e7f5ff', strokeColor: '#1971c2', strokeWidth: 1 }),
    text({ x: pad, y: pad, text: 'Brief', fontSize: 17, strokeColor: '#1864ab' }),
    text({ x: pad, y: pad + 17 * 1.25 + 10, text: BRIEF.join('\n'), fontSize: 13, strokeColor: '#495057' }),
  ];
})();
const BRIEF_H = briefBox[0].height;

const CONSIGNES = consignes(0, BRIEF_H + 30, 'Consignes', [
  'Refactoriser ce code en introduisant',
  'des Domain Objects.',
  '',
  'Procéder par pas très courts : une',
  'intention par étape, et un message de',
  'commit qui la dit.',
  '',
  "L'appel HTTP vous mènera à un autre",
  'type de domain object : ne le sautez',
  'pas, faites-le émerger.',
  '',
  'Durée : 15 min',
], 380);

// ----- code de départ, verrouillé
const DEP_X = 430, DEP_W = 520;
const depart = [
  text({ x: DEP_X, y: 0, text: 'Code de départ', fontSize: 15, strokeColor: '#495057' }),
  rect({ x: DEP_X, y: 30, width: DEP_W, height: 250, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }),
  code({ x: DEP_X + 14, y: 44, text: DEPART }),
];

// ----- cinq ateliers, deux colonnes
const STEP_W = 400, STEP_H = 190, COMMIT_H = 42, SLOT_H = STEP_H + COMMIT_H + 46;
const COL = [1000, 1440];

function atelier(i, codeText, commitText) {
  const x = COL[i % 2], y = Math.floor(i / 2) * SLOT_H;
  const e = [text({ x, y, text: `Étape ${i + 1}`, fontSize: 14, strokeColor: '#868e96' })];
  if (codeText) {
    e.push(rect({ x, y: y + 24, width: STEP_W, height: STEP_H, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }));
    e.push(code({ x: x + 12, y: y + 36, text: codeText, fontSize: STEP_FS }));
  } else {
    e.push(rect({ x, y: y + 24, width: STEP_W, height: STEP_H, backgroundColor: 'transparent', strokeColor: '#ced4da', strokeStyle: 'dashed', strokeWidth: 1, locked: false }));
  }
  e.push(...labelled({
    x, y: y + 24 + STEP_H + 12, width: STEP_W, height: COMMIT_H,
    backgroundColor: commitText ? '#fff9db' : 'transparent',
    strokeColor: commitText ? '#f08c00' : '#ced4da',
    strokeStyle: commitText ? 'solid' : 'dashed', strokeWidth: 1, locked: Boolean(commitText),
  }, commitText || 'message de commit…', 12, commitText ? '#e8590c' : '#adb5bd'));
  return e;
}

// ----- canevas : cinq ateliers vides
const canevas = [...briefBox, ...CONSIGNES, ...depart];
for (let i = 0; i < 5; i++) canevas.push(...atelier(i, null, null));

// ----- solution : la suite de refactos que vise le débrief
const SOL = [
  [`class Distance {
  private constructor(
    private readonly km: number
  ) {}

  static fromKm(km: number) {
    return new Distance(km);
  }

  get value() { return this.km; }
}`, 'refactor: introduce a Distance value object'],

  [`class Price {
  private constructor(
    private readonly cents: number
  ) {}

  static fromEuros(e: number) {
    return new Price(Math.round(e * 100));
  }
}`, 'refactor: introduce a Price value object'],

  [`class TravelType {
  static URBAN = new TravelType("urban");
  static RURAL = new TravelType("rural");

  private constructor(
    readonly name: string
  ) {}
}`, 'refactor: introduce a TravelType value object'],

  [`interface RatioProvider {
  get(type: TravelType): number;
}

class PriceCalculator {
  constructor(
    private ratios: RatioProvider
  ) {}
}`, 'refactor: push the HTTP call out of the domain'],

  [`interface Ratios {
  of(type: TravelType): Ratio;
}

// « ratios » se dit en réunion,
// « ratioProvider » non.
// Collection-oriented, pas
// persistence-oriented.`, 'refactor: rename RatioProvider to Ratios'],
];

const solution = [...briefBox, ...CONSIGNES, ...depart];
SOL.forEach(([c, m], i) => solution.push(...atelier(i, c, m)));

const DIR = path.join(__dirname, '..', 'seance-2');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '04-refacto-canevas.excalidraw'), canevas);
write(path.join(DIR, '04-refacto-solution.excalidraw'), solution);
