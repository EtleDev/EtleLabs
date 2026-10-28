// Helpers partagés par les générateurs de canevas.
//
// Deux contraintes découvertes à l'usage, à ne pas réintroduire :
//  - Excalidraw IGNORE la vue enregistrée dans le fichier (cleanAppStateForExport
//    retire zoom et scroll, puis getScrollToContentState recentre en gardant le
//    zoom courant, donc 100 %). La scène doit donc TENIR à 100 % : voir assertFits.
//  - La largeur d'un texte doit être généreuse, sinon Excalidraw le rogne
//    (« SUPPORTING » affiché « SUPPORTIN »).
const fs = require('fs');

const MAX_W = 1900, MAX_H = 950;   // fenêtre de référence, zoom 100 %
const CHAR_W = 0.7;                // largeur moyenne d'un caractère, en em

let seq = 0, idc = 0;
const nextIndex = () => 'a' + String(seq++).padStart(4, '0');
const rnd = () => Math.floor(Math.random() * 2 ** 31);
const nextId = (p) => `${p}-${(++idc).toString(36)}`;

// Tout naît VERROUILLÉ : seuls les post-its sont libérés explicitement.
const base = (o) => ({
  angle: 0, strokeColor: '#1e1e1e', backgroundColor: 'transparent', fillStyle: 'solid',
  strokeWidth: 2, strokeStyle: 'solid', roughness: 1, opacity: 100, groupIds: [],
  frameId: null, index: nextIndex(), roundness: null, seed: rnd(), version: 1,
  versionNonce: rnd(), isDeleted: false, boundElements: [], updated: Date.now(),
  link: null, locked: true, ...o,
});

const rect = (o) => base({ type: 'rectangle', roundness: { type: 3 }, ...o });

const textWidth = (t, fontSize) =>
  t.split('\n').reduce((m, l) => Math.max(m, l.length), 0) * fontSize * CHAR_W;

const text = (o) => base({
  type: 'text', fontSize: 16, fontFamily: 1, textAlign: 'left', verticalAlign: 'top',
  containerId: null, lineHeight: 1.25, autoResize: true,
  width: textWidth(o.text || '', o.fontSize || 16),
  height: (o.text || '').split('\n').length * (o.fontSize || 16) * 1.25,
  originalText: o.text, ...o,
});

// Boîte + texte centré lié : le texte suit la boîte quand on la déplace.
// Excalidraw ROGNE un texte lié plus large que son conteneur (« SUPPORTING »
// affiché « SUPPORTIN »). On replie donc le libellé sur la largeur de la boîte,
// en gardant les retours à la ligne explicites comme des coupures dures.
function wrap(label, width, fontSize) {
  const max = Math.floor(width / (fontSize * CHAR_W));
  if (max < 1) return label;
  return label.split('\n').flatMap((hard) => {
    const out = [];
    for (const mot of hard.split(' ')) {
      if (out.length && (out[out.length - 1] + ' ' + mot).length <= max) out[out.length - 1] += ' ' + mot;
      else out.push(mot);
    }
    return out.length ? out : [''];
  }).join('\n');
}


function labelled(o, label, fontSize, color = '#1e1e1e') {
  const id = nextId('box'), tid = nextId('txt');
  label = wrap(label, o.width - 12, fontSize);
  const lines = label.split('\n').length;
  return [
    rect({ id, boundElements: [{ id: tid, type: 'text' }], ...o }),
    text({
      id: tid, containerId: id, text: label, originalText: label, fontSize,
      textAlign: 'center', verticalAlign: 'middle', strokeColor: color,
      locked: o.locked !== false, x: o.x + 6, y: o.y + o.height / 2 - (lines * fontSize * 1.25) / 2,
      width: o.width - 12, height: lines * fontSize * 1.25,
    }),
  ];
}

const arrow = (o) => base({
  type: 'arrow', points: o.points, roundness: { type: 2 }, startBinding: null,
  endBinding: null, startArrowhead: null, endArrowhead: 'arrow', elbowed: false, ...o,
});

// Flèche LIÉE à deux boîtes : elle suit quand on les déplace.
function connect(from, to, strokeColor = '#868e96') {
  const id = nextId('arr');
  const [x1, y1] = [from.x + from.width, from.y + from.height / 2];
  const [x2, y2] = [to.x, to.y + to.height / 2];
  from.boundElements = [...(from.boundElements || []), { id, type: 'arrow' }];
  to.boundElements = [...(to.boundElements || []), { id, type: 'arrow' }];
  return arrow({
    id, x: x1, y: y1, width: x2 - x1, height: y2 - y1,
    points: [[0, 0], [x2 - x1, y2 - y1]], strokeColor, strokeWidth: 1,
    startBinding: { elementId: from.id, focus: 0, gap: 4 },
    endBinding: { elementId: to.id, focus: 0, gap: 4 },
  });
}

// Encart consignes. Verrouillé, et TOUJOURS posé en haut à gauche : c'est la
// première chose qu'on lit. Il n'a donc pas de coordonnées — write() le sort du lot,
// l'empile dans la colonne de gauche et décale le reste de la scène.
// Les lignes sont pré-découpées : Excalidraw ne fait pas de retour à la ligne.
let encartSeq = 0;
const JAUNE = { bg: '#fff9db', bord: '#f08c00', titre: '#e8590c' };
const BLEU = { bg: '#e7f5ff', bord: '#1971c2', titre: '#1864ab' };

// Range un groupe d'elements dans la colonne de gauche, sous les consignes :
// une banque de post-its, une legende, tout ce qui se lit avant d'agir.
const aGauche = (els) => {
  const customData = { encart: ++encartSeq };
  return els.map((e) => ({ ...e, customData }));
};

function consignes(titre, lignes, width = 300, pal = JAUNE) {
  const pad = 16, fsT = 17, fsB = 13;
  const corps = lignes.join('\n');
  const h = pad * 2 + fsT * 1.25 + 10 + corps.split('\n').length * fsB * 1.25;
  // L'encart s'élargit si une ligne déborde : Excalidraw ne renvoie pas à la ligne,
  // et un texte plus large que sa boîte passe par-dessus la bordure.
  width = Math.max(width, Math.ceil(Math.max(textWidth(corps, fsB), textWidth(titre, fsT)) + pad * 2));
  const customData = { encart: ++encartSeq };
  return [
    rect({ x: 0, y: 0, width, height: h, backgroundColor: pal.bg, strokeColor: pal.bord, strokeWidth: 1, customData }),
    text({ x: pad, y: pad, text: titre, fontSize: fsT, strokeColor: pal.titre, customData }),
    text({ x: pad, y: pad + fsT * 1.25 + 10, text: corps, fontSize: fsB, strokeColor: '#495057', customData }),
  ];
}

const bbox = (elements) => {
  const pts = (e) => (e.points || [[0, 0]]).map((p) => [e.x + p[0], e.y + p[1]]);
  const b = (e) => (e.type === 'arrow' || e.type === 'line')
    ? { xs: pts(e).map((p) => p[0]), ys: pts(e).map((p) => p[1]) }
    : { xs: [e.x, e.x + (e.width || 0)], ys: [e.y, e.y + (e.height || 0)] };
  const xs = elements.flatMap((e) => b(e).xs), ys = elements.flatMap((e) => b(e).ys);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
};

// Déplace une copie des éléments : les générateurs réutilisent le même encart
// pour le canevas et la solution, on ne doit pas le décaler deux fois.
const place = (els, dx, dy) => els.map((e) => ({ ...e, x: e.x + dx, y: e.y + dy }));

// Met la scène en page : les encarts consignes empilés en colonne de gauche,
// le reste à leur droite, le tout calé en (0, 0).
const GOUTTIERE = 40, INTER_ENCART = 24;
function mettreEnPage(elements) {
  const encarts = new Map();
  const contenu = [];
  for (const e of elements) {
    const cle = e.customData && e.customData.encart;
    if (cle) encarts.set(cle, [...(encarts.get(cle) || []), e]);
    else contenu.push(e);
  }
  if (!encarts.size) {
    const b = bbox(contenu);
    return place(contenu, -b.minX, -b.minY);
  }
  const colonne = [];
  let y = 0, largeur = 0;
  for (const els of encarts.values()) {
    const b = bbox(els);
    colonne.push(...place(els, -b.minX, y - b.minY));
    y += b.maxY - b.minY + INTER_ENCART;
    largeur = Math.max(largeur, b.maxX - b.minX);
  }
  const b = bbox(contenu);
  return [...colonne, ...place(contenu, largeur + GOUTTIERE - b.minX, -b.minY)];
}

function write(file, elements) {
  elements = mettreEnPage(elements);
  const { minX, maxX, minY, maxY } = bbox(elements);
  const w = Math.round(maxX - minX), h = Math.round(maxY - minY);
  if (w > MAX_W || h > MAX_H) {
    throw new Error(`${file} : scène ${w}x${h}, dépasse ${MAX_W}x${MAX_H} — illisible à l'ouverture (Excalidraw ouvre à 100 %)`);
  }
  fs.writeFileSync(file, JSON.stringify({
    type: 'excalidraw', version: 2, source: 'https://github.com/EtleDev/EtleLabs',
    elements,
    appState: { gridSize: 20, gridStep: 5, gridModeEnabled: false, viewBackgroundColor: '#ffffff' },
    files: {},
  }, null, 2));
  const libres = elements.filter((e) => !e.locked).length;
  console.log(`  ${file.split(/[\/]/).pop().padEnd(44)} ${w}x${h}  ${elements.length} éléments (${libres} libres)`);
}

module.exports = { base, rect, text, labelled, aGauche, BLEU, JAUNE, wrap, arrow, connect, consignes, bbox, write, nextId, textWidth };
