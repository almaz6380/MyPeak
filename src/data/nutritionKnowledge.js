// Ernährungs-Wissen — Wissensbibliothek-Block "Ernährung"
// Jedes Thema ist ein E-Book mit mehreren Kapiteln (DE + EN), mit
// wissenschaftlichen Referenzen. Gerendert über die generische KnowledgePage.

export const nutritionCategories = [
  { id: 'grundlagen', nameDE: 'Grundlagen', nameEN: 'Fundamentals' },
  { id: 'makros', nameDE: 'Makronährstoffe', nameEN: 'Macronutrients' },
  { id: 'mikros', nameDE: 'Mikronährstoffe', nameEN: 'Micronutrients' },
  { id: 'praxis', nameDE: 'Praxis', nameEN: 'Practice' },
];

export const nutritionTopics = [
  // ─────────────────────────────────────────────
  // 1. ENERGIEBILANZ & KALORIEN
  // ─────────────────────────────────────────────
  {
    id: 'energy_balance',
    category: 'grundlagen',
    nameDE: 'Energiebilanz & Kalorien',
    nameEN: 'Energy Balance & Calories',
    summaryDE: 'Die Energiebilanz — aufgenommene gegen verbrauchte Kalorien — bestimmt, ob du Gewicht zu- oder abnimmst. Sie ist das wichtigste Grundprinzip der Ernährung, über dem alle anderen Details stehen.',
    summaryEN: 'Energy balance — calories consumed versus calories burned — determines whether you gain or lose weight. It is the most important principle of nutrition, sitting above all other details.',
    quickDE: [
      { label: 'Kernidee', text: 'Defizit → Abnehmen, Überschuss → Zunehmen, Erhalt → Gewicht stabil. Kalorien sind König.' },
      { label: 'Praxis', text: 'TDEE grob berechnen, Ziel setzen, 2–3 Wochen beobachten, dann anpassen.' },
    ],
    quickEN: [
      { label: 'Core idea', text: 'Deficit → lose, surplus → gain, maintenance → stable. Calories are king.' },
      { label: 'Practice', text: 'Estimate TDEE, set a target, observe 2–3 weeks, then adjust.' },
    ],
    sections: [
      {
        titleDE: 'Das Prinzip der Energiebilanz',
        titleEN: 'The principle of energy balance',
        contentDE: `Die Energiebilanz beschreibt das Verhältnis zwischen der Energie, die du über Nahrung aufnimmst, und der Energie, die dein Körper verbraucht. Nimmst du mehr auf, als du verbrauchst (Überschuss), speichert der Körper die überschüssige Energie — vor allem als Fett. Verbrauchst du mehr, als du aufnimmst (Defizit), greift er auf Reserven zurück und du nimmst ab.

Dieses Prinzip beruht auf dem ersten Hauptsatz der Thermodynamik: Energie geht nicht verloren, sie wird nur umgewandelt. Zahlreiche kontrollierte Studien bestätigen, dass die Energiebilanz der entscheidende Faktor für Gewichtsveränderungen ist — unabhängig davon, aus welchen Lebensmitteln die Kalorien stammen (Hall & Guo, 2017, Gastroenterology).

Das bedeutet nicht, dass die Lebensmittelqualität egal ist. Sie beeinflusst Sättigung, Gesundheit, Leistung und wie leicht man ein bestimmtes Kalorienniveau einhält. Aber für die reine Frage "zu- oder abnehmen" ist die Gesamtkalorienbilanz ausschlaggebend.`,
        contentEN: `Energy balance describes the relationship between the energy you take in through food and the energy your body expends. If you take in more than you burn (surplus), the body stores the excess energy — mainly as fat. If you burn more than you take in (deficit), it draws on reserves and you lose weight.

This principle rests on the first law of thermodynamics: energy is not lost, only converted. Numerous controlled studies confirm that energy balance is the decisive factor for weight change — regardless of which foods the calories come from (Hall & Guo, 2017, Gastroenterology).

This does not mean food quality is irrelevant. It influences satiety, health, performance and how easily you maintain a given calorie level. But for the pure question of "gain or lose", total calorie balance is what matters.`,
      },
      {
        titleDE: 'Die Komponenten des Kalorienverbrauchs',
        titleEN: 'The components of calorie expenditure',
        contentDE: `Der tägliche Gesamtenergieverbrauch (TDEE) setzt sich aus vier Teilen zusammen. Der Grundumsatz (BMR) macht mit 60–70 % den größten Anteil aus — das ist die Energie, die der Körper allein für lebenswichtige Funktionen wie Atmung, Kreislauf und Zellstoffwechsel in Ruhe benötigt.

Die nahrungsinduzierte Thermogenese (TEF) macht etwa 10 % aus: Energie, die für Verdauung und Verarbeitung der Nahrung aufgewendet wird. Protein hat dabei den höchsten thermischen Effekt — ein Grund, warum proteinreiche Ernährung beim Abnehmen hilft.

Der dritte und variabelste Teil ist die Aktivität. Man unterscheidet zwischen Sport (EAT) und Alltagsbewegung (NEAT — Non-Exercise Activity Thermogenesis) wie Gehen, Zappeln und Stehen. NEAT kann zwischen Personen um mehrere Hundert Kalorien pro Tag schwanken und passt sich oft unbewusst an ein Kaloriendefizit an, indem man sich weniger bewegt.`,
        contentEN: `Total daily energy expenditure (TDEE) is made up of four parts. Basal metabolic rate (BMR) is the largest share at 60–70% — the energy the body needs at rest for vital functions such as breathing, circulation and cellular metabolism.

The thermic effect of food (TEF) accounts for about 10%: energy spent on digesting and processing food. Protein has the highest thermic effect — one reason a high-protein diet helps with fat loss.

The third and most variable part is activity. A distinction is made between exercise (EAT) and everyday movement (NEAT — Non-Exercise Activity Thermogenesis) such as walking, fidgeting and standing. NEAT can vary by several hundred calories per day between individuals and often adjusts unconsciously to a calorie deficit by moving less.`,
      },
      {
        titleDE: 'Kalorienbedarf abschätzen',
        titleEN: 'Estimating calorie needs',
        contentDE: `Um deinen Bedarf zu schätzen, berechnest du zuerst den Grundumsatz, etwa mit der Mifflin-St-Jeor-Formel, und multiplizierst ihn mit einem Aktivitätsfaktor (1,2 für sehr wenig aktiv bis ~1,9 für sehr aktiv). Das Ergebnis ist dein geschätzter TDEE — die Kalorienmenge, bei der dein Gewicht stabil bleibt.

Wichtig: Solche Formeln liefern nur Näherungswerte. Der tatsächliche Verbrauch kann individuell um 10–20 % abweichen. Deshalb ist der Startwert nur ein Ausgangspunkt, kein exakter Fahrplan.

Der zuverlässigste Weg ist, das Körpergewicht über zwei bis drei Wochen bei konstanter Kalorienzufuhr zu beobachten. Bleibt es stabil, hast du deinen Erhaltungsbedarf gefunden. Steigt oder fällt es, passt du die Kalorien um etwa 200–300 an. So kalibrierst du die Theorie an deiner Realität.`,
        contentEN: `To estimate your needs, first calculate basal metabolic rate, for example with the Mifflin-St Jeor formula, and multiply it by an activity factor (1.2 for very sedentary to ~1.9 for very active). The result is your estimated TDEE — the number of calories at which your weight stays stable.

Importantly, such formulas provide only approximations. Actual expenditure can vary by 10–20% between individuals. So the starting value is only a starting point, not an exact roadmap.

The most reliable approach is to track body weight over two to three weeks at a constant calorie intake. If it stays stable, you have found your maintenance level. If it rises or falls, adjust calories by about 200–300. This calibrates the theory to your reality.`,
      },
      {
        titleDE: 'Häufige Missverständnisse',
        titleEN: 'Common misconceptions',
        contentDE: `Ein verbreiteter Irrtum ist der Glaube an ein "kaputtes" oder extrem langsames Metabolismus. Echte Stoffwechselstörungen sind selten; meist wird der Kalorienverbrauch überschätzt und die Aufnahme unterschätzt. Studien zeigen, dass Menschen ihre Kalorienzufuhr oft um 20–50 % zu niedrig einschätzen (Lichtman et al., 1992, New England Journal of Medicine).

Ein zweiter Irrtum: Bestimmte Lebensmittel würden "den Stoffwechsel ankurbeln" und Fett schmelzen lassen. Solche Effekte sind minimal und ändern nichts an der Grundgleichung. Kein Lebensmittel und kein Getränk hebelt die Energiebilanz aus.

Drittens ist metabolische Adaptation real, aber begrenzt: Bei anhaltendem Defizit sinkt der Verbrauch etwas (adaptive Thermogenese), doch das erklärt keine völligen Plateaus. Wer nicht abnimmt, obwohl er meint im Defizit zu sein, isst in der Regel mehr als angenommen.`,
        contentEN: `A common error is the belief in a "broken" or extremely slow metabolism. True metabolic disorders are rare; usually calorie expenditure is overestimated and intake underestimated. Studies show people often underestimate their calorie intake by 20–50% (Lichtman et al., 1992, New England Journal of Medicine).

A second error: that certain foods "boost metabolism" and melt fat. Such effects are minimal and do not change the basic equation. No food or drink overrides energy balance.

Third, metabolic adaptation is real but limited: with a sustained deficit, expenditure drops somewhat (adaptive thermogenesis), but this does not explain complete plateaus. Those who do not lose weight despite believing they are in a deficit usually eat more than assumed.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Die Energiebilanz ist das Fundament jeder Ernährung: Ein Defizit lässt dich abnehmen, ein Überschuss zunehmen, Erhalt hält das Gewicht. Alle weiteren Details — Makros, Timing, Lebensmittelwahl — wirken innerhalb dieses Rahmens.

Schätze deinen Bedarf mit einer Formel, betrachte den Wert aber nur als Startpunkt und kalibriere ihn über die tatsächliche Gewichtsentwicklung. Miss und passe an, statt dich auf Theorie allein zu verlassen.

Lebensmittelqualität, Protein und Sättigung bestimmen, wie angenehm und gesund du ein Kalorienniveau einhältst — aber ob du zu- oder abnimmst, entscheidet die Bilanz. Dieses Prinzip zu verstehen, macht dich unabhängig von Diät-Moden.`,
        contentEN: `Energy balance is the foundation of all nutrition: a deficit makes you lose, a surplus makes you gain, maintenance holds your weight. All further details — macros, timing, food choice — operate within this framework.

Estimate your needs with a formula, but treat the value only as a starting point and calibrate it through actual weight change. Measure and adjust rather than relying on theory alone.

Food quality, protein and satiety determine how pleasant and healthy it is to maintain a calorie level — but whether you gain or lose is decided by the balance. Understanding this principle makes you independent of diet fads.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. PROTEIN
  // ─────────────────────────────────────────────
  {
    id: 'protein',
    category: 'makros',
    nameDE: 'Protein',
    nameEN: 'Protein',
    summaryDE: 'Protein ist der wichtigste Makronährstoff für Muskelaufbau und -erhalt. Es sättigt am stärksten, hat den höchsten thermischen Effekt und schützt beim Abnehmen die Muskulatur. Für Trainierende sind etwa 1,6–2,2 g pro Kilogramm Körpergewicht ideal.',
    summaryEN: 'Protein is the most important macronutrient for building and maintaining muscle. It is the most satiating, has the highest thermic effect and protects muscle during fat loss. For trainees, about 1.6–2.2 g per kilogram of body weight is ideal.',
    quickDE: [
      { label: 'Zielmenge', text: 'Ca. 1,6–2,2 g pro kg Körpergewicht täglich; beim Abnehmen eher am oberen Ende.' },
      { label: 'Quellen', text: 'Fleisch, Fisch, Eier, Milchprodukte, Hülsenfrüchte, Tofu, Whey/Proteinpulver.' },
    ],
    quickEN: [
      { label: 'Target', text: 'About 1.6–2.2 g per kg body weight daily; toward the upper end when dieting.' },
      { label: 'Sources', text: 'Meat, fish, eggs, dairy, legumes, tofu, whey/protein powder.' },
    ],
    sections: [
      {
        titleDE: 'Warum Protein so wichtig ist',
        titleEN: 'Why protein is so important',
        contentDE: `Proteine bestehen aus Aminosäuren, den Bausteinen für Muskeln, Enzyme, Hormone und praktisch jede Struktur im Körper. Neun dieser Aminosäuren sind essenziell — der Körper kann sie nicht selbst herstellen, sie müssen über die Nahrung kommen.

Für Sportler ist Protein besonders bedeutsam, weil es die Muskelproteinsynthese anregt — den Prozess, durch den nach dem Training neue Muskelmasse aufgebaut wird. Ohne ausreichend Protein kann selbst hartes Training kaum in Muskelwachstum umgesetzt werden.

Darüber hinaus hat Protein zwei praktische Vorteile bei der Gewichtskontrolle: Es sättigt stärker als Kohlenhydrate oder Fett und hat den höchsten thermischen Effekt (etwa 20–30 % der Proteinkalorien werden bei der Verdauung verbraucht). Beides macht es zum wertvollsten Makronährstoff beim Abnehmen.`,
        contentEN: `Proteins consist of amino acids, the building blocks for muscles, enzymes, hormones and virtually every structure in the body. Nine of these amino acids are essential — the body cannot produce them itself, they must come from food.

For athletes, protein is especially significant because it stimulates muscle protein synthesis — the process by which new muscle mass is built after training. Without enough protein, even hard training can barely be turned into muscle growth.

Protein also has two practical advantages for weight control: it is more satiating than carbohydrates or fat and has the highest thermic effect (about 20–30% of protein calories are used up in digestion). Both make it the most valuable macronutrient when dieting.`,
      },
      {
        titleDE: 'Wie viel Protein brauchst du?',
        titleEN: 'How much protein do you need?',
        contentDE: `Die offizielle Mindestmenge zur Vermeidung von Mangel liegt bei 0,8 g pro Kilogramm Körpergewicht — aber das ist weit entfernt vom Optimum für Sportler. Eine umfassende Metaanalyse von Morton et al. (2018, British Journal of Sports Medicine) fand, dass etwa 1,6 g/kg den größten Nutzen für Muskelaufbau bringen, mit möglichem Zusatznutzen bis etwa 2,2 g/kg.

Beim Abnehmen ist eher das obere Ende sinnvoll. Im Kaloriendefizit steigt der Bedarf, weil Protein die Muskulatur vor dem Abbau schützt. Helms et al. (2014) empfehlen für Athleten im Defizit bis zu 2,3–3,1 g pro Kilogramm fettfreier Masse.

Für die meisten Trainierenden ist ein einfacher Richtwert von etwa 2 g pro Kilogramm Körpergewicht praktisch und wirksam. Mehr schadet gesunden Menschen nicht, bringt aber kaum zusätzlichen Nutzen.`,
        contentEN: `The official minimum to avoid deficiency is 0.8 g per kilogram of body weight — but that is far from optimal for athletes. A comprehensive meta-analysis by Morton et al. (2018, British Journal of Sports Medicine) found that about 1.6 g/kg provides the greatest benefit for muscle building, with possible additional benefit up to about 2.2 g/kg.

When dieting, the upper end is preferable. In a calorie deficit the requirement rises because protein protects muscle from breakdown. Helms et al. (2014) recommend up to 2.3–3.1 g per kilogram of lean body mass for athletes in a deficit.

For most trainees a simple guideline of about 2 g per kilogram of body weight is practical and effective. More does not harm healthy people but provides little additional benefit.`,
      },
      {
        titleDE: 'Qualität und Verteilung',
        titleEN: 'Quality and distribution',
        contentDE: `Nicht alle Proteinquellen sind gleich. Die "Qualität" hängt vom Gehalt an essenziellen Aminosäuren, besonders Leucin, und von der Verdaulichkeit ab. Tierische Quellen (Fleisch, Fisch, Eier, Milchprodukte) sind meist vollständig; pflanzliche Quellen sind oft in einzelnen Aminosäuren limitiert, lassen sich aber durch Kombination (z. B. Hülsenfrüchte plus Getreide) ergänzen.

Auch die Verteilung über den Tag spielt eine Rolle. Die Muskelproteinsynthese wird pro Mahlzeit durch etwa 20–40 g hochwertiges Protein maximal angeregt. Es ist daher sinnvoll, Protein über drei bis fünf Mahlzeiten zu verteilen, statt alles in einer einzigen zu essen.

Für die Praxis heißt das: Jede Hauptmahlzeit sollte eine gute Proteinquelle enthalten. Die Gesamtmenge über den Tag bleibt aber der wichtigste Faktor — die perfekte Verteilung ist zweitrangig gegenüber dem Erreichen des Tagesziels.`,
        contentEN: `Not all protein sources are equal. "Quality" depends on the content of essential amino acids, especially leucine, and on digestibility. Animal sources (meat, fish, eggs, dairy) are usually complete; plant sources are often limited in individual amino acids but can be complemented by combining them (e.g. legumes plus grains).

Distribution across the day also matters. Muscle protein synthesis is maximally stimulated per meal by about 20–40 g of high-quality protein. It therefore makes sense to spread protein across three to five meals rather than eating it all in one.

In practice this means: every main meal should contain a good protein source. The total amount over the day remains the most important factor, however — perfect distribution is secondary to hitting the daily target.`,
      },
      {
        titleDE: 'Mythen und Sicherheit',
        titleEN: 'Myths and safety',
        contentDE: `Ein hartnäckiger Mythos ist, dass viel Protein die Nieren schädige. Bei gesunden Menschen ist das nicht belegt — kontrollierte Studien zeigen keine negativen Auswirkungen hoher Proteinzufuhr auf die Nierenfunktion (Devries et al., 2018, Journal of Nutrition). Nur bei bestehender Nierenerkrankung ist ärztliche Rücksprache nötig.

Ein weiterer Mythos: Der Körper könne pro Mahlzeit nur etwa 30 g Protein "verwerten". Tatsächlich wird auch mehr verdaut und genutzt — lediglich der akute Reiz auf die Muskelproteinsynthese flacht ab. Größere Portionen sind also nicht verschwendet.

Proteinpulver wie Whey sind praktisch, aber kein Muss. Sie sind einfach eine bequeme, kostengünstige Proteinquelle. Wer seinen Bedarf über normale Lebensmittel deckt, braucht keine Supplemente — sie sind ein Werkzeug, kein Wundermittel.`,
        contentEN: `A persistent myth is that high protein damages the kidneys. In healthy people this is not supported — controlled studies show no adverse effects of high protein intake on kidney function (Devries et al., 2018, Journal of Nutrition). Only with existing kidney disease is medical consultation necessary.

Another myth: that the body can only "use" about 30 g of protein per meal. In fact, more is digested and used — only the acute stimulus on muscle protein synthesis levels off. Larger portions are therefore not wasted.

Protein powders such as whey are convenient but not a must. They are simply a handy, low-cost protein source. Those who meet their needs through regular foods do not need supplements — they are a tool, not a miracle.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Protein ist der Schlüssel-Makronährstoff für Muskelaufbau, Muskelerhalt und Sättigung. Für Trainierende sind etwa 1,6–2,2 g pro Kilogramm Körpergewicht ideal, beim Abnehmen eher am oberen Ende.

Setze auf hochwertige Quellen, verteile Protein über mehrere Mahlzeiten und erreiche vor allem dein Tagesziel. Ob tierisch oder pflanzlich, ist zweitrangig, solange die Gesamtmenge und -qualität stimmen.

Die verbreiteten Warnungen vor "zu viel" Protein sind für gesunde Menschen unbegründet. Protein ist der Makronährstoff, bei dem sich Genauigkeit am meisten lohnt — er macht den größten Unterschied für Körperzusammensetzung und Sättigung.`,
        contentEN: `Protein is the key macronutrient for building muscle, maintaining muscle and satiety. For trainees, about 1.6–2.2 g per kilogram of body weight is ideal, toward the upper end when dieting.

Rely on high-quality sources, spread protein across several meals and above all hit your daily target. Whether animal or plant is secondary as long as total amount and quality are adequate.

The common warnings about "too much" protein are unfounded for healthy people. Protein is the macronutrient where precision pays off most — it makes the biggest difference to body composition and satiety.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. KOHLENHYDRATE
  // ─────────────────────────────────────────────
  {
    id: 'carbs',
    category: 'makros',
    nameDE: 'Kohlenhydrate',
    nameEN: 'Carbohydrates',
    summaryDE: 'Kohlenhydrate sind die wichtigste Energiequelle für intensives Training. Sie sind nicht "dickmachend" per se — entscheidend ist die Gesamtkalorienbilanz. Qualität, Menge und Timing können Leistung und Wohlbefinden aber deutlich beeinflussen.',
    summaryEN: 'Carbohydrates are the main energy source for intense training. They are not "fattening" per se — total calorie balance is what matters. Quality, quantity and timing can, however, noticeably influence performance and well-being.',
    quickDE: [
      { label: 'Funktion', text: 'Hauptbrennstoff für intensive Belastung; füllen die Glykogenspeicher in Muskeln und Leber.' },
      { label: 'Praxis', text: 'Überwiegend ballaststoffreiche, wenig verarbeitete Quellen; Menge nach Aktivität richten.' },
    ],
    quickEN: [
      { label: 'Function', text: 'Main fuel for intense effort; fill glycogen stores in muscles and liver.' },
      { label: 'Practice', text: 'Mostly fibre-rich, minimally processed sources; scale amount to activity.' },
    ],
    sections: [
      {
        titleDE: 'Was Kohlenhydrate im Körper tun',
        titleEN: 'What carbohydrates do in the body',
        contentDE: `Kohlenhydrate werden im Körper zu Glukose abgebaut, dem bevorzugten Brennstoff für intensive Muskelarbeit und die wichtigste Energiequelle für das Gehirn. Überschüssige Glukose wird als Glykogen in Muskeln und Leber gespeichert — ein schnell verfügbarer Energievorrat.

Bei intensivem Kraft- und Intervalltraining greift der Körper stark auf dieses Muskelglykogen zurück. Gut gefüllte Speicher bedeuten mehr Leistung, mehr Wiederholungen und bessere Trainingsqualität. Bei niedriger Kohlenhydratzufuhr über längere Zeit können diese Speicher teilweise leeren und die Leistung im hohen Intensitätsbereich sinken.

Kohlenhydrate sind allerdings nicht essenziell im strengen Sinne — der Körper kann Glukose auch selbst herstellen. Für sportliche Leistung und Wohlbefinden sind sie dennoch für die meisten Menschen sehr nützlich, besonders bei intensivem Training.`,
        contentEN: `Carbohydrates are broken down into glucose, the preferred fuel for intense muscular work and the main energy source for the brain. Excess glucose is stored as glycogen in muscles and the liver — a rapidly available energy reserve.

During intense strength and interval training, the body draws heavily on this muscle glycogen. Well-filled stores mean more performance, more repetitions and better training quality. With low carbohydrate intake over a longer period, these stores can partly deplete and high-intensity performance can decline.

Carbohydrates are not essential in the strict sense, however — the body can produce glucose itself. For athletic performance and well-being they are nonetheless very useful for most people, especially with intense training.`,
      },
      {
        titleDE: 'Qualität: komplexe vs. einfache Kohlenhydrate',
        titleEN: 'Quality: complex vs. simple carbohydrates',
        contentDE: `Kohlenhydratquellen unterscheiden sich stark in ihrer Wirkung. Ballaststoffreiche, wenig verarbeitete Quellen wie Vollkornprodukte, Hülsenfrüchte, Obst und Gemüse werden langsamer verdaut, sättigen besser und liefern Mikronährstoffe. Stark verarbeitete Quellen wie Zucker und Weißmehlprodukte werden schnell aufgenommen und sättigen kaum.

Ballaststoffe verdienen besondere Aufmerksamkeit. Sie fördern die Verdauung, nähren die Darmbakterien und verbessern die Sättigung. Empfohlen werden etwa 25–35 g pro Tag, was viele Menschen deutlich unterschreiten. Eine ballaststoffreiche Ernährung ist mit besserer Gesundheit und leichterer Gewichtskontrolle verbunden.

Das heißt nicht, dass einfache Kohlenhydrate verboten sind. Rund ums Training können schnell verfügbare Kohlenhydrate sogar sinnvoll sein. Im Alltag sollte der Großteil aber aus nährstoffreichen, ballaststoffhaltigen Quellen stammen.`,
        contentEN: `Carbohydrate sources differ greatly in their effect. Fibre-rich, minimally processed sources such as whole grains, legumes, fruit and vegetables are digested more slowly, satiate better and provide micronutrients. Heavily processed sources such as sugar and white flour products are absorbed quickly and barely satiate.

Fibre deserves special attention. It supports digestion, feeds gut bacteria and improves satiety. About 25–35 g per day is recommended, which many people fall well short of. A fibre-rich diet is associated with better health and easier weight control.

This does not mean simple carbohydrates are forbidden. Around training, rapidly available carbohydrates can even be useful. In everyday life, however, the majority should come from nutrient-dense, fibre-rich sources.`,
      },
      {
        titleDE: 'Wie viele Kohlenhydrate?',
        titleEN: 'How many carbohydrates?',
        contentDE: `Nach Protein und Fett kannst du die verbleibenden Kalorien deines Ziels mit Kohlenhydraten füllen. Es gibt keine feste "richtige" Menge — sie hängt von Aktivität, Vorlieben und Zielen ab. Sehr aktive Menschen profitieren von mehr Kohlenhydraten, weniger aktive kommen mit weniger aus.

Für intensiv Trainierende werden oft 3–5 g pro Kilogramm Körpergewicht oder mehr genannt. Wer wenig Sport treibt oder eine kohlenhydratärmere Ernährung bevorzugt, kann deutlich darunter liegen, ohne Nachteile — solange Protein und Gesamtkalorien stimmen.

Low-Carb- und ketogene Ernährungsformen funktionieren zum Abnehmen genauso gut wie kohlenhydratreichere, sofern die Kalorien gleich sind. Sie sind kein magischer Fatburner, aber eine legitime Option für Menschen, die sich damit wohler fühlen oder besser sättigen.`,
        contentEN: `After protein and fat, you can fill the remaining calories of your target with carbohydrates. There is no fixed "right" amount — it depends on activity, preferences and goals. Very active people benefit from more carbohydrates; less active people manage with fewer.

For intense trainees, 3–5 g per kilogram of body weight or more is often cited. Those who do little exercise or prefer a lower-carb diet can be well below this without disadvantage — as long as protein and total calories are adequate.

Low-carb and ketogenic diets work just as well for fat loss as higher-carb ones, provided calories are equal. They are not a magic fat burner, but a legitimate option for people who feel better on them or find them more satiating.`,
      },
      {
        titleDE: 'Der Insulin-Mythos',
        titleEN: 'The insulin myth',
        contentDE: `Ein weit verbreiteter Mythos besagt, Kohlenhydrate machten allein durch die Insulinausschüttung dick. Insulin ist ein Speicherhormon, das nach kohlenhydratreichen Mahlzeiten ansteigt — daraus wurde die Theorie abgeleitet, Kohlenhydrate seien der eigentliche Grund für Fettzunahme.

Kontrollierte Studien widerlegen das jedoch klar. Bei gleicher Kalorien- und Proteinmenge führt eine kohlenhydratarme nicht zu mehr Fettverlust als eine kohlenhydratreiche Ernährung (Hall et al., 2016, American Journal of Clinical Nutrition). Insulin steuert kurzfristige Speicherprozesse, hebelt aber die Gesamtenergiebilanz nicht aus.

Für gesunde Menschen sind normale Insulinreaktionen auf Kohlenhydrate völlig unproblematisch. Anders ist es bei Diabetes oder Insulinresistenz — hier ist die Kohlenhydratsteuerung medizinisch relevant und sollte ärztlich begleitet werden.`,
        contentEN: `A widespread myth claims carbohydrates make you fat purely through insulin release. Insulin is a storage hormone that rises after carbohydrate-rich meals — from this the theory was derived that carbohydrates are the real reason for fat gain.

Controlled studies clearly refute this, however. At equal calories and protein, a low-carbohydrate diet does not lead to more fat loss than a high-carbohydrate one (Hall et al., 2016, American Journal of Clinical Nutrition). Insulin controls short-term storage processes but does not override total energy balance.

For healthy people, normal insulin responses to carbohydrates are completely unproblematic. It is different with diabetes or insulin resistance — here carbohydrate management is medically relevant and should be guided by a doctor.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Kohlenhydrate sind der Hauptbrennstoff für intensives Training und keineswegs per se dickmachend — die Kalorienbilanz entscheidet. Sie füllen die Glykogenspeicher und unterstützen Leistung und Regeneration.

Wähle überwiegend ballaststoffreiche, wenig verarbeitete Quellen und richte die Menge nach deiner Aktivität. Rund ums Training können schnellere Kohlenhydrate sinnvoll sein.

Weder Low-Carb noch High-Carb ist grundsätzlich überlegen — beides funktioniert bei passenden Kalorien. Wähle den Ansatz, mit dem du dich wohlfühlst, gut trainierst und den du langfristig durchhältst.`,
        contentEN: `Carbohydrates are the main fuel for intense training and by no means fattening per se — calorie balance decides. They fill glycogen stores and support performance and recovery.

Choose mostly fibre-rich, minimally processed sources and scale the amount to your activity. Around training, faster carbohydrates can be useful.

Neither low-carb nor high-carb is inherently superior — both work with appropriate calories. Choose the approach you feel good on, train well on and can sustain long term.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. FETTE
  // ─────────────────────────────────────────────
  {
    id: 'fats',
    category: 'makros',
    nameDE: 'Fette',
    nameEN: 'Fats',
    summaryDE: 'Nahrungsfett ist essenziell für Hormone, Zellmembranen und die Aufnahme fettlöslicher Vitamine. Ein Mindestmaß ist gesundheitlich wichtig; die Art des Fettes zählt mehr als die reine Menge.',
    summaryEN: 'Dietary fat is essential for hormones, cell membranes and the absorption of fat-soluble vitamins. A minimum is important for health; the type of fat matters more than the sheer amount.',
    quickDE: [
      { label: 'Mindestmenge', text: 'Nicht dauerhaft unter ~0,5–0,8 g pro kg Körpergewicht (Hormonfunktion).' },
      { label: 'Qualität', text: 'Ungesättigte Fette (Olivenöl, Nüsse, Fisch) bevorzugen; Transfette meiden.' },
    ],
    quickEN: [
      { label: 'Minimum', text: 'Do not stay below ~0.5–0.8 g per kg body weight long term (hormone function).' },
      { label: 'Quality', text: 'Favour unsaturated fats (olive oil, nuts, fish); avoid trans fats.' },
    ],
    sections: [
      {
        titleDE: 'Die Rolle von Nahrungsfett',
        titleEN: 'The role of dietary fat',
        contentDE: `Fett ist weit mehr als ein Energieträger. Es ist Baustein jeder Zellmembran, Ausgangsstoff für Steroidhormone wie Testosteron und Östrogen und notwendig für die Aufnahme der fettlöslichen Vitamine A, D, E und K. Eine zu fettarme Ernährung kann daher die Hormonproduktion und die Nährstoffaufnahme beeinträchtigen.

Mit 9 Kalorien pro Gramm ist Fett der energiedichteste Makronährstoff — mehr als doppelt so viel wie Protein oder Kohlenhydrate (je 4 kcal). Das macht es leicht, versehentlich viele Kalorien über Fett aufzunehmen, weshalb ein bewusster Umgang beim Abnehmen hilfreich ist.

Zwei Fettsäuren sind essenziell: Omega-3 und Omega-6. Der Körper kann sie nicht selbst herstellen. Besonders Omega-3-Fettsäuren aus fettem Fisch sind für viele Menschen unterversorgt und mit zahlreichen gesundheitlichen Vorteilen verbunden.`,
        contentEN: `Fat is far more than an energy carrier. It is a building block of every cell membrane, a precursor for steroid hormones such as testosterone and oestrogen, and necessary for absorbing the fat-soluble vitamins A, D, E and K. A very low-fat diet can therefore impair hormone production and nutrient absorption.

At 9 calories per gram, fat is the most energy-dense macronutrient — more than twice as much as protein or carbohydrates (4 kcal each). This makes it easy to accidentally consume many calories through fat, which is why a deliberate approach helps when dieting.

Two fatty acids are essential: omega-3 and omega-6. The body cannot produce them itself. Omega-3 fatty acids from oily fish in particular are undersupplied in many people and associated with numerous health benefits.`,
      },
      {
        titleDE: 'Arten von Fett',
        titleEN: 'Types of fat',
        contentDE: `Ungesättigte Fette gelten als besonders günstig. Einfach ungesättigte Fette (Olivenöl, Avocado, Nüsse) und mehrfach ungesättigte Fette (fetter Fisch, Leinsamen, Walnüsse) unterstützen die Herzgesundheit und liefern essenzielle Fettsäuren. Sie sollten den Großteil der Fettzufuhr ausmachen.

Gesättigte Fette (in Fleisch, Butter, Kokosöl) sind nicht per se schädlich, sollten aber in Maßen konsumiert werden. Die Empfehlungen der meisten Fachgesellschaften liegen bei unter 10 % der Gesamtkalorien. Die Datenlage zu ihrer genauen Wirkung wird zwar diskutiert, doch der Ersatz eines Teils durch ungesättigte Fette gilt als vorteilhaft.

Künstliche Transfette sind die einzige Fettart, die klar gemieden werden sollte. Sie entstehen bei der industriellen Härtung von Ölen und sind stark mit Herz-Kreislauf-Erkrankungen verbunden. In vielen Ländern sind sie inzwischen stark reguliert oder verboten.`,
        contentEN: `Unsaturated fats are considered particularly beneficial. Monounsaturated fats (olive oil, avocado, nuts) and polyunsaturated fats (oily fish, flaxseed, walnuts) support heart health and provide essential fatty acids. They should make up the majority of fat intake.

Saturated fats (in meat, butter, coconut oil) are not inherently harmful but should be consumed in moderation. Most professional bodies recommend under 10% of total calories. The evidence on their exact effect is debated, but replacing some with unsaturated fats is considered beneficial.

Artificial trans fats are the only type of fat that should clearly be avoided. They arise from the industrial hardening of oils and are strongly linked to cardiovascular disease. In many countries they are now heavily regulated or banned.`,
      },
      {
        titleDE: 'Wie viel Fett?',
        titleEN: 'How much fat?',
        contentDE: `Anders als bei Protein gibt es bei Fett vor allem eine Untergrenze zu beachten. Dauerhaft sehr fettarme Ernährung (unter etwa 0,5 g pro Kilogramm Körpergewicht) kann bei manchen Menschen die Hormonproduktion beeinträchtigen. Ein sinnvoller Mindestwert liegt bei etwa 0,5–0,8 g pro Kilogramm.

Nach oben ist Fett flexibel. Sobald Protein festgelegt ist, können die restlichen Kalorien nach Vorliebe auf Fett und Kohlenhydrate verteilt werden. Manche fühlen sich mit mehr Fett und weniger Kohlenhydraten wohler, andere umgekehrt — beides ist gesundheitlich vertretbar.

Typische Empfehlungen liegen bei etwa 20–35 % der Gesamtkalorien aus Fett. Wichtiger als die exakte Prozentzahl ist, den Mindestbedarf zu decken, überwiegend hochwertige Fette zu wählen und die Gesamtkalorien im Blick zu behalten.`,
        contentEN: `Unlike protein, fat mainly has a lower limit to observe. A persistently very low-fat diet (below about 0.5 g per kilogram of body weight) can impair hormone production in some people. A sensible minimum is around 0.5–0.8 g per kilogram.

Upward, fat is flexible. Once protein is set, the remaining calories can be distributed between fat and carbohydrates according to preference. Some feel better with more fat and fewer carbohydrates, others the reverse — both are healthy.

Typical recommendations are around 20–35% of total calories from fat. More important than the exact percentage is meeting the minimum requirement, choosing mostly high-quality fats and keeping an eye on total calories.`,
      },
      {
        titleDE: 'Omega-3 im Fokus',
        titleEN: 'Omega-3 in focus',
        contentDE: `Unter den Fetten verdienen die Omega-3-Fettsäuren EPA und DHA besondere Beachtung. Sie wirken entzündungsregulierend und sind mit einer besseren Herz-Kreislauf- und Gehirngesundheit verbunden. Die Hauptquelle ist fetter Kaltwasserfisch wie Lachs, Makrele und Hering.

Viele Menschen nehmen zu wenig Omega-3 und gleichzeitig viel Omega-6 (aus verarbeiteten Ölen) auf, was das Verhältnis ungünstig verschiebt. Zwei bis drei Portionen fetter Fisch pro Woche verbessern die Versorgung deutlich.

Wer keinen Fisch isst, kann über ein Algen- oder Fischöl-Supplement nachdenken. Pflanzliche Omega-3-Quellen (Leinsamen, Walnüsse) liefern zwar ALA, das der Körper aber nur begrenzt in die wirksamen Formen EPA und DHA umwandelt. Bei gesundheitlichen Fragen zur Supplementierung ist ärztliche Rücksprache sinnvoll.`,
        contentEN: `Among fats, the omega-3 fatty acids EPA and DHA deserve special attention. They have anti-inflammatory effects and are associated with better cardiovascular and brain health. The main source is oily cold-water fish such as salmon, mackerel and herring.

Many people consume too little omega-3 and at the same time a lot of omega-6 (from processed oils), which shifts the ratio unfavourably. Two to three portions of oily fish per week noticeably improve supply.

Those who do not eat fish can consider an algae or fish oil supplement. Plant omega-3 sources (flaxseed, walnuts) provide ALA, which the body only converts to a limited extent into the active forms EPA and DHA. For health questions about supplementation, medical consultation is advisable.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Fett ist essenziell für Hormone, Zellmembranen und die Vitaminaufnahme. Falle nicht dauerhaft unter etwa 0,5–0,8 g pro Kilogramm Körpergewicht, sonst können Hormonfunktion und Wohlbefinden leiden.

Die Fettqualität zählt: Bevorzuge ungesättigte Fette aus Olivenöl, Nüssen, Avocado und fettem Fisch, halte gesättigte Fette moderat und meide künstliche Transfette. Achte besonders auf eine ausreichende Omega-3-Zufuhr.

Über dem Minimum ist die Fettmenge flexibel und Geschmackssache. Wähle die Verteilung zwischen Fett und Kohlenhydraten so, dass sie zu deinen Vorlieben passt und die Gesamtkalorien stimmen.`,
        contentEN: `Fat is essential for hormones, cell membranes and vitamin absorption. Do not stay below about 0.5–0.8 g per kilogram of body weight long term, or hormone function and well-being may suffer.

Fat quality matters: favour unsaturated fats from olive oil, nuts, avocado and oily fish, keep saturated fats moderate and avoid artificial trans fats. Pay particular attention to adequate omega-3 intake.

Above the minimum, the amount of fat is flexible and a matter of taste. Choose the split between fat and carbohydrates to suit your preferences and keep total calories right.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. MIKRONÄHRSTOFFE
  // ─────────────────────────────────────────────
  {
    id: 'micronutrients',
    category: 'mikros',
    nameDE: 'Vitamine & Mineralstoffe',
    nameEN: 'Vitamins & Minerals',
    summaryDE: 'Mikronährstoffe liefern keine Energie, sind aber für unzählige Körperfunktionen unverzichtbar. Eine abwechslungsreiche, vollwertige Ernährung deckt den Bedarf meist ab — einige Nährstoffe verdienen aber besondere Aufmerksamkeit.',
    summaryEN: 'Micronutrients provide no energy but are indispensable for countless body functions. A varied, whole-food diet usually covers the needs — but a few nutrients deserve special attention.',
    quickDE: [
      { label: 'Grundregel', text: 'Vielfalt an Gemüse, Obst, Vollkorn, Proteinquellen deckt die meisten Mikronährstoffe.' },
      { label: 'Aufpassen', text: 'Vitamin D, Omega-3, ggf. Eisen (Frauen), B12 (vegan), Jod, Magnesium.' },
    ],
    quickEN: [
      { label: 'Basic rule', text: 'A variety of vegetables, fruit, whole grains and protein sources covers most micronutrients.' },
      { label: 'Watch', text: 'Vitamin D, omega-3, possibly iron (women), B12 (vegan), iodine, magnesium.' },
    ],
    sections: [
      {
        titleDE: 'Was Mikronährstoffe sind',
        titleEN: 'What micronutrients are',
        contentDE: `Mikronährstoffe umfassen Vitamine und Mineralstoffe, die der Körper nur in kleinen Mengen benötigt — im Gegensatz zu den Makronährstoffen (Protein, Kohlenhydrate, Fett), die Energie liefern. Obwohl sie keine Kalorien haben, sind sie an praktisch jedem Stoffwechselprozess beteiligt: Energiegewinnung, Immunfunktion, Knochengesundheit, Sauerstofftransport und vieles mehr.

Ein Mangel an Mikronährstoffen kann sich schleichend äußern — durch Müdigkeit, schlechtere Erholung, Infektanfälligkeit oder nachlassende Leistung. Gerade bei kalorienreduzierter oder einseitiger Ernährung steigt das Risiko einer Unterversorgung.

Die gute Nachricht: Eine abwechslungsreiche Ernährung mit viel Gemüse, Obst, Vollkornprodukten, hochwertigen Proteinquellen und gesunden Fetten deckt den Bedarf der meisten Mikronährstoffe auf natürliche Weise ab. Lebensmittelvielfalt ist die beste Versicherung gegen Mängel.`,
        contentEN: `Micronutrients comprise vitamins and minerals that the body needs only in small amounts — unlike macronutrients (protein, carbohydrates, fat), which provide energy. Although they contain no calories, they are involved in virtually every metabolic process: energy production, immune function, bone health, oxygen transport and much more.

A micronutrient deficiency can manifest gradually — through fatigue, poorer recovery, susceptibility to infection or declining performance. Especially with calorie-reduced or one-sided diets, the risk of undersupply rises.

The good news: a varied diet with plenty of vegetables, fruit, whole grains, high-quality protein sources and healthy fats naturally covers the needs of most micronutrients. Food variety is the best insurance against deficiencies.`,
      },
      {
        titleDE: 'Kritische Nährstoffe im Blick',
        titleEN: 'Keeping an eye on critical nutrients',
        contentDE: `Einige Mikronährstoffe sind auch bei guter Ernährung häufig knapp. Vitamin D wird vor allem über Sonnenlicht gebildet und ist in vielen Regionen, besonders im Winter, unterversorgt. Eine Supplementierung ist hier oft sinnvoll, idealerweise nach einem Bluttest.

Eisen ist besonders für menstruierende Frauen ein Thema, da regelmäßige Blutverluste den Bedarf erhöhen. Ein Mangel äußert sich in Müdigkeit und Leistungsabfall. Vitamin B12 kommt fast ausschließlich in tierischen Produkten vor — vegan lebende Menschen sollten es zwingend supplementieren.

Weitere häufig knappe Nährstoffe sind Jod, Magnesium, Zink und Omega-3. Statt wahllos alles zu supplementieren, ist es klüger, den eigenen Bedarf gezielt zu betrachten — idealerweise über Blutwerte und in Absprache mit einem Arzt.`,
        contentEN: `Some micronutrients are often scarce even with a good diet. Vitamin D is formed mainly through sunlight and is undersupplied in many regions, especially in winter. Supplementation is often sensible here, ideally after a blood test.

Iron is a particular issue for menstruating women, as regular blood loss increases the requirement. A deficiency shows up as fatigue and performance decline. Vitamin B12 occurs almost exclusively in animal products — people living vegan must supplement it.

Other frequently scarce nutrients are iodine, magnesium, zinc and omega-3. Instead of indiscriminately supplementing everything, it is wiser to look specifically at your own needs — ideally through blood values and in consultation with a doctor.`,
      },
      {
        titleDE: 'Lebensmittel vor Nahrungsergänzung',
        titleEN: 'Food before supplements',
        contentDE: `Grundsätzlich gilt: Vollwertige Lebensmittel sind Nahrungsergänzungsmitteln vorzuziehen. Sie liefern Mikronährstoffe im natürlichen Verbund mit Ballaststoffen, sekundären Pflanzenstoffen und anderen Substanzen, die zusammenwirken. Ein einzelnes Vitamin in Pillenform kann diese Komplexität nicht ersetzen.

Studien zu isolierten Vitaminpräparaten zeigen oft enttäuschende oder gar keine Vorteile für gesunde Menschen ohne Mangel — teils sogar Nachteile bei Überdosierung. Mehr ist nicht besser: Fettlösliche Vitamine (A, D, E, K) können sich anreichern und in hohen Dosen schädlich sein.

Supplemente sind dann sinnvoll, wenn ein tatsächlicher Mangel oder ein erhöhter Bedarf besteht — etwa Vitamin D im Winter, B12 bei veganer Ernährung oder Eisen bei nachgewiesenem Mangel. Als gezielte Ergänzung sind sie nützlich, als Ersatz für gute Ernährung nicht.`,
        contentEN: `As a rule: whole foods are preferable to supplements. They provide micronutrients in a natural matrix with fibre, phytochemicals and other substances that work together. A single vitamin in pill form cannot replace this complexity.

Studies on isolated vitamin preparations often show disappointing or no benefits for healthy people without deficiency — sometimes even drawbacks with overdosing. More is not better: fat-soluble vitamins (A, D, E, K) can accumulate and be harmful in high doses.

Supplements make sense when there is an actual deficiency or an increased need — such as vitamin D in winter, B12 on a vegan diet or iron with a proven deficiency. As a targeted addition they are useful; as a substitute for a good diet they are not.`,
      },
      {
        titleDE: 'Praktische Umsetzung',
        titleEN: 'Practical implementation',
        contentDE: `Die einfachste Strategie für eine gute Mikronährstoffversorgung heißt Vielfalt und Farbe. Unterschiedlich gefärbtes Gemüse und Obst liefern unterschiedliche Vitamine und sekundäre Pflanzenstoffe — "iss den Regenbogen" ist eine praktische Faustregel.

Konkret hilft es, zu jeder Hauptmahlzeit Gemüse einzuplanen, regelmäßig Hülsenfrüchte, Nusskerne und Samen einzubauen, verschiedene Proteinquellen zu rotieren und Vollkorn gegenüber stark verarbeiteten Produkten zu bevorzugen. So entsteht fast automatisch eine breite Nährstoffbasis.

Wer viel verarbeitet und einseitig isst, riskiert trotz ausreichender Kalorien Mängel — ein Phänomen, das manchmal als "überernährt und unterversorgt" beschrieben wird. Die Qualität der Lebensmittel ist daher der Schlüssel zu einer robusten Mikronährstoffversorgung.`,
        contentEN: `The simplest strategy for good micronutrient supply is variety and colour. Differently coloured vegetables and fruit provide different vitamins and phytochemicals — "eat the rainbow" is a practical rule of thumb.

Concretely it helps to include vegetables in every main meal, regularly add legumes, nuts and seeds, rotate different protein sources and prefer whole grains over heavily processed products. This almost automatically creates a broad nutrient base.

Those who eat a lot of processed, one-sided food risk deficiencies despite adequate calories — a phenomenon sometimes described as "overfed and undernourished". Food quality is therefore the key to a robust micronutrient supply.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Mikronährstoffe liefern keine Energie, sind aber für Gesundheit, Erholung und Leistung unverzichtbar. Eine abwechslungsreiche, vollwertige Ernährung deckt den Bedarf der meisten Vitamine und Mineralstoffe ab.

Besondere Aufmerksamkeit verdienen Vitamin D, Omega-3 sowie je nach Situation Eisen, B12, Jod und Magnesium. Statt pauschal zu supplementieren, lohnt sich ein gezielter Blick auf den eigenen Bedarf, idealerweise über Blutwerte.

Vollwertige Lebensmittel gehen Nahrungsergänzung vor. Vielfalt und Farbe auf dem Teller sind die beste und einfachste Strategie für eine gute Mikronährstoffversorgung.`,
        contentEN: `Micronutrients provide no energy but are indispensable for health, recovery and performance. A varied, whole-food diet covers the needs of most vitamins and minerals.

Vitamin D, omega-3 and, depending on the situation, iron, B12, iodine and magnesium deserve special attention. Instead of supplementing across the board, it is worth taking a targeted look at your own needs, ideally through blood values.

Whole foods come before supplements. Variety and colour on the plate are the best and simplest strategy for a good micronutrient supply.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. MAHLZEITEN-TIMING & VERTEILUNG
  // ─────────────────────────────────────────────
  {
    id: 'meal_timing',
    category: 'praxis',
    nameDE: 'Mahlzeiten-Timing',
    nameEN: 'Meal Timing',
    summaryDE: 'Wann und wie oft du isst, ist weit weniger wichtig als was und wie viel. Timing kann Leistung und Wohlbefinden fein abstimmen, ersetzt aber nie die Grundlagen Kalorien und Protein.',
    summaryEN: 'When and how often you eat matters far less than what and how much. Timing can fine-tune performance and well-being but never replaces the basics of calories and protein.',
    quickDE: [
      { label: 'Priorität', text: 'Gesamtkalorien und Protein zuerst — Timing ist Feinschliff, kein Fundament.' },
      { label: 'Nützlich', text: 'Protein über den Tag verteilen; rund ums Training ausreichend essen.' },
    ],
    quickEN: [
      { label: 'Priority', text: 'Total calories and protein first — timing is fine-tuning, not the foundation.' },
      { label: 'Useful', text: 'Spread protein across the day; eat adequately around training.' },
    ],
    sections: [
      {
        titleDE: 'Die richtige Einordnung',
        titleEN: 'Putting it in perspective',
        contentDE: `Rund um Mahlzeiten-Timing ranken sich viele Mythen — vom "anabolen Fenster" direkt nach dem Training bis zum Verbot, abends Kohlenhydrate zu essen. In der Realität ist Timing ein Feinschliff-Faktor, der erst zählt, wenn die Grundlagen stimmen: Gesamtkalorien, Protein und Lebensmittelqualität.

Die Hierarchie der Ernährung ist klar: Zuerst kommt die Energiebilanz, dann die Makronährstoffe (vor allem Protein), dann die Lebensmittelqualität und Mikronährstoffe — und erst danach Timing und Mahlzeitenfrequenz. Wer die oberen Ebenen vernachlässigt, kann durch perfektes Timing nichts retten.

Das bedeutet nicht, dass Timing nutzlos ist. Es kann Leistung, Sättigung und Wohlbefinden verbessern. Aber es ist der letzte, kleinste Stellhebel — kein Grund für Stress oder komplizierte Regeln.`,
        contentEN: `Many myths surround meal timing — from the "anabolic window" right after training to the ban on eating carbohydrates in the evening. In reality, timing is a fine-tuning factor that only counts once the basics are right: total calories, protein and food quality.

The hierarchy of nutrition is clear: first comes energy balance, then macronutrients (especially protein), then food quality and micronutrients — and only after that timing and meal frequency. Those who neglect the upper levels cannot rescue anything through perfect timing.

This does not mean timing is useless. It can improve performance, satiety and well-being. But it is the last, smallest lever — no reason for stress or complicated rules.`,
      },
      {
        titleDE: 'Das "anabole Fenster"',
        titleEN: 'The "anabolic window"',
        contentDE: `Lange galt die Regel, man müsse direkt nach dem Training Protein und Kohlenhydrate zu sich nehmen, sonst verpuffe der Trainingseffekt. Dieses enge "anabole Fenster" hat sich als Übertreibung erwiesen.

Eine Metaanalyse von Schoenfeld, Aragon & Krieger (2013, Journal of the International Society of Sports Nutrition) fand, dass der genaue Zeitpunkt der Proteinzufuhr rund ums Training weit weniger wichtig ist als die gesamte Tagesproteinmenge. Das "Fenster" ist eher mehrere Stunden breit als wenige Minuten.

Praktisch heißt das: Solange du über den Tag verteilt genug Protein isst und nicht viele Stunden vor und nach dem Training komplett nüchtern bist, musst du dich nicht hetzen. Wer nüchtern trainiert, kann von einer Mahlzeit relativ zeitnah nach dem Training profitieren — mehr aus praktischen als aus dringenden physiologischen Gründen.`,
        contentEN: `For a long time the rule was that you had to consume protein and carbohydrates right after training or the training effect would be wasted. This narrow "anabolic window" has proven to be an exaggeration.

A meta-analysis by Schoenfeld, Aragon & Krieger (2013, Journal of the International Society of Sports Nutrition) found that the exact timing of protein intake around training is far less important than total daily protein. The "window" is more like several hours wide than a few minutes.

In practice this means: as long as you eat enough protein spread across the day and are not completely fasted for many hours before and after training, you do not need to rush. Those who train fasted can benefit from a meal relatively soon after training — more for practical than for urgent physiological reasons.`,
      },
      {
        titleDE: 'Mahlzeitenfrequenz und Intervallfasten',
        titleEN: 'Meal frequency and intermittent fasting',
        contentDE: `Ob du drei große oder sechs kleine Mahlzeiten isst, hat kaum Einfluss auf Stoffwechsel oder Fettabbau, solange Kalorien und Protein gleich bleiben. Der alte Glaube, häufige kleine Mahlzeiten würden "den Stoffwechsel anheizen", ist widerlegt — der thermische Effekt hängt von der Gesamtmenge ab, nicht von der Häufigkeit.

Intervallfasten (z. B. 16:8) ist populär und für viele ein hilfreiches Werkzeug, um die Kalorienzufuhr zu steuern. Es ist aber kein magischer Fatburner: Bei gleichen Kalorien führt es nicht zu mehr Fettverlust als eine gleichmäßig verteilte Ernährung. Sein Nutzen liegt vor allem darin, dass manche Menschen so leichter im Defizit bleiben.

Die beste Mahlzeitenfrequenz ist die, die zu deinem Alltag passt, dich gut sättigt und die du durchhältst. Für den Muskelaufbau ist es sinnvoll, das Protein auf mindestens drei bis vier Portionen zu verteilen — darüber hinaus ist die Frequenz Geschmackssache.`,
        contentEN: `Whether you eat three large or six small meals has little influence on metabolism or fat loss, as long as calories and protein stay the same. The old belief that frequent small meals "stoke the metabolism" has been refuted — the thermic effect depends on the total amount, not the frequency.

Intermittent fasting (e.g. 16:8) is popular and for many a helpful tool to manage calorie intake. But it is not a magic fat burner: at equal calories it does not lead to more fat loss than an evenly distributed diet. Its benefit lies mainly in the fact that some people find it easier to stay in a deficit this way.

The best meal frequency is the one that fits your daily life, satiates you well and that you can sustain. For muscle building it makes sense to spread protein over at least three to four portions — beyond that, frequency is a matter of taste.`,
      },
      {
        titleDE: 'Sinnvolles Timing in der Praxis',
        titleEN: 'Sensible timing in practice',
        contentDE: `Auch wenn Timing zweitrangig ist, gibt es ein paar praktisch nützliche Punkte. Vor dem Training sorgt eine Mahlzeit mit Kohlenhydraten und etwas Protein ein bis drei Stunden vorher für gute Energie und Leistung. Ein zu voller Magen kurz vor der Einheit kann dagegen unangenehm sein.

Nach dem Training ist eine protein- und kohlenhydrathaltige Mahlzeit innerhalb einiger Stunden sinnvoll, um Regeneration und Glykogenauffüllung zu unterstützen. Der genaue Zeitpunkt ist flexibel — es muss nicht die berüchtigte Sekunde nach dem letzten Satz sein.

Auch Schlaf und Verdauung profitieren von Timing: Sehr große oder scharfe Mahlzeiten direkt vor dem Schlafengehen können den Schlaf stören. Wer abends Kohlenhydrate isst, muss aber keine Angst vor Fettzunahme haben — das ist ein Mythos, solange die Tagesbilanz stimmt.`,
        contentEN: `Even though timing is secondary, there are a few practically useful points. Before training, a meal with carbohydrates and some protein one to three hours beforehand provides good energy and performance. A too-full stomach shortly before the session can, by contrast, be uncomfortable.

After training, a meal containing protein and carbohydrates within a few hours is sensible to support recovery and glycogen replenishment. The exact timing is flexible — it does not have to be the notorious second after the last set.

Sleep and digestion also benefit from timing: very large or spicy meals right before bed can disturb sleep. But eating carbohydrates in the evening need not cause fear of fat gain — that is a myth as long as the daily balance is right.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Mahlzeiten-Timing ist der Feinschliff der Ernährung, nicht ihr Fundament. Gesamtkalorien und Protein bestimmen den größten Teil des Ergebnisses; Timing und Frequenz sind nachgeordnet.

Das "anabole Fenster" ist mehrere Stunden breit, nicht Minuten. Mahlzeitenfrequenz und Intervallfasten sind bei gleichen Kalorien gleichwertig — wähle, was zu deinem Alltag passt und dich gut sättigt.

Nützlich ist, das Protein über den Tag zu verteilen und rund ums Training ausreichend zu essen. Alles Weitere ist individuelle Optimierung, kein Muss. Mach dir über Timing keinen Stress, solange die Grundlagen stimmen.`,
        contentEN: `Meal timing is the fine-tuning of nutrition, not its foundation. Total calories and protein determine most of the result; timing and frequency are secondary.

The "anabolic window" is several hours wide, not minutes. Meal frequency and intermittent fasting are equivalent at equal calories — choose what fits your daily life and satiates you well.

It is useful to spread protein across the day and eat adequately around training. Everything else is individual optimisation, not a must. Do not stress about timing as long as the basics are right.`,
      },
    ],
  },
];

export default nutritionTopics;
