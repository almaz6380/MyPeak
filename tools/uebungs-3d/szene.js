/* eslint-disable */
// Browser-Seite des Uebungs-Renderers. Laeuft in headless Chromium, gesteuert
// von render.mjs ueber window.aufbauen(cfg) und window.setFrame(n).
//
// ⚠ REGEL: KEIN CSS-`animation`, KEIN setTimeout, KEIN Zeitgeber. Alles
// Sichtbare ist reine Funktion des Frame-Index — sonst verrutschen Frames und
// nichts ist reproduzierbar.
//
// ⚠ ZWEITER ANLAUF (01.09.2026). Der erste scheiterte an zwei Dingen, die
// beide hier anders geloest sind:
// 1. Die Figur war aus Kapseln zusammengesteckt → jetzt eine durchgehende
//    Haut ueber einem Skelett (figur.js).
// 2. Die Bewegungen waren aus Gelenkwinkeln GERATEN → jetzt werden Hand- und
//    Fussziele vorgegeben und die Winkel per IK ausgerechnet. Beim
//    Bankdruecken steht da „Haende von 62 cm auf 102 cm", nicht „Schulter
//    -92 Grad, Ellbogen -88 Grad". Das ist nachpruefbar; Winkel waren es nie.

const GRAD = Math.PI / 180;

const HAUT = 0xccd2da;
const MUSKEL = new THREE.Color(0xff2a2a);
const METALL = 0x3a3d44;
const POLSTER = 0x22252b;

// Muskeln auf der Rueckseite — dort schaut die Kamera von hinten, sonst ist
// vom Leuchten nichts zu sehen.
const HINTEN = new Set(['back', 'glutes', 'triceps', 'calves']);

// Wo welcher Muskel sitzt, in der RUHEHALTUNG (Weltkoordinaten). Die
// Geometrie liegt in genau diesen Koordinaten vor, deshalb laesst sich die
// Haut direkt einfaerben — kein aufgeklebter Fleck mehr, der bei jeder
// Bewegung verrutscht.
const MUSKELN = {
  chest: [[0.062, 1.365, 0.085, 0.1418], [-0.062, 1.365, 0.085, 0.1418]],
  back: [[0.065, 1.335, -0.085, 0.1553], [-0.065, 1.335, -0.085, 0.1553]],
  shoulders: [[0.213, 1.455, 0.0, 0.1418], [-0.213, 1.455, 0.0, 0.1418]],
  biceps: [[0.213, 1.315, 0.045, 0.1148], [-0.213, 1.315, 0.045, 0.1148]],
  triceps: [[0.213, 1.305, -0.045, 0.1215], [-0.213, 1.305, -0.045, 0.1215]],
  forearms: [[0.213, 1.055, 0.01, 0.135], [-0.213, 1.055, 0.01, 0.135]],
  abs: [[0.0, 1.1, 0.088, 0.1688]],
  legs: [[0.108, 0.735, 0.062, 0.2093], [-0.108, 0.735, 0.062, 0.2093]],
  glutes: [[0.075, 0.895, -0.105, 0.1823], [-0.075, 0.895, -0.105, 0.1823]],
  calves: [[0.108, 0.335, -0.05, 0.1553], [-0.108, 0.335, -0.05, 0.1553]],
};

let renderer, scene, camera, konfig, geraetDaten, rahmen;
let figur, knochen, ruhePos;

// ————— Zwei-Knochen-IK —————
// Gegeben Wurzel (Schulter/Huefte), Ziel fuer das Ende (Hand/Fuss) und eine
// Richtung, in die der Ellbogen bzw. das Knie zeigen soll. Liefert die
// Drehungen fuer beide Knochen.
//
// Das ist der Kern des zweiten Anlaufs: Eine Uebung ist dadurch beschrieben,
// WO die Haende hingehen — nicht dadurch, wie viel Grad ein Ellbogen hat.
const _R = new THREE.Vector3(), _T = new THREE.Vector3(), _F = new THREE.Vector3();
const _N = new THREE.Vector3(), _D1 = new THREE.Vector3(), _D2 = new THREE.Vector3();
const _E = new THREE.Vector3(), _Q = new THREE.Quaternion(), _PQ = new THREE.Quaternion();
const RUHE_ACHSE = new THREE.Vector3(0, -1, 0);

function richtungSetzen(bone, weltRichtung) {
  // Knochen zeigen in Ruhe entlang -Y. Die gewuenschte Weltrichtung in den
  // Raum des Elternknochens umrechnen und die kuerzeste Drehung nehmen.
  bone.parent.getWorldQuaternion(_PQ);
  const lokal = weltRichtung.clone().applyQuaternion(_PQ.invert()).normalize();
  bone.quaternion.setFromUnitVectors(RUHE_ACHSE, lokal);
}

function zweiKnochenIK(wurzelName, mittelName, ziel, pol, l1, l2) {
  const wurzelB = knochen[wurzelName];
  const mittelB = knochen[mittelName];
  wurzelB.updateWorldMatrix(true, false);
  wurzelB.getWorldPosition(_R);
  _T.set(ziel[0], ziel[1], ziel[2]);
  _F.subVectors(_T, _R);
  let d = _F.length();
  const min = Math.abs(l1 - l2) + 0.02;
  const max = l1 + l2 - 0.015;
  d = Math.max(min, Math.min(max, d));
  _F.normalize();

  const cosA = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d);
  const alpha = Math.acos(Math.max(-1, Math.min(1, cosA)));

  _N.crossVectors(_F, new THREE.Vector3(pol[0], pol[1], pol[2])).normalize();
  if (!isFinite(_N.x) || _N.lengthSq() < 1e-6) _N.set(1, 0, 0);
  _D1.copy(_F).applyAxisAngle(_N, alpha);
  richtungSetzen(wurzelB, _D1);

  wurzelB.updateWorldMatrix(true, false);
  mittelB.updateWorldMatrix(true, false);
  mittelB.getWorldPosition(_E);
  _D2.subVectors(_T, _E);
  if (_D2.lengthSq() < 1e-8) _D2.copy(_D1);
  _D2.normalize();
  richtungSetzen(mittelB, _D2);
  mittelB.updateWorldMatrix(true, false);
}

// ————— Geraete —————
function matMetall() { return new THREE.MeshStandardMaterial({ color: METALL, roughness: 0.35, metalness: 0.7 }); }
function matPolster() { return new THREE.MeshStandardMaterial({ color: POLSTER, roughness: 0.85 }); }

function langhantel() {
  const g = new THREE.Group();
  const st = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 1.35, 14), matMetall());
  st.rotation.z = 90 * GRAD; g.add(st);
  for (const vz of [1, -1]) for (const [a, r, dk] of [[0.48, 0.11, 0.045], [0.53, 0.095, 0.033]]) {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, dk, 20), matPolster());
    s.rotation.z = 90 * GRAD; s.position.x = vz * a; g.add(s);
  }
  return g;
}
function kurzhantel() {
  const g = new THREE.Group();
  const st = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.28, 12), matMetall());
  st.rotation.z = 90 * GRAD; g.add(st);
  for (const vz of [1, -1]) {
    const k = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.095, 18), matPolster());
    k.rotation.z = 90 * GRAD; k.position.x = vz * 0.115; g.add(k);
  }
  return g;
}
function bank(neigung, hoehe) {
  const g = new THREE.Group();
  const h = hoehe === undefined ? 0.44 : hoehe;
  const l = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.085, 1.30), matPolster());
  l.position.y = h; l.rotation.x = (neigung || 0) * GRAD; l.receiveShadow = true; g.add(l);
  for (const z of [0.54, -0.54]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.09, h - 0.05, 0.09), matMetall());
    b.position.set(0, (h - 0.05) / 2, z); g.add(b);
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.05, 0.13), matMetall());
    f.position.set(0, 0.025, z); g.add(f);
  }
  return g;
}
function staender() {
  const g = new THREE.Group();
  for (const vz of [1, -1]) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.05, 0.08), matMetall());
    s.position.set(vz * 0.42, 0.52, -0.48); g.add(s);
  }
  return g;
}
function kabelturm() {
  const g = new THREE.Group();
  g.position.set(-1.05, 0, -0.35);
  const r = new THREE.Mesh(new THREE.BoxGeometry(0.30, 2.05, 0.30), matMetall());
  r.position.y = 1.02; g.add(r);
  const st = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.72, 0.24), matPolster());
  st.position.set(0, 0.44, 0.02); g.add(st);
  const p = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.05, 0.52), matMetall());
  p.position.y = 0.025; g.add(p);
  return g;
}
function maschine() {
  const g = new THREE.Group();
  g.position.set(-0.28, 0, 0);
  g.rotation.y = 14 * GRAD;
  const st = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.95, 0.28), matPolster());
  st.position.set(0, 0.60, -0.62); g.add(st);
  const s = new THREE.Mesh(new THREE.BoxGeometry(0.11, 1.40, 0.11), matMetall());
  s.position.set(0, 0.70, -0.44); g.add(s);
  const si = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.085, 0.34), matPolster());
  si.position.set(0, 0.44, 0); si.receiveShadow = true; g.add(si);
  const le = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.56, 0.085), matPolster());
  le.position.set(0, 0.73, -0.19); g.add(le);
  const gr = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.05, 1.4), matMetall());
  gr.position.set(0, 0.025, -0.24); g.add(gr);
  return g;
}
function klimmzugstange() {
  const g = new THREE.Group();
  const st = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.15, 14), matMetall());
  st.rotation.z = 90 * GRAD; st.position.y = 2.16; g.add(st);
  for (const vz of [1, -1]) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.18, 0.08), matMetall());
    s.position.set(vz * 0.56, 1.09, 0); g.add(s);
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.66), matMetall());
    f.position.set(vz * 0.56, 0.025, 0); g.add(f);
  }
  return g;
}

function geraetBauen(art) {
  const g = new THREE.Group();
  const d = { gruppe: g, art, lang: null, kurz: null };
  if (art === 'bank_langhantel') { g.add(bank(0)); g.add(staender()); d.lang = langhantel(); g.add(d.lang); }
  else if (art === 'bank_kurzhantel') { g.add(bank(0)); d.kurz = true; }
  else if (art === 'schraegbank_langhantel') { g.add(bank(-26, 0.48)); d.lang = langhantel(); g.add(d.lang); }
  else if (art === 'schraegbank_kurzhantel') { g.add(bank(-26, 0.48)); d.kurz = true; }
  else if (art === 'bank') { g.add(bank(0)); }
  else if (art === 'langhantel') { d.lang = langhantel(); g.add(d.lang); }
  else if (art === 'kurzhantel') { d.kurz = true; }
  else if (art === 'kabel') { g.add(kabelturm()); }
  else if (art === 'maschine') { g.add(maschine()); }
  else if (art === 'klimmzug') { g.add(klimmzugstange()); }
  if (d.kurz) { d.kurzL = kurzhantel(); d.kurzR = kurzhantel(); g.add(d.kurzL); g.add(d.kurzR); }
  return d;
}

// ————— Aufbau —————
window.aufbauen = function (cfg) {
  konfig = cfg;
  scene = new THREE.Scene();

  const lw = document.createElement('canvas');
  lw.width = 4; lw.height = 512;
  const ctx = lw.getContext('2d');
  const v = ctx.createLinearGradient(0, 0, 0, 512);
  v.addColorStop(0, '#243258');
  v.addColorStop(0.6, '#18223a');
  v.addColorStop(1, '#111827');
  ctx.fillStyle = v; ctx.fillRect(0, 0, 4, 512);
  scene.background = new THREE.CanvasTexture(lw);

  camera = new THREE.PerspectiveCamera(34, cfg.breite / cfg.hoehe, 0.1, 60);
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('c') });
  renderer.setSize(cfg.breite, cfg.hoehe, false);
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;

  const haupt = new THREE.DirectionalLight(0xffffff, 2.5);
  haupt.position.set(2.4, 4.0, 3.0);
  haupt.castShadow = true;
  haupt.shadow.mapSize.set(2048, 2048);
  haupt.shadow.camera.left = -3.5; haupt.shadow.camera.right = 3.5;
  haupt.shadow.camera.top = 3.5; haupt.shadow.camera.bottom = -3.5;
  haupt.shadow.camera.near = 0.5; haupt.shadow.camera.far = 16;
  haupt.shadow.bias = -0.0006;
  haupt.shadow.normalBias = 0.012; // gegen Streifen auf der eigenen Haut
  scene.add(haupt);
  const gegen = new THREE.DirectionalLight(0x93a9e0, 0.55);
  gegen.position.set(-3.0, 2.2, -2.6);
  scene.add(gegen);
  const fuell = new THREE.DirectionalLight(0xffffff, 0.18);
  fuell.position.set(-1.4, 1.2, 3.4);
  scene.add(fuell);
  scene.add(new THREE.HemisphereLight(0xb9c8e6, 0x0c1018, 0.34));

  // Boden nur als Schattenfaenger — eine sichtbare Flaeche ergab im ersten
  // Anlauf immer ein dunkles Band am Horizont.
  const boden = new THREE.Mesh(new THREE.CircleGeometry(9, 48),
    new THREE.ShadowMaterial({ opacity: 0.4, transparent: true }));
  boden.rotation.x = -90 * GRAD;
  boden.receiveShadow = true;
  scene.add(boden);

  const umgebungSzene = new THREE.Scene();
  umgebungSzene.background = scene.background;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const umgebung = pmrem.fromScene(umgebungSzene, 0.04).texture;

  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 0.26, metalness: 0.0, vertexColors: true,
    envMap: umgebung, envMapIntensity: 0.9,
  });
  const f = window.figurBauen(mat);
  figur = f.mesh;
  knochen = f.knochen;
  ruhePos = f.weltPos;
  scene.add(figur);

  muskelFaerben(cfg.muskel);

  geraetDaten = geraetBauen(cfg.bewegung.geraet);
  scene.add(geraetDaten.gruppe);

  rahmenMessen();
  return true;
};

// Muskel direkt in die HAUT einfaerben, mit weichem Rand. Aufgeklebte Flecken
// (erster Anlauf) sitzen bei jeder Bewegung woanders und sehen aufgeklebt aus.
function muskelFaerben(name) {
  const pos = figur.geometry.attributes.position;
  const anzahl = pos.count;
  const farben = new Float32Array(anzahl * 3);
  const basis = new THREE.Color(HAUT);
  const kugeln = MUSKELN[name] || [];
  for (let i = 0; i < anzahl; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    let staerke = 0;
    for (const [cx, cy, cz, r] of kugeln) {
      const d = Math.hypot(x - cx, y - cy, z - cz);
      // Weicher Rand: innerhalb 55 % voll, danach auslaufend.
      const s = 1 - Math.max(0, Math.min(1, (d - r * 0.55) / (r * 0.45)));
      if (s > staerke) staerke = s;
    }
    const c = basis.clone().lerp(MUSKEL, staerke * staerke * (3 - 2 * staerke));
    farben[i * 3] = c.r; farben[i * 3 + 1] = c.g; farben[i * 3 + 2] = c.b;
  }
  figur.geometry.setAttribute('color', new THREE.Float32BufferAttribute(farben, 3));
}

// ————— Pose —————
function misch(a, b, t) { return a + (b - a) * t; }
function mischPunkt(a, b, t) {
  return [misch(a[0], b[0], t), misch(a[1], b[1], t), misch(a[2], b[2], t)];
}

function poseSetzen(t) {
  const b = konfig.bewegung;
  // Wurzel (Becken) setzen — Lage und Neigung des ganzen Koerpers.
  const w = knochen.huefte;
  const p = mischPunkt(b.huefte.start, b.huefte.ende || b.huefte.start, t);
  w.position.set(p[0], p[1], p[2]);
  const r = mischPunkt(b.neigung ? b.neigung.start : [0, 0, 0],
    b.neigung ? (b.neigung.ende || b.neigung.start) : [0, 0, 0], t);
  w.rotation.set(r[0] * GRAD, r[1] * GRAD, r[2] * GRAD);

  // Wirbelsaeule und Kopf als einfache Winkel — dort gibt es kein Ziel im
  // Raum, das man vorgeben koennte.
  for (const [name, feld] of [['rumpf', b.rumpf], ['brust', b.brust], ['kopf', b.kopf]]) {
    if (!feld) { knochen[name].rotation.set(0, 0, 0); continue; }
    const a = mischPunkt(feld.start, feld.ende || feld.start, t);
    knochen[name].rotation.set(a[0] * GRAD, a[1] * GRAD, a[2] * GRAD);
  }
  figur.updateMatrixWorld(true);

  // Arme und Beine ueber Ziele im Raum.
  const proSeite = (p, i, standard) => {
    const v = p || standard;
    return Array.isArray(v[0]) ? v[i] : v;
  };
  for (const [seite, i] of [['L', 0], ['R', 1]]) {
    const hz = mischPunkt(b.hand.start[i], (b.hand.ende || b.hand.start)[i], t);
    zweiKnochenIK('schulter' + seite, 'ellbogen' + seite, hz,
      proSeite(b.polArm, i, [0, 0, -1]), window.MASSE.oberarm, window.MASSE.unterarm);
    const fz = mischPunkt(b.fuss.start[i], (b.fuss.ende || b.fuss.start)[i], t);
    zweiKnochenIK('huefte' + seite, 'knie' + seite, fz,
      proSeite(b.polBein, i, [0, 0, 1]), window.MASSE.oberschenkel, window.MASSE.unterschenkel);
  }
  figur.updateMatrixWorld(true);
}

// Hanteln folgen den Haenden.
const _hL = new THREE.Vector3(), _hR = new THREE.Vector3();
function hantelnFuehren() {
  if (!geraetDaten) return;
  knochen.handL.getWorldPosition(_hL);
  knochen.handR.getWorldPosition(_hR);
  if (geraetDaten.kurz) {
    geraetDaten.kurzL.position.copy(_hL);
    geraetDaten.kurzR.position.copy(_hR);
    geraetDaten.kurzL.rotation.set(0, 90 * GRAD, 0);
    geraetDaten.kurzR.rotation.set(0, 90 * GRAD, 0);
    return;
  }
  if (!geraetDaten.lang) return;
  const mitte = _hL.clone().add(_hR).multiplyScalar(0.5);
  geraetDaten.lang.position.copy(mitte);
  const richtung = _hL.clone().sub(_hR).normalize();
  geraetDaten.lang.rotation.set(0, -Math.atan2(richtung.z, richtung.x),
    Math.asin(Math.max(-1, Math.min(1, richtung.y))));
}

// Bildausschnitt EINMAL ueber die ganze Bewegung messen — je Frame gemessen
// pumpt die Kamera sichtbar, sobald die Arme hochgehen.
function rahmenMessen() {
  const box = new THREE.Box3();
  const einzel = new THREE.Box3();
  for (let i = 0; i <= 8; i++) {
    poseSetzen(i / 8);
    hantelnFuehren();
    box.union(einzel.setFromObject(figur));
    if (geraetDaten.lang) box.union(einzel.setFromObject(geraetDaten.lang));
    if (geraetDaten.kurz) {
      box.union(einzel.setFromObject(geraetDaten.kurzL));
      box.union(einzel.setFromObject(geraetDaten.kurzR));
    }
  }
  const mitte = box.getCenter(new THREE.Vector3());
  const groesse = box.getSize(new THREE.Vector3());
  const radius = Math.max(groesse.y, Math.max(groesse.x, groesse.z) * 0.72) * 0.5;
  rahmen = {
    mitte,
    dist: (radius * 1.32) / Math.tan((camera.fov * GRAD) / 2),
    hoehe: groesse.y * 0.14,
  };
}

// Weiche Hin-und-Her-Bewegung, die sich exakt schliesst.
function verlauf(n, gesamt) {
  return (1 - Math.cos((n / gesamt) * Math.PI * 2)) / 2;
}

window.setFrame = function (n) {
  poseSetzen(verlauf(n, konfig.frames));
  hantelnFuehren();

  const k = konfig.bewegung.kamera || {};
  const grund = (k.winkel !== undefined ? k.winkel : (HINTEN.has(konfig.muskel) ? 148 : -34));
  const schwung = (k.schwung === undefined ? 14 : k.schwung);
  const winkel = (grund + schwung * Math.sin((n / konfig.frames) * Math.PI * 2)) * GRAD;
  const dist = rahmen.dist * (k.zoom || 1);
  camera.position.set(
    rahmen.mitte.x + Math.sin(winkel) * dist,
    rahmen.mitte.y + rahmen.hoehe,
    rahmen.mitte.z + Math.cos(winkel) * dist,
  );
  camera.lookAt(rahmen.mitte.x, rahmen.mitte.y, rahmen.mitte.z);
  renderer.render(scene, camera);
  return true;
};
