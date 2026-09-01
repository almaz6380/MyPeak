/* eslint-disable */
// Browser-Seite des Uebungs-Renderers. Laeuft in headless Chromium und wird
// von render.mjs ueber window.aufbauen(cfg) und window.setFrame(n) gesteuert.
//
// ⚠ REGEL (wie beim Reel-Generator in Anigosha): KEIN CSS-`animation`, KEIN
// setTimeout, KEIN requestAnimationFrame-Zeitgeber. Alles Sichtbare ist reine
// Funktion des Frame-Index. Sonst verrutschen Frames und nichts ist
// reproduzierbar.
//
// THREE kommt als globale Variable aus dem eingebetteten three.cjs.

const GRAD = Math.PI / 180;

// Muskeln auf der Rueckseite. Steht die Kamera fuer sie vorne, ist vom
// Leuchten nichts zu sehen — genau das passierte beim vorgebeugten Rudern.
const HINTEN = new Set(['back', 'glutes', 'triceps', 'calves']);

// ————— Farben —————
const HAUT = 0xc9cdd4;      // helles Grau-Blau wie das Anatomiemodell
const MUSKEL = 0xff2d2d;    // arbeitender Muskel
const METALL = 0x3a3d44;
const POLSTER = 0x24262b;
const HINTERGRUND = 0x0d1018;

let renderer, scene, camera, mixerDaten, koerperTeile, muskelFlecken;
let konfig, geraetDaten, rahmen;

function matHaut() {
  return new THREE.MeshStandardMaterial({ color: HAUT, roughness: 0.42, metalness: 0.05 });
}
function matMuskel() {
  // Leicht durchscheinend und selbstleuchtend — liest sich als Glühen ueber
  // dem Koerper, nicht als aufgeklebter Fleck.
  return new THREE.MeshStandardMaterial({
    color: MUSKEL, emissive: MUSKEL, emissiveIntensity: 0.75,
    roughness: 0.5, transparent: true, opacity: 0.9, depthWrite: false,
  });
}
function matMetall() {
  return new THREE.MeshStandardMaterial({ color: METALL, roughness: 0.35, metalness: 0.75 });
}
function matPolster() {
  return new THREE.MeshStandardMaterial({ color: POLSTER, roughness: 0.85, metalness: 0.0 });
}

// ————— Bausteine —————
function kapsel(radius, laenge, mat) {
  // Kapsel ist um den Ursprung zentriert; wir haengen sie so ein, dass das
  // Gelenk oben sitzt und das Glied nach unten zeigt.
  const g = new THREE.CapsuleGeometry(radius, laenge, 6, 20);
  const m = new THREE.Mesh(g, mat);
  m.position.y = -laenge / 2;
  m.castShadow = true;
  return m;
}

// Kugel im Gelenk. Ohne sie klafft beim Beugen eine Kante zwischen den
// Kapseln und die Figur wirkt wie zusammengesteckt statt gewachsen.
function gelenkKugel(radius, mat) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 14), mat);
  m.castShadow = true;
  return m;
}

function lathe(profil, mat, zSkala) {
  const punkte = profil.map(([r, y]) => new THREE.Vector2(r, y));
  const g = new THREE.LatheGeometry(punkte, 28);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.scale.z = zSkala || 1;
  m.castShadow = true;
  return m;
}

function fleck(rx, ry, rz, pos, rot) {
  const g = new THREE.SphereGeometry(1, 20, 14);
  const m = new THREE.Mesh(g, matMuskel());
  m.scale.set(rx, ry, rz);
  m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0] * GRAD, rot[1] * GRAD, rot[2] * GRAD);
  return m;
}

function gruppe(eltern, x, y, z) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  eltern.add(g);
  return g;
}

// ————— Figur —————
// Masse in Metern, Gesamthoehe ~1.77. Der Ursprung der Figur liegt zwischen
// den Fuessen auf dem Boden, damit Geraete auf y=0 stehen koennen.
function figurBauen() {
  const haut = matHaut();
  const teile = {};
  const flecken = {};

  const wurzel = new THREE.Group();

  // Becken
  const becken = gruppe(wurzel, 0, 1.00, 0);
  becken.add(lathe([
    [0.001, -0.13], [0.105, -0.125], [0.145, -0.08],
    [0.152, -0.02], [0.148, 0.03], [0.14, 0.06], [0.001, 0.065],
  ], haut, 0.72));
  flecken.glutes = fleck(0.092, 0.075, 0.055, [0, -0.05, -0.095]);
  becken.add(flecken.glutes);

  // Rumpf (Wirbelsaeule als EIN Gelenk — reicht fuer Kraftuebungen und
  // vermeidet eine sichtbare Naht mitten im Bauch)
  const rumpf = gruppe(becken, 0, 0.02, 0);
  rumpf.add(lathe([
    [0.001, 0.0], [0.13, 0.01], [0.138, 0.08], [0.132, 0.16],
    [0.15, 0.25], [0.175, 0.33], [0.183, 0.40], [0.172, 0.46],
    [0.13, 0.50], [0.08, 0.525], [0.001, 0.53],
  ], haut, 0.66));
  flecken.chest = new THREE.Group();
  flecken.chest.add(fleck(0.075, 0.058, 0.05, [0.062, 0.365, 0.085]));
  flecken.chest.add(fleck(0.075, 0.058, 0.05, [-0.062, 0.365, 0.085]));
  rumpf.add(flecken.chest);
  flecken.back = new THREE.Group();
  flecken.back.add(fleck(0.088, 0.105, 0.055, [0.058, 0.335, -0.088]));
  flecken.back.add(fleck(0.088, 0.105, 0.055, [-0.058, 0.335, -0.088]));
  rumpf.add(flecken.back);
  flecken.abs = fleck(0.082, 0.105, 0.05, [0, 0.13, 0.072]);
  rumpf.add(flecken.abs);

  // Hals + Kopf
  const hals = gruppe(rumpf, 0, 0.50, 0);
  const halsM = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.062, 0.10, 16), haut);
  halsM.position.y = 0.05;
  hals.add(halsM);
  const kopf = gruppe(hals, 0, 0.10, 0);
  const kopfM = new THREE.Mesh(new THREE.SphereGeometry(0.108, 24, 18), haut);
  kopfM.position.y = 0.085;
  kopfM.scale.set(0.94, 1.18, 1.05); // laenglich, ohne Gesicht
  kopf.add(kopfM);

  // Arme
  const arm = {};
  for (const [seite, vz] of [['L', 1], ['R', -1]]) {
    const schulter = gruppe(rumpf, vz * 0.178, 0.435, 0);
    const delta = new THREE.Mesh(new THREE.SphereGeometry(0.078, 20, 16), haut);
    delta.scale.set(1.05, 1.0, 1.0);
    schulter.add(delta);
    schulter.add(kapsel(0.058, 0.295, haut)); // Oberarm: Schulter→Ellbogen

    flecken['shoulders' + seite] = fleck(0.088, 0.082, 0.088, [0, 0.005, 0]);
    schulter.add(flecken['shoulders' + seite]);
    flecken['biceps' + seite] = fleck(0.055, 0.078, 0.042, [0, -0.15, 0.036]);
    schulter.add(flecken['biceps' + seite]);
    flecken['triceps' + seite] = fleck(0.055, 0.082, 0.042, [0, -0.155, -0.037]);
    schulter.add(flecken['triceps' + seite]);

    const ellbogen = gruppe(schulter, 0, -0.295, 0);
    ellbogen.add(gelenkKugel(0.052, haut));
    ellbogen.add(kapsel(0.048, 0.265, haut)); // Unterarm: Ellbogen→Handgelenk
    flecken['forearms' + seite] = fleck(0.052, 0.078, 0.046, [0, -0.09, 0.012]);
    ellbogen.add(flecken['forearms' + seite]);

    const handgelenk = gruppe(ellbogen, 0, -0.265, 0);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.048, 14, 12), haut);
    hand.scale.set(0.85, 1.25, 0.55);
    hand.position.y = -0.045;
    handgelenk.add(hand);

    arm['schulter' + seite] = schulter;
    arm['ellbogen' + seite] = ellbogen;
    arm['handgelenk' + seite] = handgelenk;
  }

  // Beine
  const bein = {};
  for (const [seite, vz] of [['L', 1], ['R', -1]]) {
    const huefte = gruppe(becken, vz * 0.088, -0.10, 0);
    huefte.add(gelenkKugel(0.085, haut));
    huefte.add(kapsel(0.082, 0.44, haut)); // Oberschenkel: Huefte→Knie
    flecken['legs' + seite] = fleck(0.075, 0.13, 0.055, [0, -0.22, 0.05]);
    huefte.add(flecken['legs' + seite]);

    const knie = gruppe(huefte, 0, -0.44, 0);
    knie.add(gelenkKugel(0.068, haut));
    knie.add(kapsel(0.062, 0.42, haut)); // Unterschenkel: Knie→Sprunggelenk
    flecken['calves' + seite] = fleck(0.06, 0.092, 0.05, [0, -0.14, -0.04]);
    knie.add(flecken['calves' + seite]);

    const fussgelenk = gruppe(knie, 0, -0.42, 0);
    const fuss = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.055, 0.22), haut);
    fuss.position.set(0, -0.028, 0.055);
    fussgelenk.add(fuss);

    bein['huefte' + seite] = huefte;
    bein['knie' + seite] = knie;
    bein['fussgelenk' + seite] = fussgelenk;
  }

  Object.assign(teile, { wurzel, becken, rumpf, hals, kopf }, arm, bein);
  return { wurzel, teile, flecken };
}

// ————— Geraete —————
function langhantel(laenge) {
  const g = new THREE.Group();
  const stange = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, laenge || 1.25, 14), matMetall());
  stange.rotation.z = 90 * GRAD;
  g.add(stange);
  for (const vz of [1, -1]) {
    for (const [abst, r, dick] of [[0.44, 0.105, 0.042], [0.485, 0.09, 0.032]]) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, dick, 20), matPolster());
      s.rotation.z = 90 * GRAD;
      s.position.x = vz * abst;
      g.add(s);
    }
  }
  return g;
}

function kurzhantel() {
  const g = new THREE.Group();
  const stange = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.30, 12), matMetall());
  stange.rotation.z = 90 * GRAD;
  g.add(stange);
  for (const vz of [1, -1]) {
    const kopf = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.10, 18), matPolster());
    kopf.rotation.z = 90 * GRAD;
    kopf.position.x = vz * 0.125;
    g.add(kopf);
  }
  return g;
}

function bank(neigung) {
  const g = new THREE.Group();
  const liege = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.09, 1.25), matPolster());
  liege.position.y = 0.46;
  liege.rotation.x = (neigung || 0) * GRAD;
  g.add(liege);
  for (const z of [0.52, -0.52]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.42, 0.10), matMetall());
    b.position.set(0, 0.21, z);
    g.add(b);
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.14), matMetall());
    f.position.set(0, 0.025, z);
    g.add(f);
  }
  return g;
}

function staender(hoehe) {
  const g = new THREE.Group();
  for (const vz of [1, -1]) {
    const saeule = new THREE.Mesh(new THREE.BoxGeometry(0.09, hoehe, 0.09), matMetall());
    saeule.position.set(vz * 0.62, hoehe / 2, 0);
    g.add(saeule);
    const fuss = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.60), matMetall());
    fuss.position.set(vz * 0.62, 0.025, 0);
    g.add(fuss);
  }
  return g;
}

function kabelturm() {
  const g = new THREE.Group();
  g.position.set(-1.05, 0, -0.30);
  const rahmen = new THREE.Mesh(new THREE.BoxGeometry(0.34, 2.1, 0.34), matMetall());
  rahmen.position.set(0, 1.05, 0);
  g.add(rahmen);
  const stapel = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.75, 0.26), matPolster());
  stapel.position.set(0, 0.45, 0.01);
  g.add(stapel);
  const platte = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.55), matMetall());
  platte.position.set(0, 0.025, 0);
  g.add(platte);
  return g;
}

function maschine() {
  // Generische Sitzmaschine (Butterfly, Rudern, Beinstrecker …)
  const g = new THREE.Group();
  g.position.set(-0.30, 0, 0);
  g.rotation.y = 16 * Math.PI / 180;
  const stapel = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.0, 0.30), matPolster());
  stapel.position.set(0, 0.62, -0.62);
  g.add(stapel);
  const saeule = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.45, 0.12), matMetall());
  saeule.position.set(0, 0.72, -0.42);
  g.add(saeule);
  const sitz = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.09, 0.36), matPolster());
  sitz.position.set(0, 0.46, 0);
  g.add(sitz);
  const lehne = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.60, 0.09), matPolster());
  lehne.position.set(0, 0.76, -0.20);
  g.add(lehne);
  const grund = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.05, 1.5), matMetall());
  grund.position.set(0, 0.025, -0.25);
  g.add(grund);
  return g;
}

function klimmzugstange() {
  const g = new THREE.Group();
  const stange = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.2, 14), matMetall());
  stange.rotation.z = 90 * GRAD;
  stange.position.y = 2.18;
  g.add(stange);
  for (const vz of [1, -1]) {
    const saeule = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.2, 0.09), matMetall());
    saeule.position.set(vz * 0.58, 1.1, 0);
    g.add(saeule);
    const fuss = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.7), matMetall());
    fuss.position.set(vz * 0.58, 0.025, 0);
    g.add(fuss);
  }
  return g;
}

function geraetBauen(art) {
  const g = new THREE.Group();
  const d = { gruppe: g, art, hantel: null };
  if (art === 'bank_langhantel') { g.add(bank(0)); d.hantel = langhantel(1.25); g.add(d.hantel); g.add(staender(1.0)); }
  else if (art === 'bank_kurzhantel') { g.add(bank(0)); d.hantel = 'kurz'; }
  else if (art === 'schraegbank_langhantel') { g.add(bank(-28)); d.hantel = langhantel(1.25); g.add(d.hantel); }
  else if (art === 'schraegbank_kurzhantel') { g.add(bank(-28)); d.hantel = 'kurz'; }
  else if (art === 'bank') { g.add(bank(0)); }
  else if (art === 'langhantel') { d.hantel = langhantel(1.25); g.add(d.hantel); }
  else if (art === 'kurzhantel') { d.hantel = 'kurz'; }
  else if (art === 'kabel') { g.add(kabelturm()); }
  else if (art === 'maschine') { g.add(maschine()); }
  else if (art === 'klimmzug') { g.add(klimmzugstange()); }
  // 'keins' → leer
  return d;
}

// ————— Aufbau —————
window.aufbauen = function (cfg) {
  konfig = cfg;
  scene = new THREE.Scene();
  // Verlauf statt Flaeche: ein flacher Hintergrund laesst die Figur wie
  // ausgeschnitten wirken. Als Leinwand-Textur gezeichnet, weil eine
  // setContent-Seite keine Bilddateien laden kann.
  const lw = document.createElement('canvas');
  lw.width = 4; lw.height = 512;
  const ctx = lw.getContext('2d');
  const verl = ctx.createLinearGradient(0, 0, 0, 512);
  verl.addColorStop(0, '#223154');
  verl.addColorStop(0.62, '#18223a');
  verl.addColorStop(1, '#18223a');
  ctx.fillStyle = verl;
  ctx.fillRect(0, 0, 4, 512);
  scene.background = new THREE.CanvasTexture(lw);

  camera = new THREE.PerspectiveCamera(34, cfg.breite / cfg.hoehe, 0.1, 60);

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('c') });
  renderer.setSize(cfg.breite, cfg.hoehe, false);
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Licht: ein Hauptlicht mit Schatten, ein kaltes Gegenlicht fuer die Kante,
  // dazu wenig Umgebungslicht — das gibt dem Modell Plastik ohne Flaute.
  const haupt = new THREE.DirectionalLight(0xffffff, 2.6);
  haupt.position.set(2.6, 4.2, 3.2);
  haupt.castShadow = true;
  haupt.shadow.mapSize.set(2048, 2048);
  haupt.shadow.camera.left = -7; haupt.shadow.camera.right = 7;
  haupt.shadow.camera.top = 7; haupt.shadow.camera.bottom = -7;
  haupt.shadow.camera.near = 0.5; haupt.shadow.camera.far = 22;
  haupt.shadow.bias = -0.0015;
  scene.add(haupt);
  // Gegenlicht bewusst schwach und nur leicht blau: bei 1.5 kippte die ganze
  // Figur ins Violette und sah nach Spielzeug aus statt nach Anatomiemodell.
  const gegen = new THREE.DirectionalLight(0x9db4ee, 0.75);
  gegen.position.set(-3.0, 2.0, -2.6);
  scene.add(gegen);
  const fuell = new THREE.DirectionalLight(0xffffff, 0.5);
  fuell.position.set(-1.5, 1.2, 3.5);
  scene.add(fuell);
  scene.add(new THREE.HemisphereLight(0xcdd8f0, 0x0e1219, 0.75));

  // Boden: dunkle Platte, faengt den Schatten und erdet die Figur
  // Boden NUR als Schattenfaenger, ohne eigene Farbe.
  //
  // Drei Anlaeufe mit einer sichtbaren Flaeche endeten alle im selben dunklen
  // Band quer durchs Bild: Der eingenebelte Boden am Horizont und der
  // Himmelsverlauf an derselben Bildhoehe treffen nie exakt dieselbe Farbe,
  // und jede Korrektur verschob die Kante nur. Mit ShadowMaterial gibt es
  // keine Kante mehr — der Verlauf fuellt das ganze Bild, geerdet wird die
  // Figur allein durch ihren Schatten.
  const boden = new THREE.Mesh(
    new THREE.CircleGeometry(9, 48),
    new THREE.ShadowMaterial({ opacity: 0.42, transparent: true }),
  );
  boden.rotation.x = -90 * GRAD;
  boden.receiveShadow = true;
  scene.add(boden);

  const f = figurBauen();
  koerperTeile = f.teile;
  muskelFlecken = f.flecken;
  scene.add(f.wurzel);

  geraetDaten = geraetBauen(cfg.bewegung.geraet);
  scene.add(geraetDaten.gruppe);
  if (geraetDaten.hantel === 'kurz') {
    geraetDaten.kurzL = kurzhantel();
    geraetDaten.kurzR = kurzhantel();
    scene.add(geraetDaten.kurzL);
    scene.add(geraetDaten.kurzR);
  }

  // Muskeln einschalten: 'chest' schaltet chest, 'biceps' beide Seiten.
  const ziel = cfg.muskel;
  for (const [name, obj] of Object.entries(muskelFlecken)) {
    const basis = name.replace(/[LR]$/, '');
    obj.visible = basis === ziel;
  }

  rahmenMessen();
  return true;
};

// Bildausschnitt EINMAL ueber die ganze Bewegung messen, nicht je Frame:
// Eine mitwandernde Kamera pumpt sichtbar, sobald die Arme hochgehen.
// Gemessen wird nur die Figur samt Handgeraet — ein Kabelturm oder eine
// Maschine wuerde den Ausschnitt sonst so weit aufziehen, dass die Figur
// zur Ameise wird; dass ein Geraet angeschnitten ist, stoert dagegen nicht.
function rahmenMessen() {
  const box = new THREE.Box3();
  const einzel = new THREE.Box3();
  for (let i = 0; i <= 8; i++) {
    poseSetzen(i / 8);
    if (konfig.bewegung.bodenHaftung !== false) bodenHaftung();
    hantelnFuehren();
    koerperTeile.wurzel.updateWorldMatrix(true, true);
    box.union(einzel.setFromObject(koerperTeile.wurzel));
    if (geraetDaten.hantel && geraetDaten.hantel !== 'kurz') {
      box.union(einzel.setFromObject(geraetDaten.hantel));
    }
    if (geraetDaten.kurzL) {
      box.union(einzel.setFromObject(geraetDaten.kurzL));
      box.union(einzel.setFromObject(geraetDaten.kurzR));
    }
  }
  const mitte = box.getCenter(new THREE.Vector3());
  const groesse = box.getSize(new THREE.Vector3());
  // Der Radius zaehlt die BREITE nur zur Haelfte: die Kamera steht schraeg,
  // eine seitlich weit ausladende Pose (Seitheben) braucht nicht so viel
  // Abstand wie eine gleich hohe.
  const radius = Math.max(groesse.y, Math.max(groesse.x, groesse.z) * 0.72) * 0.5;
  const fov = camera.fov * GRAD;
  rahmen = {
    mitte,
    dist: (radius * 1.28) / Math.tan(fov / 2),
    hoehe: groesse.y * 0.16, // leichte Aufsicht, wirkt weniger wie ein Passfoto
  };
}

// Weiche Hin-und-Her-Bewegung, die sich exakt schliesst: bei n=0 und n=N
// steht dieselbe Pose. Sonst ruckelt jede Schleife an der Nahtstelle.
function verlauf(n, gesamt) {
  return (1 - Math.cos((n / gesamt) * Math.PI * 2)) / 2;
}

function poseSetzen(t) {
  const b = konfig.bewegung;
  const gelenke = new Set([...Object.keys(b.start), ...Object.keys(b.ende)]);
  for (const name of gelenke) {
    const teil = koerperTeile[name];
    if (!teil) continue;
    const a = b.start[name] || [0, 0, 0];
    const c = b.ende[name] || a;
    teil.rotation.set(
      (a[0] + (c[0] - a[0]) * t) * GRAD,
      (a[1] + (c[1] - a[1]) * t) * GRAD,
      (a[2] + (c[2] - a[2]) * t) * GRAD,
    );
  }
  const w = koerperTeile.wurzel;
  const ps = b.wurzelPos || [0, 0, 0];
  const pe = b.wurzelPosEnde || ps;
  w.position.set(ps[0] + (pe[0] - ps[0]) * t, ps[1] + (pe[1] - ps[1]) * t, ps[2] + (pe[2] - ps[2]) * t);
  const rs = b.wurzelRot || [0, 0, 0];
  const re = b.wurzelRotEnde || rs;
  w.rotation.set(
    (rs[0] + (re[0] - rs[0]) * t) * GRAD,
    (rs[1] + (re[1] - rs[1]) * t) * GRAD,
    (rs[2] + (re[2] - rs[2]) * t) * GRAD,
  );
}

// Fuesse am Boden halten.
//
// Warum automatisch statt in jedem Muster von Hand: Beugt sich Huefte und Knie,
// wandert der Fuss nach oben UND nach vorne — bei der Kniebeuge um 43 bzw.
// 38 cm. Die Figur schwebte deshalb im ersten Durchgang ueber dem Boden. Das
// je Muster auszurechnen waere zwei Dutzend Mal dieselbe Trigonometrie mit
// zwei Dutzend Gelegenheiten, sich zu vertun. Stattdessen: posieren, messen,
// Wurzel nachziehen. Muster ohne Bodenkontakt (liegend, haengend) schalten es
// mit `bodenHaftung: false` ab.
const _fL = new THREE.Vector3(), _fR = new THREE.Vector3();
const KNOECHEL_Y = 0.04;  // Hoehe des Sprunggelenks im aufrechten Stand
function bodenHaftung() {
  koerperTeile.wurzel.updateWorldMatrix(true, true);
  koerperTeile.fussgelenkL.getWorldPosition(_fL);
  koerperTeile.fussgelenkR.getWorldPosition(_fR);
  const w = koerperTeile.wurzel;
  w.position.y += KNOECHEL_Y - Math.min(_fL.y, _fR.y);
  w.position.z += -(_fL.z + _fR.z) / 2;
}

// Hanteln folgen den Haenden. Erst nach dem Posieren aufrufen — die
// Welt-Positionen stehen sonst noch auf der vorigen Pose.
const _hL = new THREE.Vector3(), _hR = new THREE.Vector3();
function hantelnFuehren() {
  if (!geraetDaten || !geraetDaten.hantel) return;
  koerperTeile.wurzel.updateWorldMatrix(true, true);
  koerperTeile.handgelenkL.getWorldPosition(_hL);
  koerperTeile.handgelenkR.getWorldPosition(_hR);
  const griffL = _hL.clone().add(new THREE.Vector3(0, -0.05, 0));
  const griffR = _hR.clone().add(new THREE.Vector3(0, -0.05, 0));

  if (geraetDaten.hantel === 'kurz') {
    for (const [obj, p] of [[geraetDaten.kurzL, griffL], [geraetDaten.kurzR, griffR]]) {
      obj.position.copy(p);
      // Kurzhanteln zeigen quer zur Blickrichtung des Unterarms
      obj.rotation.set(0, 90 * GRAD, 0);
    }
    return;
  }
  // Langhantel: Mitte zwischen den Haenden, Achse entlang der Verbindung
  const mitte = griffL.clone().add(griffR).multiplyScalar(0.5);
  geraetDaten.hantel.position.copy(mitte);
  const richtung = griffL.clone().sub(griffR).normalize();
  const winkelY = Math.atan2(richtung.z, richtung.x);
  const winkelZ = Math.asin(Math.max(-1, Math.min(1, richtung.y)));
  geraetDaten.hantel.rotation.set(0, -winkelY, winkelZ);
}

window.setFrame = function (n) {
  const t = verlauf(n, konfig.frames);
  poseSetzen(t);
  if (konfig.bewegung.bodenHaftung !== false) bodenHaftung();
  hantelnFuehren();

  // Kamera: sanftes Pendeln, das sich ebenfalls schliesst. Volle Umrundung
  // waere hübsch, macht die Uebung aber phasenweise unlesbar.
  //
  // Abstand und Zielpunkt kommen aus dem in aufbauen() gemessenen Rahmen,
  // NICHT aus Handwerten je Muster: Sonst schnitte jede zweite Uebung den
  // Kopf oder die Fuesse ab, und jede Aenderung an der Pose zoege eine neue
  // Runde Kamera-Feintuning nach sich.
  const k = konfig.bewegung.kamera || {};
  const grund = (k.winkel !== undefined ? k.winkel : (HINTEN.has(konfig.muskel) ? 146 : -34));
  const schwung = (k.schwung === undefined ? 16 : k.schwung);
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
