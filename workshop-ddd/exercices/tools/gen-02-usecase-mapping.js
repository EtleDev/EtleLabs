// Exercice 2 — Use Case Mapping (séance 1)
// Sert les deux slides « Rendre l'implicite explicite » et « Analyser les use cases »
// de partie-1-domain-discovery.html : c'est un seul canevas, travaillé en deux temps.
// Contenu de la solution repris du master board, séance 1, section « Usecase Mapping ».
const path = require('path');
const { text, labelled, connect, consignes, write } = require('./excalidraw-kit');

const ACTOR = { w: 150, h: 64, bg: '#e5dbff', stroke: '#6741d9' };
const UC    = { w: 180, h: 62, bg: '#96f2d7', stroke: '#0ca678' };
const SUB   = { w: 120, h: 52, bg: '#c3fae8', stroke: '#0ca678' };
const GAP_Y = 14;

const actor = (x, y, label) => labelled({
  x, y, width: ACTOR.w, height: ACTOR.h,
  backgroundColor: ACTOR.bg, strokeColor: ACTOR.stroke, locked: false,
}, label, 15, '#5f3dc4');

const usecase = (x, y, label, spec = UC) => labelled({
  x, y, width: spec.w, height: spec.h,
  backgroundColor: spec.bg, strokeColor: spec.stroke, locked: false,
}, label, 13, '#0b7285');

const CONSIGNES = consignes(1180, 0, 'Consignes', [
  'Repérer les acteurs de Moveo, puis',
  'les use cases principaux de chacun.',
  '',
  'Un acteur (violet) relié à ses use',
  'cases (vert). Les variantes se',
  'rattachent à leur use case parent.',
  '',
  'Nommer du point de vue de l\'acteur,',
  'avec le vocabulaire du domaine.',
  '',
  'Durée : 10-15 min',
], 320);

// Deux groupes acteur + use cases, côte à côte
function groupe(x, y, nom, cas) {
  const e = [], liens = [];
  const [a, at] = actor(x, y + (cas.length * (UC.h + GAP_Y) - GAP_Y) / 2 - ACTOR.h / 2, nom);
  e.push(a, at);
  cas.forEach(([label, enfants], i) => {
    const uy = y + i * (UC.h + GAP_Y);
    const [u, ut] = usecase(x + ACTOR.w + 60, uy, label);
    e.push(u, ut);
    liens.push(connect(a, u));
    (enfants || []).forEach((sub, j) => {
      const [s, st] = usecase(x + ACTOR.w + 60 + UC.w + 40, uy + j * (SUB.h + 8) - (enfants.length - 1) * (SUB.h + 8) / 2, sub, SUB);
      e.push(s, st);
      liens.push(connect(u, s));
    });
  });
  return [...e, ...liens];
}

const CONDUCTEUR = [
  ['Créer un profil\nconducteur'],
  ['Mettre ma voiture\nà disposition', ['Ponctuel', 'Récurrent']],
  ['Définir mes\ncoordonnées bancaires'],
  ['Accepter un passager'],
  ['Refuser un passager'],
  ['Annuler un trajet'],
];
const PASSAGER = [
  ['Créer un profil\npassager'],
  ['Rechercher un\ncovoiturage'],
  ['Réserver une place\ndans un covoiturage'],
  ['Payer la réservation'],
  ['Annuler la réservation'],
];

// ----- canevas : légende + espace de travail vierge
const canevas = [...CONSIGNES];
canevas.push(text({ x: 0, y: -40, text: 'Légende — à dupliquer', fontSize: 14, strokeColor: '#868e96' }));
canevas.push(...actor(0, 0, 'Acteur'));
canevas.push(...usecase(ACTOR.w + 60, 0, 'Use case'));
canevas.push(...usecase(ACTOR.w + 60 + UC.w + 40, 5, 'Variante', SUB));
canevas.push(text({ x: 0, y: 140, text: 'Votre cartographie', fontSize: 14, strokeColor: '#868e96' }));

// ----- solution : celle du master board
const solution = [...CONSIGNES, ...groupe(0, 0, 'Conducteur', CONDUCTEUR), ...groupe(600, 40, 'Passager', PASSAGER)];

const DIR = path.join(__dirname, '..', 'seance-1');
write(path.join(DIR, '02-usecase-mapping-canevas.excalidraw'), canevas);
write(path.join(DIR, '02-usecase-mapping-solution.excalidraw'), solution);
