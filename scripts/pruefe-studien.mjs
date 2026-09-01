#!/usr/bin/env node
// Haelt jede Zahl gegen ihre Quelle.
//
//   node scripts/pruefe-studien.mjs
//
// Der Sinn: Ein Wissenskanal lebt davon, dass die Zahlen stimmen. Eine
// erfundene faellt sofort auf. Dieses Skript zeigt fuer JEDEN Post, aus welcher
// Datei und welchem Feld Aussage und Wert stammen — und bricht ab, sobald ein
// Wert nicht woertlich in seiner Quelle steht (die Pruefung selbst sitzt in
// studien.mjs, hier wird sie nur sichtbar gemacht).

import { studienPosts, STUDIEN } from './studien.mjs';

const posts = studienPosts();
console.log(`Studien-Bibliothek: ${Object.keys(STUDIEN).length} Eintraege gelesen`);
console.log(`Kuratierte Posts:   ${posts.length}, davon ${posts.filter((p) => p.wert).length} mit Wert\n`);

for (const p of posts) {
  console.log(`${p.wert ? '№' : '·'} ${p.titel.de}`);
  console.log(`    Quelle:  ${p.quelle}`);
  console.log(`    Aussage: ${p.aussage.de.slice(0, 76)}${p.aussage.de.length > 76 ? '…' : ''}`);
  if (p.wert) console.log(`    Wert:    ${p.wert.de}`);
  console.log(`    Studie:  ${p.studie ? `${p.studie.name} ${p.studie.jahr}` : '—'}`);
}

const ohneStudie = posts.filter((p) => !p.studie);
console.log(`\n✓ Alle ${posts.length} Werte stehen woertlich in ihrer Quelle.`);
if (ohneStudie.length) {
  console.log(`⚠ ${ohneStudie.length} ohne Studienangabe: ${ohneStudie.map((p) => p.id).join(', ')}`);
  console.log('  (Im Bild steht ohnehin nur „Laut Studien" — aber im Kommentarbereich');
  console.log('   liesse sich hier nichts nachreichen.)');
}
