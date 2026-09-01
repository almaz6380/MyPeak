/* eslint-disable */
// Die Figur: EIN durchgehender Koerper ueber einem Skelett, keine
// zusammengesteckten Einzelteile.
//
// ⚠ WARUM DER NEUBAU (01.09.2026): Die erste Fassung setzte die Figur aus
// Kapseln und Kugeln zusammen. An jedem Gelenk sass sichtbar eine Naht, der
// Koerper wirkte wie eine Wurstkette. Josefs Urteil: „sieht beschissen aus" —
// zutreffend. Zusammengesteckte Teile bleiben zusammengesteckt, auch wenn man
// sie mitdreht; es braucht eine durchgehende Haut, die sich am Gelenk BIEGT.
//
// Der Weg dorthin ist Standard, nur muss man ihn gehen:
// 1. Skelett aus Knochen aufbauen (THREE.Bone).
// 2. Die Haut als durchgehende Roehren erzeugen — ein Arm ist EIN Schlauch
//    von der Schulter bis zum Handgelenk, mit wechselndem Radius; der
//    Ellbogen ist nur eine Verdickung, keine Nahtstelle.
// 3. Jeden Punkt der Haut an die zwei naechstgelegenen Knochen binden
//    (Gewicht nach Abstand). Am Gelenk mischen beide, dadurch biegt sich die
//    Haut weich statt zu knicken.
// 4. Als THREE.SkinnedMesh rendern.

const GRAD = Math.PI / 180;

// ————— Skelett —————
// Ruhehaltung: aufrecht, Arme haengen. Positionen sind ELTERNRELATIV.
// Die Laengen sind zugleich die Gelenkabstaende — die Haut wird daraus
// erzeugt, deshalb kann hier keine Luecke mehr entstehen wie beim ersten Mal.
const SKELETT = [
  { name: 'huefte', eltern: null, pos: [0, 1.00, 0] },
  { name: 'rumpf', eltern: 'huefte', pos: [0, 0.07, 0] },
  { name: 'brust', eltern: 'rumpf', pos: [0, 0.23, 0] },
  { name: 'hals', eltern: 'brust', pos: [0, 0.23, 0] },
  { name: 'kopf', eltern: 'hals', pos: [0, 0.11, 0] },

  { name: 'schulterL', eltern: 'brust', pos: [0.21, 0.15, 0] },
  { name: 'ellbogenL', eltern: 'schulterL', pos: [0, -0.29, 0] },
  { name: 'handL', eltern: 'ellbogenL', pos: [0, -0.26, 0] },
  { name: 'schulterR', eltern: 'brust', pos: [-0.21, 0.15, 0] },
  { name: 'ellbogenR', eltern: 'schulterR', pos: [0, -0.29, 0] },
  { name: 'handR', eltern: 'ellbogenR', pos: [0, -0.26, 0] },

  { name: 'huefteL', eltern: 'huefte', pos: [0.105, -0.07, 0] },
  { name: 'knieL', eltern: 'huefteL', pos: [0, -0.45, 0] },
  { name: 'fussL', eltern: 'knieL', pos: [0, -0.43, 0] },
  { name: 'huefteR', eltern: 'huefte', pos: [-0.105, -0.07, 0] },
  { name: 'knieR', eltern: 'huefteR', pos: [0, -0.45, 0] },
  { name: 'fussR', eltern: 'knieR', pos: [0, -0.43, 0] },
];

// Kettenlaengen, die die IK braucht (aus dem Skelett abgeleitet).
const MASSE = {
  oberarm: 0.29, unterarm: 0.26,
  oberschenkel: 0.45, unterschenkel: 0.43,
};

function skelettBauen() {
  const knochen = {};
  const wurzelKnochen = [];
  for (const k of SKELETT) {
    const b = new THREE.Bone();
    b.name = k.name;
    b.position.set(k.pos[0], k.pos[1], k.pos[2]);
    knochen[k.name] = b;
    if (k.eltern) knochen[k.eltern].add(b);
    else wurzelKnochen.push(b);
  }
  const liste = SKELETT.map((k) => knochen[k.name]);
  return { knochen, liste, wurzel: wurzelKnochen[0] };
}

// ————— Haut —————
// Eine Roehre entlang einer Mittellinie. Die Ringe stehen senkrecht zur
// Laufrichtung; bei den geraden Gliedmassen der Ruhehaltung ist das schlicht
// die Waagrechte, deshalb reicht diese einfache Fassung.
function roehre(punkte, radien, breiteZ, segmente) {
  const seg = segmente || 20;
  const pos = [];
  const idx = [];
  const ringe = punkte.length;
  for (let i = 0; i < ringe; i++) {
    const p = punkte[i];
    const r = radien[i];
    const rz = r * (breiteZ || 1);
    for (let s = 0; s < seg; s++) {
      const a = (s / seg) * Math.PI * 2;
      pos.push(p[0] + Math.cos(a) * r, p[1], p[2] + Math.sin(a) * rz);
    }
  }
  for (let i = 0; i < ringe - 1; i++) {
    for (let s = 0; s < seg; s++) {
      const a = i * seg + s;
      const b = i * seg + ((s + 1) % seg);
      const c = (i + 1) * seg + s;
      const d = (i + 1) * seg + ((s + 1) % seg);
      idx.push(a, c, b, b, c, d);
    }
  }
  // Kappen: Mittelpunkt oben und unten, damit der Schlauch geschlossen ist
  const obenIdx = pos.length / 3;
  pos.push(punkte[0][0], punkte[0][1], punkte[0][2]);
  for (let s = 0; s < seg; s++) idx.push(obenIdx, ((s + 1) % seg), s);
  const untenIdx = pos.length / 3;
  const l = punkte[ringe - 1];
  pos.push(l[0], l[1], l[2]);
  const basis = (ringe - 1) * seg;
  for (let s = 0; s < seg; s++) idx.push(untenIdx, basis + s, basis + ((s + 1) % seg));
  return { pos, idx };
}

// Punkte gleichmaessig zwischen zwei Hoehen verteilen.
function linie(x, z, vonY, bisY, n) {
  const p = [];
  for (let i = 0; i < n; i++) p.push([x, vonY + ((bisY - vonY) * i) / (n - 1), z]);
  return p;
}

// Radienverlauf aus Stuetzstellen interpolieren.
function radien(stuetzen, n) {
  const r = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = t * (stuetzen.length - 1);
    const i0 = Math.min(Math.floor(x), stuetzen.length - 2);
    const f = x - i0;
    r.push(stuetzen[i0] * (1 - f) + stuetzen[i0 + 1] * f);
  }
  return r;
}

// Ein Koerperteil: Geometrie plus die Knochen, an die es gebunden werden darf.
// Die Einschraenkung ist wichtig — ohne sie zieht ein Punkt am Bauch auch mal
// am Oberschenkel, weil der zufaellig naeher liegt.
function teile() {
  const t = [];
  const N = 16; // Ringe je Gliedmasse

  // Rumpf: von der Huefte bis zum Hals, in der Tiefe gestaucht.
  {
    const p = linie(0, 0, 0.87, 1.53, 22);
    const r = radien([0.132, 0.140, 0.130, 0.121, 0.131, 0.150, 0.162, 0.165, 0.150, 0.120, 0.088], 22);
    t.push({ ...roehre(p, r, 0.68, 26), knochen: ['huefte', 'rumpf', 'brust', 'huefteL', 'huefteR'] });
  }
  // Hals
  {
    const p = linie(0, 0, 1.50, 1.62, 6);
    t.push({ ...roehre(p, radien([0.070, 0.055, 0.051], 6), 0.92, 16), knochen: ['brust', 'hals', 'kopf'] });
  }
  // Kopf: laenglich, ohne Gesicht — wie das Anatomiemodell in der Vorlage.
  {
    const p = linie(0, 0, 1.575, 1.885, 14);
    t.push({ ...roehre(p, radien([0.056, 0.102, 0.124, 0.128, 0.112, 0.066], 14), 1.10, 20), knochen: ['kopf', 'hals'] });
  }

  for (const [seite, vz] of [['L', 1], ['R', -1]]) {
    // Arm: EIN Schlauch von der Schulter bis zum Handgelenk. Der Ellbogen ist
    // nur eine Verdickung im Radienverlauf, keine Nahtstelle.
    const sx = vz * 0.21, sy = 1.46;
    const p = linie(sx, 0, sy + 0.05, sy - 0.55, N);
    const r = radien([0.074, 0.088, 0.078, 0.067, 0.060, 0.058, 0.062, 0.055, 0.049, 0.044], N);
    t.push({ ...roehre(p, r, 0.94, 18), knochen: ['schulter' + seite, 'ellbogen' + seite, 'hand' + seite, 'brust'] });
    // Hand
    const hp = linie(sx, 0.012, sy - 0.55, sy - 0.68, 8);
    t.push({ ...roehre(hp, radien([0.042, 0.050, 0.046, 0.030], 8), 0.55, 14), knochen: ['hand' + seite, 'ellbogen' + seite] });

    // Bein: EIN Schlauch von der Huefte bis zum Sprunggelenk.
    const bx = vz * 0.105;
    const bp = linie(bx, 0, 0.95, 0.05, N + 4);
    const br = radien([0.088, 0.096, 0.089, 0.081, 0.074, 0.067, 0.063, 0.069, 0.065, 0.056, 0.048, 0.042], N + 4);
    t.push({ ...roehre(bp, br, 0.92, 18), knochen: ['huefte' + seite, 'knie' + seite, 'fuss' + seite, 'huefte'] });
    // Fuss
    const fp = linie(bx, 0.055, 0.055, 0.018, 5);
    t.push({ ...roehre(fp, radien([0.044, 0.052, 0.048], 5), 2.3, 12), knochen: ['fuss' + seite, 'knie' + seite] });
  }
  return t;
}

// Abstand eines Punktes zur Strecke Knochen→Kind. Bei einem Endknochen (Hand,
// Fuss, Kopf) zaehlt der Punkt selbst.
function abstandZuKnochen(px, py, pz, a, b) {
  if (!b) return Math.hypot(px - a[0], py - a[1], pz - a[2]);
  const vx = b[0] - a[0], vy = b[1] - a[1], vz = b[2] - a[2];
  const wx = px - a[0], wy = py - a[1], wz = pz - a[2];
  const ll = vx * vx + vy * vy + vz * vz;
  let t = ll > 0 ? (wx * vx + wy * vy + wz * vz) / ll : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(wx - vx * t, wy - vy * t, wz - vz * t);
}

function figurBauen(material) {
  const { knochen, liste, wurzel } = skelettBauen();

  // Ruhepositionen der Knochen in Weltkoordinaten — Grundlage der Bindung.
  const tempWurzel = new THREE.Group();
  tempWurzel.add(wurzel);
  tempWurzel.updateMatrixWorld(true);
  const weltPos = {};
  for (const k of liste) {
    const v = new THREE.Vector3();
    k.getWorldPosition(v);
    weltPos[k.name] = [v.x, v.y, v.z];
  }
  const kindVon = {};
  for (const s of SKELETT) if (s.eltern) kindVon[s.eltern] = s.name;
  // Fuer die Bindung zaehlt bei Armen und Beinen die Strecke zum eigenen Kind.
  const strecke = {};
  for (const s of SKELETT) {
    const kinder = SKELETT.filter((x) => x.eltern === s.name);
    const gerade = kinder.find((x) => !x.name.startsWith('schulter') && !x.name.startsWith('huefteL') && !x.name.startsWith('huefteR'));
    strecke[s.name] = [weltPos[s.name], gerade ? weltPos[gerade.name] : null];
  }
  const knochenIndex = {};
  liste.forEach((b, i) => { knochenIndex[b.name] = i; });

  // Alle Teile zu EINER Geometrie zusammenfassen und binden.
  const pos = [];
  const idx = [];
  const skinIndex = [];
  const skinWeight = [];
  for (const teil of teile()) {
    const versatz = pos.length / 3;
    for (let i = 0; i < teil.pos.length; i += 3) {
      const x = teil.pos[i], y = teil.pos[i + 1], z = teil.pos[i + 2];
      pos.push(x, y, z);
      // Zwei naechste erlaubte Knochen, Gewicht nach Abstand hoch drei.
      // Hoch drei, weil hoch eins die Haut ueber halbe Gliedmassen verschmiert
      // und hoch fuenf sie wieder hart knicken laesst.
      const kandidaten = teil.knochen.map((name) => {
        const [a, b] = strecke[name];
        return { name, d: abstandZuKnochen(x, y, z, a, b) };
      }).sort((p, q) => p.d - q.d).slice(0, 2);
      const g = kandidaten.map((c) => 1 / (Math.pow(c.d, 3) + 1e-5));
      const summe = g[0] + (g[1] || 0);
      skinIndex.push(knochenIndex[kandidaten[0].name], kandidaten[1] ? knochenIndex[kandidaten[1].name] : 0, 0, 0);
      skinWeight.push(g[0] / summe, kandidaten[1] ? g[1] / summe : 0, 0, 0);
    }
    for (const i of teil.idx) idx.push(i + versatz);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndex, 4));
  geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeight, 4));
  geo.setIndex(idx);
  geo.computeVertexNormals();

  const mesh = new THREE.SkinnedMesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.add(wurzel);
  mesh.bind(new THREE.Skeleton(liste));

  return { mesh, knochen, weltPos };
}

window.figurBauen = figurBauen;
window.MASSE = MASSE;
window.SKELETT = SKELETT;
