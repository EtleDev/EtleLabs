// Exercice 14 — Intégrer les bounded contexts (séance 5, chapitre « Intégrer les
// bounded contexts »). Trois modes d'intégration, à juger.
// Le master illustrait chaque mode par une image ; les schémas sont ici redessinés
// en formes Excalidraw, pour rester versionnables.
const path = require('path');
const { rect, text, labelled, connect, consignes, write } = require('./excalidraw-kit');

const COL_W = 420, COL_X = [0, 460, 920], SCHEMA_Y = 60, SCHEMA_H = 280;

const BC = { bg: '#d0ebff', stroke: '#1971c2', txt: '#1864ab' };
const AUTRE = { bg: '#ffec99', stroke: '#f08c00', txt: '#e8590c' };

const boite = (x, y, w, h, label, style, fs = 13) => labelled({
  x, y, width: w, height: h,
  backgroundColor: style.bg, strokeColor: style.stroke, strokeWidth: 2,
}, label, fs, style.txt);

// --- un schéma par mode d'intégration
function schema(i) {
  const x = COL_X[i], y = SCHEMA_Y;
  const e = [rect({ x, y, width: COL_W, height: SCHEMA_H, backgroundColor: '#ffffff', strokeColor: '#dee2e6', strokeWidth: 1 })];
  const a = boite(x + 25, y + 40, 140, 60, 'Bounded\nContext A', BC);
  const b = boite(x + 255, y + 40, 140, 60, 'Bounded\nContext B', BC);
  e.push(...a, ...b);

  if (i === 0) {           // Shared model : un seul modèle, partagé
    const m = boite(x + 140, y + 180, 140, 60, 'Modèle\npartagé', AUTRE);
    e.push(...m);
    e.push(connect(a[0], m[0], '#868e96'));
    e.push(connect(m[0], b[0], '#868e96'));
  } else if (i === 1) {    // Direct : appel synchrone, un DTO au passage
    const d = boite(x + 165, y + 150, 100, 46, 'DTO', AUTRE, 12);
    e.push(...d);
    e.push(connect(a[0], b[0], '#495057'));
    e.push(connect(a[0], d[0], '#adb5bd'));
    e.push(connect(d[0], b[0], '#adb5bd'));
    e.push(text({ x: x + 175, y: y + 48, text: 'appel', fontSize: 12, strokeColor: '#868e96' }));
  } else {                 // Asynchrone : un évènement, un bus, aucun retour
    const bus = boite(x + 110, y + 170, 200, 54, 'Bus d’évènements', AUTRE, 12);
    e.push(...bus);
    e.push(connect(a[0], bus[0], '#495057'));
    e.push(connect(bus[0], b[0], '#495057'));
    e.push(text({ x: x + 130, y: y + 140, text: 'évènement', fontSize: 12, strokeColor: '#868e96' }));
  }
  return e;
}

const TITRES = ['Shared model', 'Direct communication', 'Asynchronous'];
const entete = (i) => labelled({
  x: COL_X[i], y: 0, width: COL_W, height: 44,
  backgroundColor: '#f8f9fa', strokeColor: '#495057', strokeWidth: 2,
}, TITRES[i], 16, '#495057');

// --- post-its de jugement
const S = { w: 220, h: 64 };
const POS = ['#b2f2bb', '#2f9e44'], NEG = ['#ffc9c9', '#e03131'], NOTE = ['#ffec99', '#f08c00'];
const JUGE_Y = SCHEMA_Y + SCHEMA_H + 26;

const postit = (x, y, label, pal, w = S.w) => labelled({
  x, y, width: w, height: S.h, backgroundColor: pal[0], strokeColor: pal[1], locked: false,
}, label, 12, '#495057');

const CONS_X = COL_X[2] + COL_W + 40;
const CONSIGNES = consignes(CONS_X, 0, 'Consignes', [
  'Trois façons d’intégrer deux bounded',
  'contexts.',
  '',
  'Pour chacune : ce qu’elle apporte, ce',
  'qu’elle coûte, et quand la choisir.',
  '',
  'Puis la question qui tranche : laquelle',
  'pour un monolithe modulaire, laquelle',
  'si des microservices se profilent ?',
  '',
  'Durée : 15 min',
], 340);

const canevas = [];
for (let i = 0; i < 3; i++) canevas.push(...entete(i), ...schema(i));
canevas.push(...CONSIGNES);
canevas.push(text({ x: COL_X[0], y: JUGE_Y - 24, text: 'Positif / Négatif', fontSize: 13, strokeColor: '#868e96' }));
canevas.push(text({ x: CONS_X, y: JUGE_Y - 24, text: 'Banque', fontSize: 13, strokeColor: '#868e96' }));
canevas.push(...postit(CONS_X, JUGE_Y, 'Positif', POS));
canevas.push(...postit(CONS_X + S.w + 14, JUGE_Y, 'Négatif', NEG));

// --- solution : les post-its du master, remis dans leur colonne
const SOL = [
  [['À éviter (vraiment)', NEG]],
  [['À favoriser dans un monolithe modulaire, pour sa simplicité', POS],
   ['Favoriser les DTOs entre BC, pour anticiper les microservices', NOTE]],
  [['Découplage maximum', POS], ['Beaucoup de résilience', POS],
   ['Beaucoup plus complexe à mettre en place', NEG]],
];

const solution = [];
for (let i = 0; i < 3; i++) solution.push(...entete(i), ...schema(i));
solution.push(...CONSIGNES);
SOL.forEach((avis, i) => avis.forEach(([l, pal], j) => solution.push(...postit(
  COL_X[i], JUGE_Y + j * (S.h + 12), l, pal, COL_W))));

solution.push(...consignes(CONS_X, 300, 'Au débrief', [
  'Le shared model n’est pas une',
  'intégration : c’est un bounded context',
  'de plus, que personne n’assume. Dès',
  'que les deux équipes en ont besoin,',
  'plus personne ne peut le faire évoluer.',
  '',
  'L’appel direct reste le bon choix par',
  'défaut dans un monolithe modulaire —',
  'à condition de passer par un DTO, pas',
  'par l’entité de l’autre contexte.',
  '',
  'L’asynchrone achète du découplage et',
  'de la résilience, et les paie en',
  'complexité : cohérence différée,',
  'rejeu, ordre des messages.',
], 340));

const DIR = path.join(__dirname, '..', 'seance-5');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '14-integration-bc-canevas.excalidraw'), canevas);
write(path.join(DIR, '14-integration-bc-solution.excalidraw'), solution);
