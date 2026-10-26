// Exercice 8 — Implémenter la policy (séance 3, chapitre « Policy pattern »)
// Les règles tombent les unes après les autres : c'est le point de l'exercice.
// Les règles 2 à 5 sont donc masquées par des caches blancs verrouillés, que
// l'animateur retire au fur et à mesure.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const code = (o) => text({ fontFamily: 3, fontSize: 11, strokeColor: '#1864ab', ...o });

const REGLES = [
  "Calculer le prix d'un voyage.\nPrix = distance × 100.",
  "Un coupon de 10 % est appliqué si le\nvoyage dépasse les 50 km.",
  "Le coupon peut être paramétré (la\nréduction ainsi que le kilométrage).",
  "Le coupon est appliqué selon le seuil\ndépassé : 10 % à 50 km, 15 % à 100 km.",
  "Un coupon d'une valeur fixe (e.g. 5 €)\npeut être appliqué.",
];

const R_W = 420, R_H = 74, R_GAP = 12, R_Y = 34;

const regles = [text({ x: 0, y: 0, text: 'Règles métier', fontSize: 16, strokeColor: '#495057' })];
REGLES.forEach((r, i) => regles.push(...labelled({
  x: 0, y: R_Y + i * (R_H + R_GAP), width: R_W, height: R_H,
  backgroundColor: '#fff9db', strokeColor: '#f08c00', strokeWidth: 1,
}, `${i + 1}. ${r}`, 13, '#495057')));

// Caches blancs, verrouillés : les règles 2 à 5 ne se découvrent qu'en cours de route.
const caches = REGLES.slice(1).map((_, i) => rect({
  x: -4, y: R_Y + (i + 1) * (R_H + R_GAP) - 4, width: R_W + 8, height: R_H + 8,
  backgroundColor: '#ffffff', strokeColor: '#dee2e6', strokeWidth: 1,
}));

// ----- zone de code : départ + quatre itérations
const C_X = [470, 960], C_W = 470;
const DEPART = `class Price {
  private readonly value: number;
}

class Journey {
  calculatePrice(distance): Price {
    return new Price(distance * 100);
  }
}`;

const depart = [
  text({ x: C_X[0], y: 0, text: 'Itération 1 — code de départ', fontSize: 14, strokeColor: '#495057' }),
  rect({ x: C_X[0], y: 26, width: C_W, height: 150, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }),
  code({ x: C_X[0] + 12, y: 38, text: DEPART }),
];

const IT_H = 265, IT_Y = [210, 505];
function iteration(i, source) {
  const x = C_X[i % 2], y = IT_Y[Math.floor(i / 2)];
  const e = [text({ x, y, text: `Itération ${i + 2}`, fontSize: 14, strokeColor: '#868e96' })];
  e.push(rect({
    x, y: y + 26, width: C_W, height: IT_H,
    backgroundColor: source ? '#f8f9fa' : 'transparent',
    strokeColor: source ? '#adb5bd' : '#ced4da',
    strokeStyle: source ? 'solid' : 'dashed', strokeWidth: 1, locked: Boolean(source),
  }));
  if (source) e.push(code({ x: x + 12, y: y + 38, text: source }));
  return e;
}

const CONS_X = C_X[1] + C_W + 40;
const CONSIGNES = consignes(CONS_X, 0, 'Consignes', [
  'Développer le code en suivant les',
  'règles, dans leur ordre d’arrivée.',
  '',
  'Elles sont progressives : chacune doit',
  'vous amener à améliorer le code de',
  "l'itération précédente.",
  '',
  'Ne pas sauter à la solution finale —',
  'le design doit émerger.',
  '',
  'Durée : 20-25 min',
], 340);

const canevas = [...regles, ...depart, ...CONSIGNES];
for (let i = 0; i < 4; i++) canevas.push(...iteration(i, null));
canevas.push(...caches);

// ----- solution : le design qui émerge, règle après règle
const SOL = [
  `class Journey {
  calculatePrice(distance): Price {
    let price = new Price(distance * 100);
    if (distance > 50) {
      price = price.discountedBy(10);
    }
    return price;
  }
}

// Le « if » est honnête ici : une seule
// règle, pas encore de variabilité.`,

  `class Coupon {
  constructor(
    private readonly rate: Percentage,
    private readonly minDistance: Distance
  ) {}

  appliesTo(d: Distance) {
    return d.isGreaterThan(this.minDistance);
  }
  applyTo(p: Price) { return p.discountedBy(this.rate); }
}

// La règle devient un objet du domaine :
// on peut en parler, et la tester seule.`,

  `class TieredCoupon {
  constructor(private readonly tiers: Tier[]) {}

  applyTo(price: Price, d: Distance) {
    const tier = this.tiers
      .filter(t => t.appliesTo(d))
      .sort(Tier.byThresholdDesc)[0];

    return tier ? tier.applyTo(price) : price;
  }
}

// Le seuil dépassé le plus haut gagne.
// Le « if » aurait commencé à mentir.`,

  `interface DiscountPolicy {
  appliesTo(d: Distance): boolean;
  applyTo(price: Price): Price;
}

class PercentageDiscount
  implements DiscountPolicy { … }
class FixedDiscount
  implements DiscountPolicy { … }

class Journey {
  constructor(
    private readonly discounts: DiscountPolicy[]
  ) {}
}

// La policy était là depuis l'itération 3 ;
// la règle 5 ne fait que la nommer.`,
];

const solution = [...regles, ...depart, ...CONSIGNES];
SOL.forEach((s, i) => solution.push(...iteration(i, s)));

const DIR = path.join(__dirname, '..', 'seance-3');
write(path.join(DIR, '08-policy-canevas.excalidraw'), canevas);
write(path.join(DIR, '08-policy-solution.excalidraw'), solution);
