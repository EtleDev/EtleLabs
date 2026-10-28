// Exercice 5 — Trier les objets par nature (séance 2, chapitre « Architecture »)
// Les quatre zones du master board — application services, domain, et dedans
// domain objects / domain services — et la banque des 17 post-its à classer.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const S = { w: 150, h: 62 };
const STICKY = ['#ffec99', '#f08c00'];
const PIEGE = ['#ffd8a8', '#e8590c'];   // le post-it lâché en cours d'exercice

// ----- les zones, toutes verrouillées
const OUT = { x: 0, y: 0, w: 900, h: 640 };
const APP = { x: 24, y: 56, w: 852, h: 150 };
const DOM = { x: 24, y: 232, w: 852, h: 384 };
const OBJ = { x: 48, y: 290, w: 400, h: 302 };
const SRV = { x: 476, y: 290, w: 400, h: 302 };

const zone = (z, label, bg, stroke, fs) => [
  rect({ x: z.x, y: z.y, width: z.w, height: z.h, backgroundColor: bg, strokeColor: stroke, strokeWidth: 1 }),
  ...(label ? [text({ x: z.x + 16, y: z.y + 12, text: label, fontSize: fs, strokeColor: stroke })] : []),
];

const zones = [
  ...zone(OUT, 'Architecture', '#f8f9fa', '#adb5bd', 18),
  ...zone(APP, 'Application services', '#e7f5ff', '#1971c2', 16),
  ...zone(DOM, 'Domain', '#ebfbee', '#2f9e44', 16),
  ...zone(OBJ, 'Domain objects', '#ffffff', '#40c057', 15),
  ...zone(SRV, 'Domain services', '#ffffff', '#40c057', 15),
];

const postit = (x, y, label, pal = STICKY) => labelled({
  x, y, width: S.w, height: S.h,
  backgroundColor: pal[0], strokeColor: pal[1], locked: false,
}, label, 12);

// ----- la banque : les 17 étiquettes du master, dans l'ordre où il les pose
const BANQUE = [
  'Open account', 'Plan trip', 'Price calculator',
  'List passengers', 'Trip', 'Refund Trip',
  'Foreign Exchange', 'Passengers', 'GetTripPlan',
  'Trip Planner', 'Price', 'Refund',
  'Distance', 'Passenger', 'UserService',
];
const GLOSE = {
  'Trip Planner': "Récupère le plan d'un\nvoyage (sur une carte)",
  'Foreign Exchange': "Convertit d'une monnaie\nà une autre",
};

const BANK_X = OUT.w + 60, BANK_COLS = 3;
const bank = [text({ x: BANK_X, y: 12, text: 'À classer', fontSize: 16, strokeColor: '#495057' })];
BANQUE.forEach((l, i) => {
  const x = BANK_X + (i % BANK_COLS) * (S.w + 16);
  const y = 46 + Math.floor(i / BANK_COLS) * (S.h + 16);
  bank.push(...postit(x, y, l, l === 'UserService' ? PIEGE : STICKY));
});

const CONSIGNES = consignes('Consignes', [
  'Classer chaque étiquette dans la zone',
  'qui lui correspond : application',
  'service, domain object, domain service.',
  '',
  'Une étiquette peut rester dehors si',
  'aucune zone ne convient — dites alors',
  'pourquoi.',
  '',
  'Durée : 10-15 min',
], 320);

// ----- canevas
const canevas = [...zones, ...bank, ...CONSIGNES];

// ----- solution
const SOL = {
  app: ['Open account', 'Plan trip', 'Refund Trip', 'List passengers', 'GetTripPlan'],
  obj: ['Trip', 'Passenger', 'Price', 'Distance', 'Refund'],
  srv: ['Price calculator', 'Passengers', 'Trip Planner', 'Foreign Exchange'],
};
const place = (zx, zy, cols, labels) => labels.flatMap((l, i) => postit(
  zx + (i % cols) * (S.w + 14),
  zy + Math.floor(i / cols) * (S.h + 14),
  l, l === 'UserService' ? PIEGE : STICKY));

const solution = [
  ...zones,
  ...place(APP.x + 16, APP.y + 44, 5, SOL.app),
  ...place(OBJ.x + 20, OBJ.y + 42, 2, SOL.obj),
  ...place(SRV.x + 20, SRV.y + 42, 2, SOL.srv),
  ...postit(OUT.w + 60, 56, 'UserService', PIEGE),
  text({ x: OUT.w + 60, y: 30, text: 'Reste dehors', fontSize: 14, strokeColor: '#e8590c' }),
  text({
    x: OUT.w + 60, y: 56 + S.h + 14, fontSize: 12, strokeColor: '#868e96',
    text: "Un nom qui ne dit rien : ni le métier\nni la couche. Lâché en cours\nd'exercice, il force la question\n« de quoi parle-t-on ? ».",
  }),
];
// gloses, posées sous les deux services externes
Object.entries(GLOSE).forEach(([l, g], i) => {
  const idx = SOL.srv.indexOf(l);
  solution.push(text({
    x: SRV.x + 20 + (idx % 2) * (S.w + 14),
    y: SRV.y + 42 + Math.floor(idx / 2) * (S.h + 14) + S.h + 4,
    text: g, fontSize: 11, strokeColor: '#868e96',
  }));
});
solution.push(...consignes('Points de débrief', [
  '« Passengers » est un service',
  'collection-oriented, pas une liste :',
  'un repository, ou un simple tableau.',
  '',
  'Un DTO comme GetTripPlan appartient',
  'à la couche application.',
  '',
  'Trip Planner et Foreign Exchange sont',
  'des interfaces du domaine ; leur',
  "implémentation vit dehors.",
  '',
  'La duplication est acceptée en DDD —',
  'ce qui renvoie aux bounded contexts.',
], 320));

const DIR = path.join(__dirname, '..', '05-tri-objets');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '05-tri-objets-exercice.excalidraw'), canevas);
write(path.join(DIR, '05-tri-objets-solution.excalidraw'), solution);
