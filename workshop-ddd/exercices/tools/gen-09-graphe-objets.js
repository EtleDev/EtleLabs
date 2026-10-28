// Exercice 9 — Graphe d'objets (séance 4, chapitre « Aggregates », intro)
// Douze indications métier, une banque de noms : reconstituer le graphe.
// C'est l'échauffement de l'exercice 10, qui découpera ce graphe en agrégats.
const path = require('path');
const { rect, text, labelled, connect, consignes, write, wrap } = require('./excalidraw-kit');

const INDICATIONS = [
  'Un Journey contient un ou plusieurs Trips',
  "Un Journey peut contenir jusqu'à 4 Passagers",
  'Un Passager est un User',
  'Un Trip possède des Notes de Voyage\nécrites par un Passager',
  'Un Conducteur est un User',
  'Un RoadBook contient des Segments',
  'Une Journey contient un Carnet de Voyage (RoadBook)',
  "Un RoadBook contient un point de départ et d'arrivée",
  'Une Review est écrite par un User\net associée à une Journey',
  'Un User possède une PersonalAddress',
  'Un User possède des Settings',
  'Il y a les PhoneSettings et les EmailSettings',
];

const R_W = 430, R_GAP = 8, R_Y = 34;
const regles = [text({ x: 0, y: 0, text: 'Indications', fontSize: 16, strokeColor: '#495057' })];
let ry = R_Y;
for (const [i, r] of INDICATIONS.entries()) {
  const h = 18 + wrap(`${i + 1}. ${r}`, R_W - 12, 13).split('\n').length * 13 * 1.25;
  regles.push(...labelled({
    x: 0, y: ry, width: R_W, height: h,
    backgroundColor: '#fff9db', strokeColor: '#f08c00', strokeWidth: 1,
  }, `${i + 1}. ${r}`, 13, '#495057'));
  ry += h + R_GAP;
}

// ----- un nœud du graphe
const N = { w: 160, h: 46 };
const node = (x, y, label) => labelled({
  x, y, width: N.w, height: N.h,
  backgroundColor: '#e5dbff', strokeColor: '#6741d9', locked: false,
}, label, 13, '#5f3dc4');

// ----- banque de noms, pour le canevas
const NOMS = [
  'Journey', 'Trip', 'Passenger', 'Driver', 'User',
  'Review', 'Note', 'Roadbook', 'Segment', 'Departure',
  'Arrival', 'PersonalAddress', 'Settings', 'PhoneSettings', 'EmailSettings',
];
const B_X = R_W + 50;
const banque = [text({ x: B_X, y: 0, text: 'Noms disponibles', fontSize: 16, strokeColor: '#495057' })];
NOMS.forEach((n, i) => banque.push(...node(
  B_X + (i % 3) * (N.w + 16), R_Y + Math.floor(i / 3) * (N.h + 14), n)));

const AIRE_Y = R_Y + 5 * (N.h + 14) + 30;
const aire = [
  text({ x: B_X, y: AIRE_Y - 24, text: 'Plan de travail', fontSize: 14, strokeColor: '#868e96' }),
  rect({ x: B_X, y: AIRE_Y, width: 3 * (N.w + 16) - 16, height: ry - AIRE_Y - R_GAP,
    backgroundColor: 'transparent', strokeColor: '#ced4da', strokeStyle: 'dashed', strokeWidth: 1 }),
];

const CONS_X = B_X + 3 * (N.w + 16) + 24;
const CONS_LIGNES = [
  'Constituer le ou les graphes',
  "d'objets qui correspondent aux",
  'indications données.',
  '',
  'Un nom par nœud, une flèche par',
  'relation — du contenant vers le',
  'contenu.',
  '',
  'Tous les noms ne servent pas',
  'forcément de la même façon :',
  "certains sont un rôle, pas un type.",
  '',
  'Durée : 5-10 min',
];
const CONSIGNES = consignes('Consignes', CONS_LIGNES, 320);

const canevas = [...regles, ...banque, ...aire, ...CONSIGNES];

// ----- solution : un seul graphe connexe, celui du master
const G = {};
const SOL_CONS_X = B_X + 940;
const solution = [...regles, ...consignes('Consignes', CONS_LIGNES, 320)];
const place = (key, x, y, label) => {
  const [box, txt] = node(x, y, label);
  G[key] = box;
  solution.push(box, txt);
};

place('review',   B_X,              340, 'Review');
place('journey',  B_X + 190,        140, 'Journey');
place('user',     B_X + 190,        500, 'User');
place('trips',    B_X + 380,         90, 'Trip');
place('notes',    B_X + 570,        190, 'Note');
place('roadbook', B_X + 570,         40, 'Roadbook');
place('departure', B_X + 760,       -20, 'Departure');
place('segments',  B_X + 760,        50, 'Segment');
place('arrival',   B_X + 760,       120, 'Arrival');
place('address',  B_X + 380,        450, 'PersonalAddress');
place('settings', B_X + 380,        540, 'Settings');
place('phone',    B_X + 570,        510, 'PhoneSettings');
place('email',    B_X + 570,        580, 'EmailSettings');

for (const [a, b] of [
  ['review', 'journey'], ['review', 'user'],
  ['journey', 'trips'], ['trips', 'roadbook'], ['trips', 'notes'],
  ['roadbook', 'departure'], ['roadbook', 'segments'], ['roadbook', 'arrival'],
  ['user', 'address'], ['user', 'settings'], ['settings', 'phone'], ['settings', 'email'],
]) solution.push(connect(G[a], G[b], '#6741d9'));

solution.push(...consignes('À relever au débrief', [
  'Passenger et Driver ne sont pas des',
  'types : ce sont deux rôles du même',
  'User. Ils disparaissent du graphe.',
  '',
  'Trip et Journey ne sont pas la même',
  'chose : un Journey est une suite de',
  'Trips.',
  '',
  'Le graphe est connexe — et c’est bien',
  'le problème : tout tient en un seul',
  'bloc. La séparation en agrégats, c’est',
  "l'exercice suivant.",
], 320));

const DIR = path.join(__dirname, '..', '09-graphe-objets');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '09-graphe-objets-exercice.excalidraw'), canevas);
write(path.join(DIR, '09-graphe-objets-solution.excalidraw'), solution);
