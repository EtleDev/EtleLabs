// Exercice 13 — Persistance du domaine (séance 4, « La dernière règle des aggregates »)
// Absent du master board : repris de la séance 6 du workshop original (Domain
// Persistence), qu'Etienne a confirmé vouloir réintégrer.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const code = (o) => text({ fontFamily: 3, fontSize: 11, strokeColor: '#1864ab', ...o });

const COL_W = 500, COL_X = [0, 540], CODE_Y = 56, CODE_H = 320;

const APPROCHES = [
  ['Persister directement le domaine', `@Entity()
class Trip {
  @Id() private id: string;
  @Column() private seats: number;

  // Les annotations de l'ORM vivent
  // dans l'objet du domaine.
  bookSeat() {
    if (this.seats === 0) throw new TripFull();
    this.seats--;
  }
}

class TripRepository {
  save(trip: Trip) {
    return this.orm.persist(trip);
  }
}`],

  ['Mapper vers des objets dédiés', `// Domain Layer — aucune annotation
class Trip {
  bookSeat() {
    if (this.seats === 0) throw new TripFull();
    this.seats--;
  }
}

// Infrastructure Layer
@Entity()
class TripRecord {
  @Id() id: string;
  @Column() seats: number;
}

class TripMapper {
  toDomain(r: TripRecord): Trip { … }
  toRecord(t: Trip): TripRecord { … }
}`],
];

const colonne = (i) => [
  ...labelled({
    x: COL_X[i], y: 0, width: COL_W, height: 44,
    backgroundColor: '#f8f9fa', strokeColor: '#495057', strokeWidth: 2,
  }, APPROCHES[i][0], 16, '#495057'),
  rect({ x: COL_X[i], y: CODE_Y, width: COL_W, height: CODE_H, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }),
  code({ x: COL_X[i] + 12, y: CODE_Y + 12, text: APPROCHES[i][1] }),
];

const S = { w: 240, h: 58 };
const POS = ['#b2f2bb', '#2f9e44'], NEG = ['#ffc9c9', '#e03131'];
const JUGE_Y = CODE_Y + CODE_H + 26;

const postit = (x, y, label, pal) => labelled({
  x, y, width: S.w, height: S.h, backgroundColor: pal[0], strokeColor: pal[1], locked: false,
}, label, 12, '#495057');

const CONS_X = COL_X[1] + COL_W + 40;
const CONSIGNES = consignes(CONS_X, 0, 'Consignes', [
  'Comment persister un domaine qui',
  'doit rester pur ?',
  '',
  'Deux voies : persister directement les',
  'objets du domaine, ou les mapper vers',
  'des objets de persistance dédiés.',
  '',
  'Lister les arguments pour et contre',
  'chacune, en deux colonnes.',
  '',
  'Durée : 10-15 min',
], 340);

const canevas = [...colonne(0), ...colonne(1), ...CONSIGNES];
canevas.push(text({ x: COL_X[0], y: JUGE_Y - 24, text: 'Positif / Négatif', fontSize: 13, strokeColor: '#868e96' }));
canevas.push(text({ x: CONS_X, y: JUGE_Y - 24, text: 'Banque', fontSize: 13, strokeColor: '#868e96' }));
canevas.push(...postit(CONS_X, JUGE_Y, 'Positif', POS));
canevas.push(...postit(CONS_X + S.w + 14, JUGE_Y, 'Négatif', NEG));

const SOL = [
  [['Pratique, évite le mapping', POS], ['Évite de créer des DAO', POS],
   ['Le domaine n’est plus pur', NEG], ['Le schéma de base contraint le modèle', NEG]],
  [['Le domaine reste pur', POS], ['La persistance évolue de son côté', POS],
   ['Domain Verbose : beaucoup de code', NEG], ['Un mapping de plus à maintenir', NEG]],
];

const solution = [...colonne(0), ...colonne(1), ...CONSIGNES];
SOL.forEach((avis, i) => avis.forEach(([l, pal], j) => solution.push(...postit(
  COL_X[i] + (j % 2) * (S.w + 14), JUGE_Y + Math.floor(j / 2) * (S.h + 12), l, pal))));

solution.push(...consignes(CONS_X, 300, 'La règle à poser', [
  'On ne modifie JAMAIS la donnée en',
  'base. On passe TOUJOURS par le',
  'logiciel.',
  '',
  'C’est ce qui justifie tout le reste :',
  'si la base est un point d’entrée, les',
  'invariants de l’agrégat ne valent plus',
  'rien.',
  '',
  'La voie directe n’est pas interdite,',
  'mais elle suppose un projet mûr et une',
  'équipe qui sait ce qu’elle fait. Sinon',
  'le schéma finit par dicter le modèle.',
], 340));

const DIR = path.join(__dirname, '..', 'seance-4');
write(path.join(DIR, '13-persistance-canevas.excalidraw'), canevas);
write(path.join(DIR, '13-persistance-solution.excalidraw'), solution);
