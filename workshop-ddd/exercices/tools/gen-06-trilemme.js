// Exercice 6 — Le trilemme du DDD (séance 3, chapitre « Repositories »)
// Deux implémentations sur le board, une troisième à trouver : pureté du domaine,
// complétude du domaine, performance — on n'en garde que deux.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const CODE_FS = 10;
const code = (o) => text({ fontFamily: 3, fontSize: CODE_FS, strokeColor: '#1864ab', ...o });

const COL_W = 430, COL_X = [0, 470, 940];
const CODE_Y = 56, CODE_H = 545;

const A = `domain {
  // out-of-process dependency
  interface Forex {
    rate(from: Currency, to: Currency)
      : Promise<ExchangeRate>
  }

  class Trip {
    constructor(
      private readonly distance: Distance,
      private readonly unitPrice: UnitPrice,
      private readonly forex: Forex
    ) {}

    async computePrice(currency: Currency) {
      const price =
        this.unitPrice.toPrice(this.distance);

      if (price.isCurrency(currency)) return price;

      const rate = await this.forex.rate(
        price.getCurrency(), currency
      );
      return price.convert(rate);
    }
  }
}

application {
  class ReserveTrip {
    async execute({ currency }) {
      const trip = new Trip(
        distance, unitPrice, forex
      );
      return await trip.price(currency);
    }
  }
}`;

const B = `domain {
  interface Forex {
    rate(from: Currency, to: Currency)
      : Promise<ExchangeRate>
  }

  class Trip {
    constructor(
      private readonly distance: Distance,
      private readonly unitPrice: UnitPrice,
    ) {}

    computePrice(currency: Currency) {
      return this.unitPrice.toPrice(this.distance);
    }
  }
}

application {
  class ReserveTrip {
    private forex: Forex;

    async execute({ currency }) {
      let rate = ExchangeRate.Identity();
      if (!unitPrice.isCurrency(currency)) {
        rate = await this.forex.rate(
          unitPrice.getCurrency(), currency
        );
      }

      const trip = new Trip(distance, unitPrice);
      return trip.price(currency).convert(rate);
    }
  }
}`;

const C = `domain {
  interface Forex {
    allRates(): Promise<ExchangeRates>;
  }

  class Trip {
    constructor(
      private readonly distance: Distance,
      private readonly unitPrice: UnitPrice,
      private readonly rates: ExchangeRates
    ) {}

    price(currency: Currency) {
      const price =
        this.unitPrice.toPrice(this.distance);

      if (price.isCurrency(currency)) return price;

      const rate = this.rates.find(
        price.getCurrency(), currency
      );
      return price.convert(rate);
    }
  }
}

application {
  class ReserveTrip {
    async execute({ currency }) {
      const rates = await this.forex.allRates();
      const trip = new Trip(
        distance, unitPrice, rates
      );
      return trip.price(currency);
    }
  }
}`;

const TITRE = [
  'Code A — Rich domain,\ndépendance out-of-process',
  'Code B — Lean model,\nsans dépendance out-of-process',
  'Code C — ?',
];

function colonne(i, source) {
  const x = COL_X[i];
  const e = [text({ x, y: 0, text: TITRE[i], fontSize: 14, strokeColor: '#495057' })];
  e.push(rect({
    x, y: CODE_Y, width: COL_W, height: CODE_H,
    backgroundColor: source ? '#f8f9fa' : 'transparent',
    strokeColor: source ? '#adb5bd' : '#ced4da',
    strokeStyle: source ? 'solid' : 'dashed', strokeWidth: 1,
  }));
  if (source) e.push(code({ x: x + 12, y: CODE_Y + 12, text: source }));
  else e.push(text({ x: x + 90, y: CODE_Y + CODE_H / 2 - 30, text: "À vous : existe-t-il\nune troisième voie ?", fontSize: 14, strokeColor: '#adb5bd', textAlign: 'center' }));
  return e;
}

// ----- post-its Positif / Négatif
const S = { w: 130, h: 56 };
const POS = ['#b2f2bb', '#2f9e44'], NEG = ['#ffc9c9', '#e03131'], NOTE = ['#ffec99', '#f08c00'];
const JUGE_Y = CODE_Y + CODE_H + 24;

const avis = (i, j, label, pal) => labelled({
  x: COL_X[i] + (j % 3) * (S.w + 12), y: JUGE_Y + Math.floor(j / 3) * (S.h + 12),
  width: S.w, height: S.h, backgroundColor: pal[0], strokeColor: pal[1], locked: false,
}, label, 12);

const legende = [
  text({ x: 0, y: JUGE_Y - 22, text: 'Positif / Négatif', fontSize: 13, strokeColor: '#868e96' }),
];

// ----- banque de post-its vierges, pour le canevas
const banque = [
  text({ x: COL_X[2], y: JUGE_Y - 22, text: 'Banque', fontSize: 13, strokeColor: '#868e96' }),
  ...labelled({ x: COL_X[2], y: JUGE_Y, width: S.w, height: S.h, backgroundColor: POS[0], strokeColor: POS[1], locked: false }, 'Positif', 12),
  ...labelled({ x: COL_X[2] + S.w + 12, y: JUGE_Y, width: S.w, height: S.h, backgroundColor: NEG[0], strokeColor: NEG[1], locked: false }, 'Négatif', 12),
];

const CONSIGNES = consignes(COL_X[2] + COL_W + 40, 0, 'Consignes', [
  'Deux implémentations du calcul de prix,',
  "l'une appelle le service externe depuis",
  "le domaine, l'autre depuis l'application.",
  '',
  'Donner les points positifs et négatifs',
  'de chacune, en post-its.',
  '',
  'Puis : en existe-t-il une troisième ?',
  'Laquelle ?',
  '',
  'Durée : 10 min',
], 320);

const canevas = [
  ...colonne(0, A), ...colonne(1, B), ...colonne(2, null),
  ...legende, ...banque, ...CONSIGNES,
];

const SOL = [
  [['Domaine\nimpur', NEG], ['Domaine\ncomplet', POS], ['Performance', POS]],
  [['Domaine\npur', POS], ['Performance', POS], ['Domaine\nincomplet', NEG], ['Duplication\nis OK !', NOTE]],
  [['Domaine\npur', POS], ['Domaine\ncomplet', POS], ['Performance', NEG]],
];
const solution = [...colonne(0, A), ...colonne(1, B), ...colonne(2, C), ...legende, ...CONSIGNES];
SOL.forEach((avisCol, i) => avisCol.forEach(([l, pal], j) => solution.push(...avis(i, j, l, pal))));
solution.push(...consignes(COL_X[2] + COL_W + 40, 300, 'Le trilemme', [
  'Pureté du domaine, complétude du',
  'domaine, performance : on ne garde',
  'que deux des trois.',
  '',
  'En DDD on reste en B ou en C, pour',
  'garder un domaine pur — quitte à',
  'dupliquer un peu de logique dans',
  "l'application plutôt que coupler le",
  'domaine à un appel réseau.',
], 320));

const DIR = path.join(__dirname, '..', 'seance-3');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '06-trilemme-canevas.excalidraw'), canevas);
write(path.join(DIR, '06-trilemme-solution.excalidraw'), solution);
