// Spanische Fassung von `src/data/bloodworkKnowledge.js`.
// Schlüssel = `id` aus der Datendatei. Reihenfolge der `sections` muss der
// Datendatei entsprechen — sie werden über den Index zugeordnet.
// Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Hormonas',
    stoffwechsel: 'Metabolismo',
    vitamine: 'Vitaminas y minerales',
    herz: 'Sistema cardiovascular',
  },

  testosterone: {
    name: 'Testosterona',
    summary: 'La testosterona es la principal hormona anabólica e influye en el desarrollo muscular, la densidad ósea, la libido, el estado de ánimo y la energía. Su nivel se puede mejorar con el estilo de vida, pero conviene desconfiar de las promesas espectaculares.',
    quick: [
      { label: 'Importancia', text: 'Desarrollo muscular, densidad ósea, libido, empuje, estado de ánimo.' },
      { label: 'Favorecerla de forma natural', text: 'Entrenamiento de fuerza, buen sueño, peso corporal saludable, suficiente grasa y micronutrientes.' },
    ],
    sections: [
      {
        title: 'Qué hace la testosterona en el cuerpo',
        content: 'La testosterona es la principal hormona sexual masculina, pero también está presente en las mujeres en cantidades menores, donde igualmente resulta relevante. Pertenece a las hormonas anabólicas (constructoras) y desempeña un papel central en el desarrollo muscular, la fuerza, la densidad ósea, la distribución de la grasa, la libido, el estado de ánimo y la energía.\n\nEn los hombres, la testosterona se produce sobre todo en los testículos, regulada por la interacción entre el cerebro (hipotálamo, hipófisis) y los testículos. La producción sigue un ritmo diario con valores más altos por la mañana, razón por la cual las extracciones de sangre para determinarla suelen hacerse antes del mediodía.\n\nUn nivel saludable de testosterona favorece la adaptación al entrenamiento de fuerza y el bienestar general. Sin embargo, tanto los valores demasiado bajos como los artificialmente elevados (por ejemplo con anabolizantes) tienen consecuencias para la salud.',
      },
      {
        title: 'Rangos de referencia y medición',
        content: 'La testosterona se mide en sangre, normalmente como testosterona total; además resulta informativa la testosterona libre (biológicamente activa). Los rangos de referencia varían según el laboratorio, la edad y el método de medición, por lo que los valores deben interpretarse siempre en el contexto del laboratorio correspondiente y de los síntomas.\n\nEn hombres adultos, el rango de referencia de la testosterona total suele situarse aproximadamente entre 300 y 1000 ng/dl, aunque los límites son difusos. Además, un valor aislado es solo una instantánea: la hora del día, el sueño, el estrés y las enfermedades agudas pueden influir en él. Ante valores llamativos suele repetirse la medición.\n\nEs importante entender que un valor de laboratorio por sí solo no es un diagnóstico. Solo la combinación de síntomas (por ejemplo, falta de empuje, pérdida de libido, pérdida de masa muscular) con mediciones repetidas permite una valoración médica con sentido.',
      },
      {
        title: 'Qué influye en el nivel de testosterona',
        content: 'Numerosos factores del estilo de vida actúan sobre el nivel de testosterona. El sobrepeso, y en especial la grasa abdominal, se asocia a valores más bajos; la pérdida de peso puede mejorarlos. La falta crónica de sueño reduce la testosterona de forma medible: una sola semana durmiendo apenas cinco horas puede bajar los valores de manera notable (Leproult y Van Cauter, 2011, JAMA).\n\nEl entrenamiento de fuerza y una actividad física suficiente tienen efectos favorables a largo plazo, mientras que el sobreentrenamiento extremo o los déficits calóricos muy pronunciados pueden reducirla. También es importante un aporte suficiente de grasa alimentaria y de micronutrientes como el zinc y la vitamina D: una dieta muy baja en grasa puede hacer bajar los valores.\n\nEl estrés crónico eleva la hormona cortisol, que actúa en sentido contrario a la testosterona. Por eso, un estilo de vida saludable con buen sueño, alimentación equilibrada, entrenamiento regular y gestión del estrés es la base natural más eficaz para un nivel saludable de testosterona.',
      },
      {
        title: 'Expectativas realistas y consejo médico',
        content: 'El mercado está lleno de «potenciadores de testosterona» que prometen aumentos espectaculares. La mayoría de estos preparados no muestran ningún efecto, o efectos mínimos, en personas con valores normales. Un estilo de vida saludable eleva un valor bajo de forma más eficaz que cualquier producto de venta libre, y con valores normales apenas es posible «forzar» la testosterona de manera útil.\n\nUn nivel realmente bajo de testosterona (hipogonadismo) con los síntomas correspondientes es un diagnóstico médico que debe estudiarse y, en su caso, tratarse por un médico. La terapia con testosterona corresponde exclusivamente al ámbito médico, ya que exige sopesar cuidadosamente beneficios y riesgos.\n\nSe desaconseja encarecidamente el uso por cuenta propia de esteroides anabolizantes para mejorar el rendimiento: pueden suprimir la producción propia del cuerpo y causar daños graves para la salud. Ante la sospecha de un problema hormonal, el camino correcto es siempre acudir al médico.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'Vitamina D (25-OH)',
    summary: 'El valor sanguíneo de vitamina D (25-OH-vitamina D) muestra el estado de la «vitamina del sol». Su déficit es frecuente, sobre todo en invierno, y puede afectar a los huesos, los músculos y el sistema inmunitario. El valor se puede mejorar de forma dirigida.',
    quick: [
      { label: 'Qué se mide', text: '25-OH-vitamina D en sangre, el valor estándar para el estado de vitamina D.' },
      { label: 'Cómo mejorarlo', text: 'Luz solar, pescado azul y, en caso de déficit, un suplemento con la dosis guiada por análisis.' },
    ],
    sections: [
      {
        title: 'Por qué importa el valor de vitamina D',
        content: 'La vitamina D actúa en el cuerpo como una hormona y es fundamental para el metabolismo del calcio, la salud ósea, la función muscular y el sistema inmunitario. Como el cuerpo la produce por sí mismo con la exposición al sol, el aporte depende mucho de la estación del año, del lugar de residencia y del estilo de vida.\n\nEl mejor marcador del estado es la 25-hidroxi-vitamina D (25-OH-D) en sangre. Refleja la forma de reserva y ofrece una visión fiable del estado de las últimas semanas. Ese es exactamente el valor que se determina en un análisis de sangre.\n\nComo el déficit de vitamina D está muy extendido y resulta difícil de compensar solo con la alimentación, este valor es uno de los análisis de rutina más útiles, especialmente para quienes viven en latitudes septentrionales y durante los meses con poco sol.',
      },
      {
        title: 'Entender los rangos de referencia',
        content: 'El estado de vitamina D suele expresarse en nanogramos por mililitro (ng/ml) o en nanomoles por litro (nmol/l). A grandes rasgos, muchos laboratorios se orientan por esta clasificación: los valores por debajo de unos 20 ng/ml (50 nmol/l) se consideran déficit y el rango superior, suficiente, si bien los límites exactos varían según la sociedad científica.\n\nEstos límites se discuten en el ámbito profesional y no están grabados en piedra. Algunos expertos consideran razonables objetivos algo más altos, otros advierten del sobretratamiento. Lo decisivo es interpretar el propio valor a lo largo del tiempo y de acuerdo con un médico.\n\nUn valor muy bajo explica a veces molestias inespecíficas como cansancio, debilidad muscular o infecciones frecuentes. Aun así, un valor de laboratorio aislado siempre debe verse dentro del cuadro completo: es una pieza, no un diagnóstico.',
      },
      {
        title: 'Cómo mejorar el valor',
        content: 'La fuente más natural es la luz solar: una exposición regular y moderada de la piel estimula la producción propia. En los meses de verano bastan a menudo estancias breves al aire libre, mientras que en invierno, en latitudes septentrionales, la radiación UV-B no es suficiente.\n\nEn la alimentación aportan vitamina D sobre todo el pescado azul (salmón, caballa, arenque), la yema de huevo y los productos enriquecidos, aunque normalmente en cantidades que por sí solas no compensan un déficit. Por eso, cuando el déficit está demostrado, un suplemento (vitamina D3) suele ser la solución más fiable.\n\nLo más sensato es ajustar la dosis del suplemento según el valor sanguíneo: medir el punto de partida, suplementar, controlar al cabo de unos meses y ajustar. Así se permanece en el rango eficaz y seguro. Como la vitamina D es liposoluble y puede acumularse, las dosis altas deberían llevarse con acompañamiento médico.',
      },
      {
        title: 'Valoración y consejo médico',
        content: 'La vitamina D es uno de los pocos suplementos con una relevancia real y amplia; al mismo tiempo, no conviene ni dramatizar un déficit ni sobrevalorarla como panacea. No resuelve todos los problemas de salud, pero es una pieza importante.\n\nDado que las vitaminas liposolubles pueden acumularse, una dosificación alta sin control no es inofensiva. Dosis extremadamente altas durante mucho tiempo pueden provocar un exceso peligroso de calcio. De ahí la regla: medir el valor, suplementar de forma dirigida y, ante la duda, pedir consejo médico.\n\nEl valor de vitamina D es un buen ejemplo de lo útil que resulta un enfoque basado en datos: en lugar de adivinar, el análisis da claridad y permite una corrección dirigida y segura. Estos contenidos, sin embargo, no sustituyen el consejo médico.',
      },
    ],
  },

  iron_ferritin: {
    name: 'Hierro y ferritina',
    summary: 'El hierro es imprescindible para el transporte de oxígeno en la sangre. La ferritina indica las reservas de hierro. Su déficit —frecuente sobre todo en mujeres que menstrúan y en deportistas de resistencia— provoca cansancio y caída del rendimiento.',
    quick: [
      { label: 'Qué se mide', text: 'Ferritina (reservas), a menudo junto con hemoglobina, transferrina y su índice de saturación.' },
      { label: 'Grupos de riesgo', text: 'Mujeres que menstrúan, deportistas de resistencia, alimentación vegetariana o vegana.' },
    ],
    sections: [
      {
        title: 'El papel del hierro',
        content: 'El hierro es un mineral esencial y un componente central de la hemoglobina, el pigmento rojo de la sangre que transporta el oxígeno desde los pulmones a todos los tejidos. Sin hierro suficiente, el cuerpo no puede formar bastante hemoglobina funcional, lo que perjudica el suministro de oxígeno.\n\nEn el músculo, el hierro también interviene en el almacenamiento de oxígeno a través de la mioglobina, y participa en la obtención de energía dentro de las células. Por eso un déficit de hierro repercute directamente en la resistencia, la fuerza y el rendimiento general.\n\nLos síntomas típicos del déficit son cansancio, palidez, falta de aire al esforzarse, dificultad para concentrarse y una caída perceptible del rendimiento en el entrenamiento. Como estos síntomas son inespecíficos, el déficit de hierro suele pasar desapercibido durante un tiempo hasta que se detecta en un análisis.',
      },
      {
        title: 'La ferritina y los valores más importantes',
        content: 'Para valorar el estado del hierro se emplean varios valores. El más importante es la ferritina, la forma de reserva del hierro: indica hasta qué punto están llenas las reservas y desciende a menudo antes de que un déficit manifiesto sea visible en el hemograma. Una ferritina baja es, por tanto, una señal de alarma temprana.\n\nDe forma complementaria se observan la hemoglobina (el pigmento rojo propiamente dicho), la transferrina (la proteína transportadora) y el índice de saturación de transferrina. Solo el cuadro completo permite una buena valoración: una ferritina baja con hemoglobina todavía normal indica reservas vacías antes de que aparezca una anemia real.\n\nEs importante saber que la ferritina también puede elevarse en presencia de inflamación y enmascarar así un déficit. Por eso los valores de hierro deberían interpretarse siempre por un médico, junto con otros marcadores y el cuadro clínico.',
      },
      {
        title: 'Grupos de riesgo y causas',
        content: 'Determinados grupos tienen un riesgo claramente mayor de déficit de hierro. Las mujeres que menstrúan pierden sangre con regularidad y, con ella, hierro: el déficit de hierro es en ellas la carencia más frecuente de todas. Las embarazadas también tienen una necesidad muy elevada.\n\nLos deportistas de resistencia también están expuestos, entre otras razones por unas necesidades mayores, por las pérdidas a través del sudor y del tracto digestivo y por el llamado efecto del impacto del pie al correr. Quienes siguen una alimentación vegetariana o vegana absorben el hierro en una forma peor aprovechable y deberían vigilar su estado.\n\nOtras causas pueden ser un aporte insuficiente, enfermedades digestivas con absorción alterada o pérdidas de sangre ocultas. Precisamente por lo variado de las causas, un déficit de hierro poco claro o persistente debe estudiarse siempre médicamente.',
      },
      {
        title: 'Mejorarlo, pero bien',
        content: 'En la alimentación, la carne roja aporta sobre todo hierro hemo, bien aprovechable; las fuentes vegetales como las legumbres, los cereales integrales y las verduras de hoja verde contienen hierro no hemo, que se absorbe peor. La vitamina C (por ejemplo, de fruta o verdura en la misma comida) mejora notablemente la absorción del hierro vegetal, mientras que el café y el té la dificultan.\n\nCuando el déficit está demostrado, la alimentación no suele bastar para llenar las reservas con rapidez; entonces pueden ser necesarios los preparados de hierro. Ahora bien, no deben tomarse a ciegas: suplementar hierro sin déficit no es inofensivo, ya que el hierro sobrante puede acumularse en el cuerpo y causar daño.\n\nPor eso, con el hierro vale especialmente la regla: primero medir, después actuar de forma dirigida. La dosis y la duración de un tratamiento con hierro corresponden al médico, igual que la búsqueda de la causa. Estos contenidos sirven de información y no sustituyen un diagnóstico médico.',
      },
    ],
  },

  cholesterol: {
    name: 'Colesterol y lípidos en sangre',
    summary: 'El colesterol y los triglicéridos son lípidos sanguíneos importantes. Su perfil (LDL, HDL, triglicéridos) es un marcador central de la salud cardiovascular. El estilo de vida influye mucho, pero la valoración corresponde al médico.',
    quick: [
      { label: 'Valores importantes', text: 'Colesterol total, LDL, HDL y triglicéridos, en conjunto el perfil lipídico.' },
      { label: 'Cómo influir favorablemente', text: 'Fibra, grasas insaturadas, actividad física, peso saludable y pocas grasas trans.' },
    ],
    sections: [
      {
        title: 'Qué es el colesterol',
        content: 'El colesterol es una sustancia similar a la grasa que el cuerpo necesita para construir membranas celulares, hormonas y ácidos biliares. Es, por tanto, imprescindible para la vida y no algo «malo» en sí mismo. El cuerpo fabrica la mayor parte del colesterol por su cuenta; una parte procede de la alimentación.\n\nComo el colesterol es liposoluble, viaja en la sangre unido a proteínas transportadoras: las lipoproteínas. Las más conocidas son la LDL («lipoproteína de baja densidad») y la HDL («lipoproteína de alta densidad»). Simplificando, la LDL transporta colesterol hacia los tejidos, mientras que la HDL devuelve el colesterol sobrante al hígado.\n\nOtro valor lipídico importante son los triglicéridos, la principal forma de grasa almacenada. En conjunto, el colesterol total, la LDL, la HDL y los triglicéridos componen el perfil lipídico que se determina en un análisis de sangre.',
      },
      {
        title: 'LDL, HDL y su valoración',
        content: 'Tanto la proporción como la magnitud de cada valor son relevantes para la salud cardiovascular. Un colesterol LDL elevado de forma sostenida se asocia a un mayor riesgo de depósitos en los vasos sanguíneos (arteriosclerosis), por lo que la LDL suele denominarse colesterol «desfavorable». La HDL, en cambio, se considera más bien «favorable», ya que participa en el transporte de retorno.\n\nUnos triglicéridos elevados también son un factor de riesgo, a menudo en relación con el sobrepeso, un consumo alto de azúcar y la falta de actividad física. Sin embargo, para valorar el riesgo no cuenta un valor aislado, sino el perfil completo junto con otros factores como la tensión arterial, el tabaquismo, los antecedentes familiares y la glucemia.\n\nLos rangos objetivo exactos dependen mucho del riesgo global individual y los fija el médico. Un valor «alto» no implica automáticamente que haya que actuar, y uno «normal» no excluye del todo el riesgo: por eso la valoración médica es decisiva.',
      },
      {
        title: 'Lo que aporta el estilo de vida',
        content: 'El estilo de vida influye de forma considerable en los lípidos sanguíneos. Una alimentación rica en fibra, con abundante verdura, fruta, legumbres y cereales integrales, puede reducir el colesterol LDL. Sustituir las grasas saturadas por insaturadas (aceite de oliva, frutos secos, pescado azul) resulta favorable, mientras que las grasas trans artificiales son claramente desfavorables y conviene evitarlas.\n\nLa actividad física regular mejora el perfil lipídico, en especial los triglicéridos y la HDL. También contribuyen a la salud cardiovascular un peso corporal saludable, no fumar y un consumo moderado de alcohol. Estas medidas actúan en conjunto y son la base de cualquier mejora.\n\nImporta la valoración realista: una parte de los valores de colesterol es de origen genético y solo puede modificarse de forma limitada con el estilo de vida. Algunas personas tienen valores elevados pese a llevar una vida saludable; en esos casos puede ser necesario un tratamiento farmacológico, que decide exclusivamente el médico.',
      },
      {
        title: 'Valoración y consejo médico',
        content: 'El perfil lipídico es uno de los análisis de rutina más importantes para estimar el riesgo cardiovascular. Precisamente porque los depósitos en los vasos no causan síntomas durante mucho tiempo, el control periódico resulta útil, sobre todo a medida que avanza la edad o cuando hay antecedentes familiares.\n\nLa interpretación es compleja y corresponde al médico. Si un valor se trata y cómo se trata depende del riesgo global individual, no de una cifra aislada. Los cambios en el estilo de vida son casi siempre el primer paso; los medicamentos como las estatinas se añaden cuando el riesgo lo justifica y están bien estudiados.\n\nUsa este conocimiento para comprender mejor tu propio perfil lipídico y trabajar de forma dirigida los factores del estilo de vida. La valoración y el tratamiento concretos de tus valores deberían hacerse siempre con un médico: estos contenidos no sustituyen el asesoramiento médico.',
      },
    ],
  },

  blood_sugar: {
    name: 'Glucemia y HbA1c',
    summary: 'La glucemia (glucosa) y el valor a largo plazo HbA1c muestran hasta qué punto el cuerpo procesa bien el azúcar. Son marcadores centrales del metabolismo y del riesgo de diabetes. La alimentación y la actividad física influyen mucho.',
    quick: [
      { label: 'Qué se mide', text: 'Glucemia en ayunas (valor puntual) y HbA1c (media de los últimos ~3 meses).' },
      { label: 'Cómo influir favorablemente', text: 'Actividad física, peso saludable, dieta rica en fibra, poco azúcar; el trabajo de fuerza ayuda.' },
    ],
    sections: [
      {
        title: 'Glucemia e insulina',
        content: 'La glucosa (azúcar en sangre) es un portador de energía central para el cuerpo. Después de comer, la glucemia sube y el páncreas libera la hormona insulina. La insulina introduce la glucosa en las células y devuelve así la glucemia a un nivel normal.\n\nEste sistema finamente ajustado mantiene la glucemia en un rango estrecho. Si funciona bien, el azúcar se procesa de forma eficiente. Si el efecto de la insulina está alterado (resistencia a la insulina), el cuerpo tiene que producir cada vez más insulina y la glucemia se mantiene demasiado alta: una fase previa a la diabetes tipo 2.\n\nLa musculatura desempeña aquí un papel importante: los músculos activos captan glucosa y mejoran la sensibilidad a la insulina. Por eso el entrenamiento regular, y en especial el de fuerza, es uno de los factores más eficaces para un metabolismo del azúcar saludable.',
      },
      {
        title: 'Glucemia en ayunas y HbA1c',
        content: 'Dos valores son especialmente informativos. La glucemia en ayunas se mide tras varias horas sin comer y muestra el nivel de azúcar actual. Es una instantánea y puede oscilar según la alimentación, el estrés y la hora del día.\n\nEl valor de HbA1c («azúcar a largo plazo») refleja la glucemia media de los últimos dos o tres meses aproximadamente. Mide la proporción de hemoglobina a la que se ha adherido azúcar. Como abarca un periodo más largo, es más robusto frente a las oscilaciones a corto plazo y se utiliza para el diagnóstico y el seguimiento.\n\nAmbos valores juntos ofrecen una buena imagen del metabolismo del azúcar. Unos valores elevados pueden indicar una fase previa a la diabetes (prediabetes) o una diabetes ya existente. Los límites exactos y su interpretación los establece el médico.',
      },
      {
        title: 'Influencia de la alimentación y la actividad física',
        content: 'El metabolismo del azúcar se puede influir mucho a través del estilo de vida. Una alimentación rica en fibra, con verdura, legumbres y cereales integrales, provoca una subida de la glucemia más lenta y uniforme que los alimentos muy procesados y ricos en azúcar. Reducir las bebidas azucaradas y los productos de harina refinada resulta especialmente eficaz.\n\nLa actividad física es un factor clave. Tanto el entrenamiento de resistencia como el de fuerza mejoran la sensibilidad a la insulina y ayudan a los músculos a captar glucosa. Incluso un paseo después de comer puede amortiguar la subida de la glucemia. Además, ganar masa muscular agranda el «almacén de azúcar» del cuerpo.\n\nUn peso corporal saludable, y en particular la reducción de la grasa abdominal, mejora claramente los valores de glucemia. Estas medidas de estilo de vida son la estrategia más eficaz y la primera para contrarrestar la prediabetes y reducir el riesgo de diabetes.',
      },
      {
        title: 'Valoración y consejo médico',
        content: 'La glucemia y la HbA1c están entre los análisis preventivos más importantes, porque un metabolismo del azúcar alterado no causa síntomas durante mucho tiempo pero puede tener consecuencias graves. Detectar pronto una prediabetes abre la oportunidad de corregir el rumbo con cambios en el estilo de vida antes de que aparezca la diabetes.\n\nUnos valores elevados son una señal de alarma importante, pero no un autodiagnóstico. La interpretación, el estudio posterior y un posible tratamiento corresponden al médico. Si ya existe diabetes, el seguimiento médico estructurado es imprescindible.\n\nUsa este conocimiento para entender el significado de tus valores y emplear de forma dirigida la alimentación y la actividad física. El entrenamiento de fuerza y una alimentación equilibrada y rica en fibra son aliados poderosos para un metabolismo del azúcar saludable. Estos contenidos, sin embargo, no sustituyen el asesoramiento ni el diagnóstico médico.',
      },
    ],
  },

  thyroid: {
    name: 'Tiroides (TSH)',
    summary: 'La tiroides regula, mediante sus hormonas, el metabolismo, la energía y la temperatura corporal. El valor de TSH es la prueba de cribado más importante para detectar hipo- o hiperfunción. Cualquier alteración debe estudiarse siempre médicamente.',
    quick: [
      { label: 'Qué se mide', text: 'TSH como prueba de cribado; si hay alteración, además fT3/fT4 y, en su caso, anticuerpos.' },
      { label: 'Síntomas', text: 'Cansancio, cambios de peso, sensación de frío o calor, estado de ánimo: inespecíficos, consultar al médico.' },
    ],
    sections: [
      {
        title: 'La tiroides y sus hormonas',
        content: 'La tiroides es una glándula pequeña con forma de mariposa situada en el cuello, y tiene un efecto enorme. Produce las hormonas tiroideas T3 (triyodotironina) y T4 (tiroxina), que regulan el metabolismo basal, el metabolismo energético, la temperatura corporal, el ritmo cardiaco y muchas otras funciones.\n\nLa tiroides está controlada por un circuito de regulación con el cerebro. La hipófisis libera la hormona TSH (hormona estimulante del tiroides), que induce a la tiroides a producir hormonas. Este circuito ajusta finamente la cantidad de hormona a las necesidades del cuerpo.\n\nSi la función tiroidea está alterada, ello repercute en todo el organismo. Una hipofunción (hipotiroidismo) ralentiza el metabolismo; una hiperfunción (hipertiroidismo) lo acelera. Ambas se manifiestan con una gran variedad de síntomas inespecíficos.',
      },
      {
        title: 'Por qué la TSH es el valor más importante',
        content: 'El valor de TSH es la prueba de cribado más sensible para la función tiroidea. La razón está en el circuito de regulación: si la tiroides produce pocas hormonas, el cuerpo intenta compensarlo y libera más TSH, de modo que un valor alto de TSH suele apuntar a una hipofunción. Si produce demasiadas, la TSH baja, lo que puede indicar una hiperfunción.\n\nComo la TSH reacciona ya ante desviaciones pequeñas, se determina como primer valor. Si la TSH resulta llamativa, siguen otras pruebas: las hormonas tiroideas libres fT3 y fT4 y, en su caso, anticuerpos para detectar causas como la enfermedad autoinmune de Hashimoto.\n\nLos rangos de referencia de la TSH varían según el laboratorio, y la interpretación depende de cada caso: la edad, un embarazo o los síntomas presentes. Un único valor límite no significa automáticamente que haya una enfermedad.',
      },
      {
        title: 'Síntomas y trastornos frecuentes',
        content: 'Un hipotiroidismo se manifiesta con frecuencia como cansancio, falta de empuje, aumento de peso, sensibilidad al frío, piel seca y ánimo bajo. Un hipertiroidismo, en cambio, suele mostrarse como nerviosismo, taquicardia, pérdida de peso pese al apetito, sensibilidad al calor y trastornos del sueño.\n\nEstos síntomas son inespecíficos y pueden tener muchas otras causas; precisamente por eso el análisis de sangre resulta tan valioso, para comprobar o descartar la tiroides como causa. Para las personas físicamente activas, una tiroides que funcione bien es importante, ya que influye en la energía, la recuperación y el metabolismo.\n\nLos trastornos frecuentes son la enfermedad autoinmune de Hashimoto (que suele llevar a hipofunción) y la enfermedad de Graves-Basedow (que lleva a hiperfunción). También la falta de yodo puede afectar a la tiroides. El diagnóstico preciso exige siempre una exploración médica.',
      },
      {
        title: 'Valoración y consejo médico',
        content: 'La tiroides es un ejemplo de cómo un órgano pequeño influye en todo el cuerpo. El valor de TSH es una prueba de cribado sencilla e informativa, que puede tener sentido ante síntomas poco claros como cansancio persistente, cambios de peso inexplicables u oscilaciones del estado de ánimo.\n\nA diferencia de otros valores, un trastorno real de la función tiroidea no se puede «entrenar hasta hacerlo desaparecer» con el estilo de vida. Un aporte suficiente de yodo (mediante sal yodada y alimentos) favorece la función normal, pero un trastorno ya establecido necesita un tratamiento médico dirigido, a menudo con preparados hormonales.\n\nPor eso aquí vale especialmente: los valores tiroideos alterados o los síntomas correspondientes corresponden siempre al médico. Este conocimiento te ayuda a comprender el significado del valor de TSH y a tomar en serio los síntomas; expresamente, no sustituye el diagnóstico ni el tratamiento.',
      },
    ],
  },
};
