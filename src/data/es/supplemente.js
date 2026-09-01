// Spanische Fassung von `src/data/supplementsKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fundamentos',
    leistung: 'Rendimiento',
    gesundheit: 'Salud',
  },

  creatine: {
    name: 'Creatina',
    summary: 'La creatina es el suplemento mejor investigado y más eficaz para la fuerza y el desarrollo muscular. Es segura, barata y mejora de forma demostrada el rendimiento en esfuerzos cortos e intensos. El monohidrato de creatina es la forma preferida.',
    quick: [
      { label: 'Dosis', text: '3–5 g de monohidrato al día, de forma continuada; el momento da igual. Fase de carga opcional.' },
      { label: 'Efecto', text: 'Más fuerza y repeticiones, apoya el desarrollo muscular, bien documentado y seguro.' },
    ],
    sections: [
      {
        title: 'Qué es la creatina y cómo actúa',
        content: 'La creatina es una sustancia propia del cuerpo, presente en los músculos y el cerebro, que también se obtiene de alimentos de origen animal como la carne y el pescado. En el músculo se almacena como fosfocreatina y sirve para regenerar rápidamente el ATP, el portador de energía inmediato de la célula.\n\nEn esfuerzos cortos e intensos —series pesadas de fuerza o sprints— el ATP se agota en cuestión de segundos. La fosfocreatina ayuda a reponerlo con rapidez, de modo que se puede mantener más fuerza durante más repeticiones. Unos depósitos de creatina llenos significan, por tanto, más rendimiento en el entrenamiento.\n\nCon la suplementación, el contenido de creatina en el músculo puede elevarse entre un 20 y un 40 % por encima del nivel normal. Precisamente ese aumento explica el efecto sobre el rendimiento, confirmado de forma consistente en cientos de estudios.',
      },
      {
        title: 'La evidencia científica',
        content: 'Ningún suplemento para deportistas de fuerza está mejor estudiado que la creatina. Una declaración de posición de la International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) lo resume así: el monohidrato de creatina es el complemento alimenticio más eficaz para aumentar el rendimiento en esfuerzos de alta intensidad y para apoyar el desarrollo muscular.\n\nLos efectos son bien medibles: combinada con el entrenamiento de fuerza, la creatina incrementa las ganancias de fuerza y de masa libre de grasa claramente más que el entrenamiento por sí solo. El beneficio se observa en casi todos los grupos de edad y niveles de rendimiento.\n\nMás allá del deporte, la creatina se investiga cada vez más por sus posibles ventajas cognitivas y para la salud, por ejemplo en el agotamiento mental o en edades avanzadas. Esa línea de investigación es prometedora, pero todavía no es tan clara como los datos sobre el rendimiento físico.',
      },
      {
        title: 'Dosis y uso',
        content: 'El uso es sencillo. Lo más habitual es una dosis de mantenimiento diaria de 3–5 g de monohidrato de creatina. El momento no tiene una importancia real; lo esencial es la toma diaria y continuada, ya que los depósitos se llenan con el tiempo.\n\nExiste, de forma opcional, una fase de carga: unos 20 g al día (repartidos en cuatro tomas) durante cinco a siete días, para llenar los depósitos más deprisa. Después se sigue con la dosis de mantenimiento normal. La fase de carga solo acelera el efecto; sin ella, los depósitos también están llenos al cabo de unas tres o cuatro semanas.\n\nEl monohidrato de creatina es la forma mejor estudiada y más económica; las variantes más caras (por ejemplo Kre-Alkalyn o creatina HCl) no ofrecen ningún beneficio adicional demostrado. Conviene elegir un producto con un sello de calidad como Creapure.',
      },
      {
        title: 'Seguridad y mitos',
        content: 'La creatina es uno de los suplementos más seguros que existen. Estudios de varios años no muestran efectos dañinos en personas sanas. El persistente mito de que la creatina daña los riñones no está demostrado en personas con función renal normal (Kreider et al., 2017). En caso de enfermedad renal existente, sin embargo, la toma debería consultarse con un médico.\n\nOtro mito es que la creatina provoca «retención de líquidos» en el sentido de un aspecto hinchado. En realidad, la creatina lleva agua al interior de las células musculares, lo que produce un músculo más lleno antes que una retención visible. Un ligero aumento del peso corporal al principio es normal y deseable.\n\nTambién se relaciona a veces la creatina con la caída del cabello, a partir de un único estudio. Esa relación no está demostrada científicamente. En conjunto, la creatina se tolera bien; algunas personas responden con molestias digestivas a dosis únicas muy altas, algo que se evita repartiéndola en porciones menores.',
      },
      {
        title: 'Resumen',
        content: 'La creatina es el suplemento más eficaz y mejor documentado para la fuerza y el desarrollo muscular: segura, barata y fácil de usar. De 3 a 5 g de monohidrato al día, de forma continuada, es todo lo que necesitas.\n\nEl momento da igual y la fase de carga es opcional. Elige monohidrato puro; las formas más caras no aportan nada. Las advertencias habituales sobre daño renal o caída del cabello no están demostradas en personas sanas.\n\nSi tuvieras que elegir un único suplemento para mejorar el rendimiento, la creatina sería la opción más evidente. Con enfermedades previas, como siempre, conviene consultar antes con un médico.',
      },
    ],
  },

  protein_powder: {
    name: 'Proteína en polvo (whey y similares)',
    summary: 'La proteína en polvo no es un producto milagroso, sino una fuente de proteína cómoda y barata. Ayuda a cubrir las necesidades diarias cuando resulta difícil hacerlo con alimentos normales; ni más ni menos.',
    quick: [
      { label: 'Para qué sirve', text: 'Complemento práctico para llegar al objetivo diario de proteína; no es obligatoria.' },
      { label: 'Cómo elegir', text: 'Whey (rápida), caseína (lenta), vegetal (vegana). Todas funcionan si la cantidad es suficiente.' },
    ],
    sections: [
      {
        title: 'Qué es la proteína en polvo',
        content: 'La proteína en polvo es proteína alimentaria concentrada, casi siempre a partir de leche (whey y caseína), pero también de fuentes vegetales como el guisante, el arroz o la soja. Aporta los mismos aminoácidos que los alimentos ricos en proteína, solo que en una forma práctica y de preparación rápida.\n\nLo más importante primero: la proteína en polvo no es un producto «anabólico» milagroso. Es simplemente comida, una manera cómoda de cubrir las necesidades de proteína. Quien alcanza su objetivo diario sin problemas con carne, pescado, huevos, lácteos y legumbres no necesita polvo.\n\nSu valor está en la practicidad: un batido se prepara rápido, se dosifica bien, sale barato por gramo de proteína y es fácil de llevar. Para personas con necesidades altas de proteína, poco tiempo o poco apetito, es una ayuda razonable.',
      },
      {
        title: 'Whey, caseína y proteínas vegetales',
        content: 'La whey (proteína de suero de leche) es la forma más popular. Se digiere con rapidez, es rica en el aminoácido leucina y estimula intensamente la síntesis de proteína muscular. Existe como concentrado (barato, con algo de lactosa), aislado (más puro, bajo en lactosa) e hidrolizado (predigerido, más caro).\n\nLa caseína también es una proteína láctea, pero se digiere lentamente y libera aminoácidos a lo largo de varias horas. Algunas personas la usan antes de pausas largas sin comer, por ejemplo antes de dormir. En la práctica, sin embargo, la diferencia con la whey es pequeña para la mayoría.\n\nLas proteínas vegetales (guisante, arroz, soja) son la opción para quienes viven en vegano. Algunas fuentes vegetales aisladas pueden ser limitantes en ciertos aminoácidos, por lo que los buenos productos combinan varias. Con una cantidad total suficiente, los polvos vegetales son tan eficaces para el desarrollo muscular como la whey.',
      },
      {
        title: 'Un uso con sentido',
        content: 'La proteína en polvo encaja siempre que resulte práctica una fuente de proteína rápida y de calidad: después del entrenamiento, como tentempié, en los cereales o para llegar al objetivo de proteína en días muy ocupados. Una o dos porciones al día tienen sentido para la mayoría.\n\nAhora bien, debería complementar los alimentos normales, no sustituirlos. Las fuentes de proteína completas aportan además micronutrientes, sacian mejor y forman parte de una alimentación equilibrada. Un batido es una herramienta para el día a día, no un alimento básico.\n\nAl elegir el producto merece la pena mirar la lista de ingredientes: los menos aditivos posibles, un buen contenido de proteína por porción y, a ser posible, un sello de control independiente. Los polvos muy baratos contienen a veces mucho relleno o azúcar.',
      },
      {
        title: 'Seguridad y valoración',
        content: 'Para personas sanas, la proteína en polvo es segura. La preocupación de que una ingesta alta de proteína en polvo dañe los riñones vale —como con la proteína en general— solo en caso de enfermedad renal existente. Con intolerancia a la lactosa, el aislado o las variantes vegetales se toleran mejor.\n\nUn aspecto de calidad es la pureza. Como los complementos alimenticios están menos regulados que los medicamentos, merecen la pena los productos con análisis de laboratorio independiente (por ejemplo de metales pesados o sustancias dopantes), sobre todo para deportistas de competición.\n\nEn resumen, la proteína en polvo es un producto práctico, no esencial. No sustituye una buena alimentación, pero puede ayudar a cubrir las necesidades de proteína de forma cómoda y barata. Ante dudas de salud, conviene consultar con un médico o con un profesional de la nutrición.',
      },
    ],
  },

  caffeine: {
    name: 'Cafeína',
    summary: 'La cafeína es uno de los recursos legales más eficaces para mejorar el rendimiento. Reduce la sensación de fatiga y aumenta la concentración y la resistencia a la fuerza. El efecto está bien documentado, pero la dosis debe ser individual y moderada.',
    quick: [
      { label: 'Dosis', text: 'Unos 3–6 mg por kg de peso corporal, 30–60 min antes de entrenar.' },
      { label: 'Atención', text: 'Protege el sueño (no tarde), ten en cuenta la tolerancia y prueba tu propia respuesta.' },
    ],
    sections: [
      {
        title: 'Cómo actúa la cafeína',
        content: 'La cafeína es un estimulante que actúa sobre todo bloqueando los receptores de adenosina en el cerebro. La adenosina es un mensajero que señala el cansancio; al ocupar la cafeína sus puntos de acoplamiento, la sensación de fatiga se atenúa y el esfuerzo percibido disminuye.\n\nEl resultado es un estado de mayor vigilia, mejor concentración y más disposición al esfuerzo. Para el entrenamiento eso significa que las cargas se sienten más ligeras, lo que se traduce en más repeticiones, más resistencia y, a menudo, mejor rendimiento.\n\nLa cafeína es uno de los pocos suplementos con un efecto claramente demostrado y perceptible de inmediato. Se obtiene del café, el té, las bebidas energéticas o como cafeína pura (comprimidos, polvo), y hace efecto en unos 30 a 60 minutos.',
      },
      {
        title: 'La evidencia científica',
        content: 'La cafeína es una de las sustancias mejor estudiadas para mejorar el rendimiento. Una revisión amplia (Grgic et al., 2020, British Journal of Sports Medicine) confirma efectos positivos sobre la fuerza, la resistencia muscular, los sprints y el rendimiento de resistencia en muchos deportes.\n\nLos tamaños de efecto son moderados, pero fiables. Especialmente en esfuerzos repetidos y fatigantes, y en situaciones de falta de sueño o baja motivación, la cafeína puede marcar una diferencia perceptible. El rendimiento cognitivo —tiempo de reacción, atención— también se beneficia.\n\nLa dosis eficaz se sitúa en la mayoría de los estudios en torno a 3–6 mg por kilogramo de peso corporal. Dosis más altas rara vez aportan más rendimiento, pero sí aumentan efectos secundarios como nerviosismo, taquicardia y trastornos del sueño.',
      },
      {
        title: 'Dosis y momento',
        content: 'Para el rendimiento en el entrenamiento se han consolidado unos 3–6 mg por kilogramo de peso corporal, tomados unos 30 a 60 minutos antes del esfuerzo. Para una persona de 75 kg, eso equivale aproximadamente a 225–450 mg; como referencia, una taza de café de filtro contiene unos 80–120 mg.\n\nQuien reaccione con sensibilidad o esté poco habituado debería empezar con una dosis baja y comprobar su tolerancia. Las diferencias individuales son grandes: unos toleran mucho, otros responden ya con inquietud o palpitaciones ante cantidades pequeñas.\n\nUn punto importante es el momento del día. La cafeína tiene una semivida de unas cinco o seis horas: entrenar tarde con una dosis alta puede alterar el sueño de forma notable. Como regla práctica, conviene evitar cantidades grandes en las últimas seis u ocho horas antes de dormir.',
      },
      {
        title: 'Tolerancia, efectos secundarios y seguridad',
        content: 'Con el consumo regular, el cuerpo desarrolla cierta tolerancia y el efecto se atenúa. Por eso algunas personas hacen pausas deliberadas o reservan las dosis más altas para las sesiones importantes. Renunciar por completo no es necesario; un consumo regular y moderado sigue siendo eficaz.\n\nEntre los posibles efectos secundarios están el nerviosismo, la taquicardia, las molestias de estómago, la ansiedad y los trastornos del sueño, casi siempre con dosis demasiado altas. En determinadas enfermedades cardiovasculares, durante el embarazo o con trastornos de ansiedad conviene ser prudente y consultar con un médico.\n\nEn conjunto, la cafeína se considera segura en cantidades moderadas (hasta unos 400 mg al día en adultos sanos). Las dosis únicas muy altas, sobre todo a partir de cafeína pura en polvo, pueden ser peligrosas: ahí es decisivo medir con exactitud. Como con todas las sustancias, vale la regla: encuentra la dosis eficaz que toleras, no la máxima.',
      },
      {
        title: 'Resumen',
        content: 'La cafeína es un recurso eficaz, bien documentado y legal para mejorar el rendimiento. Reduce la sensación de fatiga y mejora la concentración, la resistencia a la fuerza y el rendimiento de resistencia.\n\nUna dosis de unos 3–6 mg por kilogramo de peso corporal, 30 a 60 minutos antes de entrenar, es lo habitual. Empieza bajo, prueba tu tolerancia y protege tu sueño evitando la cafeína tardía.\n\nLa cafeína es segura en cantidades moderadas, pero puede dar problemas con sobredosis o enfermedades previas. Úsala de forma dirigida como herramienta, no como dosis máxima diaria, y consulta a un médico ante cualquier duda de salud.',
      },
    ],
  },

  omega3: {
    name: 'Ácidos grasos omega-3',
    summary: 'Los ácidos grasos omega-3 (EPA y DHA) son esenciales y regulan la inflamación. Muchas personas tienen un aporte insuficiente. El pescado azul es la mejor fuente; un suplemento puede tener sentido si apenas se come pescado.',
    quick: [
      { label: 'Fuente y dosis', text: 'Pescado azul 2–3 veces por semana; como suplemento, a menudo ~1–2 g de EPA+DHA al día.' },
      { label: 'Beneficio', text: 'Salud cardiovascular y cerebral, regulación de la inflamación; para veganos, aceite de algas.' },
    ],
    sections: [
      {
        title: 'Qué son los ácidos grasos omega-3',
        content: 'Los ácidos grasos omega-3 son un grupo de grasas poliinsaturadas que el cuerpo no puede fabricar por sí mismo y que, por tanto, debe obtener de la alimentación. Los más importantes son el EPA (ácido eicosapentaenoico) y el DHA (ácido docosahexaenoico), presentes sobre todo en el pescado azul, además del ALA (ácido alfa-linolénico) de fuentes vegetales.\n\nEl EPA y el DHA son componentes de las membranas celulares y precursores de mensajeros que regulan los procesos inflamatorios. El DHA es además un componente importante del cerebro y de la retina. Estos ácidos grasos son, por tanto, relevantes para el corazón, el cerebro y el sistema inmunitario.\n\nEl problema: la alimentación moderna aporta a menudo mucho omega-6 (de aceites vegetales procesados) y poco omega-3. Ese desequilibrio, junto con un consumo bajo de pescado, hace que muchas personas tengan un aporte insuficiente.',
      },
      {
        title: 'Importancia para la salud',
        content: 'La investigación sobre el omega-3 es amplia. Lo mejor documentado es su beneficio para la salud cardiovascular: el EPA y el DHA pueden reducir los triglicéridos en sangre y se asocian a un perfil de riesgo cardiovascular más favorable. Las sociedades científicas recomiendan un consumo regular de pescado azul.\n\nAdemás se estudia un efecto regulador de la inflamación, que podría ser relevante para la salud articular y la recuperación tras el entrenamiento. También hay indicios de efectos positivos sobre la función cerebral y el estado de ánimo, si bien aquí los datos son menos claros.\n\nEs importante distinguir entre las promesas demostradas y las exageradas. El omega-3 no es una panacea, pero un aporte suficiente es una pieza razonable de una alimentación saludable, sobre todo para quienes comen pescado con poca frecuencia.',
      },
      {
        title: 'Fuentes y suplementación',
        content: 'La mejor fuente de EPA y DHA es el pescado azul de aguas frías: salmón, caballa, arenque, sardinas. Dos o tres raciones por semana cubren las necesidades de la mayoría. Las fuentes vegetales como la linaza o las nueces aportan ALA, que el cuerpo convierte solo en pequeña medida en EPA y DHA.\n\nQuien come poco pescado o ninguno puede plantearse un suplemento. Las cápsulas de aceite de pescado o de algas aportan EPA y DHA directamente; el aceite de algas es la alternativa vegetal y vegana. Las dosis habituales de suplemento rondan 1–2 g de EPA más DHA al día, aunque la necesidad exacta es individual.\n\nAl elegir el producto importa la calidad: fíjate en el contenido real de EPA y DHA (no solo en la cantidad total de aceite de pescado), en la frescura (un aceite rancio no es deseable) y, a ser posible, en los análisis de pureza. El índice de omega-3 en sangre puede mostrar el estado de forma objetiva.',
      },
      {
        title: 'Seguridad y valoración',
        content: 'Los suplementos de omega-3 se consideran seguros y bien tolerados en dosis habituales. Los posibles efectos secundarios son un regusto a pescado o molestias digestivas leves. En dosis muy altas, el omega-3 puede influir en la coagulación de la sangre: quien tome anticoagulantes o vaya a someterse a una operación debería consultar la toma con su médico.\n\nComo con todos los suplementos, vale la regla: complementan una buena alimentación, no la sustituyen. Quien come pescado azul con regularidad no suele necesitar aceite adicional. El suplemento tiene sentido sobre todo para quienes no comen pescado y para veganos (aceite de algas).\n\nAnte dudas de salud, enfermedades existentes o toma de medicamentos, es aconsejable consultar con un médico. Un análisis del índice de omega-3 puede ayudar a estimar la necesidad individual de forma dirigida, en lugar de suplementar a ciegas.',
      },
    ],
  },

  vitamin_d: {
    name: 'Vitamina D',
    summary: 'La vitamina D es importante para los huesos, los músculos y el sistema inmunitario. Se produce sobre todo a partir de la luz solar, por lo que su déficit es frecuente en los meses con poco sol. Entonces suele tener sentido suplementarla, idealmente tras un análisis de sangre.',
    quick: [
      { label: 'Fuente', text: 'Luz solar (piel), poco de la alimentación. En invierno suele hacer falta un suplemento.' },
      { label: 'En la práctica', text: 'Con déficit, a menudo ~1000–2000 UI/día; la dosis, idealmente guiada por análisis.' },
    ],
    sections: [
      {
        title: 'Por qué la vitamina D es especial',
        content: 'La vitamina D ocupa un lugar aparte entre las vitaminas, porque el cuerpo puede producirla en la piel bajo la acción de la luz solar (radiación UV-B). En rigor actúa más bien como una hormona: regula la absorción de calcio y fosfato y es, por tanto, central para unos huesos y dientes sanos.\n\nMás allá de la salud ósea, la vitamina D tiene funciones en la musculatura y el sistema inmunitario. Sus receptores se encuentran en muchos tejidos del cuerpo, lo que explica su amplia importancia. Un déficit marcado puede contribuir a la debilidad muscular, a problemas óseos y a una mayor propensión a las infecciones.\n\nLo particular, y a la vez problemático: como la fuente principal es la luz solar, el aporte depende mucho del lugar de residencia, la estación del año, el color de la piel y el estilo de vida. En muchas regiones, la radiación solar en invierno no basta para producir suficiente vitamina D.',
      },
      {
        title: 'El déficit está muy extendido',
        content: 'El déficit de vitamina D es una de las carencias de nutrientes más frecuentes del mundo, sobre todo en latitudes septentrionales y en los meses de invierno. Las personas que trabajan mucho en interiores, tienen la piel más oscura, se cubren o son mayores tienen un riesgo mayor, ya que su producción propia está limitada.\n\nCubrir las necesidades solo con la alimentación es difícil. Pocos alimentos contienen cantidades relevantes: sobre todo el pescado azul, la yema de huevo y los productos enriquecidos. Normalmente no bastan para compensar un déficit cuando falta la producción por el sol.\n\nEl estado de vitamina D se determina con un análisis de sangre sencillo (25-OH-vitamina D). Es la vía más fiable para saber si hay que suplementar y cuánto, en lugar de adivinar.',
      },
      {
        title: 'La suplementación en la práctica',
        content: 'Si existe un déficit o si en los meses con poco sol la producción propia es escasa, suplementar tiene sentido. Con frecuencia se mencionan dosis de mantenimiento del orden de 1000–2000 UI (unidades internacionales) al día, si bien la necesidad individual puede variar mucho.\n\nLo mejor es guiar la dosis por el valor sanguíneo: un análisis muestra el punto de partida y, tras algunas semanas o meses de toma, se puede comprobar el resultado y ajustar la dosis. Así se evitan tanto el aporte insuficiente como la sobredosis.\n\nLa vitamina D3 (colecalciferol) es la forma preferida. Como es liposoluble, se absorbe mejor junto con una comida que contenga grasa. A menudo se combina con vitamina K2, que apoya el metabolismo del calcio; la evidencia al respecto es prometedora, pero no concluyente.',
      },
      {
        title: 'Seguridad y acompañamiento médico',
        content: 'La vitamina D es liposoluble y puede acumularse en el cuerpo, a diferencia de las vitaminas hidrosolubles. Dosis muy altas durante mucho tiempo pueden provocar un exceso peligroso de calcio en sangre. Aquí no vale expresamente el «más es mejor»: hay que evitar las dosis extremas sin control médico.\n\nPara la mayoría de las personas, las dosis de mantenimiento moderadas son seguras. Sin embargo, quien contemple dosis altas, tenga enfermedades previas o tome medicamentos debería hacerlo con acompañamiento médico. También aquí el análisis de sangre es la herramienta decisiva para mantenerse en el rango seguro y eficaz.\n\nEn resumen, la vitamina D es uno de los pocos suplementos con un beneficio real para muchas personas, especialmente en invierno. Lo más sensato es medir el estado y ajustar la toma a ese dato, en lugar de dosificar alto de forma indiscriminada.',
      },
    ],
  },

  magnesium: {
    name: 'Magnesio',
    summary: 'El magnesio participa en más de 300 procesos enzimáticos, entre ellos la función muscular y nerviosa, el metabolismo energético y el sueño. Un déficit leve es frecuente. Se puede cubrir con la alimentación y, si hace falta, suplementar bien.',
    quick: [
      { label: 'Función', text: 'Función muscular y nerviosa, metabolismo energético, sueño, huesos.' },
      { label: 'Fuentes', text: 'Frutos secos, semillas, cereales integrales, legumbres, verdura de hoja verde; suplemento si hace falta.' },
    ],
    sections: [
      {
        title: 'El papel del magnesio',
        content: 'El magnesio es un mineral esencial y cofactor de más de 300 reacciones enzimáticas del cuerpo. Participa en la obtención de energía (metabolismo del ATP), en la función muscular y nerviosa, en la síntesis de proteínas, en la regulación de la glucemia y en la salud ósea.\n\nPara las personas físicamente activas, el magnesio es especialmente relevante porque desempeña un papel central en la contracción y la relajación muscular y en el metabolismo energético. Un déficit puede manifestarse, entre otras cosas, con calambres musculares, cansancio, irritabilidad y peor sueño.\n\nA través del sudor y de un metabolismo más elevado, el entrenamiento intenso puede aumentar ligeramente las necesidades de magnesio. Al mismo tiempo, la ingesta de muchas personas está en el límite, ya que la alimentación muy procesada contiene poco magnesio.',
      },
      {
        title: 'Déficit y necesidades',
        content: 'Un déficit marcado de magnesio es raro con una alimentación saludable, pero un déficit leve o un aporte en el límite son relativamente frecuentes, sobre todo con una dieta monótona y muy procesada. La necesidad diaria de los adultos se sitúa en torno a 300–400 mg, según el sexo y la edad.\n\nComo el magnesio está presente en muchos alimentos sin procesar, en principio las necesidades se cubren bien con la alimentación. Son buenas fuentes los frutos secos y las semillas (por ejemplo pipas de calabaza, almendras), los productos integrales, las legumbres, la verdura de hoja verde y el chocolate negro.\n\nUn déficit de magnesio solo se detecta de forma limitada en sangre, porque la mayor parte del magnesio se almacena en las células y los huesos. Síntomas como calambres frecuentes, agotamiento o problemas de sueño pueden ser indicios —junto a otras causas— y, ante la sospecha, deberían estudiarse médicamente.',
      },
      {
        title: 'Suplementación',
        content: 'Cuando el aporte con la alimentación no basta o las necesidades son mayores, un suplemento de magnesio puede tener sentido. La forma influye en la tolerancia: se toleran y se absorben bien los compuestos orgánicos como el citrato, el glicinato o el malato de magnesio. El óxido de magnesio es barato, pero se absorbe peor y puede tener efecto laxante.\n\nLas dosis complementarias habituales rondan los 200–400 mg de magnesio elemental al día, a menudo por la noche, ya que el magnesio puede tener un efecto relajante y favorecer el sueño. Las dosis más altas pueden provocar heces blandas o diarrea, señal de que conviene reducir la cantidad.\n\nLa evidencia a favor de los suplementos de magnesio es más sólida cuando hay un déficit demostrado. En personas con un aporte suficiente, el beneficio añadido es limitado. Como siempre: primero los alimentos, el suplemento como complemento dirigido.',
      },
      {
        title: 'Seguridad y resumen',
        content: 'El magnesio de los alimentos es inocuo; el cuerpo elimina normalmente el magnesio sobrante por los riñones. Con los suplementos, el efecto secundario más frecuente es el laxante cuando la dosis es demasiado alta. Las personas con función renal reducida solo deberían tomar suplementos de magnesio tras consultar con un médico, ya que la eliminación puede estar alterada.\n\nEn resumen, el magnesio es un mineral importante con una amplia relevancia para los músculos, los nervios, el metabolismo energético y el sueño. Un déficit leve es frecuente, pero se corrige bien con una alimentación completa a base de frutos secos, semillas, cereales integrales y verdura de hoja verde.\n\nUn suplemento es una opción razonable cuando las necesidades son mayores, el aporte es insuficiente o aparecen los síntomas correspondientes: idealmente en una forma bien tolerada y, si hay enfermedades previas, de acuerdo con un médico.',
      },
    ],
  },
};
