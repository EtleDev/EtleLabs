// Exercice 7 — Strategy vs Template Method (séance 3, chapitre « Policy pattern »)
// Deux écritures du même modèle de tarification : héritage (class-based) à gauche,
// composition (object-based) à droite. Question : quelle est la différence ?
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const code = (o) => text({ fontFamily: 3, fontSize: 11, strokeColor: '#1864ab', ...o });

const COL_W = 460, COL_X = [0, 500], CODE_Y = 80, CODE_H = 535;

const GAUCHE = `abstract class PricingModel {
  abstract protected isDue(): boolean;
  abstract protected amountDue(): Price;

  pay() {
    if (!this.isDue()) return;

    const due = this.amountDue();
    this.initiatePayment(due);
  }
}

class FixedSubscriptionPricingModel
  extends PricingModel {
  isDue() { return this.isStartOfMonth(); }
  amountDue() {
    return new Price(30.00, Currency.EUR);
  }
}

class ConsumptionBasedPricingModel
  extends PricingModel {
  isDue() { return this.isMiddleOfMonth(); }
  amountDue() {
    return this.pricePerCredit
      .times(this.creditConsumed());
  }
}

const pricingModel: PricingModel =
  new FixedSubscriptionPricingModel();
pricingModel.pay();`;

const DROITE = `interface PricingPolicy {
  isDue(): boolean;
  amountDue(): Price;
}

class FixedSubscriptionPricingPolicy
  implements PricingPolicy {
  isDue() { return this.isStartOfMonth(); }
  amountDue() {
    return new Price(30.00, Currency.EUR);
  }
}

class ConsumptionBasedPricingPolicy
  implements PricingPolicy {
  isDue() { return this.isMiddleOfMonth(); }
  amountDue() {
    return this.pricePerCredit
      .times(this.creditConsumed());
  }
}

class PricingModel {
  constructor(
    private readonly policy: PricingPolicy
  ) {}

  pay() {
    if (!this.policy.isDue()) return;

    const due = this.policy.amountDue();
    this.initiatePayment(due);
  }
}

new PricingModel(
  new FixedSubscriptionPricingPolicy()
).pay();`;

const TITRE = ['Class-based', 'Object-based'];

const colonne = (i, source) => [
  text({ x: COL_X[i], y: 0, text: TITRE[i], fontSize: 18, strokeColor: '#495057' }),
  rect({ x: COL_X[i], y: CODE_Y, width: COL_W, height: CODE_H, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }),
  code({ x: COL_X[i] + 12, y: CODE_Y + 12, text: source }),
];

// ----- post-its Positif / Négatif
const S = { w: 150, h: 60 };
const POS = ['#b2f2bb', '#2f9e44'], NEG = ['#ffc9c9', '#e03131'];
const JUGE_Y = CODE_Y + CODE_H + 26;

const avis = (i, j, label, pal) => labelled({
  x: COL_X[i] + j * (S.w + 14), y: JUGE_Y, width: S.w, height: S.h,
  backgroundColor: pal[0], strokeColor: pal[1], locked: false,
}, label, 12);

const BANK_X = COL_X[1] + COL_W + 40;
const banque = [
  text({ x: BANK_X, y: JUGE_Y - 24, text: 'Banque', fontSize: 13, strokeColor: '#868e96' }),
  ...labelled({ x: BANK_X, y: JUGE_Y, width: S.w, height: S.h, backgroundColor: POS[0], strokeColor: POS[1], locked: false }, 'Positif', 12),
  ...labelled({ x: BANK_X + S.w + 14, y: JUGE_Y, width: S.w, height: S.h, backgroundColor: NEG[0], strokeColor: NEG[1], locked: false }, 'Négatif', 12),
];

const CONSIGNES = consignes(BANK_X, 0, 'Consignes', [
  'Le même modèle de tarification, écrit',
  'de deux façons.',
  '',
  'Nommer les points positifs et négatifs',
  'de chacune, en post-its.',
  '',
  'Puis la question qui compte :',
  'quelle est la différence de fond',
  'entre les deux approches ?',
], 330);

const canevas = [...colonne(0, GAUCHE), ...colonne(1, DROITE), ...banque, ...CONSIGNES];

const SOL = [
  [['Plus simple /\nmoins de code', POS], ['Moins\nflexible', NEG]],
  [['Plus\nflexible', POS], ['Moins\nsimple', NEG]],
];
const solution = [...colonne(0, GAUCHE), ...colonne(1, DROITE), ...CONSIGNES];
SOL.forEach((col, i) => col.forEach(([l, pal], j) => solution.push(...avis(i, j, l, pal))));
solution.push(...consignes(BANK_X, 300, 'La différence de fond', [
  'À gauche, un Template Method : la',
  "classe mère internalise l'algorithme",
  'et délègue la variabilité à des',
  'méthodes abstraites, implémentées par',
  'ses filles. Le choix se fait à la',
  'compilation, par héritage.',
  '',
  'À droite, une Strategy : la variabilité',
  'est un objet passé au constructeur.',
  "Le choix se fait à l'exécution, et la",
  'policy se teste et se réutilise seule.',
  '',
  "C'est cette seconde forme que le",
  'Policy pattern retient.',
], 330));

const DIR = path.join(__dirname, '..', 'seance-3');
write(path.join(DIR, '07-strategy-vs-template-canevas.excalidraw'), canevas);
write(path.join(DIR, '07-strategy-vs-template-solution.excalidraw'), solution);
