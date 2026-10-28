// Exercice 15 — Event Storming du parcours Moveo (séance bonus)
// La banque de post-its est fournie par bonus/15-event-storming.excalidrawlib ;
// le canevas ne porte que la légende, la frise et le plan de travail.
const path = require('path');
const { rect, text, labelled, arrow, connect, consignes, write } = require('./excalidraw-kit');

const CAT = {
  evenement: ['#ffd8a8', '#e8590c'],
  commande: ['#a5d8ff', '#1971c2'],
  acteur: ['#ffec99', '#f08c00'],
  regle: ['#d8f5a2', '#66a80f'],
  modele: ['#eebefa', '#9c36b5'],
  probleme: ['#ffc9c9', '#e03131'],
};
const S = { w: 150, h: 70 };

const postit = (x, y, label, cat) => labelled({
  x, y, width: S.w, height: S.h,
  backgroundColor: CAT[cat][0], strokeColor: CAT[cat][1], locked: false,
}, label, 12);

// ----- légende : les six catégories, dans l'ordre où on les pose
const LEGENDE = [
  ['acteur', 'Acteur', 'qui agit'],
  ['commande', 'Commande', 'ce qu’il déclenche'],
  ['evenement', 'Évènement', 'ce qui s’est passé'],
  ['modele', 'Modèle', 'ce qu’on consulte'],
  ['regle', 'Règle métier', 'ce qui conditionne'],
  ['probleme', 'Problématiques', 'ce qui coince'],
];

function legende(x, y) {
  const e = [text({ x, y: y - 26, text: 'Légende', fontSize: 16, strokeColor: '#495057' })];
  LEGENDE.forEach(([cat, nom, glose], i) => {
    const yy = y + i * (S.h + 12);
    const [box, txt] = postit(x, yy, nom, cat);
    box.locked = true; txt.locked = true;
    e.push(box, txt);
    e.push(text({ x: x + S.w + 12, y: yy + S.h / 2 - 8, text: glose, fontSize: 12, strokeColor: '#868e96' }));
  });
  return e;
}

// ----- le canevas : frise + plan de travail
const AIRE_X = 400, AIRE_W = 1000, AIRE_H = 560;
const canevas = [
  ...legende(0, 30),
  text({ x: AIRE_X, y: 0, text: 'Le temps →', fontSize: 16, strokeColor: '#495057' }),
  arrow({ x: AIRE_X, y: 26, width: AIRE_W, height: 0, points: [[0, 0], [AIRE_W, 0]], strokeColor: '#adb5bd', strokeWidth: 2 }),
  rect({
    x: AIRE_X, y: 46, width: AIRE_W, height: AIRE_H,
    backgroundColor: 'transparent', strokeColor: '#ced4da', strokeStyle: 'dashed', strokeWidth: 1,
  }),
  ...consignes('Consignes', [
    'Raconter le parcours Moveo de bout en',
    'bout, dans l’ordre du temps.',
    '',
    'Commencer par les évènements seuls :',
    'ce qui s’est passé, au passé. Ensuite',
    'seulement, remonter aux commandes,',
    'puis aux acteurs.',
    '',
    'Poser en rouge tout ce qui fait débat :',
    'une problématique posée vaut mieux',
    'qu’un désaccord tu.',
    '',
    'Les post-its sont dans la bibliothèque',
    '15-event-storming.excalidrawlib.',
    '',
    'Durée : 30-45 min',
  ], 360),
];

// ----- la solution : le parcours de la frame « Proposition de correction »
const COL = { acteur: 400, commande: 580, evenement: 760, modele: 960 };
const FLUX = [
  ['Passager', 'Rechercher un trip', 'Trip trouvée', true],
  ['Passager', 'Réserver un trip', 'Trip réservée'],
  ['Conducteur', 'Proposer un trip', 'Trip publiée', true],
  ['Conducteur', 'Valider un passager', 'Passager validé'],
  ['Conducteur', 'Conduire la voiture', 'Trip effectuée'],
  ['Passager', 'Monter dans la voiture', 'Trip terminée'],
  ['Passager', 'Valider le trip', 'Trip payée'],
  ['Passager', 'Publier une note sur le conducteur', 'Trip clôturée'],
  ['Conducteur', 'Valider le trip', 'Paiement reçu'],
];

const solution = [...legende(0, 30)];
solution.push(text({ x: COL.acteur, y: 0, text: 'Le temps ↓', fontSize: 16, strokeColor: '#495057' }));
for (const [cle, x] of Object.entries(COL))
  solution.push(text({ x, y: 24, text: { acteur: 'Acteur', commande: 'Commande', evenement: 'Évènement', modele: 'Modèle' }[cle], fontSize: 13, strokeColor: '#868e96' }));

const modele = postit(COL.modele, 48, 'Trips', 'modele');
solution.push(...modele);

FLUX.forEach(([acteur, commande, evenement, lit], i) => {
  const y = 48 + i * (S.h + 14);
  const a = postit(COL.acteur, y, acteur, 'acteur');
  const c = postit(COL.commande, y, commande, 'commande');
  const ev = postit(COL.evenement, y, evenement, 'evenement');
  solution.push(...a, ...c, ...ev);
  solution.push(connect(a[0], c[0], '#868e96'), connect(c[0], ev[0], '#868e96'));
  if (lit) solution.push(connect(c[0], modele[0], '#9c36b5'));
});

solution.push(...consignes('Au débrief', [
  'Les évènements se nomment au passé.',
  'S’ils se nomment à l’impératif, ce sont',
  'des commandes déguisées.',
  '',
  'Un même acteur revient plusieurs fois :',
  'c’est normal, la frise suit le temps,',
  'pas les personnes.',
  '',
  '« Valider le trip » apparaît deux fois,',
  'côté passager et côté conducteur, pour',
  'deux évènements différents. C’est le',
  'genre d’ambiguïté que l’Event Storming',
  'fait remonter — et que le langage',
  'ubiquitaire doit trancher.',
  '',
  'Cette frise est une proposition, pas',
  'un corrigé : chaque groupe produit la',
  'sienne.',
], 360));

const DIR = path.join(__dirname, '..', '15-event-storming');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '15-event-storming-exercice.excalidraw'), canevas);
write(path.join(DIR, '15-event-storming-solution.excalidraw'), solution);
