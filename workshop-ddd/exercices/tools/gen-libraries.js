// Génère une bibliothèque Excalidraw PAR exercice qui en a besoin.
//
// Excalidraw n'a pas de banque de formes posée sur le canevas comme Lucid ou Miro.
// Son équivalent est la bibliothèque : un .excalidrawlib chargé une fois, dont les
// éléments s'attrapent dans le panneau latéral. Mais le panneau est global et
// cumulatif : y laisser traîner les post-its d'un autre exercice parasite la séance.
// D'où une bibliothèque ciblée, rangée à côté du canevas qu'elle sert.
const fs = require('fs');
const path = require('path');

let seq = 0, idc = 0;
const nextIndex = () => 'a' + String(seq++).padStart(3, '0');
const rnd = () => Math.floor(Math.random() * 2 ** 31);
const nextId = (p) => `${p}-${(++idc).toString(36)}`;

const base = (o) => ({
  angle: 0, strokeColor: '#1e1e1e', backgroundColor: 'transparent', fillStyle: 'solid',
  strokeWidth: 2, strokeStyle: 'solid', roughness: 1, opacity: 100, groupIds: [],
  frameId: null, index: nextIndex(), roundness: null, seed: rnd(), version: 1,
  versionNonce: rnd(), isDeleted: false, boundElements: [], updated: Date.now(),
  link: null, locked: false, ...o,
});

// Post-it = rectangle + texte lié. Mêmes dimensions que ceux des canevas (140 × 80),
// pour qu'un élément déposé depuis la bibliothèque s'aligne avec les autres.
function sticky(label, bg, stroke, w, h, fontSize = 13) {
  w = w || 140; h = h || 80;
  const id = nextId('box'), tid = nextId('txt');
  return [
    base({
      type: 'rectangle', roundness: { type: 3 }, id, x: 0, y: 0, width: w, height: h,
      backgroundColor: bg, strokeColor: stroke, boundElements: [{ id: tid, type: 'text' }],
    }),
    base({
      type: 'text', id: tid, containerId: id, x: 6, y: h / 2 - fontSize * 0.625,
      width: w - 12, height: fontSize * 1.25, fontSize, fontFamily: 1,
      textAlign: 'center', verticalAlign: 'middle', lineHeight: 1.25, autoResize: true,
      text: label, originalText: label, strokeColor: '#1e1e1e',
    }),
  ];
}

const LIBRARIES = [
  {
    file: 'seance-1/01-subdomains.excalidrawlib',
    name: 'Subdomains',
    // Code couleur de la banque du master board
    items: [
      ['Core', '#ffc9c9', '#e03131'],
      ['Supporting', '#ffec99', '#f08c00'],
      ['Generic', '#e9ecef', '#868e96'],
    ],
  },
  {
    file: 'seance-1/02-usecase-mapping.excalidrawlib',
    name: 'Use Case Mapping',
    size: { w: 180, h: 62 },
    items: [
      ['Acteur', '#e5dbff', '#6741d9'],
      ['Use case', '#96f2d7', '#0ca678'],
      ['Variante', '#c3fae8', '#0ca678'],
    ],
  },
  {
    file: 'bonus/15-event-storming.excalidrawlib',
    name: 'Event Storming',
    // Les six catégories de la frame bonus du master
    items: [
      ['Évènement', '#ffd8a8', '#e8590c'],
      ['Commande', '#a5d8ff', '#1971c2'],
      ['Acteur', '#ffec99', '#f08c00'],
      ['Règle métier', '#d8f5a2', '#66a80f'],
      ['Modèle', '#eebefa', '#9c36b5'],
      ['Problématiques', '#ffc9c9', '#e03131'],
    ],
  },
];

for (const lib of LIBRARIES) {
  const out = path.join(__dirname, '..', lib.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({
    type: 'excalidrawlib',
    version: 2,
    source: 'https://github.com/EtleDev/EtleLabs',
    libraryItems: lib.items.map(([label, bg, stroke], i) => ({
      status: 'unpublished',
      id: lib.name.toLowerCase().replace(/\W+/g, '-') + '-' + String(i + 1).padStart(2, '0'),
      created: Date.now(),
      name: label,
      elements: sticky(label, bg, stroke, (lib.size || {}).w, (lib.size || {}).h),
    })),
  }, null, 2));
  console.log(lib.file.padEnd(42), lib.items.length, 'éléments');
}
