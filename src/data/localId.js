// Kennung für noch nicht synchronisierte Einträge.
//
// Alles, was mit `local_` beginnt, gilt in resync.js als „muss noch hoch" und
// wird beim Hintergrund-Abgleich vor dem Überschreiben bewahrt. Die Kennung
// muss deshalb eindeutig sein.
//
// `local_${Date.now()}` allein reicht dafür NICHT: zwei Einträge, die in
// derselben Millisekunde entstehen, bekommen dieselbe Kennung — und ein
// anschließendes Löschen oder Ändern trifft dann beide. Der Zähler schließt
// das innerhalb einer Sitzung aus.
let zaehler = 0;

export function localId() {
  zaehler += 1;
  return `local_${Date.now()}_${zaehler}`;
}
