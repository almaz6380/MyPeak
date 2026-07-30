// Supplement-Wissen — Wissensbibliothek-Block "Supplemente"
// Jedes Thema ist ein E-Book mit mehreren Kapiteln (DE + EN), mit
// wissenschaftlichen Referenzen. Gerendert über die generische KnowledgePage.
// Disclaimer: medical.

export const supplementsCategories = [
  { id: 'grundlagen', nameDE: 'Grundlagen', nameEN: 'Basics' },
  { id: 'leistung', nameDE: 'Leistung', nameEN: 'Performance' },
  { id: 'gesundheit', nameDE: 'Gesundheit', nameEN: 'Health' },
];

export const supplementsTopics = [
  // ─────────────────────────────────────────────
  // 1. KREATIN
  // ─────────────────────────────────────────────
  {
    id: 'creatine',
    category: 'leistung',
    nameDE: 'Kreatin',
    nameEN: 'Creatine',
    summaryDE: 'Kreatin ist das am besten erforschte und wirksamste Supplement für Kraft und Muskelaufbau. Es ist sicher, günstig und verbessert nachweislich die Leistung bei kurzen, intensiven Belastungen. Kreatin-Monohydrat ist die bevorzugte Form.',
    summaryEN: 'Creatine is the most researched and effective supplement for strength and muscle building. It is safe, inexpensive and demonstrably improves performance in short, intense efforts. Creatine monohydrate is the preferred form.',
    quickDE: [
      { label: 'Dosierung', text: '3–5 g Monohydrat täglich, dauerhaft — Timing egal. Ladephase optional.' },
      { label: 'Wirkung', text: 'Mehr Kraft und Wiederholungen, unterstützt Muskelaufbau, gut belegt und sicher.' },
    ],
    quickEN: [
      { label: 'Dosage', text: '3–5 g monohydrate daily, ongoing — timing irrelevant. Loading phase optional.' },
      { label: 'Effect', text: 'More strength and reps, supports muscle growth, well-evidenced and safe.' },
    ],
    references: [
      { authors: 'Kreider, R.B. et al.', year: 2017, title: 'International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine',
        source: 'Journal of the International Society of Sports Nutrition 14:18', url: 'https://www.tandfonline.com/doi/abs/10.1186/s12970-017-0173-z' },
    ],
    sections: [
      {
        titleDE: 'Was Kreatin ist und wie es wirkt',
        titleEN: 'What creatine is and how it works',
        contentDE: `Kreatin ist eine körpereigene Substanz, die in Muskeln und Gehirn vorkommt und auch über tierische Lebensmittel wie Fleisch und Fisch aufgenommen wird. Im Muskel wird es als Kreatinphosphat gespeichert und dient der schnellen Regeneration von ATP, dem unmittelbaren Energieträger der Zelle.

Bei kurzen, intensiven Belastungen — etwa schweren Sätzen im Krafttraining oder Sprints — ist ATP innerhalb von Sekunden verbraucht. Kreatinphosphat hilft, es rasch wieder aufzubauen, sodass mehr Kraft über mehr Wiederholungen aufrechterhalten werden kann. Volle Kreatinspeicher bedeuten damit mehr Trainingsleistung.

Durch Supplementierung lässt sich der Kreatingehalt im Muskel um etwa 20–40 % über das normale Niveau anheben. Genau dieser Anstieg erklärt die leistungssteigernde Wirkung, die in Hunderten von Studien konsistent bestätigt wurde.`,
        contentEN: `Creatine is a substance produced by the body, found in muscles and the brain and also obtained through animal foods such as meat and fish. In the muscle it is stored as creatine phosphate and serves to rapidly regenerate ATP, the cell's immediate energy carrier.

During short, intense efforts — such as heavy sets in strength training or sprints — ATP is depleted within seconds. Creatine phosphate helps rebuild it quickly so that more force can be maintained over more repetitions. Full creatine stores therefore mean more training performance.

Through supplementation, muscle creatine content can be raised by about 20–40% above the normal level. This increase explains the performance-enhancing effect, which has been consistently confirmed in hundreds of studies.`,
      },
      {
        titleDE: 'Die Studienlage',
        titleEN: 'The evidence',
        contentDE: `Kein Supplement für Kraftsportler ist besser untersucht als Kreatin. Eine Stellungnahme der International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) fasst zusammen: Kreatin-Monohydrat ist das wirksamste Nahrungsergänzungsmittel zur Steigerung der Leistungsfähigkeit bei hochintensiven Belastungen und zur Unterstützung des Muskelaufbaus.

Die Effekte sind gut messbar: In Kombination mit Krafttraining erhöht Kreatin die Kraftzuwächse und die fettfreie Masse deutlich stärker als Training allein. Der Nutzen zeigt sich über nahezu alle Altersgruppen und Leistungsniveaus hinweg.

Über den Sport hinaus wird Kreatin zunehmend für mögliche kognitive und gesundheitliche Vorteile untersucht, etwa bei geistiger Erschöpfung oder im Alter. Diese Forschung ist vielversprechend, aber noch nicht so eindeutig wie die Datenlage zur körperlichen Leistung.`,
        contentEN: `No supplement for strength athletes is better studied than creatine. A position stand of the International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) summarises: creatine monohydrate is the most effective supplement for increasing high-intensity performance and supporting muscle building.

The effects are clearly measurable: combined with strength training, creatine increases strength gains and lean mass considerably more than training alone. The benefit shows across almost all age groups and performance levels.

Beyond sport, creatine is increasingly studied for possible cognitive and health benefits, such as in mental fatigue or ageing. This research is promising but not yet as clear-cut as the evidence on physical performance.`,
      },
      {
        titleDE: 'Dosierung und Anwendung',
        titleEN: 'Dosage and use',
        contentDE: `Die Anwendung ist unkompliziert. Am gebräuchlichsten ist eine tägliche Erhaltungsdosis von 3–5 g Kreatin-Monohydrat. Der Zeitpunkt spielt keine wesentliche Rolle — wichtig ist nur die tägliche, dauerhafte Einnahme, da sich die Speicher über die Zeit füllen.

Optional gibt es eine Ladephase: etwa 20 g pro Tag (auf vier Portionen verteilt) über fünf bis sieben Tage, um die Speicher schneller zu füllen. Danach folgt die normale Erhaltungsdosis. Die Ladephase beschleunigt nur den Effekt; ohne sie sind die Speicher nach etwa drei bis vier Wochen ebenfalls voll.

Kreatin-Monohydrat ist die am besten untersuchte und preiswerteste Form — teurere Varianten (z. B. Kre-Alkalyn, Kreatin-HCl) bieten keinen belegten Zusatznutzen. Es empfiehlt sich, auf ein Produkt mit Qualitätssiegel wie Creapure zu achten.`,
        contentEN: `Use is straightforward. The most common approach is a daily maintenance dose of 3–5 g creatine monohydrate. Timing plays no significant role — what matters is daily, ongoing intake, since the stores fill over time.

Optionally there is a loading phase: about 20 g per day (split into four portions) over five to seven days to fill the stores faster. This is followed by the normal maintenance dose. The loading phase only speeds up the effect; without it, the stores are also full after about three to four weeks.

Creatine monohydrate is the most studied and cheapest form — more expensive variants (e.g. Kre-Alkalyn, creatine HCl) offer no proven additional benefit. It is advisable to choose a product with a quality seal such as Creapure.`,
      },
      {
        titleDE: 'Sicherheit und Mythen',
        titleEN: 'Safety and myths',
        contentDE: `Kreatin gehört zu den sichersten Supplementen überhaupt. Langzeitstudien über mehrere Jahre zeigen keine schädlichen Effekte bei gesunden Menschen. Der hartnäckige Mythos, Kreatin schade den Nieren, ist bei nierengesunden Personen nicht belegt (Kreider et al., 2017). Bei bestehender Nierenerkrankung sollte die Einnahme jedoch ärztlich abgeklärt werden.

Ein weiterer Mythos ist, Kreatin führe zu "Wassereinlagerungen" im Sinne eines aufgeschwemmten Aussehens. Tatsächlich zieht Kreatin Wasser in die Muskelzellen, was eher zu einem volleren Muskel als zu sichtbarer Wassereinlagerung führt. Ein leichter Anstieg des Körpergewichts zu Beginn ist normal und gewünscht.

Auch Haarausfall wird gelegentlich mit Kreatin in Verbindung gebracht, basierend auf einer einzelnen Studie. Diese Verbindung ist wissenschaftlich nicht belegt. Insgesamt ist Kreatin gut verträglich; manche Menschen reagieren bei sehr hohen Einzeldosen mit Magen-Darm-Beschwerden, was sich durch kleinere Portionen vermeiden lässt.`,
        contentEN: `Creatine is among the safest supplements of all. Long-term studies over several years show no harmful effects in healthy people. The persistent myth that creatine harms the kidneys is not supported in people with healthy kidneys (Kreider et al., 2017). With existing kidney disease, however, intake should be clarified with a doctor.

Another myth is that creatine causes "water retention" in the sense of a bloated appearance. In fact creatine draws water into the muscle cells, which leads to a fuller muscle rather than visible water retention. A slight increase in body weight at the start is normal and desired.

Hair loss is also occasionally linked to creatine, based on a single study. This connection is not scientifically established. Overall creatine is well tolerated; some people react to very high single doses with gastrointestinal discomfort, which can be avoided with smaller portions.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Kreatin ist das wirksamste und am besten belegte Supplement für Kraft und Muskelaufbau — sicher, günstig und einfach anzuwenden. 3–5 g Monohydrat täglich, dauerhaft, sind alles, was du brauchst.

Der Zeitpunkt ist egal, eine Ladephase optional. Wähle reines Monohydrat; teurere Formen bringen keinen Mehrwert. Die verbreiteten Warnungen vor Nieren- oder Haarschäden sind bei gesunden Menschen nicht belegt.

Wenn du nur ein einziges Supplement zur Leistungssteigerung wählen würdest, wäre Kreatin die naheliegendste Wahl. Bei gesundheitlichen Vorerkrankungen ist wie immer eine ärztliche Rücksprache sinnvoll.`,
        contentEN: `Creatine is the most effective and best-evidenced supplement for strength and muscle building — safe, cheap and easy to use. 3–5 g of monohydrate daily, ongoing, is all you need.

Timing is irrelevant, a loading phase optional. Choose pure monohydrate; more expensive forms add no value. The common warnings about kidney or hair damage are not supported in healthy people.

If you were to choose only a single supplement for performance, creatine would be the obvious choice. With pre-existing health conditions, as always, medical consultation is sensible.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. PROTEINPULVER / WHEY
  // ─────────────────────────────────────────────
  {
    id: 'protein_powder',
    category: 'grundlagen',
    nameDE: 'Proteinpulver (Whey & Co.)',
    nameEN: 'Protein Powder (Whey & Co.)',
    summaryDE: 'Proteinpulver ist kein Wundermittel, sondern eine bequeme, günstige Proteinquelle. Es hilft, den Tagesbedarf zu decken, wenn das über normale Lebensmittel schwerfällt — nicht mehr und nicht weniger.',
    summaryEN: 'Protein powder is not a miracle product but a convenient, inexpensive protein source. It helps meet daily needs when doing so through regular food is difficult — no more and no less.',
    quickDE: [
      { label: 'Zweck', text: 'Praktische Ergänzung, um das Tages-Proteinziel zu erreichen — kein Muss.' },
      { label: 'Auswahl', text: 'Whey (schnell), Casein (langsam), pflanzlich (vegan). Alle wirksam bei ausreichender Menge.' },
    ],
    quickEN: [
      { label: 'Purpose', text: 'A practical addition to reach the daily protein target — not a must.' },
      { label: 'Choice', text: 'Whey (fast), casein (slow), plant-based (vegan). All effective at adequate amounts.' },
    ],
    references: [
      { authors: 'Morton, R.W. et al.', year: 2018, title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults',
        source: 'British Journal of Sports Medicine 52(6):376–384', url: 'https://pubmed.ncbi.nlm.nih.gov/29462923/' },
    ],
    sections: [
      {
        titleDE: 'Was Proteinpulver ist',
        titleEN: 'What protein powder is',
        contentDE: `Proteinpulver ist konzentriertes Nahrungsprotein, meist aus Milch (Whey und Casein), aber auch aus pflanzlichen Quellen wie Erbse, Reis oder Soja. Es liefert die gleichen Aminosäuren wie proteinreiche Lebensmittel, nur in praktischer, schnell zubereiteter Form.

Der wichtigste Punkt zuerst: Proteinpulver ist kein "anaboles" Wundermittel. Es ist schlicht Nahrung — eine bequeme Möglichkeit, den Proteinbedarf zu decken. Wer sein Tagesziel problemlos über Fleisch, Fisch, Eier, Milchprodukte und Hülsenfrüchte erreicht, braucht kein Pulver.

Sein Wert liegt in der Praktikabilität: Ein Shake ist schnell zubereitet, gut portionierbar, günstig pro Gramm Protein und leicht mitzunehmen. Für Menschen mit hohem Proteinbedarf, wenig Zeit oder wenig Appetit ist es ein sinnvolles Hilfsmittel.`,
        contentEN: `Protein powder is concentrated dietary protein, usually from milk (whey and casein), but also from plant sources such as pea, rice or soy. It provides the same amino acids as protein-rich foods, just in a convenient, quickly prepared form.

The most important point first: protein powder is not an "anabolic" miracle. It is simply food — a convenient way to meet protein needs. Those who easily reach their daily target through meat, fish, eggs, dairy and legumes do not need powder.

Its value lies in practicality: a shake is quickly made, easy to portion, cheap per gram of protein and easy to carry. For people with high protein needs, little time or little appetite it is a useful aid.`,
      },
      {
        titleDE: 'Whey, Casein und pflanzliche Proteine',
        titleEN: 'Whey, casein and plant proteins',
        contentDE: `Whey (Molkenprotein) ist die beliebteste Form. Es wird schnell verdaut, ist reich an der Aminosäure Leucin und regt die Muskelproteinsynthese stark an. Es gibt es als Konzentrat (günstig, etwas Laktose), Isolat (reiner, laktosearm) und Hydrolysat (vorverdaut, teurer).

Casein ist ebenfalls ein Milchprotein, wird aber langsam verdaut und gibt Aminosäuren über mehrere Stunden ab. Manche nutzen es vor längeren Essenspausen, etwa vor dem Schlafen. In der Praxis ist der Unterschied zu Whey für die meisten aber gering.

Pflanzliche Proteine (Erbse, Reis, Soja) sind für vegan lebende Menschen die Wahl. Einzelne pflanzliche Quellen können in bestimmten Aminosäuren limitiert sein, gute Produkte kombinieren daher mehrere Quellen. Bei ausreichender Gesamtmenge sind pflanzliche Pulver für den Muskelaufbau ähnlich wirksam wie Whey.`,
        contentEN: `Whey protein is the most popular form. It is digested quickly, rich in the amino acid leucine and strongly stimulates muscle protein synthesis. It comes as concentrate (cheap, some lactose), isolate (purer, low lactose) and hydrolysate (pre-digested, more expensive).

Casein is also a milk protein but is digested slowly and releases amino acids over several hours. Some use it before longer gaps between meals, such as before sleep. In practice the difference from whey is small for most people, however.

Plant proteins (pea, rice, soy) are the choice for people living vegan. Individual plant sources can be limited in certain amino acids, so good products combine several sources. At an adequate total amount, plant powders are similarly effective for muscle building as whey.`,
      },
      {
        titleDE: 'Sinnvoller Einsatz',
        titleEN: 'Sensible use',
        contentDE: `Proteinpulver eignet sich immer dann, wenn eine schnelle, hochwertige Proteinquelle praktisch ist: nach dem Training, als Zwischenmahlzeit, im Müsli oder um an vollen Tagen das Proteinziel zu erreichen. Ein bis zwei Portionen pro Tag sind für die meisten sinnvoll.

Es sollte jedoch normale Lebensmittel ergänzen, nicht ersetzen. Vollwertige Proteinquellen liefern zusätzlich Mikronährstoffe, sättigen besser und sind Teil einer ausgewogenen Ernährung. Ein Shake ist ein Werkzeug für den Alltag, kein Grundnahrungsmittel.

Bei der Produktwahl lohnt ein Blick auf die Zutatenliste: möglichst wenig Zusätze, ein guter Proteingehalt pro Portion und idealerweise ein unabhängiges Prüfsiegel. Sehr günstige Pulver enthalten manchmal viel Füllstoff oder Zucker.`,
        contentEN: `Protein powder is useful whenever a fast, high-quality protein source is practical: after training, as a snack, in cereal or to hit the protein target on busy days. One to two servings per day are sensible for most people.

It should, however, complement regular foods, not replace them. Whole protein sources additionally provide micronutrients, satiate better and are part of a balanced diet. A shake is a tool for everyday life, not a staple food.

When choosing a product, it is worth looking at the ingredient list: as few additives as possible, a good protein content per serving and ideally an independent testing seal. Very cheap powders sometimes contain a lot of filler or sugar.`,
      },
      {
        titleDE: 'Sicherheit und Einordnung',
        titleEN: 'Safety and perspective',
        contentDE: `Für gesunde Menschen ist Proteinpulver sicher. Die Sorge, hohe Proteinzufuhr über Pulver schade den Nieren, gilt — wie bei Protein allgemein — nur bei bestehender Nierenerkrankung. Bei Laktoseintoleranz sind Isolat oder pflanzliche Varianten verträglicher.

Ein Qualitätsaspekt ist die Reinheit. Da Nahrungsergänzungsmittel weniger streng reguliert sind als Arzneimittel, lohnen sich Produkte mit unabhängiger Laborprüfung (z. B. auf Schwermetalle oder Dopingsubstanzen), besonders für Wettkampfsportler.

Zusammengefasst ist Proteinpulver ein praktisches, kein essenzielles Produkt. Es ersetzt keine gute Ernährung, kann aber helfen, den Proteinbedarf bequem und günstig zu decken. Bei gesundheitlichen Fragen ist eine ärztliche oder ernährungsberaterische Rücksprache sinnvoll.`,
        contentEN: `For healthy people, protein powder is safe. The concern that high protein intake via powder harms the kidneys applies — as with protein in general — only with existing kidney disease. With lactose intolerance, isolate or plant variants are better tolerated.

One quality aspect is purity. Since supplements are less strictly regulated than medicines, products with independent lab testing (e.g. for heavy metals or doping substances) are worthwhile, especially for competitive athletes.

In summary, protein powder is a practical, not an essential product. It does not replace a good diet but can help meet protein needs conveniently and cheaply. For health questions, consultation with a doctor or dietitian is sensible.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. KOFFEIN
  // ─────────────────────────────────────────────
  {
    id: 'caffeine',
    category: 'leistung',
    nameDE: 'Koffein',
    nameEN: 'Caffeine',
    summaryDE: 'Koffein ist eines der wirksamsten legalen Mittel zur Leistungssteigerung. Es reduziert das Ermüdungsempfinden, steigert Fokus und Kraftausdauer. Die Wirkung ist gut belegt, die Dosierung sollte aber individuell und maßvoll erfolgen.',
    summaryEN: 'Caffeine is one of the most effective legal performance enhancers. It reduces perceived fatigue and boosts focus and muscular endurance. The effect is well-evidenced, but dosing should be individual and moderate.',
    quickDE: [
      { label: 'Dosierung', text: 'Ca. 3–6 mg pro kg Körpergewicht, 30–60 min vor dem Training.' },
      { label: 'Achtung', text: 'Schlaf schützen (nicht spät am Tag), Toleranz beachten, individuell verträglich testen.' },
    ],
    quickEN: [
      { label: 'Dosage', text: 'About 3–6 mg per kg body weight, 30–60 min before training.' },
      { label: 'Caution', text: 'Protect sleep (not late in the day), mind tolerance, test individual tolerability.' },
    ],
    references: [
      { authors: 'Grgic, J. et al.', year: 2020, title: 'Wake up and smell the coffee: caffeine supplementation and exercise performance — an umbrella review of 21 published meta-analyses',
        source: 'British Journal of Sports Medicine 54(11):681–688', url: 'https://pubmed.ncbi.nlm.nih.gov/30926628/' },
    ],
    sections: [
      {
        titleDE: 'Wie Koffein wirkt',
        titleEN: 'How caffeine works',
        contentDE: `Koffein ist ein Stimulans, das hauptsächlich über die Blockade von Adenosin-Rezeptoren im Gehirn wirkt. Adenosin ist ein Botenstoff, der Müdigkeit signalisiert; indem Koffein seine Andockstellen besetzt, wird das Ermüdungsgefühl gedämpft und die wahrgenommene Anstrengung sinkt.

Das Ergebnis ist ein Zustand höherer Wachheit, besseren Fokus und größerer Bereitschaft zur Anstrengung. Für das Training bedeutet das: Belastungen fühlen sich leichter an, was zu mehr Wiederholungen, mehr Ausdauer und oft besserer Leistung führt.

Koffein ist eines der wenigen Supplemente mit einem klar belegten, unmittelbar spürbaren Effekt. Es wird aus Kaffee, Tee, Energy-Drinks oder als reines Koffein (Tabletten, Pulver) aufgenommen und innerhalb von etwa 30–60 Minuten wirksam.`,
        contentEN: `Caffeine is a stimulant that works mainly by blocking adenosine receptors in the brain. Adenosine is a messenger that signals fatigue; by occupying its docking sites, caffeine dampens the feeling of fatigue and lowers perceived exertion.

The result is a state of greater alertness, better focus and increased willingness to exert effort. For training this means: efforts feel easier, which leads to more repetitions, more endurance and often better performance.

Caffeine is one of the few supplements with a clearly proven, immediately noticeable effect. It is consumed from coffee, tea, energy drinks or as pure caffeine (tablets, powder) and becomes effective within about 30–60 minutes.`,
      },
      {
        titleDE: 'Die Studienlage',
        titleEN: 'The evidence',
        contentDE: `Koffein gehört zu den am besten untersuchten leistungssteigernden Substanzen. Eine umfassende Übersichtsarbeit (Grgic et al., 2020, British Journal of Sports Medicine) bestätigt positive Effekte auf Kraft, Muskelausdauer, Sprints und Ausdauerleistung über viele Sportarten hinweg.

Die Effektgrößen sind moderat, aber verlässlich. Besonders bei ermüdenden, wiederholten Belastungen und in Situationen mit Schlafmangel oder Motivationstief kann Koffein einen spürbaren Unterschied machen. Auch die kognitive Leistung — Reaktionszeit, Aufmerksamkeit — profitiert.

Die wirksame Dosis liegt in den meisten Studien bei etwa 3–6 mg pro Kilogramm Körpergewicht. Höhere Dosen bringen selten mehr Leistung, erhöhen aber Nebenwirkungen wie Nervosität, Herzrasen und Schlafstörungen.`,
        contentEN: `Caffeine is among the best-studied performance-enhancing substances. A comprehensive review (Grgic et al., 2020, British Journal of Sports Medicine) confirms positive effects on strength, muscular endurance, sprints and endurance performance across many sports.

The effect sizes are moderate but reliable. Especially in fatiguing, repeated efforts and in situations with sleep deprivation or low motivation, caffeine can make a noticeable difference. Cognitive performance — reaction time, attention — also benefits.

The effective dose in most studies is about 3–6 mg per kilogram of body weight. Higher doses rarely provide more performance but increase side effects such as nervousness, palpitations and sleep disturbances.`,
      },
      {
        titleDE: 'Dosierung und Timing',
        titleEN: 'Dosage and timing',
        contentDE: `Für die Leistung im Training haben sich etwa 3–6 mg pro Kilogramm Körpergewicht bewährt, eingenommen rund 30–60 Minuten vor der Belastung. Für eine 75 kg schwere Person entspricht das grob 225–450 mg — zum Vergleich enthält eine Tasse Filterkaffee etwa 80–120 mg.

Wer empfindlich reagiert oder wenig gewohnt ist, sollte mit einer niedrigen Dosis beginnen und die Verträglichkeit testen. Individuelle Unterschiede sind groß: Manche vertragen viel, andere reagieren schon auf geringe Mengen mit Unruhe oder Herzklopfen.

Ein wichtiger Punkt ist der Zeitpunkt im Tagesverlauf. Koffein hat eine Halbwertszeit von etwa fünf bis sechs Stunden — spätes Training mit hoher Dosis kann den Schlaf empfindlich stören. Als Faustregel gilt, in den letzten sechs bis acht Stunden vor dem Schlafen auf größere Mengen zu verzichten.`,
        contentEN: `For training performance, about 3–6 mg per kilogram of body weight has proven effective, taken around 30–60 minutes before the effort. For a 75 kg person this corresponds to roughly 225–450 mg — for comparison, a cup of filter coffee contains about 80–120 mg.

Those who are sensitive or unaccustomed should start with a low dose and test tolerability. Individual differences are large: some tolerate a lot, others react to small amounts with restlessness or palpitations.

An important point is the time of day. Caffeine has a half-life of about five to six hours — late training with a high dose can significantly disturb sleep. As a rule of thumb, avoid larger amounts in the last six to eight hours before sleep.`,
      },
      {
        titleDE: 'Toleranz, Nebenwirkungen und Sicherheit',
        titleEN: 'Tolerance, side effects and safety',
        contentDE: `Bei regelmäßigem Konsum entwickelt der Körper eine gewisse Toleranz — die Wirkung lässt nach. Manche legen daher gezielte Pausen ein oder heben sich höhere Dosen für wichtige Trainingseinheiten auf. Ein kompletter Verzicht ist aber nicht nötig; moderater regelmäßiger Konsum bleibt wirksam.

Zu den möglichen Nebenwirkungen zählen Nervosität, Herzrasen, Magenbeschwerden, Angstgefühle und Schlafstörungen — meist bei zu hoher Dosis. Bei bestimmten Herz-Kreislauf-Erkrankungen, in der Schwangerschaft oder bei Angststörungen ist Vorsicht geboten und ärztliche Rücksprache ratsam.

Insgesamt gilt Koffein in moderaten Mengen (bis etwa 400 mg pro Tag für gesunde Erwachsene) als sicher. Sehr hohe Einzeldosen, besonders aus reinem Koffeinpulver, können gefährlich sein — hier ist genaues Abmessen entscheidend. Wie bei allen Substanzen gilt: die individuell verträgliche, wirksame Dosis finden, nicht die maximale.`,
        contentEN: `With regular consumption the body develops a certain tolerance — the effect diminishes. Some therefore take deliberate breaks or save higher doses for important training sessions. Complete abstinence is not necessary, however; moderate regular consumption remains effective.

Possible side effects include nervousness, palpitations, stomach upset, anxiety and sleep disturbances — usually with too high a dose. With certain cardiovascular diseases, during pregnancy or with anxiety disorders, caution is advised and medical consultation is recommended.

Overall caffeine in moderate amounts (up to about 400 mg per day for healthy adults) is considered safe. Very high single doses, especially from pure caffeine powder, can be dangerous — precise measuring is crucial here. As with all substances: find the individually tolerable, effective dose, not the maximum.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Koffein ist ein wirksames, gut belegtes und legales Mittel zur Leistungssteigerung. Es senkt das Ermüdungsempfinden und verbessert Fokus, Kraftausdauer und Ausdauerleistung.

Eine Dosis von etwa 3–6 mg pro Kilogramm Körpergewicht 30–60 Minuten vor dem Training ist üblich. Beginne niedrig, teste deine Verträglichkeit und schütze deinen Schlaf, indem du spätes Koffein meidest.

Koffein ist sicher in moderaten Mengen, kann aber bei Überdosierung oder Vorerkrankungen Probleme machen. Nutze es gezielt als Werkzeug, nicht als tägliche Höchstdosis — und ziehe bei gesundheitlichen Fragen einen Arzt hinzu.`,
        contentEN: `Caffeine is an effective, well-evidenced and legal performance enhancer. It lowers perceived fatigue and improves focus, muscular endurance and endurance performance.

A dose of about 3–6 mg per kilogram of body weight 30–60 minutes before training is common. Start low, test your tolerability and protect your sleep by avoiding late caffeine.

Caffeine is safe in moderate amounts but can cause problems with overdosing or pre-existing conditions. Use it deliberately as a tool, not as a daily maximum dose — and consult a doctor for health questions.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. OMEGA-3
  // ─────────────────────────────────────────────
  {
    id: 'omega3',
    category: 'gesundheit',
    nameDE: 'Omega-3-Fettsäuren',
    nameEN: 'Omega-3 Fatty Acids',
    summaryDE: 'Omega-3-Fettsäuren (EPA und DHA) sind essenziell und wirken entzündungsregulierend. Viele Menschen sind unterversorgt. Fetter Fisch ist die beste Quelle; ein Supplement kann sinnvoll sein, wenn kaum Fisch gegessen wird.',
    summaryEN: 'Omega-3 fatty acids (EPA and DHA) are essential and have anti-inflammatory effects. Many people are undersupplied. Oily fish is the best source; a supplement can be sensible if little fish is eaten.',
    quickDE: [
      { label: 'Quelle & Dosis', text: 'Fetter Fisch 2–3×/Woche; als Supplement oft ~1–2 g EPA+DHA täglich.' },
      { label: 'Nutzen', text: 'Herz-Kreislauf- und Gehirngesundheit, Entzündungsregulation; für Veganer via Algenöl.' },
    ],
    quickEN: [
      { label: 'Source & dose', text: 'Oily fish 2–3×/week; as a supplement often ~1–2 g EPA+DHA daily.' },
      { label: 'Benefit', text: 'Cardiovascular and brain health, inflammation regulation; for vegans via algae oil.' },
    ],
    references: [
      { authors: 'National Institutes of Health, Office of Dietary Supplements', title: 'Omega-3 Fatty Acids — Fact Sheet for Health Professionals',
        source: 'NIH ODS', url: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/' },
    ],
    sections: [
      {
        titleDE: 'Was Omega-3-Fettsäuren sind',
        titleEN: 'What omega-3 fatty acids are',
        contentDE: `Omega-3-Fettsäuren sind eine Gruppe mehrfach ungesättigter Fette, die der Körper nicht selbst herstellen kann und daher über die Nahrung aufnehmen muss. Die wichtigsten sind EPA (Eicosapentaensäure) und DHA (Docosahexaensäure), die vor allem in fettem Fisch vorkommen, sowie ALA (Alpha-Linolensäure) aus pflanzlichen Quellen.

EPA und DHA sind Bausteine der Zellmembranen und Vorstufen von Botenstoffen, die Entzündungsprozesse regulieren. DHA ist zudem ein wichtiger Bestandteil des Gehirns und der Netzhaut. Diese Fettsäuren sind damit für Herz, Gehirn und das Immunsystem von Bedeutung.

Das Problem: Die moderne Ernährung liefert oft viel Omega-6 (aus verarbeiteten Pflanzenölen), aber wenig Omega-3. Dieses Ungleichgewicht sowie ein geringer Fischkonsum führen dazu, dass viele Menschen unterversorgt sind.`,
        contentEN: `Omega-3 fatty acids are a group of polyunsaturated fats the body cannot produce itself and must therefore obtain from food. The most important are EPA (eicosapentaenoic acid) and DHA (docosahexaenoic acid), found mainly in oily fish, as well as ALA (alpha-linolenic acid) from plant sources.

EPA and DHA are building blocks of cell membranes and precursors of messengers that regulate inflammatory processes. DHA is also an important component of the brain and retina. These fatty acids are therefore significant for the heart, brain and immune system.

The problem: the modern diet often provides a lot of omega-6 (from processed vegetable oils) but little omega-3. This imbalance, together with low fish consumption, means many people are undersupplied.`,
      },
      {
        titleDE: 'Gesundheitliche Bedeutung',
        titleEN: 'Health significance',
        contentDE: `Die Forschung zu Omega-3 ist umfangreich. Am besten belegt ist der Nutzen für die Herz-Kreislauf-Gesundheit: EPA und DHA können die Triglyceridwerte im Blut senken und werden mit einem günstigeren kardiovaskulären Risikoprofil in Verbindung gebracht. Fachgesellschaften empfehlen regelmäßigen Konsum von fettem Fisch.

Darüber hinaus wird eine entzündungsregulierende Wirkung untersucht, die für Gelenkgesundheit und Regeneration nach dem Training relevant sein könnte. Auch für die Gehirnfunktion und die Stimmung gibt es Hinweise auf positive Effekte, wobei die Datenlage hier weniger eindeutig ist.

Wichtig ist die Unterscheidung zwischen belegten und übertriebenen Versprechen. Omega-3 ist kein Allheilmittel, aber eine ausreichende Versorgung ist ein sinnvoller Baustein einer gesunden Ernährung — besonders für Menschen, die selten Fisch essen.`,
        contentEN: `Research on omega-3 is extensive. The best-established benefit is for cardiovascular health: EPA and DHA can lower blood triglyceride levels and are associated with a more favourable cardiovascular risk profile. Professional bodies recommend regular consumption of oily fish.

Beyond this, an anti-inflammatory effect is being studied that could be relevant for joint health and recovery after training. There are also indications of positive effects on brain function and mood, although the evidence here is less clear.

It is important to distinguish between proven and exaggerated claims. Omega-3 is not a cure-all, but adequate supply is a sensible building block of a healthy diet — especially for people who rarely eat fish.`,
      },
      {
        titleDE: 'Quellen und Supplementierung',
        titleEN: 'Sources and supplementation',
        contentDE: `Die beste Quelle für EPA und DHA ist fetter Kaltwasserfisch: Lachs, Makrele, Hering, Sardinen. Zwei bis drei Portionen pro Woche decken den Bedarf der meisten Menschen. Pflanzliche Quellen wie Leinsamen oder Walnüsse liefern ALA, das der Körper jedoch nur zu einem kleinen Teil in EPA und DHA umwandelt.

Wer wenig oder keinen Fisch isst, kann ein Supplement erwägen. Fischöl- oder Algenöl-Kapseln liefern EPA und DHA direkt; Algenöl ist die pflanzliche, vegane Alternative. Typische Supplement-Dosen liegen bei etwa 1–2 g EPA plus DHA pro Tag, wobei der genaue Bedarf individuell ist.

Bei der Produktwahl ist Qualität wichtig: Achte auf den tatsächlichen EPA-/DHA-Gehalt (nicht nur die Gesamtmenge Fischöl), auf Frische (ranziges Öl ist unerwünscht) und idealerweise auf Reinheitsprüfungen. Der Omega-3-Index im Blut kann die Versorgung objektiv anzeigen.`,
        contentEN: `The best source of EPA and DHA is oily cold-water fish: salmon, mackerel, herring, sardines. Two to three portions per week cover the needs of most people. Plant sources such as flaxseed or walnuts provide ALA, which the body only converts to EPA and DHA to a small extent, however.

Those who eat little or no fish can consider a supplement. Fish oil or algae oil capsules provide EPA and DHA directly; algae oil is the plant-based, vegan alternative. Typical supplement doses are about 1–2 g EPA plus DHA per day, though the exact requirement is individual.

When choosing a product, quality matters: check the actual EPA/DHA content (not just the total amount of fish oil), freshness (rancid oil is undesirable) and ideally purity testing. The omega-3 index in the blood can objectively indicate supply.`,
      },
      {
        titleDE: 'Sicherheit und Einordnung',
        titleEN: 'Safety and perspective',
        contentDE: `Omega-3-Supplemente gelten in üblichen Dosen als sicher und gut verträglich. Mögliche Nebenwirkungen sind ein fischiger Nachgeschmack oder leichte Magen-Darm-Beschwerden. In sehr hohen Dosen kann Omega-3 die Blutgerinnung beeinflussen — wer blutverdünnende Medikamente nimmt oder Operationen plant, sollte die Einnahme ärztlich abklären.

Wie bei allen Supplementen gilt: Sie ergänzen eine gute Ernährung, ersetzen sie aber nicht. Wer regelmäßig fetten Fisch isst, braucht in der Regel kein zusätzliches Öl. Das Supplement ist vor allem für Fisch-Abstinenzler und Veganer (Algenöl) sinnvoll.

Bei gesundheitlichen Fragen, bestehenden Erkrankungen oder Medikamenteneinnahme ist eine ärztliche Rücksprache ratsam. Ein Bluttest des Omega-3-Index kann helfen, den individuellen Bedarf gezielt einzuschätzen, statt pauschal zu supplementieren.`,
        contentEN: `Omega-3 supplements are considered safe and well tolerated at usual doses. Possible side effects are a fishy aftertaste or mild gastrointestinal discomfort. At very high doses, omega-3 can affect blood clotting — those taking blood-thinning medication or planning surgery should clarify intake with a doctor.

As with all supplements: they complement a good diet but do not replace it. Those who regularly eat oily fish usually do not need additional oil. The supplement is mainly sensible for fish abstainers and vegans (algae oil).

For health questions, existing conditions or medication use, medical consultation is advisable. A blood test of the omega-3 index can help assess individual needs specifically instead of supplementing across the board.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. VITAMIN D
  // ─────────────────────────────────────────────
  {
    id: 'vitamin_d',
    category: 'gesundheit',
    nameDE: 'Vitamin D',
    nameEN: 'Vitamin D',
    summaryDE: 'Vitamin D ist wichtig für Knochen, Muskeln und Immunsystem. Es wird vor allem über Sonnenlicht gebildet, weshalb in sonnenarmen Monaten ein Mangel häufig ist. Eine Supplementierung ist dann oft sinnvoll — idealerweise nach einem Bluttest.',
    summaryEN: 'Vitamin D is important for bones, muscles and the immune system. It is formed mainly through sunlight, which is why deficiency is common in low-sun months. Supplementation is then often sensible — ideally after a blood test.',
    quickDE: [
      { label: 'Quelle', text: 'Sonnenlicht (Haut), wenig aus Nahrung. Im Winter oft Supplement nötig.' },
      { label: 'Praxis', text: 'Bei Mangel häufig ~1000–2000 IE/Tag; Dosis idealerweise per Bluttest steuern.' },
    ],
    quickEN: [
      { label: 'Source', text: 'Sunlight (skin), little from food. In winter a supplement is often needed.' },
      { label: 'Practice', text: 'With deficiency often ~1000–2000 IU/day; guide dose via blood test ideally.' },
    ],
    references: [
      { authors: 'National Institutes of Health, Office of Dietary Supplements', title: 'Vitamin D — Fact Sheet for Health Professionals',
        source: 'NIH ODS', url: 'https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/' },
      { authors: 'Ross, A.C. et al.', year: 2011, title: 'The 2011 Report on Dietary Reference Intakes for Calcium and Vitamin D from the Institute of Medicine: What Clinicians Need to Know',
        source: 'Journal of Clinical Endocrinology & Metabolism 96(1):53–58', url: 'https://academic.oup.com/jcem/article-abstract/96/1/53/2833225' },
    ],
    sections: [
      {
        titleDE: 'Warum Vitamin D besonders ist',
        titleEN: 'Why vitamin D is special',
        contentDE: `Vitamin D nimmt eine Sonderrolle unter den Vitaminen ein, weil der Körper es unter Einwirkung von Sonnenlicht (UV-B-Strahlung) selbst in der Haut bilden kann. Genau genommen wirkt es eher wie ein Hormon: Es reguliert die Aufnahme von Kalzium und Phosphat und ist damit zentral für gesunde Knochen und Zähne.

Über die Knochengesundheit hinaus hat Vitamin D Funktionen in der Muskulatur und im Immunsystem. Rezeptoren dafür finden sich in vielen Geweben des Körpers, was seine breite Bedeutung erklärt. Ein ausgeprägter Mangel kann zu Muskelschwäche, Knochenproblemen und erhöhter Infektanfälligkeit beitragen.

Das Besondere und zugleich Problematische: Da die Hauptquelle das Sonnenlicht ist, hängt die Versorgung stark von Wohnort, Jahreszeit, Hautfarbe und Lebensstil ab. In vielen Regionen reicht die Sonneneinstrahlung im Winter nicht aus, um genug Vitamin D zu bilden.`,
        contentEN: `Vitamin D plays a special role among vitamins because the body can produce it itself in the skin under the influence of sunlight (UV-B radiation). Strictly speaking it acts more like a hormone: it regulates the absorption of calcium and phosphate and is thus central to healthy bones and teeth.

Beyond bone health, vitamin D has functions in the muscles and the immune system. Receptors for it are found in many tissues of the body, which explains its broad significance. A pronounced deficiency can contribute to muscle weakness, bone problems and increased susceptibility to infection.

What is special and at the same time problematic: since the main source is sunlight, supply depends heavily on location, season, skin colour and lifestyle. In many regions, sunlight in winter is not enough to produce sufficient vitamin D.`,
      },
      {
        titleDE: 'Mangel ist weit verbreitet',
        titleEN: 'Deficiency is widespread',
        contentDE: `Vitamin-D-Mangel gehört zu den häufigsten Nährstoffdefiziten weltweit, besonders in nördlichen Breiten und in den Wintermonaten. Menschen, die viel drinnen arbeiten, dunklere Haut haben, sich verhüllen oder älter sind, haben ein erhöhtes Risiko, da ihre körpereigene Bildung eingeschränkt ist.

Über die Nahrung allein ist der Bedarf schwer zu decken. Nur wenige Lebensmittel enthalten nennenswerte Mengen — vor allem fetter Fisch, Eigelb und angereicherte Produkte. Diese reichen meist nicht aus, um einen Mangel auszugleichen, wenn die Sonnenbildung fehlt.

Der Vitamin-D-Status lässt sich über einen einfachen Bluttest (25-OH-Vitamin-D) bestimmen. Das ist der zuverlässigste Weg, um zu wissen, ob und wie viel supplementiert werden sollte — statt zu raten.`,
        contentEN: `Vitamin D deficiency is one of the most common nutrient deficiencies worldwide, especially at northern latitudes and in the winter months. People who work indoors a lot, have darker skin, cover up or are older have an increased risk, as their own production is limited.

Through food alone the requirement is hard to meet. Only a few foods contain significant amounts — mainly oily fish, egg yolk and fortified products. These are usually not enough to compensate for a deficiency when sun-based production is lacking.

Vitamin D status can be determined via a simple blood test (25-OH vitamin D). This is the most reliable way to know whether and how much to supplement — rather than guessing.`,
      },
      {
        titleDE: 'Supplementierung in der Praxis',
        titleEN: 'Supplementation in practice',
        contentDE: `Wenn ein Mangel besteht oder in den sonnenarmen Monaten wenig Eigenbildung möglich ist, ist eine Supplementierung sinnvoll. Häufig werden Erhaltungsdosen im Bereich von etwa 1000–2000 IE (Internationale Einheiten) pro Tag genannt, wobei der individuelle Bedarf stark schwanken kann.

Am besten wird die Dosis über den Blutwert gesteuert: Ein Test zeigt den Ausgangswert, nach einigen Wochen bis Monaten der Einnahme lässt sich der Erfolg überprüfen und die Dosis anpassen. So vermeidet man sowohl Unterversorgung als auch Überdosierung.

Vitamin D3 (Cholecalciferol) ist die bevorzugte Form. Da es fettlöslich ist, wird es am besten zu einer fetthaltigen Mahlzeit aufgenommen. Oft wird es mit Vitamin K2 kombiniert, das den Kalziumstoffwechsel unterstützt — die Evidenz dafür ist vielversprechend, aber nicht abschließend.`,
        contentEN: `If a deficiency exists or little self-production is possible in the low-sun months, supplementation is sensible. Maintenance doses in the range of about 1000–2000 IU (International Units) per day are often cited, though individual needs can vary widely.

The dose is best guided by the blood value: a test shows the baseline, and after a few weeks to months of intake the success can be checked and the dose adjusted. This avoids both undersupply and overdosing.

Vitamin D3 (cholecalciferol) is the preferred form. As it is fat-soluble, it is best absorbed with a meal containing fat. It is often combined with vitamin K2, which supports calcium metabolism — the evidence for this is promising but not conclusive.`,
      },
      {
        titleDE: 'Sicherheit und ärztliche Begleitung',
        titleEN: 'Safety and medical guidance',
        contentDE: `Vitamin D ist fettlöslich und kann sich im Körper anreichern — anders als wasserlösliche Vitamine. Sehr hohe Dosen über lange Zeit können zu einem gefährlichen Kalziumüberschuss im Blut führen. "Mehr ist besser" gilt hier ausdrücklich nicht; extreme Hochdosen ohne ärztliche Kontrolle sind zu vermeiden.

Für die meisten Menschen sind moderate Erhaltungsdosen sicher. Wer jedoch hohe Dosen erwägt, Vorerkrankungen hat oder Medikamente einnimmt, sollte dies ärztlich begleiten lassen. Der Bluttest ist auch hier das entscheidende Werkzeug, um im sicheren und wirksamen Bereich zu bleiben.

Zusammengefasst ist Vitamin D eines der wenigen Supplemente, das für viele Menschen — besonders im Winter — tatsächlich einen realen Nutzen hat. Der klügste Weg ist, den Status zu messen und die Einnahme daran auszurichten, statt pauschal hoch zu dosieren.`,
        contentEN: `Vitamin D is fat-soluble and can accumulate in the body — unlike water-soluble vitamins. Very high doses over a long time can lead to a dangerous excess of calcium in the blood. "More is better" explicitly does not apply here; extreme high doses without medical supervision should be avoided.

For most people, moderate maintenance doses are safe. Those who consider high doses, have pre-existing conditions or take medication should, however, do so under medical guidance. The blood test is again the decisive tool for staying in the safe and effective range.

In summary, vitamin D is one of the few supplements that actually has a real benefit for many people — especially in winter. The wisest approach is to measure the status and align intake with it, rather than dosing high across the board.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. MAGNESIUM
  // ─────────────────────────────────────────────
  {
    id: 'magnesium',
    category: 'gesundheit',
    nameDE: 'Magnesium',
    nameEN: 'Magnesium',
    summaryDE: 'Magnesium ist an über 300 enzymatischen Prozessen beteiligt, darunter Muskel- und Nervenfunktion, Energiestoffwechsel und Schlaf. Ein leichter Mangel ist verbreitet. Über die Nahrung deckbar, bei Bedarf gut supplementierbar.',
    summaryEN: 'Magnesium is involved in over 300 enzymatic processes, including muscle and nerve function, energy metabolism and sleep. A mild deficiency is common. Coverable through food, easily supplemented if needed.',
    quickDE: [
      { label: 'Funktion', text: 'Muskel- & Nervenfunktion, Energiestoffwechsel, Schlaf, Knochen.' },
      { label: 'Quellen', text: 'Nüsse, Samen, Vollkorn, Hülsenfrüchte, grünes Gemüse; Supplement bei Bedarf.' },
    ],
    quickEN: [
      { label: 'Function', text: 'Muscle & nerve function, energy metabolism, sleep, bones.' },
      { label: 'Sources', text: 'Nuts, seeds, whole grains, legumes, green vegetables; supplement if needed.' },
    ],
    references: [
      { authors: 'National Institutes of Health, Office of Dietary Supplements', title: 'Magnesium — Fact Sheet for Health Professionals',
        source: 'NIH ODS', url: 'https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/' },
    ],
    sections: [
      {
        titleDE: 'Die Rolle von Magnesium',
        titleEN: 'The role of magnesium',
        contentDE: `Magnesium ist ein essenzieller Mineralstoff und Kofaktor für mehr als 300 Enzymreaktionen im Körper. Es ist an der Energiegewinnung (ATP-Stoffwechsel), der Muskel- und Nervenfunktion, der Proteinsynthese, der Regulierung des Blutzuckers und der Knochengesundheit beteiligt.

Für sportlich aktive Menschen ist Magnesium besonders relevant, weil es bei der Muskelkontraktion und -entspannung sowie im Energiestoffwechsel eine zentrale Rolle spielt. Ein Mangel kann sich unter anderem in Muskelkrämpfen, Müdigkeit, Reizbarkeit und schlechterem Schlaf äußern.

Über Schweiß und erhöhten Stoffwechsel kann intensives Training den Magnesiumbedarf leicht erhöhen. Gleichzeitig ist die Zufuhr bei vielen Menschen grenzwertig, da stark verarbeitete Ernährung wenig Magnesium enthält.`,
        contentEN: `Magnesium is an essential mineral and cofactor for more than 300 enzyme reactions in the body. It is involved in energy production (ATP metabolism), muscle and nerve function, protein synthesis, blood sugar regulation and bone health.

For physically active people, magnesium is particularly relevant because it plays a central role in muscle contraction and relaxation as well as in energy metabolism. A deficiency can manifest in muscle cramps, fatigue, irritability and poorer sleep, among other things.

Through sweat and increased metabolism, intense training can slightly raise the magnesium requirement. At the same time, intake is borderline in many people, as heavily processed diets contain little magnesium.`,
      },
      {
        titleDE: 'Mangel und Bedarf',
        titleEN: 'Deficiency and requirement',
        contentDE: `Ein ausgeprägter Magnesiummangel ist bei gesunder Ernährung selten, ein leichter Mangel oder eine grenzwertige Versorgung jedoch relativ verbreitet — besonders bei einseitiger, stark verarbeiteter Kost. Der tägliche Bedarf liegt für Erwachsene bei etwa 300–400 mg, je nach Geschlecht und Alter.

Da Magnesium in vielen unverarbeiteten Lebensmitteln steckt, lässt sich der Bedarf grundsätzlich gut über die Ernährung decken. Gute Quellen sind Nüsse und Samen (z. B. Kürbiskerne, Mandeln), Vollkornprodukte, Hülsenfrüchte, grünes Blattgemüse und dunkle Schokolade.

Ein Magnesiummangel lässt sich im Blut nur eingeschränkt erfassen, da der Großteil des Magnesiums in Zellen und Knochen gespeichert ist. Symptome wie häufige Krämpfe, Erschöpfung oder Schlafprobleme können — neben anderen Ursachen — Hinweise sein und sollten bei Verdacht ärztlich abgeklärt werden.`,
        contentEN: `A pronounced magnesium deficiency is rare with a healthy diet, but a mild deficiency or borderline supply is relatively common — especially with a one-sided, heavily processed diet. The daily requirement for adults is about 300–400 mg, depending on sex and age.

Since magnesium is found in many unprocessed foods, the requirement can generally be well covered through diet. Good sources are nuts and seeds (e.g. pumpkin seeds, almonds), whole grains, legumes, green leafy vegetables and dark chocolate.

A magnesium deficiency can only be measured to a limited extent in the blood, as most magnesium is stored in cells and bones. Symptoms such as frequent cramps, exhaustion or sleep problems can — alongside other causes — be indicators and should be clarified by a doctor if suspected.`,
      },
      {
        titleDE: 'Supplementierung',
        titleEN: 'Supplementation',
        contentDE: `Wenn die Zufuhr über die Ernährung nicht ausreicht oder ein erhöhter Bedarf besteht, kann ein Magnesium-Supplement sinnvoll sein. Die Form spielt eine Rolle für die Verträglichkeit: Gut verträglich und gut aufnehmbar sind organische Verbindungen wie Magnesiumcitrat, -glycinat oder -malat. Magnesiumoxid ist günstig, wird aber schlechter aufgenommen und kann abführend wirken.

Übliche ergänzende Dosen liegen bei etwa 200–400 mg elementarem Magnesium pro Tag, oft abends eingenommen, da Magnesium eine entspannende Wirkung haben und den Schlaf unterstützen kann. Höhere Dosen können zu weichem Stuhl oder Durchfall führen — ein Zeichen, die Menge zu reduzieren.

Die Evidenz für Magnesium-Supplemente ist am stärksten bei nachgewiesenem Mangel. Bei ausreichend versorgten Menschen ist der Zusatznutzen begrenzt. Wie immer gilt: Lebensmittel zuerst, Supplement als gezielte Ergänzung.`,
        contentEN: `If dietary intake is insufficient or there is an increased need, a magnesium supplement can be sensible. The form matters for tolerability: well tolerated and well absorbed are organic compounds such as magnesium citrate, glycinate or malate. Magnesium oxide is cheap but poorly absorbed and can have a laxative effect.

Common supplementary doses are about 200–400 mg of elemental magnesium per day, often taken in the evening, as magnesium can have a relaxing effect and support sleep. Higher doses can cause soft stools or diarrhoea — a sign to reduce the amount.

The evidence for magnesium supplements is strongest with a proven deficiency. In adequately supplied people the additional benefit is limited. As always: food first, supplement as a targeted addition.`,
      },
      {
        titleDE: 'Sicherheit und Zusammenfassung',
        titleEN: 'Safety and summary',
        contentDE: `Magnesium aus der Nahrung ist unbedenklich; überschüssiges Magnesium scheidet der Körper normalerweise über die Nieren aus. Bei Supplementen ist die häufigste Nebenwirkung ein abführender Effekt bei zu hoher Dosis. Menschen mit eingeschränkter Nierenfunktion sollten Magnesium-Supplemente nur nach ärztlicher Rücksprache einnehmen, da die Ausscheidung beeinträchtigt sein kann.

Zusammengefasst ist Magnesium ein wichtiger Mineralstoff mit breiter Bedeutung für Muskeln, Nerven, Energiestoffwechsel und Schlaf. Ein leichter Mangel ist verbreitet, lässt sich aber gut über eine vollwertige Ernährung mit Nüssen, Samen, Vollkorn und grünem Gemüse beheben.

Ein Supplement ist eine sinnvolle Option bei erhöhtem Bedarf, unzureichender Zufuhr oder entsprechenden Symptomen — idealerweise in gut verträglicher Form und in Absprache mit einem Arzt, wenn Vorerkrankungen bestehen.`,
        contentEN: `Magnesium from food is harmless; the body normally excretes excess magnesium via the kidneys. With supplements, the most common side effect is a laxative effect at too high a dose. People with impaired kidney function should only take magnesium supplements after medical consultation, as excretion may be impaired.

In summary, magnesium is an important mineral with broad significance for muscles, nerves, energy metabolism and sleep. A mild deficiency is common but can be well remedied through a whole-food diet with nuts, seeds, whole grains and green vegetables.

A supplement is a sensible option with increased need, insufficient intake or corresponding symptoms — ideally in a well-tolerated form and in consultation with a doctor if pre-existing conditions exist.`,
      },
    ],
  },
];

export default supplementsTopics;
