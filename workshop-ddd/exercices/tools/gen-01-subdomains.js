// Exercice 1 — Classer les subdomains de Moveo (séance 1, chapitre « Subdomains patterns »)
// Géométrie reprise du quadrant du master board, lui-même repris du composant
// .quadrant-chart des decks : Generic en bande gauche (25 %), Core en haut à droite
// (à partir de 50 %, sur 75 % de la hauteur), Supporting pour le reste.
const path = require('path');
const { rect, text, labelled, arrow, consignes, BLEU, write } = require('./excalidraw-kit');

const W = 1050, H = 700;                    // ratio 3:2, taille utilisable à 100 %
const GENERIC_W = W * 0.25;
const CORE_X = W * 0.5, CORE_H = H * 0.75;
const S = { w: 140, h: 80 };

const ZONE = {
  supporting: { bg: '#d0ebff', stroke: '#1971c2' },
  core:       { bg: '#96f2d7', stroke: '#0ca678' },
  generic:    { bg: '#dee2e6', stroke: '#868e96' },
};
// Code couleur des post-its, repris de la banque du master : Core rouge,
// Supporting jaune, Generic gris.
const STICKY = {
  core:       ['#ffc9c9', '#e03131'],
  supporting: ['#ffec99', '#f08c00'],
  generic:    ['#e9ecef', '#868e96'],
};

function quadrant() {
  const e = [];
  e.push(rect({ x: GENERIC_W, y: 0, width: W - GENERIC_W, height: H, ...fill(ZONE.supporting) }));
  e.push(rect({ x: 0, y: 0, width: GENERIC_W, height: H, ...fill(ZONE.generic) }));
  e.push(rect({ x: CORE_X, y: 0, width: W - CORE_X, height: CORE_H, ...fill(ZONE.core) }));
  e.push(text({ x: 42, y: 470, text: 'G\nE\nN\nE\nR\nI\nC', fontSize: 24, strokeColor: '#495057', textAlign: 'center' }));
  e.push(text({ x: CORE_X + 40, y: 30, text: 'CORE', fontSize: 32, strokeColor: '#087f5b' }));
  e.push(text({ x: GENERIC_W + 40, y: H - 80, text: 'SUPPORTING', fontSize: 28, strokeColor: '#1864ab' }));
  e.push(arrow({ x: -35, y: H, width: 0, height: H, points: [[0, 0], [0, -H]], strokeColor: '#495057' }));
  e.push(arrow({ x: 0, y: H + 50, width: W, height: 0, points: [[0, 0], [W, 0]], strokeColor: '#495057' }));
  e.push(text({ x: -150, y: H / 2 - 30, text: 'Complexité\ndu modèle', fontSize: 16, angle: -Math.PI / 2, strokeColor: '#495057' }));
  e.push(text({ x: W / 2 - 85, y: H + 70, text: 'Différenciation métier', fontSize: 16, strokeColor: '#495057' }));
  for (const [x, y, t] of [[-30, H + 70, 'Faible'], [W - 40, H + 70, 'Fort'], [-95, H - 20, 'Faible'], [-95, 0, 'Fort']])
    e.push(text({ x, y, text: t, fontSize: 14, strokeColor: '#868e96' }));
  return e;
}
const fill = (z) => ({ backgroundColor: z.bg, strokeColor: z.stroke });

const postit = (x, y, label, k) => labelled({
  x, y, width: S.w, height: S.h,
  backgroundColor: STICKY[k][0], strokeColor: STICKY[k][1], locked: false,
}, label, 13);

const BRIEF = consignes('Brief', [
  'Moveo est une application mobile qui permet',
  'à ses utilisateurs de partager un covoiturage',
  'sur de courtes et longues distances.',
  '',
  'Les conducteurs créent un profil et mettent',
  'leur véhicule à disposition aux horaires qui',
  'leur conviennent (répétitif ou ponctuel).',
  '',
  'Un covoituré fait une recherche pour trouver',
  'un véhicule qui l\'emmène d\'un point A à un',
  'point B via un module de recherche',
  'sophistiqué.',
  '',
  'L\'entreprise prend une commission',
  'sur les covoiturages et',
  '**offre la meilleure rémunération du**',
  '**marché à ses covoitureurs.**',
], 340, BLEU);

const CONSIGNES = consignes('Consignes', [
  'Lire le brief, puis :',
  'trouver quels sont les subdomains de Moveo ?',
  'Classez-les.',
  '',
  'Un post-it par subdomain, posé dans la zone',
  'qui lui correspond. La bibliothèque fournit',
  'les trois couleurs.',
  '',
  'Durée : 10 min',
]);

// ----- canevas : quadrant vierge + rappel du code couleur
const canevas = [...quadrant(), ...CONSIGNES, ...BRIEF];
['core', 'supporting', 'generic'].forEach((k, i) => {
  const x = 120 + i * 180;
  canevas.push(text({ x, y: H + 116, text: k[0].toUpperCase() + k.slice(1), fontSize: 14, strokeColor: STICKY[k][1] }));
  canevas.push(...postit(x, H + 150, '', k));
});

// ----- solution : celle du master board (8 post-its)
const SOL = {
  core:       ['Matching\nconducteur /\npassagers', 'Voyage\n(prix / distance)'],
  supporting: ['Profil\nconducteur', 'Profil\npassager'],
  generic:    ['Auth', 'Paiement', 'Support client', 'Avis & Feedback'],
};
const SLOT = {
  // Le Core se lit dans le coin : le plus différenciant tout en haut à droite,
  // le second juste dessous.
  core:       { x: W - S.w - 20, y: 20, cols: 1 },
  supporting: { x: GENERIC_W + 30, y: 180, cols: 1 },
  generic:    { x: 20, y: 90, cols: 1 },
};
const solution = [...quadrant(), ...CONSIGNES, ...BRIEF];
for (const k of Object.keys(SOL)) {
  const s = SLOT[k];
  SOL[k].forEach((lbl, i) => solution.push(...postit(
    s.x + (i % s.cols) * (S.w + 20), s.y + Math.floor(i / s.cols) * (S.h + 14), lbl, k)));
}

const DIR = path.join(__dirname, '..', '01-subdomains');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '01-subdomains-exercice.excalidraw'), canevas);
write(path.join(DIR, '01-subdomains-solution.excalidraw'), solution);
