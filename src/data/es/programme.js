// Spanische Fassung der 21 Peak-Programme aus `src/data/peakPrograms.js`.
//
// Form je Programm: { name, desc, why, progression, fokus: { <tag>: '…' } }.
// `fokus` gibt es nur bei den Kampfsport-Programmen (dort steht unter der
// Tagesbeschriftung noch ein Schwerpunkt).
//
// Die Beschriftungen der Trainingstage („Push", „Oberkörper") stehen NICHT
// hier, sondern in `src/data/tagesbeschriftung.js` — sie wiederholen sich über
// die Programme hinweg und fehlten bisher auch auf Englisch.
//
// `studien` ist nach „Name|Jahr" verschlüsselt, weil dieselbe Studie in
// mehreren Programmen zitiert wird; Name und Jahr bleiben unübersetzt.
export default {
  kategorien: {
    strength: 'Entrenamiento de fuerza',
    cardio: 'Cardio',
    hiit: 'HIIT',
    martial_arts: 'Artes marciales',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Metaanálisis dosis-respuesta: 10 o más series por grupo muscular y semana producen un crecimiento muscular significativamente mayor que un número menor de series.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Metaanálisis: entrenar cada grupo muscular 2 veces por semana produce más hipertrofia que hacerlo 1 vez por semana.',
    'Helms et al.|2016': 'La escala RIR («repeticiones en reserva») es una herramienta válida para regular el esfuerzo en el entrenamiento de fuerza: termina la mayoría de las series con 1–3 RIR.',
    'Schoenfeld, Grgic & Krieger|2019': 'Con el mismo volumen semanal, la frecuencia de entrenamiento es secundaria: lo decisivo es el volumen total por grupo muscular.',
    'Pedisic et al.|2020': 'Metaanálisis: los corredores tienen un riesgo de mortalidad por todas las causas ~27 % menor, y ya volúmenes pequeños de carrera (1 vez por semana) muestran este efecto.',
    'Lee et al.|2014': 'Incluso 5–10 minutos diarios de carrera lenta se asociaron a una mortalidad total y cardiovascular claramente menor.',
    'Helgerud et al.|2007': 'Los intervalos de 4×4 minutos al 90–95 % de la frecuencia cardiaca máxima aumentaron el VO₂máx significativamente más que el entrenamiento continuo moderado con el mismo trabajo total.',
    'Milanović et al.|2015': 'Metaanálisis: el HIIT mejora el VO₂máx en adultos sanos más que el entrenamiento de resistencia clásico.',
    'Gunnarsson & Bangsbo|2012': 'Con el concepto 10-20-30, los corredores mejoraron su VO₂máx (~4 %) y sus tiempos en 1500 m y 5 km pese a reducir el volumen de entrenamiento ~50 %.',
    'Seiler|2010': 'Los atletas de resistencia de élite realizan ~80 % de su volumen a baja intensidad (zonas 1–2); este modelo polarizado ofrece las mejores adaptaciones a largo plazo.',
    'Stöggl & Sperlich|2014': 'El entrenamiento polarizado (mucho suave + poco muy duro) mejoró el VO₂máx y el rendimiento en deportistas de resistencia entrenados más que el trabajo de umbral o el HIT puro.',
    'Esteve-Lanao et al.|2007': 'Los corredores que entrenaron ~80 % de su volumen a baja intensidad mejoraron su tiempo de competición más que un grupo que entrenó más en la zona de intensidad media.',
    'Billat et al.|1999': 'Los intervalos a la velocidad del VO₂máx (vVO₂máx) mejoraron de forma medible la economía de carrera y el ritmo en corredores entrenados.',
    'Tabata et al.|1996': '6 semanas de sesiones de 4 minutos (8×20 s/10 s) aumentaron el VO₂máx en ~7 ml/kg/min y la capacidad anaeróbica un 28 %; el entrenamiento continuo moderado solo mejoró la capacidad aeróbica.',
    'Weston et al.|2014': 'Metaanálisis: el HIIT mejoró la forma cardiorrespiratoria casi el doble que el entrenamiento continuo moderado.',
    'Gibala et al.|2006': '6 sesiones de intervalos de sprint en 2 semanas (~2,5 h de entrenamiento) lograron adaptaciones de resistencia muscular similares a ~10,5 h de entrenamiento de resistencia clásico.',
    'Little et al.|2010': 'Intervalos de 8–12×60 segundos con 75 s de pausa aumentaron notablemente la capacidad mitocondrial del músculo, con solo ~20–25 minutos por sesión.',
    'McRae et al.|2012': '4 veces por semana, solo 4 minutos de intervalos de cuerpo completo mejoraron la resistencia Y la resistencia muscular de forma comparable a 30 minutos de entrenamiento continuo.',
    'Chaabène et al.|2015': 'Revisión: el boxeo amateur exige a la vez una alta capacidad aeróbica y anaeróbica; los boxeadores de élite alcanzan valores de VO₂máx en torno a 60 ml/kg/min.',
    'Ouergui et al.|2014': 'Los asaltos de kickboxing llevan la frecuencia cardiaca cerca del máximo: el entrenamiento por asaltos actúa fisiológicamente como un entrenamiento interválico de alta intensidad.',
    'James et al.|2016': 'Revisión: las MMA exigen fuerza, velocidad y resistencia combinadas; se recomienda un acondicionamiento variado y basado en asaltos.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'La clásica rutina de 6 días para un desarrollo muscular máximo. Cada grupo muscular se entrena 2 veces por semana.',
    why: 'PPL combina las dos palancas más potentes para ganar músculo: un volumen semanal alto (16–20 series por grupo muscular) y una frecuencia de 2 veces por semana. El reparto por patrones de movimiento (empujar/tirar/pierna) permite que cada grupo muscular se recupere por completo aunque entrenes casi a diario.',
    progression: 'Progresión doble: mantén las series y el rango de repeticiones y ve subiendo en repeticiones. Cuando alcances el límite superior en todas las series con buena técnica, sube el peso 2,5 kg y vuelve a empezar por abajo. Termina la mayoría de las series con 1–3 repeticiones en reserva (RIR).',
  },
  upper_lower_4x: {
    name: 'Tren superior / tren inferior',
    desc: 'Rutina de 4 días eficaz para principiantes y avanzados. Cada grupo muscular se entrena 2 veces por semana.',
    why: 'La división tren superior/tren inferior es el mejor equilibrio entre tiempo invertido y resultado: 4 sesiones por semana bastan para la frecuencia de 2 veces por grupo muscular que, según los metaanálisis, produce más crecimiento que una sola. Primero los ejercicios básicos, después los de aislamiento.',
    progression: 'Progresión doble: primero sube las repeticiones dentro del rango objetivo y luego añade 2,5 kg. Termina los básicos (sentadilla, press de banca, peso muerto) con 2 RIR y los de aislamiento con 1 RIR. Intercala una semana suave cada 6–8 semanas.',
  },
  split_5x: {
    name: 'Rutina de 5 días',
    desc: 'Rutina avanzada de 5 días con un volumen alto por grupo muscular. Para atletas con experiencia.',
    why: 'Para avanzados que necesitan más volumen: la rutina de 5 días permite 15–20+ series por grupo muscular con toda la concentración puesta en una zona por sesión. La investigación dosis-respuesta muestra que quien lleva tiempo entrenando sigue creciendo con más series semanales.',
    progression: 'Progresión doble en cada ejercicio. Además, cada 3–4 semanas añade una serie al primer ejercicio del día mientras la recuperación lo permita. Haz de la semana 10 una descarga (pesos −30 %, mitad de series).',
  },
  fullbody_3x: {
    name: 'Cuerpo completo 3 días',
    desc: 'Perfecto para principiantes: 3 entrenamientos de cuerpo completo por semana con los ejercicios básicos más importantes.',
    why: 'Para quien empieza, el entrenamiento de cuerpo completo 3 veces por semana es el modelo más eficiente: cada grupo muscular recibe estímulo 3 veces por semana, los ejercicios básicos mejoran rápido por la práctica frecuente y tres sesiones caben en cualquier agenda. Los principiantes progresan de forma fiable ya con un volumen moderado.',
    progression: 'Progresión lineal: sube el peso cada sesión 2,5 kg (tren inferior) o 1,25–2,5 kg (tren superior) mientras completes todas las repeticiones con buena técnica. Si fallas un ejercicio 2 veces seguidas, baja su peso un 10 % y vuelve a subir.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4 días',
    desc: '4 entrenamientos por semana divididos en movimientos de empuje y de tirón. La pierna va integrada.',
    why: 'Push/Pull con pierna integrada es la alternativa eficiente en tiempo al PPL de 6 días: la misma frecuencia de 2 veces por grupo muscular, pero solo 4 días de gimnasio. El cuádriceps pasa a Push (la sentadilla es un empuje) y la cadena posterior a Pull (el peso muerto es un tirón), una agrupación biomecánicamente limpia.',
    progression: 'Progresión doble: sube las repeticiones dentro del rango objetivo y luego añade 2,5 kg. Progresa de forma conservadora en peso muerto y sentadilla (solo cuando completes todas las series con 2 RIR). Tras la semana 8, haz una semana de descarga antes de repetir el ciclo.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'La clásica rutina de culturismo: cada grupo muscular tiene su propio día con un volumen alto.',
    why: 'El enfoque culturista de siempre: un grupo muscular por día, pero con toda la atención y mucho volumen en una sola sesión. La investigación más reciente muestra que, con el mismo volumen semanal, el reparto es secundario: quien disfruta del bombeo y del foco de los días por músculo también desarrolla masa así.',
    progression: 'Progresión doble en cada ejercicio, con la mayoría de las series hasta 1–2 RIR. Como cada grupo muscular solo se trabaja 1 vez por semana, cada sesión cuenta: anota tus pesos con constancia y busca cada semana al menos una repetición más.',
  },
  couch_to_5k: {
    name: 'Del sofá a los 5K',
    desc: 'De cero a correr 5 kilómetros en 9 semanas, con intervalos de carrera y caminata que se alargan cada semana.',
    why: 'El concepto para principiantes más probado del mundo: tramos cortos de carrera con pausas caminando entre medias permiten que tendones, articulaciones y sistema cardiovascular se adapten en lugar de sobrecargarse. La progresión es deliberadamente suave, y justo por eso el programa se sostiene tan bien. Incluso volúmenes pequeños de carrera reducen de forma medible el riesgo de mortalidad.',
    progression: 'Cada semana los tramos de carrera se alargan y las pausas caminando se acortan: de 8×1 minuto corriendo (semana 1) hasta 30 minutos seguidos (semana 9). Corre los tramos conscientemente despacio (ritmo de conversación, RPE 5–6). Repite una semana si te resulta demasiado dura.',
  },
  norwegian_4x4: {
    name: '4×4 noruego',
    desc: 'El protocolo de VO₂máx salido de la investigación: 4 intervalos de 4 minutos al 90–95 % de la frecuencia cardiaca máxima.',
    why: 'Pocos protocolos están mejor documentados: los intervalos de 4 minutos cerca de la frecuencia cardiaca máxima son el estímulo más potente que se conoce para el VO₂máx, el mejor marcador aislado de rendimiento de resistencia y longevidad. Las pausas activas de 3 minutos mantienen alta la calidad de los intervalos. Funciona corriendo, en bici y remando.',
    progression: 'Semanas 1–2: 3 intervalos para adaptarte. A partir de la semana 3: el 4×4 completo. Semanas 7–8: pausa activa reducida a 2:30. Intensidad: los últimos 2 minutos de cada intervalo deben sentirse como un RPE 9, con el habla ya imposible.',
  },
  interval_10_20_30: {
    name: 'Intervalos 10-20-30',
    desc: 'El concepto danés: 30 s suave, 20 s ágil, 10 s de sprint. Ser más rápido con la mitad del volumen de entrenamiento.',
    why: 'Desarrollado en la Universidad de Copenhague: los corredores se volvieron más rápidos y estaban más en forma pese a reducir a la mitad su volumen de entrenamiento. Los sprints de solo 10 segundos dan un estímulo máximo, pero son tan cortos que la carga se reparte bien. Ideal si tienes poco tiempo y quieres correr más rápido.',
    progression: 'Un bloque = 5×(30 s suave · 20 s ágil · 10 s de sprint). Semanas 1–2: 2 bloques; semanas 3–4: 3 bloques; semanas 5–6: 4 bloques, con 2 minutos de trote entre bloques. Los sprints de 10 segundos son casi máximos (RPE 9); el resto, deliberadamente suave.',
  },
  zone2_base: {
    name: 'Base en zona 2',
    desc: 'La base de resistencia de los profesionales: sesiones continuas suaves en zona 2 de pulso que se alargan semana a semana.',
    why: 'Los atletas de resistencia de élite entrenan ~80 % de su volumen justo aquí: lo bastante suave como para poder conversar. La zona 2 desarrolla mitocondrias y metabolismo de las grasas, el cimiento sobre el que cualquier entrenamiento duro hace efecto. El error más frecuente de los aficionados es correr estas sesiones demasiado rápido.',
    progression: 'Las sesiones cortas crecen 5 minutos cada 2 semanas (25→40 min) y la carrera larga 5 minutos cada semana, con semanas de descarga (35→60 min). Control del ritmo: debes poder conversar con frases completas (RPE 3–4, zona 2). Si no puedes, ve más despacio.',
  },
  '10k_training': {
    name: 'Entrenamiento para 10K',
    desc: 'Preparación estructurada de 10 km en 10 semanas: intervalos, carrera a ritmo, carrera suave y carrera larga.',
    why: 'El clásico de la planificación de carrera según el principio 80/20: dos sesiones duras por semana (intervalos de VO₂máx + carrera a ritmo) aportan el estímulo de rendimiento, y dos sesiones suaves construyen la base aeróbica. La carrera larga crece de forma progresiva con semanas de descarga, y las dos últimas semanas se hace tapering para llegar fresco a la salida.',
    progression: 'Intervalos: de 4 a 6×3 minutos (RPE 9). Carrera a ritmo: de 15 a 25 minutos «cómodamente duro» (RPE 7). Carrera larga: de 40 a 70 minutos suaves, con descarga en las semanas 4 y 7. Semanas 9–10: tapering, menos volumen y más frescura. La carrera suave del jueves se mantiene siempre suave.',
  },
  tabata_classic: {
    name: 'Tabata clásico',
    desc: 'El protocolo Tabata original: 20 segundos a tope, 10 segundos de pausa, con un número creciente de rondas.',
    why: 'El protocolo de HIIT más famoso del mundo, investigado en 1996 con patinadores de velocidad japoneses: 8 rondas de 20/10 mejoraron a la vez la capacidad aeróbica Y la anaeróbica, algo que el entrenamiento continuo moderado no logra. Lo decisivo es la intensidad: «a tope» significa realmente a tope.',
    progression: 'Semanas 1–2: 8 rondas (1 bloque Tabata, 4 minutos). Semanas 3–4: 12 rondas. Semanas 5–6: 16 rondas (2 bloques). Cada fase de trabajo a RPE 9–10: si ya no completas las últimas rondas con buena técnica, quédate una semana más en el nivel actual.',
  },
  gibala_sit: {
    name: 'Protocolo Gibala 60/75',
    desc: 'El «SIT práctico» de la investigación: 8–12 intervalos de 60 segundos duros con 75 segundos de pausa.',
    why: 'El grupo de Martin Gibala demostró que unos pocos minutos de intervalos intensos desencadenan adaptaciones celulares parecidas a las de un tiempo mucho mayor de entrenamiento de resistencia clásico. La variante 60/75 es la versión apta para el día a día: dura, pero sin sprints máximos, lo que la hace segura y adecuada para ejercicios de cuerpo completo.',
    progression: 'Semanas 1–2: 8 intervalos. Semanas 3–4: 10 intervalos. Semanas 5–6: 12 intervalos. Fases de trabajo a RPE 8–9 («muy duro, pero sostenible 60 segundos»); en las pausas, muévete suave en lugar de quedarte parado.',
  },
  hiit_beginner: {
    name: 'HIIT para principiantes 30/30',
    desc: 'Entrada suave al entrenamiento interválico: 30 segundos de trabajo y 30 de pausa, de 6 a 10 rondas.',
    why: 'La relación 1:1 entre trabajo y pausa es la puerta de entrada ideal al HIIT: lo bastante intensa para los efectos demostrados sobre la forma física, pero con recuperación suficiente para mantener limpia la técnica. Según los metaanálisis, el HIIT mejora la forma física casi el doble que el entrenamiento continuo moderado, en una fracción del tiempo.',
    progression: 'Semanas 1–2: 6 rondas. Semanas 3–4: 8 rondas. Semanas 5–6: 10 rondas. Fases de trabajo a RPE 7–8: al final de cada pausa deberías estar listo otra vez. Calidad antes que velocidad: cuentan más las repeticiones limpias que las muchas.',
  },
  hiit_advanced: {
    name: 'HIIT avanzado 40/15',
    desc: 'HIIT intenso para avanzados: 40 segundos de trabajo y solo 15 de pausa, hasta 12 rondas.',
    why: 'La pausa corta (casi 3:1) mantiene la frecuencia cardiaca alta todo el rato, con lo que entrenas la capacidad de seguir rindiendo bajo fatiga. Cuatro sesiones temáticas por semana (potencia, core, piernas, cuerpo completo) reparten la carga entre distintos grupos musculares.',
    progression: 'Semanas 1–2: 8 rondas. Semanas 3–6: 10 rondas. Semanas 7–8: 12 rondas. Fases de trabajo a RPE 8–9. Si se rompe la técnica, termina la ronda antes: estar sin lesiones vale más que el número de rondas.',
  },
  emom_challenge: {
    name: 'Reto EMOM',
    desc: 'Every Minute On the Minute: cada minuto empieza un ejercicio nuevo y la pausa es lo que sobra del minuto.',
    why: 'El EMOM lleva el ritmo incorporado: quien trabaja más rápido se gana más pausa, lo que mantiene alta la densidad y enseña a dosificar. Los intervalos de cuerpo completo de este tipo mejoran a la vez la resistencia y la resistencia muscular, como muestran los estudios sobre protocolos minimalistas de cuerpo completo.',
    progression: 'Semanas 1–2: rondas base (10–15 según el día). Semanas 3–4: +2 rondas. Semanas 5–6: +2 rondas más. Elige las repeticiones por minuto de modo que te queden ~15–20 segundos de pausa; si no queda pausa, baja las repeticiones.',
  },
  boxing_basics: {
    name: 'Boxeo: fundamentos',
    desc: 'Aprende los fundamentos del boxeo: jab, cross, gancho y juego de piernas, en asaltos clásicos de 3 minutos.',
    why: 'Entrenar boxeo en asaltos de 3 minutos es HIIT encubierto: la frecuencia cardiaca oscila entre trabajo intenso y pausa corta mientras aprendes coordinación y técnica. Cada sesión tiene un foco propio, de modo que construyes una base limpia semana a semana.',
    progression: 'Semanas 1–2: 6 asaltos (el viernes 8). Semanas 3–4: +1 asalto por sesión. Semanas 5–6: +1 asalto más. Primero técnica y luego ritmo: las combinaciones, despacio y limpias antes que rápidas. El último asalto de cada sesión puede ser «acondicionamiento puro».',
    fokus: {
      mon: 'Golpes básicos y guardia',
      wed: 'Combinaciones y pegada',
      fri: 'Resistencia por asaltos',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboxing: acondicionamiento',
    desc: 'Entrenamiento de kickboxing centrado en el acondicionamiento y la técnica: patadas, golpes y combinaciones por asaltos.',
    why: 'El kickboxing combina tren superior e inferior como pocos deportes: las patadas exigen piernas, cadera y core, y los golpes, hombros y brazos. Los estudios muestran que los asaltos de kickboxing llevan la frecuencia cardiaca cerca del máximo: obtienes efectos de HIIT y movilidad a la vez.',
    progression: 'Semana 4: +1 asalto en cada sesión. Semana 7: otro asalto más. Los días de técnica van antes que los de acondicionamiento: aprende las patadas nuevas despacio al aire antes de ejecutarlas con fatiga. Estira brevemente la cadera a diario.',
    fokus: {
      mon: 'Técnica de patada',
      tue: 'Explosividad y resistencia',
      thu: 'Combinaciones de golpe y patada',
      sat: 'Simulación de combate',
    },
  },
  mma_fundamentals: {
    name: 'MMA: fundamentos',
    desc: 'Iniciación a las artes marciales mixtas: golpeo, patadas y acondicionamiento específico de combate reunidos en una semana.',
    why: 'Las MMA son el arte marcial más completo: golpear, patear y luchar en el suelo exigen fuerza, velocidad y resistencia a la vez. Las ciencias del deporte recomiendan exactamente lo que refleja este programa: entrenamiento por asaltos con focos cambiantes más un día dedicado al acondicionamiento con sprawls y comba.',
    progression: 'Semana 4: golpeo de 8 a 9 asaltos, acondicionamiento de 5 a 6. Semana 7: patadas de 6 a 7 asaltos. El sábado largo (asaltos de 5 minutos como en las MMA reales) se mantiene constante: ahí cuenta la calidad bajo fatiga, no más volumen.',
    fokus: {
      mon: 'Técnica de golpeo',
      tue: 'Patadas y rodillas',
      thu: 'Acondicionamiento de combate',
      sat: 'Asaltos de 5 minutos como en competición',
    },
  },
  boxing_advanced: {
    name: 'Boxeo avanzado',
    desc: 'Entrenamiento de boxeo avanzado: más volumen, sesiones más largas y combinaciones complejas.',
    why: 'A nivel avanzado, lo que decide es la capacidad de trabajo: los boxeadores de élite llegan con valores de VO₂máx en torno a 60 ml/kg/min, construidos justamente con esta estructura de asaltos de técnica, saco y acondicionamiento. La simulación de sparring del sábado lo reúne todo bajo una fatiga cercana a la del combate.',
    progression: 'Semana 4: +1 asalto en técnica y saco. Semana 7: otro asalto más y acondicionamiento de 8 a 10 asaltos. Semanas 9–10: mantén el volumen y sube la intensidad de las combinaciones (más rápidas, más fuertes, menos pausa entre combinaciones).',
    fokus: {
      mon: 'Combinaciones complejas',
      tue: 'Pegada y ritmo',
      fri: 'Capacidad de trabajo',
      sat: 'Todo bajo fatiga',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Entrenamiento de fitness inspirado en las artes marciales y sin conocimientos previos: elementos de boxeo y patadas como trabajo de cuerpo completo.',
    why: 'La entrada para quienes quieren la forma física de los deportes de combate sin ambición competitiva: boxeo de sombra, patadas y ejercicios con el peso corporal en asaltos cortos de 2 minutos. El entrenamiento por asaltos actúa fisiológicamente como el interválico, con el aliciente añadido de aprender técnicas de verdad.',
    progression: 'Semana 3: un asalto más por sesión. Semana 5: los asaltos pasan de 2:00 a 2:30. Mantén las pausas disciplinadas en 60 segundos: el efecto sobre la forma física viene de la relación entre trabajo y pausa.',
    fokus: {
      mon: 'Golpes y tren superior',
      wed: 'Patadas y piernas',
      sat: 'Todo combinado',
    },
  },
};
