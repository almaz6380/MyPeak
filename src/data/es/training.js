// Spanische Fassung von `src/data/trainingKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fundamentos',
    hypertrophie: 'Desarrollo muscular',
    programmierung: 'Programación',
    regeneration: 'Recuperación',
  },

  progressive_overload: {
    name: 'Sobrecarga progresiva',
    summary: 'El principio más importante para progresar a largo plazo: el estímulo del entrenamiento tiene que aumentar de forma sistemática con el tiempo para que el cuerpo siga adaptándose. Sin progresión, la fuerza y el desarrollo muscular se estancan.',
    quick: [
      { label: 'Idea central', text: 'Poco a poco más peso, repeticiones, series o mejor técnica: el estímulo tiene que subir.' },
      { label: 'Para quién', text: 'Todos los niveles. Los principiantes progresan rápido; los avanzados necesitan pasos más pequeños y planificados.' },
    ],
    sections: [
      {
        title: '¿Qué es la sobrecarga progresiva?',
        content: 'La sobrecarga progresiva describe el aumento gradual de las exigencias sobre el cuerpo durante el entrenamiento. La idea de fondo se remonta al principio de la supercompensación: un estímulo de entrenamiento altera el equilibrio biológico, el cuerpo se repara y se adapta a un nivel de rendimiento algo mayor. Si después el estímulo se mantiene igual, no hay motivo para una nueva adaptación y el progreso se detiene.\n\nEl concepto procede originalmente de la rehabilitación: Thomas DeLorme desarrolló en los años cuarenta el concepto de «progressive resistance exercise» para recuperar la fuerza muscular de soldados heridos (DeLorme, 1945, Journal of Bone and Joint Surgery). Desde entonces se ha convertido en el fundamento de todo entrenamiento serio de fuerza y desarrollo muscular.\n\nEs importante entender que «más peso» es solo una de varias formas de progresar. El estímulo también puede aumentarse mediante más repeticiones, más series, pausas más cortas, un mayor recorrido articular o una ejecución más lenta y controlada.',
      },
      {
        title: 'Base científica',
        content: 'La necesidad de una progresión gradual es uno de los principios mejor documentados de las ciencias del entrenamiento. El documento de posición del American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) menciona expresamente la sobrecarga progresiva como requisito para ganancias continuadas de fuerza e hipertrofia y recomienda un aumento planificado de la carga y el volumen.\n\nUna revisión de Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) muestra que tanto las cargas altas como las moderadas pueden provocar crecimiento muscular; lo decisivo es que las series se lleven cerca del agotamiento muscular y que el estímulo aumente con el tiempo. Eso subraya que la progresión puede plantearse con flexibilidad.\n\nAdemás, las adaptaciones al entrenamiento siguen el principio SAID («Specific Adaptation to Imposed Demands»): el cuerpo se adapta exactamente a la carga que recibe. Si la carga no sube, tampoco hay adaptación, una relación confirmada de forma consistente en fisiología del deporte desde hace décadas.',
      },
      {
        title: 'Métodos de progresión',
        content: 'Hay varias vías practicables para aumentar el estímulo. La más conocida es incrementar la carga: más peso en la barra. En la mayoría de los ejercicios tienen sentido saltos de 2,5 kg (tren superior) o 5 kg (tren inferior), en cuanto se alcanza limpiamente el número superior de repeticiones.\n\nLa doble progresión es un método especialmente apto para principiantes: se elige un rango de repeticiones (por ejemplo 8–12). Primero se va subiendo dentro de ese rango (más repeticiones con el mismo peso) y, en cuanto se alcanza el límite superior en todas las series, se sube el peso y se empieza de nuevo por abajo.\n\nOtras posibilidades son: más series por grupo muscular (aumento de volumen), pausas más cortas con el mismo rendimiento, un recorrido articular mayor o una fase excéntrica más controlada y lenta. Es importante cambiar siempre una sola variable a la vez, para poder seguir el progreso con claridad.',
      },
      {
        title: 'Errores frecuentes',
        content: 'El error más frecuente es progresar demasiado deprisa: quien sube el peso antes de dominar la técnica se arriesga a lesionarse y, a menudo, deja de trabajar el músculo objetivo. El peso solo debería subir cuando todas las repeticiones planificadas se logran con buena forma.\n\nUn segundo error es creer que la progresión debe producirse en cada sesión. Los avanzados, en particular, no pueden añadir peso cada semana; aquí cuenta la tendencia a lo largo de semanas y meses, no el día de entrenamiento concreto. Las pequeñas oscilaciones por el sueño, el estrés o la alimentación son normales.\n\nEl tercer error es la falta de registro. Sin anotar peso, repeticiones y series apenas se puede dirigir la progresión: sencillamente no se sabe si se ha mejorado. Un diario de entrenamiento es, por tanto, la herramienta más importante para progresar a largo plazo.',
      },
      {
        title: 'Resumen',
        content: 'La sobrecarga progresiva es la ley básica del entrenamiento: sin un estímulo creciente no hay adaptación duradera. Se puede aplicar mediante el peso, las repeticiones, las series, las pausas, el recorrido articular o el ritmo de ejecución, no solo con más peso.\n\nPara los principiantes, la doble progresión en el rango de 8–12 repeticiones funciona de maravilla. Los avanzados deberían pensar en ciclos más largos y planificar su progresión en lugar de forzarla. En cualquier caso, lo decisivo es documentar el progreso y anteponer la técnica al peso.\n\nQuien progresa con paciencia y de forma sistemática construye fuerza y músculo de manera continuada a lo largo de los años: justamente eso es el núcleo de un entrenamiento exitoso.',
      },
    ],
  },

  volume_frequency: {
    name: 'Volumen y frecuencia de entrenamiento',
    summary: 'El volumen (series × repeticiones × peso) es la palanca más potente para el desarrollo muscular. La frecuencia describe cuántas veces por semana se entrena un músculo. Juntos determinan cuánto estímulo recibe un músculo y con qué facilidad puede recuperarse.',
    quick: [
      { label: 'Referencia de volumen', text: 'Unas 10–20 series exigentes por grupo muscular y semana para la mayoría.' },
      { label: 'Referencia de frecuencia', text: 'Entrenar cada músculo 2 veces por semana suele ser mejor que 1, con el mismo volumen semanal.' },
    ],
    sections: [
      {
        title: '¿Qué significa volumen?',
        content: 'El volumen de entrenamiento es la medida de la cantidad total de trabajo realizado. Lo más habitual es contar las «series exigentes» por grupo muscular y semana, es decir, las series llevadas cerca del fallo muscular (aproximadamente entre 0 y 4 repeticiones en reserva). De forma más precisa, el volumen se calcula como series × repeticiones × peso (tonelaje), pero el recuento de series se ha impuesto en la práctica como una aproximación robusta.\n\nEl volumen se considera el factor aislado más importante para el crecimiento muscular. El metanálisis de Schoenfeld, Ogborn y Krieger (2017, Journal of Sports Sciences) encontró una clara relación dosis-respuesta: más series semanales llevaron a más hipertrofia, hasta un punto a partir del cual el beneficio adicional disminuye y la recuperación se resiente.\n\nPara la mayoría de quienes entrenan, el rango razonable está en unas 10–20 series exigentes por grupo muscular y semana. Los principiantes ya se benefician del extremo bajo; los avanzados necesitan a menudo más para seguir generando estímulo.',
      },
      {
        title: '¿Qué significa frecuencia?',
        content: 'La frecuencia describe cuántas veces se entrena un músculo dentro de una semana. Que un músculo se estimule 1, 2 o 3 veces por semana no cambia necesariamente el volumen semanal: solo lo reparte de otro modo. Quien divide 16 series de pecho en dos sesiones hace 8 series por sesión en lugar de 16 en una.\n\nEl metanálisis de Schoenfeld, Grgic y Krieger (2019, Journal of Sports Sciences) muestra que, con el mismo volumen semanal, una frecuencia mayor tiende a producir algo más de crecimiento muscular, probablemente porque la síntesis de proteína muscular solo permanece elevada unas 24–48 horas tras el entrenamiento y los estímulos más frecuentes la reactivan más veces.\n\nEn la práctica, eso significa que entrenar cada músculo dos veces por semana es para la mayoría un buen compromiso entre estímulo, recuperación y calidad del entrenamiento. Las frecuencias muy altas apenas aportan un beneficio adicional, siempre que el volumen sea el adecuado.',
      },
      {
        title: 'Gestionar bien el volumen',
        content: 'El volumen no debería tratarse de forma estática, sino individual y dinámica. Un buen comienzo es el extremo bajo del rango (unas 10 series por músculo y semana). Desde ahí, el volumen puede subirse poco a poco a lo largo de las semanas, mientras la recuperación, el sueño y el rendimiento lo permitan.\n\nEl concepto de «volumen máximo recuperable» (MRV) describe el límite superior de volumen del que una persona todavía puede recuperarse. Si se supera, el rendimiento baja y el riesgo de lesión aumenta. Son señales de un volumen excesivo las caídas de rendimiento persistentes, el mal sueño, las agujetas continuas y la pérdida de motivación.\n\nLos grupos musculares menos desarrollados o los puntos débiles pueden priorizarse con algo más de volumen, mientras que las zonas ya bien desarrolladas se apañan con un volumen de mantenimiento (a menudo 6–10 series). Así se emplea de forma dirigida la capacidad limitada de recuperación.',
      },
      {
        title: 'Errores frecuentes',
        content: 'El error clásico del principiante es demasiado volumen demasiado pronto. Más no es automáticamente mejor: más allá del límite individual de recuperación, el volumen adicional incluso frena el progreso. Es más inteligente empezar con menos e ir subiendo despacio.\n\nUn segundo error es contar «volumen basura»: las series muy lejos del fallo muscular o con mala técnica apenas contribuyen al crecimiento, pero sí cuestan recuperación. Solo cuentan como volumen efectivo las series que realmente exigen al músculo objetivo.\n\nEn tercer lugar, la frecuencia se confunde a menudo con el volumen. Entrenar un músculo más veces solo aporta más si el volumen semanal es suficiente. Seis sesiones a la semana con un estímulo demasiado bajo en cada una son peores que tres sesiones bien planteadas.',
      },
      {
        title: 'Resumen',
        content: 'El volumen es la palanca más potente para el desarrollo muscular; un rango de unas 10–20 series exigentes por músculo y semana encaja para la mayoría. La frecuencia reparte ese volumen: dos veces por semana y músculo es un estándar contrastado.\n\nEmpieza por el extremo bajo del rango de volumen y sube despacio, observando la recuperación y el rendimiento. Cuenta solo las series efectivas y exigentes, y adapta el volumen de cada grupo muscular a tus objetivos.\n\nEl volumen y la frecuencia no son reglas rígidas, sino herramientas que ajustas a tu capacidad de recuperación. Quien maneja ambas de forma consciente entrena de manera más eficiente y evita tanto quedarse corto como pasarse.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Cómo crecen los músculos',
    summary: 'El crecimiento muscular (hipertrofia) surge cuando el entrenamiento eleva la síntesis de proteína muscular por encima de su degradación y ese estímulo se repite con regularidad. El motor principal es la tensión mecánica de las series exigentes, combinada con suficiente proteína y descanso.',
    quick: [
      { label: 'Motor principal', text: 'Tensión mecánica: series cerca del agotamiento con técnica controlada.' },
      { label: 'Requisitos', text: 'Proteína suficiente (~1,6–2,2 g/kg), calorías en mantenimiento o ligero superávit, y sueño.' },
    ],
    sections: [
      {
        title: 'La biología del crecimiento muscular',
        content: 'Los músculos están formados por fibras musculares que contienen proteínas contráctiles (actina y miosina). Crecer significa, ante todo, que esas fibras se hacen más gruesas porque se incorporan más proteínas contráctiles: es lo que se llama hipertrofia miofibrilar. El cuerpo construye proteína muscular de forma continua (síntesis de proteína muscular) y también la degrada; el crecimiento solo aparece cuando la construcción predomina durante un periodo prolongado.\n\nEl entrenamiento es el detonante: una serie exigente eleva la síntesis de proteína muscular durante unas 24–48 horas (Damas et al., 2016, Journal of Physiology). Si ese estímulo se aplica con regularidad y se acompaña de material de construcción suficiente (proteína) y energía, el crecimiento se acumula a lo largo de semanas y meses.\n\nLas células satélite también desempeñan un papel: estas células madre específicas del músculo se activan con el entrenamiento y ayudan a reparar las fibras dañadas y a aportar nuevos núcleos celulares, lo que a largo plazo permite un crecimiento mayor.',
      },
      {
        title: 'Los tres mecanismos de la hipertrofia',
        content: 'Brad Schoenfeld describió en un trabajo muy citado (2010, Journal of Strength and Conditioning Research) tres posibles mecanismos del crecimiento muscular: la tensión mecánica, el estrés metabólico y el daño muscular.\n\nHoy se considera que la tensión mecánica es el motor más importante. Surge cuando los músculos trabajan contra una resistencia alta a lo largo de un recorrido completo, en especial en las últimas repeticiones duras de una serie. Las células musculares perciben esa tensión como una señal («mecanotransducción») y ponen en marcha los procesos de crecimiento.\n\nEl estrés metabólico (el «ardor» por los productos del metabolismo con repeticiones altas) y un daño muscular leve pueden actuar como apoyo, pero son menos decisivos de lo que se creía. La investigación más reciente apunta a que un daño muscular marcado es más bien un subproducto que un requisito del crecimiento.',
      },
      {
        title: 'Cómo optimizar el estímulo de crecimiento',
        content: 'Para maximizar la tensión mecánica, las series deberían llevarse cerca del agotamiento muscular, normalmente con 0–4 repeticiones en reserva. El rango exacto de repeticiones es, en cambio, sorprendentemente flexible: el crecimiento es posible en un rango amplio, de unas 5 a 30 repeticiones por serie, siempre que la serie sea lo bastante dura (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).\n\nEn la práctica se ha consolidado un rango moderado de unas 6–15 repeticiones, porque ofrece un buen compromiso entre tensión, volumen y fatiga. Las repeticiones muy bajas cargan más las articulaciones y el sistema nervioso; las muy altas resultan incómodas y agotadoras.\n\nEs importante una ejecución controlada con el recorrido completo. En particular, la posición estirada de un músculo bajo carga parece ser un estímulo de crecimiento potente: las repeticiones profundas y completas suelen ser, por tanto, más eficaces que las cortas y entrecortadas.',
      },
      {
        title: 'Alimentación y recuperación',
        content: 'Sin materiales de construcción suficientes ningún músculo puede crecer. La proteína aporta los aminoácidos para la síntesis de proteína muscular; la investigación recomienda para quienes entrenan unos 1,6–2,2 g de proteína por kilo de peso corporal y día (Morton et al., 2018, British Journal of Sports Medicine). Tiene sentido repartirla en varias comidas de 20–40 g de proteína cada una.\n\nLa energía es igualmente decisiva. El desarrollo muscular funciona mejor en mantenimiento calórico o en un ligero superávit (en torno a un +5–15 %). Con un déficit fuerte el crecimiento es posible, pero mucho más lento; sobre todo los principiantes y las personas con sobrepeso pueden al principio perder grasa y ganar músculo a la vez.\n\nEl sueño es el factor más infravalorado. Durante el sueño profundo tienen lugar la recuperación y las adaptaciones hormonales. La falta crónica de sueño reduce de forma demostrada la síntesis de proteína muscular y aumenta su degradación; entre siete y nueve horas por noche es un objetivo razonable.',
      },
      {
        title: 'Resumen',
        content: 'Los músculos crecen cuando un estímulo de entrenamiento exigente eleva la síntesis de proteína muscular por encima de su degradación y ese proceso se repite con regularidad. El motor principal es la tensión mecánica de series duras con una ejecución controlada y completa.\n\nEl rango de repeticiones eficaz es amplio (unas 5–30); en la práctica funcionan bien 6–15 repeticiones cerca del agotamiento. El volumen, la progresión y la técnica determinan el estímulo, mientras que la proteína, la energía y el sueño permiten la adaptación.\n\nEl desarrollo muscular es un proceso lento y acumulativo. Quien entrena duro con paciencia, come lo suficiente y duerme bien construirá músculo de forma continua a lo largo de meses y años.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Recuperación y sobreentrenamiento',
    summary: 'La adaptación no ocurre durante el entrenamiento, sino en la recuperación posterior. Quien entrena demasiado y se recupera poco se estanca o se debilita. El sueño, la alimentación, las pausas y una buena gestión de la carga son, por tanto, tan importantes como el propio entrenamiento.',
    quick: [
      { label: 'Regla básica', text: 'El músculo crece en la pausa. Sin recuperación no hay progreso.' },
      { label: 'Palancas principales', text: 'Sueño (7–9 h), calorías y proteína suficientes, semanas de descarga, gestión del estrés.' },
    ],
    sections: [
      {
        title: 'Por qué la recuperación es decisiva',
        content: 'El entrenamiento es un estímulo, pero la adaptación propiamente dicha —músculos más fuertes y grandes, un sistema nervioso más eficiente— ocurre en la fase de recuperación posterior. Ese juego se describe con el modelo de la supercompensación: tras una carga, el rendimiento cae primero, después se recupera y finalmente supera el nivel de partida, siempre que quede tiempo suficiente para la regeneración.\n\nSi el siguiente estímulo duro llega demasiado pronto, antes de completarse la recuperación, la fatiga se acumula. A corto plazo eso es normal e incluso forma parte del entrenamiento; de forma sostenida, en cambio, provoca pérdidas de rendimiento. El cuerpo no distingue entre el estrés del entrenamiento y otros tipos de estrés: el trabajo, la falta de sueño y la carga psíquica también cuentan.\n\nLa recuperación no es, por tanto, un «no hacer nada» pasivo, sino la parte activa en la que el estímulo del entrenamiento se convierte realmente en progreso. Quien la descuida desperdicia buena parte de su trabajo.',
      },
      {
        title: 'El sueño como principal factor de recuperación',
        content: 'Ningún otro factor influye tanto en la recuperación como el sueño. Durante el sueño tienen lugar la reparación de tejidos, la consolidación de los patrones motores en la memoria y procesos hormonales importantes, entre ellos la liberación de hormona del crecimiento.\n\nLos datos son claros: la falta de sueño empeora la fuerza, el rendimiento y la recuperación. Un estudio de Nedeltcheva et al. (2010, Annals of Internal Medicine) mostró que, con una alimentación reducida en calorías, las personas que dormían poco perdían bastante más masa muscular y menos grasa que las descansadas: con falta de sueño, el cuerpo sacrificaba preferentemente musculatura. La tasa de lesiones también aumenta de forma medible con la falta crónica de sueño.\n\nEntre siete y nueve horas por noche es un objetivo razonable para la mayoría de quienes entrenan. Unos horarios regulares, una habitación oscura y fresca y evitar las pantallas y la cafeína por la tarde mejoran la calidad del sueño de forma perceptible.',
      },
      {
        title: 'Señales de sobreentrenamiento',
        content: 'El verdadero síndrome de sobreentrenamiento es raro y necesita semanas o meses para revertirse; más frecuente es el llamado sobrealcance (overreaching), una sobrecarga pasajera. Ambos se manifiestan con señales de alarma parecidas que conviene tomarse en serio.\n\nLas señales típicas son: caída persistente del rendimiento pese a entrenar, agujetas inusualmente intensas o prolongadas, trastornos del sueño, pulso en reposo elevado, irritabilidad, pérdida de motivación e infecciones más frecuentes. Si se juntan varias, es una señal clara de que hay que reducir la carga.\n\nImportante: un solo día malo de entrenamiento no es sobreentrenamiento. Solo un patrón persistente durante una o dos semanas debería llevar a hacer ajustes. El mejor remedio no suele ser más, sino menos: reducir el volumen, dormir más y, en su caso, hacer una semana de descarga.',
      },
      {
        title: 'Descarga y gestión de la carga',
        content: 'Una semana de descarga (deload) es una fase planificada de carga reducida, en la que el volumen o la intensidad se bajan de forma consciente, normalmente a la mitad del volumen o con pesos claramente más ligeros. Sirve para eliminar la fatiga acumulada sin perder del todo el estímulo de entrenamiento.\n\nCuándo tiene sentido una descarga depende de cada persona. Muchos se benefician de una semana así cada 4 a 8 semanas de entrenamiento intenso, o siempre que se acumulen señales de alarma. Los avanzados con volúmenes altos la necesitan con más frecuencia que los principiantes.\n\nAdemás de las descargas planificadas, es importante la gestión continua de la carga: ajustar la intensidad al estado del día, alternar sesiones duras y suaves e incluir en la ecuación el estrés de la vida. La recuperación no es un esquema rígido, sino una escucha flexible de las señales del cuerpo.',
      },
      {
        title: 'Resumen',
        content: 'El progreso nace en la recuperación, no en el entrenamiento en sí. Quien aplica el estímulo pero descuida la regeneración regala resultados y se arriesga a la sobrecarga.\n\nLas palancas más eficaces son el sueño (7–9 horas), unas calorías y una proteína suficientes y una gestión consciente de la carga con semanas de descarga ocasionales. Las señales de alarma como la caída persistente del rendimiento, el mal sueño y la pérdida de motivación deben tomarse en serio.\n\nLa recuperación no es señal de debilidad, sino la parte del entrenamiento en la que ocurre la adaptación real. Quien la planifica y la respeta entrena de forma más sana y con más éxito a largo plazo.',
      },
    ],
  },

  technique_rom: {
    name: 'Técnica y recorrido articular',
    summary: 'Una técnica limpia con un recorrido completo hace los ejercicios más eficaces y seguros. Garantiza que el músculo objetivo reciba el estímulo, reduce el riesgo de lesión y es la base de cualquier progresión.',
    quick: [
      { label: 'Regla básica', text: 'Recorrido completo, controlado y con el foco en el músculo objetivo: la técnica antes que el peso.' },
      { label: 'Por qué importa', text: 'Mejor estímulo, menor riesgo de lesión y una base limpia para progresar.' },
    ],
    sections: [
      {
        title: 'Por qué cuenta la técnica',
        content: 'Una buena técnica de ejecución cumple dos funciones centrales: procura que la carga llegue realmente al músculo objetivo y mantiene las articulaciones en posiciones seguras. Las dos cosas juntas determinan si un ejercicio es eficaz y sostenible.\n\nQuien entrena con mala técnica desplaza a menudo la carga hacia músculos no deseados o hacia estructuras pasivas como ligamentos y tendones. Eso no solo reduce el efecto del entrenamiento, sino que aumenta el riesgo de lesiones por sobrecarga. La técnica no es, por tanto, un fin en sí misma, sino el requisito para que el entrenamiento cumpla su propósito.\n\nSobre todo al principio merece la pena aprender los patrones de movimiento con pesos ligeros. El sistema nervioso consolida los patrones con la repetición: una técnica bien asentada es la base sobre la que después se pueden manejar cargas más pesadas con seguridad.',
      },
      {
        title: 'El recorrido completo',
        content: 'El recorrido articular (range of motion, ROM) describe la distancia a lo largo de la cual trabaja un músculo durante un ejercicio. Como regla general, un recorrido lo más completo posible es superior a uno acortado, especialmente para el desarrollo muscular.\n\nVarios estudios lo respaldan. Un trabajo de Schoenfeld y Grgic (2020, SAGE Open Medicine) resume que los recorridos completos suelen producir más crecimiento muscular que los movimientos parciales. En especial la posición estirada bajo carga parece ser un estímulo de crecimiento potente: las sentadillas profundas, por ejemplo, favorecen el desarrollo del muslo más que las medias.\n\nHay excepciones: en algunos ejercicios o con limitaciones de salud puede tener sentido un recorrido ligeramente adaptado. En principio, sin embargo, conviene buscar el mayor recorrido posible que se pueda controlar con buena técnica y sin dolor.',
      },
      {
        title: 'Ritmo y control',
        content: 'La velocidad de ejecución de una repetición influye en el estímulo. En particular la fase excéntrica (bajar el peso) debería ser controlada: no dejar caer el peso, sino frenarlo de forma activa. Eso mantiene la tensión sobre el músculo y mejora el control.\n\nUn error frecuente es usar impulso. Quien levanta el peso con movimientos bruscos traslada el trabajo de los músculos al impulso y reduce así el efecto del entrenamiento. Las repeticiones controladas y conscientes son casi siempre más eficaces que las rápidas y descuidadas.\n\nEso no significa que cada repetición deba ser extremadamente lenta. Una pauta razonable es: fase concéntrica (subir) ágil pero controlada, fase excéntrica (bajar) en unos dos o tres segundos. El foco está siempre en sentir y dirigir de forma consciente el músculo objetivo.',
      },
      {
        title: 'Errores frecuentes y cómo corregirlos',
        content: 'El error más frecuente es usar demasiado peso a costa de la técnica. Si las últimas repeticiones solo salen con impulso, con compensaciones o con un recorrido incompleto, el peso es excesivo. La solución es sencilla: reducir y ejecutar el movimiento con limpieza.\n\nUn segundo error es descuidar la fase excéntrica. Muchos dejan caer el peso sin control y desperdician así gran parte del estímulo. Frenar de forma consciente lo corrige de inmediato.\n\nUn tercer punto es la falta de atención al músculo objetivo. La «conexión mente-músculo», es decir, el foco consciente en el músculo que trabaja, puede mejorar su activación, sobre todo en los ejercicios de aislamiento. Grabarse en vídeo o recibir la opinión de personas con experiencia ayuda a detectar y corregir los fallos técnicos.',
      },
      {
        title: 'Resumen',
        content: 'Una técnica limpia con un recorrido completo es la base de un entrenamiento eficaz y seguro. Asegura que el músculo objetivo reciba el estímulo y protege las articulaciones.\n\nBusca el mayor recorrido controlado posible, ejecuta con conciencia sobre todo la fase excéntrica y renuncia al impulso. La técnica va siempre antes que el peso: solo cuando el movimiento está asentado tiene sentido subir la carga.\n\nLa buena técnica no es algo de una sola vez, sino una prioridad permanente. Quien la cuida entrena de forma más eficaz, se mantiene más tiempo libre de lesiones y sienta las bases de un progreso continuo.',
      },
    ],
  },

  periodization: {
    name: 'Periodización y planificación',
    summary: 'La periodización es la estructuración planificada del entrenamiento a lo largo del tiempo, con fases alternas de volumen, intensidad y recuperación. Ayuda a evitar los estancamientos, a prevenir el sobreentrenamiento y a progresar de forma continua a largo plazo.',
    quick: [
      { label: 'Idea central', text: 'Planificar el entrenamiento por fases en lugar de entrenar igual cada semana.' },
      { label: 'Para quién', text: 'Sobre todo avanzados; los principiantes van lejos con una simple progresión lineal.' },
    ],
    sections: [
      {
        title: '¿Qué es la periodización?',
        content: 'La periodización es la planificación sistemática del entrenamiento a lo largo de distintos periodos de tiempo. En lugar de entrenar semana tras semana de forma idéntica, se varían de manera deliberada variables como el volumen, la intensidad, los rangos de repeticiones y la selección de ejercicios, para progresar durante más tiempo y gestionar la fatiga.\n\nEl concepto procede originalmente del deporte de alto rendimiento y se remonta a los trabajos de Leonid Matveiev y Tudor Bompa. El objetivo era llevar a los atletas a su mejor forma para determinadas competiciones. Pero la idea de fondo —alternar carga y recuperación de forma planificada— es útil para cualquiera que entrene.\n\nSuele distinguirse entre macrociclo (el plan completo, de meses a un año), mesociclo (bloques de varias semanas con un objetivo concreto) y microciclo (normalmente una semana de entrenamiento). Esa estructura ayuda a dividir el gran objetivo en etapas abarcables que se apoyan unas en otras.',
      },
      {
        title: 'Modelos de periodización',
        content: 'Existen varios modelos consolidados. La periodización lineal empieza con un volumen alto y una intensidad baja y se desplaza a lo largo de las semanas hacia menos volumen y más intensidad, de forma clásica de fases de hipertrofia a fases de fuerza.\n\nLa periodización ondulante varía la carga en intervalos más cortos, a menudo de sesión a sesión dentro de una misma semana: por ejemplo un día con repeticiones bajas y pesadas, otro con moderadas y un tercero con altas. Un metanálisis sugiere que ambos modelos son eficaces y que las diferencias en la práctica suelen ser pequeñas (Williams et al., 2017, Sports Medicine).\n\nLa periodización por bloques se concentra durante varias semanas en un único objetivo (por ejemplo un bloque de volumen seguido de un bloque de intensidad). Qué modelo encaja mejor depende de los objetivos, la experiencia y las preferencias; lo decisivo es tener un plan con variación deliberada.',
      },
      {
        title: '¿Necesitan periodización los principiantes?',
        content: 'Para los principiantes, una periodización compleja suele ser innecesaria. En los primeros meses el cuerpo responde con tanta fuerza a cualquier estímulo que una simple progresión lineal —semana tras semana algo más de peso o de repeticiones— ya produce excelentes avances. Esa fase se conoce a menudo como «ganancias de novato».\n\nSolo cuando esa progresión inicial rápida se aplana, normalmente al cabo de unos meses o de un año de entrenamiento constante, una estructura más elaborada resulta realmente útil. Entonces las fases alternas ayudan a seguir generando estímulo sin caer en el sobreentrenamiento ni en el estancamiento.\n\nPara los principiantes vale, por tanto: la constancia, la buena técnica y una progresión sencilla ganan a cualquier planificación complicada. La periodización es una herramienta para avanzados, no una obligación para empezar.',
      },
      {
        title: 'Construir un plan sencillo',
        content: 'Un buen plan de entrenamiento empieza por los objetivos y el tiempo disponible. De ahí salen la frecuencia (por ejemplo 3–4 sesiones por semana) y el reparto: cuerpo completo con pocas sesiones, o una rutina de tren superior/inferior o push-pull-piernas con más sesiones.\n\nSobre esa base se reparten los ejercicios y el volumen, de modo que cada grupo muscular se entrene idealmente dos veces por semana con un total de unas 10–20 series exigentes. Los ejercicios básicos (sentadilla, peso muerto, press de banca y militar, dominadas, remo) forman el fundamento, complementados con ejercicios de aislamiento para los puntos débiles.\n\nA lo largo de las semanas se progresa (más peso o repeticiones) y cada 4 a 8 semanas se puede planificar una semana de descarga. Un plan no tiene por qué ser complicado: tiene que encajar con tu vida, aplicarse con constancia y ajustarse con regularidad según los avances.',
      },
      {
        title: 'Resumen',
        content: 'La periodización es la variación planificada del entrenamiento a lo largo del tiempo para evitar estancamientos y sobreentrenamiento. Los modelos habituales son el lineal, el ondulante y el de bloques; en la práctica, las diferencias suelen ser menores de lo que se piensa.\n\nLos principiantes no necesitan una periodización compleja: una progresión lineal sencilla los lleva lejos durante los primeros meses. Solo los avanzados se benefician de forma perceptible de fases planificadas.\n\nLo más importante es un plan que encaje con los objetivos y el día a día, que entrene adecuadamente cada grupo muscular, que progrese y que contemple la recuperación. La estructura y la constancia ganan a cualquier método «perfecto».',
      },
    ],
  },
};
