// Trainings-Wissen — Wissensbibliothek-Block "Training"
// Jedes Thema ist ein E-Book mit mehreren Kapiteln (DE + EN), mit
// wissenschaftlichen Referenzen. Struktur wie dietsData/peptidesData,
// gerendert über die generische KnowledgePage.

export const trainingCategories = [
  { id: 'grundlagen', nameDE: 'Grundlagen', nameEN: 'Fundamentals' },
  { id: 'hypertrophie', nameDE: 'Muskelaufbau', nameEN: 'Muscle Growth' },
  { id: 'programmierung', nameDE: 'Programmierung', nameEN: 'Programming' },
  { id: 'regeneration', nameDE: 'Regeneration', nameEN: 'Recovery' },
];

export const trainingTopics = [
  // ─────────────────────────────────────────────
  // 1. PROGRESSIVE ÜBERLASTUNG
  // ─────────────────────────────────────────────
  {
    id: 'progressive_overload',
    category: 'grundlagen',
    nameDE: 'Progressive Überlastung',
    nameEN: 'Progressive Overload',
    summaryDE: 'Das wichtigste Prinzip für langfristigen Fortschritt: Der Trainingsreiz muss über die Zeit systematisch gesteigert werden, damit sich der Körper weiter anpasst. Ohne progressive Steigerung stagnieren Kraft und Muskelaufbau.',
    summaryEN: 'The single most important principle for long-term progress: the training stimulus must be systematically increased over time so the body keeps adapting. Without progression, strength and muscle growth stall.',
    quickDE: [
      { label: 'Kernidee', text: 'Nach und nach mehr Gewicht, Wiederholungen, Sätze oder bessere Technik — der Reiz muss steigen.' },
      { label: 'Für wen', text: 'Alle Trainingsniveaus. Anfänger progredieren schnell, Fortgeschrittene brauchen kleinere, geplantere Schritte.' },
    ],
    quickEN: [
      { label: 'Core idea', text: 'Gradually more weight, reps, sets or better technique — the stimulus must keep rising.' },
      { label: 'For whom', text: 'All levels. Beginners progress fast; advanced lifters need smaller, more planned increments.' },
    ],
    references: [
      { authors: 'American College of Sports Medicine', year: 2009, title: 'Position Stand: Progression Models in Resistance Training for Healthy Adults',
        source: 'Medicine & Science in Sports & Exercise 41(3):687–708', url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/' },
      { authors: 'DeLorme, T.L.', year: 1945, title: 'Restoration of muscle power by heavy-resistance exercises',
        source: 'Journal of Bone and Joint Surgery 27(4):645–667' },
    ],
    sections: [
      {
        titleDE: 'Was ist progressive Überlastung?',
        titleEN: 'What is progressive overload?',
        contentDE: `Progressive Überlastung beschreibt das schrittweise Erhöhen der Anforderungen an den Körper während des Trainings. Der Grundgedanke geht auf das Prinzip der Superkompensation zurück: Ein Trainingsreiz stört das biologische Gleichgewicht, der Körper repariert sich und passt sich an ein etwas höheres Leistungsniveau an. Bleibt der Reiz danach gleich, gibt es keinen Grund für weitere Anpassung — der Fortschritt stoppt.

Der Begriff stammt ursprünglich aus der Rehabilitation: Thomas DeLorme entwickelte in den 1940er-Jahren das Konzept der "progressive resistance exercise" für die Wiederherstellung von Muskelkraft bei verletzten Soldaten (DeLorme, 1945, Journal of Bone and Joint Surgery). Seither ist es zum Fundament jedes seriösen Kraft- und Muskelaufbautrainings geworden.

Wichtig ist die Erkenntnis, dass "mehr Gewicht" nur eine von mehreren Möglichkeiten der Progression ist. Der Reiz kann auch über mehr Wiederholungen, mehr Sätze, kürzere Pausen, größere Bewegungsamplitude oder langsamere, kontrollierte Ausführung gesteigert werden.`,
        contentEN: `Progressive overload describes the gradual increase of the demands placed on the body during training. The underlying idea comes from the principle of supercompensation: a training stimulus disrupts biological equilibrium, the body repairs itself and adapts to a slightly higher performance level. If the stimulus then stays the same, there is no reason for further adaptation — progress stops.

The term originally comes from rehabilitation: Thomas DeLorme developed the concept of "progressive resistance exercise" in the 1940s to restore muscle strength in injured soldiers (DeLorme, 1945, Journal of Bone and Joint Surgery). Since then it has become the foundation of every serious strength and muscle-building program.

It is important to understand that "more weight" is only one of several ways to progress. The stimulus can also be increased through more repetitions, more sets, shorter rest periods, a larger range of motion, or slower, more controlled execution.`,
      },
      {
        titleDE: 'Wissenschaftlicher Hintergrund',
        titleEN: 'Scientific background',
        contentDE: `Die Notwendigkeit progressiver Steigerung ist einer der am besten belegten Grundsätze der Trainingswissenschaft. Das Positionspapier des American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) nennt progressive Überlastung ausdrücklich als Voraussetzung für kontinuierliche Kraft- und Hypertrophiezuwächse und empfiehlt eine planmäßige Steigerung von Last und Volumen.

Eine Übersichtsarbeit von Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) zeigt, dass sowohl schwere als auch moderate Lasten Muskelwachstum auslösen können — entscheidend ist, dass die Sätze nahe an die muskuläre Erschöpfung geführt und der Reiz über die Zeit gesteigert wird. Das unterstreicht, dass Progression flexibel gestaltet werden kann.

Trainingsanpassungen folgen zudem dem SAID-Prinzip ("Specific Adaptation to Imposed Demands"): Der Körper passt sich genau an die Belastung an, die auf ihn wirkt. Steigt die Belastung nicht, bleibt auch die Anpassung aus — ein Zusammenhang, der in der Sportphysiologie seit Jahrzehnten konsistent bestätigt wird.`,
        contentEN: `The need for progressive increases is one of the best-supported principles in exercise science. The position stand of the American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) explicitly names progressive overload as a prerequisite for continued strength and hypertrophy gains and recommends planned increases in load and volume.

A review by Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) shows that both heavy and moderate loads can trigger muscle growth — what matters is that sets are taken close to muscular fatigue and that the stimulus increases over time. This underlines that progression can be designed flexibly.

Training adaptations also follow the SAID principle ("Specific Adaptation to Imposed Demands"): the body adapts precisely to the demands placed on it. If the demand does not rise, the adaptation does not occur either — a relationship consistently confirmed in exercise physiology for decades.`,
      },
      {
        titleDE: 'Methoden der Progression',
        titleEN: 'Methods of progression',
        contentDE: `Es gibt mehrere praktikable Wege, den Trainingsreiz zu steigern. Am bekanntesten ist die Laststeigerung: mehr Gewicht auf der Stange. Bei den meisten Übungen sind Sprünge von 2,5 kg (Oberkörper) bzw. 5 kg (Unterkörper) sinnvoll, sobald die obere Wiederholungszahl sauber erreicht wird.

Die Doppelprogression ist eine besonders anfängerfreundliche Methode: Man wählt einen Wiederholungsbereich (z. B. 8–12). Zuerst arbeitet man sich innerhalb dieses Bereichs nach oben (mehr Wiederholungen bei gleichem Gewicht), und sobald die obere Grenze in allen Sätzen erreicht ist, erhöht man das Gewicht und beginnt wieder am unteren Ende.

Weitere Möglichkeiten sind: mehr Sätze pro Muskelgruppe (Volumensteigerung), kürzere Pausenzeiten bei gleicher Leistung, eine größere Bewegungsamplitude oder eine kontrolliertere, langsamere exzentrische Phase. Wichtig ist, immer nur eine Variable gleichzeitig zu verändern, um den Fortschritt sauber nachvollziehen zu können.`,
        contentEN: `There are several practical ways to increase the training stimulus. The best known is load progression: more weight on the bar. For most exercises, increments of 2.5 kg (upper body) or 5 kg (lower body) make sense once the top of the rep range is reached with clean form.

Double progression is a particularly beginner-friendly method: you pick a rep range (e.g. 8–12). First you work your way up within that range (more reps at the same weight), and once you hit the top of the range in all sets, you increase the weight and start again at the bottom.

Other options include: more sets per muscle group (volume progression), shorter rest periods at the same performance, a larger range of motion, or a more controlled, slower eccentric phase. It is important to change only one variable at a time so that progress can be tracked cleanly.`,
      },
      {
        titleDE: 'Häufige Fehler',
        titleEN: 'Common mistakes',
        contentDE: `Der häufigste Fehler ist zu schnelle Progression: Wer das Gewicht erhöht, bevor die Technik sauber sitzt, riskiert Verletzungen und trainiert oft nicht mehr den Zielmuskel. Gewicht sollte erst steigen, wenn alle geplanten Wiederholungen mit guter Form geschafft werden.

Ein zweiter Fehler ist der Glaube, Progression müsse in jeder Einheit stattfinden. Gerade Fortgeschrittene können nicht wöchentlich mehr Gewicht auflegen — hier zählt der Trend über Wochen und Monate, nicht der einzelne Trainingstag. Kleine Schwankungen durch Schlaf, Stress oder Ernährung sind normal.

Der dritte Fehler ist fehlende Dokumentation. Ohne Aufzeichnung von Gewicht, Wiederholungen und Sätzen lässt sich Progression kaum steuern — man weiß schlicht nicht, ob man besser geworden ist. Ein Trainingslog ist daher das wichtigste Werkzeug für langfristigen Fortschritt.`,
        contentEN: `The most common mistake is progressing too quickly: increasing the weight before technique is solid risks injury and often stops training the target muscle. Weight should only rise once all planned repetitions can be completed with good form.

A second mistake is believing progression must happen in every session. Advanced lifters in particular cannot add weight every week — what matters is the trend over weeks and months, not the single training day. Small fluctuations due to sleep, stress or nutrition are normal.

The third mistake is a lack of documentation. Without recording weight, repetitions and sets, progression is almost impossible to manage — you simply do not know whether you have improved. A training log is therefore the most important tool for long-term progress.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Progressive Überlastung ist das Grundgesetz des Trainings: Ohne steigenden Reiz keine anhaltende Anpassung. Sie lässt sich über Gewicht, Wiederholungen, Sätze, Pausen, Bewegungsamplitude oder Ausführungstempo umsetzen — nicht nur über mehr Gewicht.

Für Anfänger funktioniert die Doppelprogression im Bereich 8–12 Wiederholungen hervorragend. Fortgeschrittene sollten in längeren Zyklen denken und ihre Progression planen, statt sie zu erzwingen. Entscheidend ist in jedem Fall, den Fortschritt zu dokumentieren und Technik vor Gewicht zu stellen.

Wer geduldig und systematisch progrediert, baut über Jahre kontinuierlich Kraft und Muskulatur auf — genau das ist der Kern eines erfolgreichen Trainings.`,
        contentEN: `Progressive overload is the fundamental law of training: without a rising stimulus there is no lasting adaptation. It can be applied through weight, repetitions, sets, rest, range of motion or tempo — not just through more weight.

For beginners, double progression in the 8–12 rep range works excellently. Advanced lifters should think in longer cycles and plan their progression rather than force it. In any case, the key is to document progress and to prioritise technique over weight.

Those who progress patiently and systematically build strength and muscle continuously over the years — which is exactly the core of successful training.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. TRAININGSVOLUMEN & FREQUENZ
  // ─────────────────────────────────────────────
  {
    id: 'volume_frequency',
    category: 'programmierung',
    nameDE: 'Trainingsvolumen & Frequenz',
    nameEN: 'Training Volume & Frequency',
    summaryDE: 'Volumen (Sätze × Wiederholungen × Gewicht) ist der stärkste Stellhebel für Muskelaufbau. Frequenz beschreibt, wie oft ein Muskel pro Woche trainiert wird. Beide zusammen bestimmen, wie viel Reiz ein Muskel erhält — und wie gut er sich erholen kann.',
    summaryEN: 'Volume (sets × reps × weight) is the strongest lever for muscle growth. Frequency describes how often a muscle is trained per week. Together they determine how much stimulus a muscle receives — and how well it can recover.',
    quickDE: [
      { label: 'Richtwert Volumen', text: 'Ca. 10–20 harte Sätze pro Muskelgruppe und Woche für die meisten Trainierenden.' },
      { label: 'Richtwert Frequenz', text: 'Jeden Muskel 2× pro Woche trainieren ist meist besser als 1×, bei gleichem Wochenvolumen.' },
    ],
    quickEN: [
      { label: 'Volume guideline', text: 'About 10–20 hard sets per muscle group per week for most trainees.' },
      { label: 'Frequency guideline', text: 'Training each muscle 2×/week usually beats 1× at equal weekly volume.' },
    ],
    references: [
      { authors: 'Schoenfeld, B.J., Ogborn, D. & Krieger, J.W.', year: 2017, title: 'Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis',
        source: 'Journal of Sports Sciences 35(11):1073–1082', url: 'https://pubmed.ncbi.nlm.nih.gov/27805470/' },
      { authors: 'American College of Sports Medicine', year: 2009, title: 'Position Stand: Progression Models in Resistance Training for Healthy Adults',
        source: 'Medicine & Science in Sports & Exercise 41(3):687–708', url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/' },
    ],
    sections: [
      {
        titleDE: 'Was bedeutet Volumen?',
        titleEN: 'What does volume mean?',
        contentDE: `Trainingsvolumen ist das Maß für die Gesamtmenge der geleisteten Arbeit. Am gebräuchlichsten ist die Zählung der "harten Sätze" pro Muskelgruppe und Woche — also Sätze, die nahe an das muskuläre Versagen geführt werden (etwa 0–4 Wiederholungen im Reservoir). Genauer lässt sich Volumen als Sätze × Wiederholungen × Gewicht (Tonnage) berechnen, doch die Satzzählung hat sich in der Praxis als robuster Näherungswert etabliert.

Volumen gilt als der wichtigste einzelne Faktor für Muskelwachstum. Die Metaanalyse von Schoenfeld, Ogborn & Krieger (2017, Journal of Sports Sciences) fand eine klare Dosis-Wirkungs-Beziehung: Mehr wöchentliche Sätze führten zu mehr Hypertrophie — bis zu einem Punkt, ab dem der Zusatznutzen abnimmt und die Erholung leidet.

Für die meisten Trainierenden liegt der sinnvolle Bereich bei etwa 10–20 harten Sätzen pro Muskelgruppe und Woche. Anfänger profitieren schon vom unteren Ende, Fortgeschrittene brauchen oft mehr, um weiter Reize zu setzen.`,
        contentEN: `Training volume is the measure of the total amount of work performed. The most common approach counts "hard sets" per muscle group per week — sets taken close to muscular failure (roughly 0–4 reps in reserve). More precisely, volume can be calculated as sets × reps × weight (tonnage), but set counting has proven to be a robust practical approximation.

Volume is regarded as the single most important factor for muscle growth. The meta-analysis by Schoenfeld, Ogborn & Krieger (2017, Journal of Sports Sciences) found a clear dose-response relationship: more weekly sets led to more hypertrophy — up to a point beyond which the added benefit diminishes and recovery suffers.

For most trainees the sensible range is about 10–20 hard sets per muscle group per week. Beginners benefit even from the lower end, while advanced lifters often need more to keep providing a stimulus.`,
      },
      {
        titleDE: 'Was bedeutet Frequenz?',
        titleEN: 'What does frequency mean?',
        contentDE: `Frequenz beschreibt, wie oft ein Muskel innerhalb einer Woche trainiert wird. Ob ein Muskel 1×, 2× oder 3× pro Woche belastet wird, verändert nicht zwangsläufig das Wochenvolumen — es verteilt es nur anders. Wer 16 Sätze Brust auf zwei Einheiten aufteilt, macht 8 Sätze je Einheit statt 16 in einer.

Die Metaanalyse von Schoenfeld, Grgic & Krieger (2019, Journal of Sports Sciences) zeigt: Bei gleichem Wochenvolumen führt eine höhere Frequenz tendenziell zu etwas mehr Muskelwachstum, wahrscheinlich weil die Muskelproteinsynthese nach dem Training nur etwa 24–48 Stunden erhöht bleibt und häufigere Reize sie öfter anstoßen.

In der Praxis bedeutet das: Jeden Muskel zweimal pro Woche zu trainieren ist für die meisten ein guter Kompromiss aus Reizsetzung, Erholung und Trainingsqualität. Sehr hohe Frequenzen bringen darüber hinaus kaum Zusatznutzen, solange das Volumen stimmt.`,
        contentEN: `Frequency describes how often a muscle is trained within a week. Whether a muscle is worked 1×, 2× or 3× per week does not necessarily change weekly volume — it just distributes it differently. Splitting 16 sets of chest across two sessions means 8 sets per session instead of 16 in one.

The meta-analysis by Schoenfeld, Grgic & Krieger (2019, Journal of Sports Sciences) shows that at equal weekly volume, a higher frequency tends to produce slightly more muscle growth, probably because muscle protein synthesis stays elevated only about 24–48 hours after training and more frequent stimuli trigger it more often.

In practice this means: training each muscle twice per week is a good compromise for most people between stimulus, recovery and training quality. Very high frequencies add little further benefit as long as volume is adequate.`,
      },
      {
        titleDE: 'Volumen richtig steuern',
        titleEN: 'Managing volume correctly',
        contentDE: `Volumen sollte nicht statisch, sondern individuell und dynamisch gehandhabt werden. Ein sinnvoller Einstieg ist das untere Ende des Bereichs (etwa 10 Sätze pro Muskel und Woche). Von dort lässt sich das Volumen über Wochen langsam steigern, solange Erholung, Schlaf und Leistung mitspielen.

Das Konzept des "Maximum Recoverable Volume" (MRV) beschreibt die Obergrenze an Volumen, von der sich ein Trainierender noch erholen kann. Wird sie überschritten, sinkt die Leistung und das Verletzungsrisiko steigt. Anzeichen für zu viel Volumen sind anhaltende Leistungsabfälle, schlechter Schlaf, dauerhafte Muskelkater und Motivationsverlust.

Weniger fortgeschrittene Muskelgruppen oder Schwachstellen können mit etwas mehr Volumen priorisiert werden, während bereits gut entwickelte Bereiche mit einem Erhaltungsvolumen (oft 6–10 Sätze) auskommen. So lässt sich die begrenzte Erholungskapazität gezielt einsetzen.`,
        contentEN: `Volume should be handled individually and dynamically rather than kept static. A sensible starting point is the lower end of the range (around 10 sets per muscle per week). From there, volume can be raised slowly over weeks as long as recovery, sleep and performance keep up.

The concept of "Maximum Recoverable Volume" (MRV) describes the upper limit of volume a trainee can still recover from. Exceeding it lowers performance and raises injury risk. Signs of too much volume include persistent performance drops, poor sleep, constant soreness and loss of motivation.

Lagging muscle groups or weak points can be prioritised with slightly more volume, while already well-developed areas can be maintained with a maintenance volume (often 6–10 sets). This directs the limited recovery capacity where it is most useful.`,
      },
      {
        titleDE: 'Häufige Fehler',
        titleEN: 'Common mistakes',
        contentDE: `Der klassische Anfängerfehler ist zu viel Volumen zu früh. Mehr ist nicht automatisch besser — jenseits der individuellen Erholungsgrenze bremst zusätzliches Volumen den Fortschritt sogar. Es ist klüger, mit weniger zu starten und langsam zu steigern.

Ein zweiter Fehler ist das Zählen von "Junk Volume": Sätze weit weg vom Muskelversagen oder mit schlechter Technik tragen kaum zum Wachstum bei, kosten aber Erholung. Nur Sätze, die den Zielmuskel wirklich fordern, zählen als effektives Volumen.

Drittens wird Frequenz oft mit Volumen verwechselt. Ein Muskel öfter zu trainieren bringt nur dann mehr, wenn das Wochenvolumen ausreicht. Sechs Einheiten pro Woche mit jeweils zu geringem Reiz sind schlechter als drei gut gesetzte Einheiten.`,
        contentEN: `The classic beginner mistake is too much volume too soon. More is not automatically better — beyond the individual recovery limit, extra volume actually slows progress. It is wiser to start with less and increase slowly.

A second mistake is counting "junk volume": sets far from failure or with poor technique contribute little to growth but still cost recovery. Only sets that genuinely challenge the target muscle count as effective volume.

Third, frequency is often confused with volume. Training a muscle more often only helps if weekly volume is adequate. Six sessions per week each with too little stimulus are worse than three well-placed sessions.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Volumen ist der stärkste Stellhebel für Muskelaufbau; ein Bereich von etwa 10–20 harten Sätzen pro Muskel und Woche passt für die meisten. Frequenz verteilt dieses Volumen — zweimal pro Woche pro Muskel ist ein bewährter Standard.

Beginne am unteren Ende des Volumenbereichs und steigere langsam, während du Erholung und Leistung beobachtest. Zähle nur effektive, fordernde Sätze und passe das Volumen einzelner Muskelgruppen an deine Ziele an.

Volumen und Frequenz sind keine starren Regeln, sondern Werkzeuge, die du an deine Erholungsfähigkeit anpasst. Wer beide bewusst steuert, trainiert effizienter und vermeidet sowohl Unter- als auch Überlastung.`,
        contentEN: `Volume is the strongest lever for muscle growth; a range of about 10–20 hard sets per muscle per week suits most people. Frequency distributes that volume — twice per week per muscle is a proven standard.

Start at the lower end of the volume range and increase slowly while monitoring recovery and performance. Count only effective, challenging sets and adjust the volume of individual muscle groups to your goals.

Volume and frequency are not rigid rules but tools you adapt to your recovery capacity. Managing both deliberately makes training more efficient and avoids both under- and over-training.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. HYPERTROPHIE: WIE MUSKELN WACHSEN
  // ─────────────────────────────────────────────
  {
    id: 'hypertrophy_basics',
    category: 'hypertrophie',
    nameDE: 'Wie Muskeln wachsen',
    nameEN: 'How Muscles Grow',
    summaryDE: 'Muskelwachstum (Hypertrophie) entsteht, wenn Training die Muskelproteinsynthese über den Abbau hebt und dieser Reiz regelmäßig wiederholt wird. Der wichtigste Treiber ist mechanische Spannung durch anspruchsvolle Sätze — kombiniert mit ausreichend Protein und Erholung.',
    summaryEN: 'Muscle growth (hypertrophy) occurs when training raises muscle protein synthesis above breakdown and this stimulus is repeated regularly. The main driver is mechanical tension from challenging sets — combined with enough protein and recovery.',
    quickDE: [
      { label: 'Haupttreiber', text: 'Mechanische Spannung: Sätze nahe an die Erschöpfung mit kontrollierter Technik.' },
      { label: 'Voraussetzungen', text: 'Ausreichend Protein (ca. 1,6–2,2 g/kg), Kalorien im Erhaltungs- bis leichten Überschuss, Schlaf.' },
    ],
    quickEN: [
      { label: 'Main driver', text: 'Mechanical tension: sets close to failure with controlled technique.' },
      { label: 'Requirements', text: 'Enough protein (~1.6–2.2 g/kg), maintenance to slight surplus calories, sleep.' },
    ],
    references: [
      { authors: 'Schoenfeld, B.J., Ogborn, D. & Krieger, J.W.', year: 2017, title: 'Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis',
        source: 'Journal of Sports Sciences 35(11):1073–1082', url: 'https://pubmed.ncbi.nlm.nih.gov/27805470/' },
      { authors: 'Damas, F. et al.', year: 2016, title: 'Resistance training-induced changes in integrated myofibrillar protein synthesis are related to hypertrophy only after attenuation of muscle damage',
        source: 'The Journal of Physiology 594(18):5209–5222' },
    ],
    sections: [
      {
        titleDE: 'Die Biologie des Muskelwachstums',
        titleEN: 'The biology of muscle growth',
        contentDE: `Muskeln bestehen aus Muskelfasern, die kontraktile Proteine (Aktin und Myosin) enthalten. Wachstum bedeutet in erster Linie, dass diese Fasern dicker werden, weil mehr kontraktile Proteine eingelagert werden — man spricht von myofibrillärer Hypertrophie. Der Körper baut ständig Muskelprotein auf (Muskelproteinsynthese) und ab (Muskelproteinabbau); Wachstum entsteht nur, wenn der Aufbau über einen längeren Zeitraum überwiegt.

Training ist der Auslöser: Ein fordernder Satz erhöht die Muskelproteinsynthese für etwa 24–48 Stunden (Damas et al., 2016, Journal of Physiology). Wird dieser Reiz regelmäßig gesetzt und mit ausreichend Baustoffen (Protein) und Energie versorgt, akkumuliert sich das Wachstum über Wochen und Monate.

Auch die Satellitenzellen spielen eine Rolle: Diese muskelspezifischen Stammzellen werden durch Training aktiviert und helfen, geschädigte Fasern zu reparieren und neue Zellkerne beizusteuern, was langfristig größeres Wachstum ermöglicht.`,
        contentEN: `Muscles consist of muscle fibres containing contractile proteins (actin and myosin). Growth primarily means these fibres become thicker because more contractile protein is deposited — this is called myofibrillar hypertrophy. The body constantly builds muscle protein (muscle protein synthesis) and breaks it down (muscle protein breakdown); growth occurs only when synthesis prevails over an extended period.

Training is the trigger: a challenging set raises muscle protein synthesis for about 24–48 hours (Damas et al., 2016, Journal of Physiology). If this stimulus is applied regularly and supplied with enough building blocks (protein) and energy, growth accumulates over weeks and months.

Satellite cells also play a role: these muscle-specific stem cells are activated by training and help repair damaged fibres and donate new nuclei, enabling greater growth in the long term.`,
      },
      {
        titleDE: 'Die drei Mechanismen der Hypertrophie',
        titleEN: 'The three mechanisms of hypertrophy',
        contentDE: `Brad Schoenfeld beschrieb in einer viel zitierten Arbeit (2010, Journal of Strength and Conditioning Research) drei mögliche Mechanismen des Muskelwachstums: mechanische Spannung, metabolischer Stress und Muskelschädigung.

Mechanische Spannung gilt heute als der wichtigste Treiber. Sie entsteht, wenn Muskeln gegen einen hohen Widerstand über eine volle Bewegungsamplitude arbeiten — besonders in den letzten, schweren Wiederholungen eines Satzes. Diese Spannung wird von den Muskelzellen als Signal wahrgenommen ("Mechanotransduktion") und startet die Wachstumsprozesse.

Metabolischer Stress (das "Brennen" durch Stoffwechselprodukte bei höheren Wiederholungen) und leichte Muskelschädigung können unterstützend wirken, sind aber weniger entscheidend als lange angenommen. Neuere Forschung deutet darauf hin, dass ausgeprägte Muskelschädigung eher ein Nebenprodukt als eine Voraussetzung für Wachstum ist.`,
        contentEN: `In a widely cited paper, Brad Schoenfeld (2010, Journal of Strength and Conditioning Research) described three possible mechanisms of muscle growth: mechanical tension, metabolic stress and muscle damage.

Mechanical tension is now regarded as the most important driver. It arises when muscles work against a high resistance over a full range of motion — especially in the last, hard repetitions of a set. This tension is sensed by muscle cells as a signal ("mechanotransduction") and initiates growth processes.

Metabolic stress (the "burn" from metabolic by-products at higher reps) and mild muscle damage can play a supporting role but are less decisive than long assumed. Recent research suggests that pronounced muscle damage is more a by-product than a prerequisite of growth.`,
      },
      {
        titleDE: 'Wie man den Wachstumsreiz optimiert',
        titleEN: 'How to optimise the growth stimulus',
        contentDE: `Um mechanische Spannung zu maximieren, sollten Sätze nahe an die muskuläre Erschöpfung geführt werden — meist mit 0–4 Wiederholungen im Reservoir. Der genaue Wiederholungsbereich ist dabei erstaunlich flexibel: Wachstum ist über einen weiten Bereich von etwa 5 bis 30 Wiederholungen pro Satz möglich, solange der Satz hart genug ist (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).

Für die Praxis hat sich ein moderater Bereich von etwa 6–15 Wiederholungen bewährt, weil er einen guten Kompromiss zwischen Spannung, Volumen und Ermüdung bietet. Sehr niedrige Wiederholungen belasten Gelenke und Nerven stärker, sehr hohe Wiederholungen sind unangenehm und erschöpfend.

Wichtig ist eine kontrollierte Ausführung mit voller Bewegungsamplitude. Besonders die gedehnte Position eines Muskels unter Last scheint ein starker Wachstumsreiz zu sein — tiefe, vollständige Wiederholungen sind daher meist wirksamer als kurze, abgehackte.`,
        contentEN: `To maximise mechanical tension, sets should be taken close to muscular failure — usually with 0–4 reps in reserve. The exact rep range is surprisingly flexible: growth is possible across a wide range of about 5 to 30 reps per set, as long as the set is hard enough (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).

In practice a moderate range of about 6–15 reps has proven effective because it offers a good compromise between tension, volume and fatigue. Very low reps stress joints and the nervous system more, while very high reps are uncomfortable and exhausting.

Controlled execution through a full range of motion is important. The stretched position of a muscle under load in particular appears to be a strong growth stimulus — deep, complete repetitions are therefore usually more effective than short, choppy ones.`,
      },
      {
        titleDE: 'Ernährung und Erholung',
        titleEN: 'Nutrition and recovery',
        contentDE: `Ohne ausreichende Bausteine kann kein Muskel wachsen. Protein liefert die Aminosäuren für die Muskelproteinsynthese; die Forschung empfiehlt für Trainierende etwa 1,6–2,2 g Protein pro Kilogramm Körpergewicht und Tag (Morton et al., 2018, British Journal of Sports Medicine). Eine Verteilung auf mehrere Mahlzeiten mit je 20–40 g Protein ist sinnvoll.

Energie ist ebenfalls entscheidend. Muskelaufbau gelingt am besten im Kalorienerhalt oder in einem leichten Überschuss (etwa +5–15 %). In einem starken Defizit ist Wachstum möglich, aber deutlich langsamer — vor allem Anfänger und Übergewichtige können anfangs gleichzeitig Fett verlieren und Muskeln aufbauen.

Schlaf ist der am meisten unterschätzte Faktor. Während des Tiefschlafs laufen Regeneration und hormonelle Anpassungen ab. Chronischer Schlafmangel senkt nachweislich die Muskelproteinsynthese und erhöht den Muskelabbau — sieben bis neun Stunden pro Nacht sind eine sinnvolle Zielgröße.`,
        contentEN: `No muscle can grow without adequate building blocks. Protein supplies the amino acids for muscle protein synthesis; research recommends about 1.6–2.2 g protein per kilogram of body weight per day for trainees (Morton et al., 2018, British Journal of Sports Medicine). Spreading it across several meals of 20–40 g protein each is sensible.

Energy is equally important. Muscle gain works best at maintenance or in a slight surplus (about +5–15%). Growth is possible in a strong deficit but noticeably slower — beginners and people with higher body fat in particular can initially lose fat and build muscle at the same time.

Sleep is the most underrated factor. Recovery and hormonal adaptations take place during deep sleep. Chronic sleep deprivation demonstrably lowers muscle protein synthesis and increases muscle breakdown — seven to nine hours per night is a sensible target.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Muskeln wachsen, wenn ein fordernder Trainingsreiz die Muskelproteinsynthese über den Abbau hebt und dieser Prozess regelmäßig wiederholt wird. Der wichtigste Treiber ist mechanische Spannung durch harte Sätze mit kontrollierter, vollständiger Ausführung.

Der wirksame Wiederholungsbereich ist breit (etwa 5–30), praktisch bewährt sind 6–15 Wiederholungen nahe an der Erschöpfung. Volumen, Progression und Technik bestimmen den Reiz, während Protein, Energie und Schlaf die Anpassung ermöglichen.

Muskelaufbau ist ein langsamer, kumulativer Prozess. Wer geduldig hart trainiert, ausreichend isst und schläft, wird über Monate und Jahre kontinuierlich Muskulatur aufbauen.`,
        contentEN: `Muscles grow when a challenging training stimulus raises muscle protein synthesis above breakdown and this process is repeated regularly. The main driver is mechanical tension from hard sets with controlled, complete execution.

The effective rep range is wide (about 5–30); in practice 6–15 reps close to failure work well. Volume, progression and technique determine the stimulus, while protein, energy and sleep enable the adaptation.

Muscle growth is a slow, cumulative process. Those who train hard patiently, eat enough and sleep well will build muscle continuously over months and years.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. REGENERATION & ÜBERTRAINING
  // ─────────────────────────────────────────────
  {
    id: 'recovery_overtraining',
    category: 'regeneration',
    nameDE: 'Regeneration & Übertraining',
    nameEN: 'Recovery & Overtraining',
    summaryDE: 'Anpassung passiert nicht im Training, sondern in der Erholung danach. Wer zu viel trainiert und zu wenig regeneriert, stagniert oder wird schwächer. Schlaf, Ernährung, Pausen und ein sinnvolles Belastungsmanagement sind daher genauso wichtig wie das Training selbst.',
    summaryEN: 'Adaptation does not happen during training but in the recovery afterwards. Training too much and recovering too little leads to stagnation or regression. Sleep, nutrition, rest and sensible load management are therefore just as important as training itself.',
    quickDE: [
      { label: 'Grundregel', text: 'Der Muskel wächst in der Pause. Ohne Erholung kein Fortschritt.' },
      { label: 'Wichtigste Hebel', text: 'Schlaf (7–9 h), ausreichend Kalorien & Protein, Deload-Wochen, Stressmanagement.' },
    ],
    quickEN: [
      { label: 'Basic rule', text: 'Muscle grows during rest. No recovery, no progress.' },
      { label: 'Key levers', text: 'Sleep (7–9 h), enough calories & protein, deload weeks, stress management.' },
    ],
    references: [
      { authors: 'American College of Sports Medicine', year: 2009, title: 'Position Stand: Progression Models in Resistance Training for Healthy Adults',
        source: 'Medicine & Science in Sports & Exercise 41(3):687–708', url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/' },
      { authors: 'Nedeltcheva, A.V. et al.', year: 2010, title: 'Insufficient sleep undermines dietary efforts to reduce adiposity',
        source: 'Annals of Internal Medicine 153(7):435–441' },
    ],
    sections: [
      {
        titleDE: 'Warum Erholung entscheidend ist',
        titleEN: 'Why recovery is decisive',
        contentDE: `Training ist ein Reiz, aber die eigentliche Anpassung — stärkere, größere Muskeln, ein leistungsfähigeres Nervensystem — geschieht in der Erholungsphase danach. Dieses Wechselspiel wird durch das Modell der Superkompensation beschrieben: Nach einer Belastung fällt die Leistungsfähigkeit zunächst ab, erholt sich und steigt dann über das Ausgangsniveau hinaus — vorausgesetzt, es bleibt genug Zeit zur Regeneration.

Wird der nächste harte Reiz zu früh gesetzt, bevor die Erholung abgeschlossen ist, summiert sich die Ermüdung. Kurzfristig ist das normal und sogar Teil des Trainings; dauerhaft führt es jedoch zu Leistungseinbußen. Der Körper unterscheidet dabei nicht zwischen Trainingsstress und anderem Stress — Beruf, Schlafmangel und psychische Belastung zählen mit.

Erholung ist also kein passives "Nichtstun", sondern der aktive Teil, in dem der Trainingsreiz überhaupt erst in Fortschritt umgesetzt wird. Wer sie vernachlässigt, verschenkt einen Großteil seiner Trainingsarbeit.`,
        contentEN: `Training is a stimulus, but the actual adaptation — stronger, bigger muscles, a more capable nervous system — happens in the recovery phase afterwards. This interplay is described by the supercompensation model: after a load, performance first drops, recovers and then rises above the starting level — provided there is enough time to regenerate.

If the next hard stimulus comes too early, before recovery is complete, fatigue accumulates. In the short term this is normal and even part of training; over the long term, however, it leads to performance loss. The body does not distinguish between training stress and other stress — work, sleep deprivation and psychological strain all count.

Recovery is therefore not passive "doing nothing" but the active part in which the training stimulus is turned into progress in the first place. Neglecting it wastes much of your training effort.`,
      },
      {
        titleDE: 'Schlaf als wichtigster Regenerationsfaktor',
        titleEN: 'Sleep as the most important recovery factor',
        contentDE: `Kein anderer Faktor beeinflusst die Erholung so stark wie Schlaf. Während des Schlafs laufen Gewebereparatur, Gedächtniskonsolidierung motorischer Muster und wichtige hormonelle Prozesse ab, darunter die Ausschüttung von Wachstumshormon.

Die Datenlage ist eindeutig: Schlafmangel verschlechtert Kraft, Leistung und Erholung. Eine Studie von Nedeltcheva et al. (2010, Annals of Internal Medicine) zeigte, dass bei kalorienreduzierter Ernährung Personen mit zu wenig Schlaf deutlich mehr Muskelmasse und weniger Fett verloren als Ausgeschlafene — der Körper opferte unter Schlafmangel bevorzugt Muskulatur. Auch die Verletzungsrate steigt mit chronischem Schlafmangel messbar.

Sieben bis neun Stunden pro Nacht sind für die meisten Trainierenden ein sinnvolles Ziel. Regelmäßige Schlafenszeiten, ein dunkler, kühler Raum und der Verzicht auf Bildschirme und Koffein am Abend verbessern die Schlafqualität spürbar.`,
        contentEN: `No other factor influences recovery as strongly as sleep. During sleep, tissue repair, consolidation of motor patterns and important hormonal processes take place, including the release of growth hormone.

The evidence is clear: sleep deprivation impairs strength, performance and recovery. A study by Nedeltcheva et al. (2010, Annals of Internal Medicine) showed that on a calorie-reduced diet, people who slept too little lost considerably more muscle mass and less fat than well-rested people — under sleep deprivation the body preferentially sacrificed muscle. Injury rates also rise measurably with chronic sleep loss.

Seven to nine hours per night is a sensible target for most trainees. Regular bedtimes, a dark, cool room and avoiding screens and caffeine in the evening noticeably improve sleep quality.`,
      },
      {
        titleDE: 'Anzeichen von Übertraining',
        titleEN: 'Signs of overtraining',
        contentDE: `Echtes Übertrainingssyndrom ist selten und braucht Wochen bis Monate zur Erholung; häufiger ist das sogenannte Overreaching — eine vorübergehende Überlastung. Beide äußern sich durch ähnliche Warnzeichen, die man ernst nehmen sollte.

Typische Anzeichen sind: anhaltender Leistungsabfall trotz Training, ungewöhnlich starker oder lang anhaltender Muskelkater, Schlafstörungen, erhöhter Ruhepuls, Reizbarkeit, Motivationsverlust und häufigere Infekte. Kommen mehrere davon zusammen, ist das ein deutliches Signal, die Belastung zu reduzieren.

Wichtig: Ein einzelner schlechter Trainingstag ist kein Übertraining. Erst ein anhaltendes Muster über ein bis zwei Wochen sollte zu Anpassungen führen. Das beste Gegenmittel ist meist nicht mehr, sondern weniger — durch reduziertes Volumen, mehr Schlaf und gegebenenfalls eine Deload-Woche.`,
        contentEN: `True overtraining syndrome is rare and takes weeks to months to recover from; more common is so-called overreaching — a temporary overload. Both show up through similar warning signs that should be taken seriously.

Typical signs include: persistent performance decline despite training, unusually strong or long-lasting soreness, sleep disturbances, elevated resting heart rate, irritability, loss of motivation and more frequent infections. When several of these coincide, it is a clear signal to reduce the load.

Importantly, a single bad training day is not overtraining. Only a persistent pattern over one to two weeks should lead to adjustments. The best remedy is usually not more but less — through reduced volume, more sleep and, if needed, a deload week.`,
      },
      {
        titleDE: 'Deload und Belastungssteuerung',
        titleEN: 'Deload and load management',
        contentDE: `Eine Deload-Woche ist eine geplante Phase reduzierter Belastung, in der Volumen und/oder Intensität bewusst zurückgefahren werden — typischerweise auf etwa die Hälfte des Volumens oder mit deutlich leichteren Gewichten. Sie dient dazu, angesammelte Ermüdung abzubauen, ohne den Trainingsreiz ganz zu verlieren.

Wann ein Deload sinnvoll ist, hängt vom Einzelnen ab. Viele Trainierende profitieren von einer solchen Woche etwa alle 4–8 Wochen intensiven Trainings oder immer dann, wenn sich Warnzeichen häufen. Fortgeschrittene mit hohem Volumen brauchen sie häufiger als Anfänger.

Neben geplanten Deloads ist die laufende Belastungssteuerung wichtig: Trainingsintensität nach Tagesform anpassen, harte und leichtere Einheiten abwechseln und Lebensstressoren einbeziehen. Regeneration ist kein starres Schema, sondern ein flexibles Zuhören auf die Signale des Körpers.`,
        contentEN: `A deload week is a planned phase of reduced load in which volume and/or intensity are deliberately scaled back — typically to about half the volume or with much lighter weights. Its purpose is to dissipate accumulated fatigue without losing the training stimulus entirely.

When a deload makes sense depends on the individual. Many trainees benefit from such a week roughly every 4–8 weeks of intense training, or whenever warning signs accumulate. Advanced lifters with high volume need them more often than beginners.

Beyond planned deloads, ongoing load management matters: adjust training intensity to daily form, alternate hard and lighter sessions and account for life stressors. Recovery is not a rigid scheme but flexible listening to the body's signals.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Fortschritt entsteht in der Erholung, nicht im Training selbst. Wer den Reiz setzt, aber die Regeneration vernachlässigt, verschenkt Ergebnisse und riskiert Überlastung.

Die wirksamsten Hebel sind Schlaf (7–9 Stunden), ausreichend Kalorien und Protein sowie ein bewusstes Belastungsmanagement mit gelegentlichen Deload-Wochen. Warnzeichen wie anhaltender Leistungsabfall, schlechter Schlaf und Motivationsverlust sollten ernst genommen werden.

Regeneration ist kein Zeichen von Schwäche, sondern der Teil des Trainings, in dem die eigentliche Anpassung stattfindet. Wer sie plant und respektiert, trainiert langfristig gesünder und erfolgreicher.`,
        contentEN: `Progress arises in recovery, not in training itself. Those who provide the stimulus but neglect recovery waste results and risk overload.

The most effective levers are sleep (7–9 hours), adequate calories and protein, and deliberate load management with occasional deload weeks. Warning signs such as persistent performance decline, poor sleep and loss of motivation should be taken seriously.

Recovery is not a sign of weakness but the part of training in which the actual adaptation takes place. Those who plan and respect it train more healthily and successfully in the long run.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. ÜBUNGSTECHNIK & BEWEGUNGSAMPLITUDE
  // ─────────────────────────────────────────────
  {
    id: 'technique_rom',
    category: 'grundlagen',
    nameDE: 'Technik & Bewegungsamplitude',
    nameEN: 'Technique & Range of Motion',
    summaryDE: 'Saubere Technik über eine volle Bewegungsamplitude macht Übungen effektiver und sicherer. Sie sorgt dafür, dass der Zielmuskel den Reiz erhält, senkt das Verletzungsrisiko und ist die Grundlage jeder Progression.',
    summaryEN: 'Clean technique through a full range of motion makes exercises more effective and safer. It ensures the target muscle receives the stimulus, lowers injury risk and is the basis of all progression.',
    quickDE: [
      { label: 'Grundregel', text: 'Volle Bewegungsamplitude, kontrolliert, mit Fokus auf den Zielmuskel — Technik vor Gewicht.' },
      { label: 'Warum wichtig', text: 'Bessere Reizsetzung, geringeres Verletzungsrisiko, saubere Basis für Progression.' },
    ],
    quickEN: [
      { label: 'Basic rule', text: 'Full range of motion, controlled, focused on the target muscle — technique before weight.' },
      { label: 'Why it matters', text: 'Better stimulus, lower injury risk, a clean basis for progression.' },
    ],
    references: [
      { authors: 'American College of Sports Medicine', year: 2009, title: 'Position Stand: Progression Models in Resistance Training for Healthy Adults',
        source: 'Medicine & Science in Sports & Exercise 41(3):687–708', url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/' },
      { authors: 'Schoenfeld, B.J. & Grgic, J.', year: 2020, title: 'Effects of range of motion on muscle development during resistance training interventions: a systematic review',
        source: 'SAGE Open Medicine 8' },
    ],
    sections: [
      {
        titleDE: 'Warum Technik zählt',
        titleEN: 'Why technique matters',
        contentDE: `Gute Übungstechnik hat zwei zentrale Funktionen: Sie sorgt dafür, dass die Belastung tatsächlich am Zielmuskel ankommt, und sie hält die Gelenke in sicheren Positionen. Beides zusammen bestimmt, ob eine Übung effektiv und nachhaltig ist.

Wer mit schlechter Technik trainiert, verlagert die Last oft auf ungewollte Muskeln oder passive Strukturen wie Bänder und Sehnen. Das mindert nicht nur den Trainingseffekt, sondern erhöht auch das Risiko für Überlastungsschäden. Technik ist damit kein Selbstzweck, sondern die Voraussetzung dafür, dass Training seinen Zweck erfüllt.

Besonders zu Beginn lohnt es sich, Bewegungsmuster mit leichten Gewichten zu erlernen. Das Nervensystem festigt die Muster durch Wiederholung — sauber eingeschliffene Technik bildet die Grundlage, auf der später schwerere Lasten sicher bewältigt werden können.`,
        contentEN: `Good exercise technique has two central functions: it ensures the load actually reaches the target muscle, and it keeps the joints in safe positions. Together these determine whether an exercise is effective and sustainable.

Training with poor technique often shifts the load onto unintended muscles or passive structures such as ligaments and tendons. This not only reduces the training effect but also increases the risk of overuse injuries. Technique is therefore not an end in itself but the prerequisite for training to serve its purpose.

Especially in the beginning it pays to learn movement patterns with light weights. The nervous system consolidates patterns through repetition — cleanly grooved technique forms the basis on which heavier loads can later be handled safely.`,
      },
      {
        titleDE: 'Die volle Bewegungsamplitude',
        titleEN: 'Full range of motion',
        contentDE: `Die Bewegungsamplitude (Range of Motion, ROM) beschreibt, über welche Strecke ein Muskel während einer Übung arbeitet. Als Faustregel gilt: Eine möglichst vollständige Amplitude ist einer verkürzten überlegen, besonders für den Muskelaufbau.

Mehrere Studien untermauern das. Eine Untersuchung von Schoenfeld & Grgic (2020, SAGE Open Medicine) fasst zusammen, dass volle Bewegungsamplituden in der Regel zu mehr Muskelwachstum führen als Teilbewegungen. Besonders die gedehnte Position unter Last scheint ein starker Wachstumsreiz zu sein — tiefe Kniebeugen etwa fördern die Oberschenkelentwicklung stärker als halbe.

Es gibt Ausnahmen: Bei manchen Übungen oder gesundheitlichen Einschränkungen kann eine leicht angepasste Amplitude sinnvoll sein. Grundsätzlich sollte man jedoch die größtmögliche Amplitude anstreben, die man mit guter Technik und ohne Schmerzen kontrollieren kann.`,
        contentEN: `Range of motion (ROM) describes the distance over which a muscle works during an exercise. As a rule of thumb, the fullest possible range is superior to a shortened one, especially for muscle growth.

Several studies support this. A review by Schoenfeld & Grgic (2020, SAGE Open Medicine) concludes that full ranges of motion generally lead to more muscle growth than partial movements. The stretched position under load in particular appears to be a strong growth stimulus — deep squats, for example, promote thigh development more than half squats.

There are exceptions: for some exercises or with health limitations, a slightly adjusted range can make sense. In general, however, you should aim for the largest range you can control with good technique and without pain.`,
      },
      {
        titleDE: 'Tempo und Kontrolle',
        titleEN: 'Tempo and control',
        contentDE: `Wie schnell eine Wiederholung ausgeführt wird, beeinflusst den Reiz. Besonders die exzentrische Phase (das Ablassen des Gewichts) sollte kontrolliert erfolgen — nicht das Gewicht fallen lassen, sondern aktiv abbremsen. Das hält die Spannung auf dem Muskel und verbessert die Kontrolle.

Ein häufiger Fehler ist der Einsatz von Schwung. Wer das Gewicht mit ruckartigen Bewegungen hochreißt, verlagert die Arbeit von den Muskeln auf den Schwung und reduziert so den Trainingseffekt. Kontrollierte, bewusste Wiederholungen sind fast immer wirksamer als schnelle, schludrige.

Das heißt nicht, dass jede Wiederholung extrem langsam sein muss. Eine sinnvolle Richtlinie ist: konzentrische Phase (das Anheben) zügig, aber kontrolliert, exzentrische Phase (das Ablassen) über etwa zwei bis drei Sekunden. Der Fokus liegt stets auf dem bewussten Spüren und Ansteuern des Zielmuskels.`,
        contentEN: `How fast a repetition is performed influences the stimulus. The eccentric phase in particular (lowering the weight) should be controlled — do not drop the weight but actively decelerate it. This keeps tension on the muscle and improves control.

A common mistake is using momentum. Yanking the weight up with jerky movements shifts the work from the muscles to momentum and thereby reduces the training effect. Controlled, deliberate repetitions are almost always more effective than fast, sloppy ones.

This does not mean every repetition must be extremely slow. A sensible guideline is: concentric phase (lifting) brisk but controlled, eccentric phase (lowering) over about two to three seconds. The focus is always on consciously feeling and targeting the working muscle.`,
      },
      {
        titleDE: 'Häufige Fehler und wie man sie behebt',
        titleEN: 'Common mistakes and how to fix them',
        contentDE: `Der häufigste Fehler ist zu viel Gewicht auf Kosten der Technik. Wenn die letzten Wiederholungen nur noch mit Schwung, Ausweichbewegungen oder unvollständiger Amplitude gelingen, ist das Gewicht zu hoch. Die Lösung ist einfach: reduzieren und die Bewegung sauber ausführen.

Ein zweiter Fehler ist das Vernachlässigen der exzentrischen Phase. Viele lassen das Gewicht unkontrolliert zurückfallen und verschenken so einen großen Teil des Reizes. Bewusstes Abbremsen behebt das sofort.

Ein dritter Punkt ist fehlende Aufmerksamkeit für den Zielmuskel. Die "Muskel-Geist-Verbindung" — also der bewusste Fokus auf den arbeitenden Muskel — kann die Aktivierung verbessern, besonders bei Isolationsübungen. Videoaufnahmen der eigenen Ausführung oder das Feedback erfahrener Trainierender helfen, Technikfehler zu erkennen und zu korrigieren.`,
        contentEN: `The most common mistake is too much weight at the expense of technique. If the last repetitions only succeed with momentum, evasive movements or incomplete range, the weight is too high. The solution is simple: reduce it and perform the movement cleanly.

A second mistake is neglecting the eccentric phase. Many let the weight fall back uncontrolled and thereby waste a large part of the stimulus. Deliberate deceleration fixes this immediately.

A third point is a lack of attention to the target muscle. The "mind-muscle connection" — deliberate focus on the working muscle — can improve activation, especially in isolation exercises. Video recordings of your own execution or feedback from experienced trainees help identify and correct technique errors.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Saubere Technik über eine volle Bewegungsamplitude ist die Grundlage effektiven und sicheren Trainings. Sie stellt sicher, dass der Zielmuskel den Reiz erhält, und schützt die Gelenke.

Strebe die größtmögliche kontrollierte Amplitude an, führe besonders die exzentrische Phase bewusst aus und verzichte auf Schwung. Technik geht immer vor Gewicht — erst wenn die Bewegung sitzt, ist Laststeigerung sinnvoll.

Gute Technik ist keine einmalige Sache, sondern eine dauerhafte Priorität. Wer sie pflegt, trainiert wirksamer, bleibt länger verletzungsfrei und legt das Fundament für kontinuierlichen Fortschritt.`,
        contentEN: `Clean technique through a full range of motion is the basis of effective and safe training. It ensures the target muscle receives the stimulus and protects the joints.

Aim for the largest controlled range possible, perform the eccentric phase deliberately in particular and avoid momentum. Technique always comes before weight — only once the movement is solid does adding load make sense.

Good technique is not a one-off but an ongoing priority. Those who maintain it train more effectively, stay injury-free longer and lay the foundation for continuous progress.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. PERIODISIERUNG & TRAININGSPLANUNG
  // ─────────────────────────────────────────────
  {
    id: 'periodization',
    category: 'programmierung',
    nameDE: 'Periodisierung & Planung',
    nameEN: 'Periodization & Planning',
    summaryDE: 'Periodisierung ist die planvolle Strukturierung des Trainings über die Zeit — mit wechselnden Phasen von Volumen, Intensität und Erholung. Sie hilft, Plateaus zu vermeiden, Übertraining vorzubeugen und langfristig kontinuierlich Fortschritte zu machen.',
    summaryEN: 'Periodization is the planned structuring of training over time — with alternating phases of volume, intensity and recovery. It helps avoid plateaus, prevent overtraining and make continuous progress in the long term.',
    quickDE: [
      { label: 'Kernidee', text: 'Training bewusst in Phasen planen statt jede Woche gleich zu trainieren.' },
      { label: 'Für wen', text: 'Vor allem Fortgeschrittene; Anfänger kommen lange mit einfacher linearer Steigerung aus.' },
    ],
    quickEN: [
      { label: 'Core idea', text: 'Plan training deliberately in phases instead of training the same every week.' },
      { label: 'For whom', text: 'Mainly advanced lifters; beginners do well with simple linear progression for a long time.' },
    ],
    references: [
      { authors: 'American College of Sports Medicine', year: 2009, title: 'Position Stand: Progression Models in Resistance Training for Healthy Adults',
        source: 'Medicine & Science in Sports & Exercise 41(3):687–708', url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/' },
      { authors: 'Williams, T.D. et al.', year: 2017, title: 'Comparison of periodized and non-periodized resistance training on maximal strength: a meta-analysis',
        source: 'Sports Medicine 47(10):2083–2100' },
    ],
    sections: [
      {
        titleDE: 'Was ist Periodisierung?',
        titleEN: 'What is periodization?',
        contentDE: `Periodisierung ist die systematische Planung des Trainings über verschiedene Zeitabschnitte hinweg. Statt Woche für Woche identisch zu trainieren, werden Variablen wie Volumen, Intensität, Wiederholungsbereiche und Übungsauswahl gezielt variiert, um über längere Zeit Fortschritte zu erzielen und Ermüdung zu steuern.

Das Konzept stammt ursprünglich aus dem Leistungssport und geht auf Arbeiten von Leo Matwejew und Tudor Bompa zurück. Ziel war es, Athleten zu bestimmten Wettkämpfen in Bestform zu bringen. Die zugrunde liegende Idee — Belastung und Erholung planvoll zu wechseln — ist aber für jeden Trainierenden nützlich.

Man unterscheidet häufig zwischen Makrozyklus (der gesamte Plan über Monate bis ein Jahr), Mesozyklus (mehrwöchige Blöcke mit einem Schwerpunkt) und Mikrozyklus (meist eine Trainingswoche). Diese Struktur hilft, das große Ziel in überschaubare, aufeinander aufbauende Etappen zu zerlegen.`,
        contentEN: `Periodization is the systematic planning of training across different time segments. Instead of training identically week after week, variables such as volume, intensity, rep ranges and exercise selection are deliberately varied to achieve progress over a longer period and to manage fatigue.

The concept originally comes from competitive sport and traces back to work by Leo Matveyev and Tudor Bompa. The goal was to bring athletes into peak form for specific competitions. The underlying idea — alternating load and recovery in a planned way — is useful for any trainee, however.

A common distinction is between the macrocycle (the entire plan over months to a year), the mesocycle (multi-week blocks with one focus) and the microcycle (usually a training week). This structure helps break the big goal into manageable, building stages.`,
      },
      {
        titleDE: 'Modelle der Periodisierung',
        titleEN: 'Models of periodization',
        contentDE: `Es gibt mehrere etablierte Modelle. Die lineare Periodisierung beginnt mit hohem Volumen und niedriger Intensität und verschiebt sich über Wochen hin zu weniger Volumen und höherer Intensität — klassisch etwa von Hypertrophie- zu Kraftphasen.

Die undulierende (wellenförmige) Periodisierung variiert die Belastung in kürzeren Abständen, oft von Einheit zu Einheit innerhalb einer Woche — zum Beispiel ein Tag mit schweren, niedrigen Wiederholungen, ein anderer mit moderaten und ein dritter mit hohen Wiederholungen. Eine Metaanalyse legt nahe, dass beide Modelle wirksam sind und die Unterschiede in der Praxis oft klein ausfallen (Williams et al., 2017, Sports Medicine).

Die Blockperiodisierung konzentriert sich über mehrere Wochen auf einen einzigen Schwerpunkt (z. B. einen Volumenblock, gefolgt von einem Intensitätsblock). Welches Modell am besten passt, hängt von Zielen, Erfahrung und Vorlieben ab — entscheidend ist, überhaupt einen Plan mit gezielter Variation zu haben.`,
        contentEN: `Several established models exist. Linear periodization begins with high volume and low intensity and shifts over weeks towards less volume and higher intensity — classically from hypertrophy to strength phases.

Undulating (wave-like) periodization varies the load in shorter intervals, often from session to session within a week — for example one day with heavy, low reps, another with moderate reps and a third with high reps. A meta-analysis suggests both models are effective and that the differences are often small in practice (Williams et al., 2017, Sports Medicine).

Block periodization focuses on a single emphasis over several weeks (e.g. a volume block followed by an intensity block). Which model fits best depends on goals, experience and preferences — what matters is having a plan with deliberate variation at all.`,
      },
      {
        titleDE: 'Brauchen Anfänger Periodisierung?',
        titleEN: 'Do beginners need periodization?',
        contentDE: `Für Anfänger ist komplexe Periodisierung meist überflüssig. In den ersten Monaten reagiert der Körper so stark auf jeden Trainingsreiz, dass eine einfache lineare Progression — Woche für Woche etwas mehr Gewicht oder Wiederholungen — bereits hervorragende Fortschritte bringt. Diese Phase wird oft "Novice Gains" genannt.

Erst wenn diese schnelle Anfangsprogression abflacht, typischerweise nach einigen Monaten bis etwa einem Jahr konsequenten Trainings, wird eine durchdachtere Struktur wirklich nützlich. Dann helfen wechselnde Phasen, weiter Reize zu setzen, ohne in Übertraining oder Stagnation zu geraten.

Für Anfänger gilt daher: Konsequenz, gute Technik und einfache Progression schlagen jede komplizierte Planung. Periodisierung ist ein Werkzeug für Fortgeschrittene, kein Muss für den Einstieg.`,
        contentEN: `For beginners, complex periodization is usually unnecessary. In the first months the body responds so strongly to any training stimulus that simple linear progression — a little more weight or reps week by week — already produces excellent progress. This phase is often called "novice gains".

Only when this rapid initial progression flattens, typically after a few months to about a year of consistent training, does a more thought-out structure become truly useful. Alternating phases then help keep providing a stimulus without slipping into overtraining or stagnation.

For beginners the rule is therefore: consistency, good technique and simple progression beat any complicated planning. Periodization is a tool for advanced lifters, not a requirement for getting started.`,
      },
      {
        titleDE: 'Einen einfachen Plan aufbauen',
        titleEN: 'Building a simple plan',
        contentDE: `Ein guter Trainingsplan beginnt mit den Zielen und der verfügbaren Zeit. Daraus ergibt sich die Trainingsfrequenz (z. B. 3–4 Einheiten pro Woche) und die Aufteilung — etwa Ganzkörper bei wenigen Einheiten oder ein Ober-/Unterkörper- bzw. Push-Pull-Beine-Split bei mehr Einheiten.

Auf dieser Basis werden Übungen und Volumen verteilt, sodass jede Muskelgruppe idealerweise zweimal pro Woche mit insgesamt etwa 10–20 harten Sätzen trainiert wird. Grundübungen (Kniebeuge, Kreuzheben, Bank- und Schulterdrücken, Klimmzüge, Rudern) bilden das Fundament, ergänzt durch Isolationsübungen für Schwachstellen.

Über die Wochen wird progrediert (mehr Gewicht oder Wiederholungen), und etwa alle 4–8 Wochen kann eine Deload-Woche eingeplant werden. Ein Plan muss nicht kompliziert sein — er muss zu deinem Leben passen, konsequent umgesetzt und regelmäßig anhand der Fortschritte angepasst werden.`,
        contentEN: `A good training plan starts with goals and available time. From these follow the training frequency (e.g. 3–4 sessions per week) and the split — such as full body with few sessions, or an upper/lower or push-pull-legs split with more sessions.

On this basis, exercises and volume are distributed so that each muscle group is ideally trained twice per week with a total of about 10–20 hard sets. Compound exercises (squat, deadlift, bench and overhead press, pull-ups, rows) form the foundation, supplemented by isolation exercises for weak points.

Over the weeks you progress (more weight or reps), and roughly every 4–8 weeks a deload week can be scheduled. A plan does not have to be complicated — it has to fit your life, be applied consistently and be adjusted regularly based on progress.`,
      },
      {
        titleDE: 'Zusammenfassung',
        titleEN: 'Summary',
        contentDE: `Periodisierung ist die planvolle Variation von Training über die Zeit, um Plateaus und Übertraining zu vermeiden. Gängige Modelle sind die lineare, die undulierende und die Blockperiodisierung — in der Praxis sind die Unterschiede oft kleiner als gedacht.

Anfänger brauchen keine komplexe Periodisierung; einfache lineare Progression trägt sie über die ersten Monate weit. Erst Fortgeschrittene profitieren spürbar von geplanten Phasen.

Am wichtigsten ist ein Plan, der zu Zielen und Alltag passt, jede Muskelgruppe angemessen trainiert, progressiv gesteigert wird und Erholung einplant. Struktur und Konsequenz schlagen jede beliebige "perfekte" Methode.`,
        contentEN: `Periodization is the planned variation of training over time to avoid plateaus and overtraining. Common models are linear, undulating and block periodization — in practice the differences are often smaller than thought.

Beginners do not need complex periodization; simple linear progression carries them well through the first months. Only advanced lifters benefit noticeably from planned phases.

Most important is a plan that fits your goals and daily life, trains each muscle group adequately, is progressively increased and schedules recovery. Structure and consistency beat any supposedly "perfect" method.`,
      },
    ],
  },
];

export default trainingTopics;
