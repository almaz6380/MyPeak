// Spanische Fassung von `src/data/nutritionKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fundamentos',
    makros: 'Macronutrientes',
    mikros: 'Micronutrientes',
    praxis: 'Práctica',
  },

  energy_balance: {
    name: 'Balance energético y calorías',
    summary: 'El balance energético —calorías ingeridas frente a calorías gastadas— determina si ganas o pierdes peso. Es el principio básico más importante de la alimentación, por encima de todos los demás detalles.',
    quick: [
      { label: 'Idea central', text: 'Déficit → adelgazar, superávit → engordar, mantenimiento → peso estable. Las calorías mandan.' },
      { label: 'En la práctica', text: 'Calcula tu GET a grandes rasgos, fija un objetivo, observa 2–3 semanas y ajusta.' },
    ],
    sections: [
      {
        title: 'El principio del balance energético',
        content: 'El balance energético describe la relación entre la energía que ingieres con los alimentos y la energía que gasta tu cuerpo. Si ingieres más de lo que gastas (superávit), el cuerpo almacena la energía sobrante, sobre todo como grasa. Si gastas más de lo que ingieres (déficit), recurre a sus reservas y adelgazas.\n\nEste principio se apoya en el primer principio de la termodinámica: la energía no se pierde, solo se transforma. Numerosos estudios controlados confirman que el balance energético es el factor decisivo en los cambios de peso, con independencia de los alimentos de los que procedan las calorías (Hall y Guo, 2017, Gastroenterology).\n\nEso no significa que la calidad de los alimentos dé igual. Influye en la saciedad, la salud, el rendimiento y en lo fácil que resulta mantener un determinado nivel calórico. Pero para la pregunta pura de «engordar o adelgazar», lo decisivo es el balance calórico total.',
      },
      {
        title: 'Los componentes del gasto calórico',
        content: 'El gasto energético total diario (GET) se compone de cuatro partes. El metabolismo basal (TMB) representa la mayor porción, entre el 60 y el 70 %: es la energía que el cuerpo necesita en reposo solo para funciones vitales como la respiración, la circulación y el metabolismo celular.\n\nLa termogénesis inducida por los alimentos (ETA) supone alrededor del 10 %: la energía que se invierte en digerir y procesar la comida. La proteína tiene el mayor efecto térmico, una de las razones por las que una alimentación rica en proteína ayuda a adelgazar.\n\nLa tercera parte, y la más variable, es la actividad. Se distingue entre el ejercicio deportivo y la actividad cotidiana (NEAT, termogénesis por actividad no deportiva): caminar, moverse, estar de pie. El NEAT puede variar entre personas en varios cientos de calorías al día y a menudo se adapta de forma inconsciente a un déficit calórico, moviéndose uno menos.',
      },
      {
        title: 'Estimar las necesidades calóricas',
        content: 'Para estimar tus necesidades, primero calculas el metabolismo basal, por ejemplo con la fórmula de Mifflin-St Jeor, y lo multiplicas por un factor de actividad (1,2 para muy poco activo hasta ~1,9 para muy activo). El resultado es tu GET estimado: la cantidad de calorías con la que tu peso se mantiene estable.\n\nImportante: estas fórmulas solo dan valores aproximados. El gasto real puede desviarse individualmente entre un 10 y un 20 %. Por eso el valor de partida es solo un punto de partida, no una hoja de ruta exacta.\n\nLa vía más fiable es observar el peso corporal durante dos o tres semanas con una ingesta calórica constante. Si se mantiene estable, has encontrado tus calorías de mantenimiento. Si sube o baja, ajustas las calorías en unas 200 o 300. Así calibras la teoría con tu realidad.',
      },
      {
        title: 'Malentendidos frecuentes',
        content: 'Un error extendido es creer en un metabolismo «roto» o extremadamente lento. Los trastornos metabólicos reales son raros; lo habitual es sobrestimar el gasto calórico y subestimar la ingesta. Los estudios muestran que las personas suelen calcular su ingesta calórica entre un 20 y un 50 % por debajo de la real (Lichtman et al., 1992, New England Journal of Medicine).\n\nUn segundo error: que ciertos alimentos «aceleren el metabolismo» y derritan la grasa. Esos efectos son mínimos y no cambian nada en la ecuación básica. Ningún alimento ni bebida esquiva el balance energético.\n\nEn tercer lugar, la adaptación metabólica es real, pero limitada: con un déficit prolongado el gasto baja algo (termogénesis adaptativa), pero eso no explica un estancamiento total. Quien no adelgaza aunque cree estar en déficit, por lo general come más de lo que supone.',
      },
      {
        title: 'Resumen',
        content: 'El balance energético es el fundamento de cualquier alimentación: un déficit te hace adelgazar, un superávit engordar y el mantenimiento conserva el peso. Todos los demás detalles —macros, timing, elección de alimentos— actúan dentro de ese marco.\n\nEstima tus necesidades con una fórmula, pero toma ese valor solo como punto de partida y calíbralo con la evolución real del peso. Mide y ajusta, en lugar de fiarte solo de la teoría.\n\nLa calidad de los alimentos, la proteína y la saciedad determinan lo agradable y saludable que resulta mantener un nivel calórico; pero si engordas o adelgazas lo decide el balance. Entender este principio te hace independiente de las modas dietéticas.',
      },
    ],
  },

  protein: {
    name: 'Proteína',
    summary: 'La proteína es el macronutriente más importante para ganar y conservar músculo. Es la que más sacia, tiene el mayor efecto térmico y protege la musculatura al adelgazar. Para quien entrena, lo ideal son unos 1,6–2,2 g por kilo de peso corporal.',
    quick: [
      { label: 'Cantidad objetivo', text: 'Unos 1,6–2,2 g por kg de peso corporal al día; al adelgazar, más bien en el extremo alto.' },
      { label: 'Fuentes', text: 'Carne, pescado, huevos, lácteos, legumbres, tofu, whey o proteína en polvo.' },
    ],
    sections: [
      {
        title: 'Por qué la proteína es tan importante',
        content: 'Las proteínas están formadas por aminoácidos, los ladrillos de los músculos, las enzimas, las hormonas y prácticamente cualquier estructura del cuerpo. Nueve de esos aminoácidos son esenciales: el cuerpo no puede fabricarlos y tienen que llegar con la alimentación.\n\nPara los deportistas, la proteína es especialmente relevante porque estimula la síntesis de proteína muscular, el proceso por el que se construye nueva masa muscular después de entrenar. Sin proteína suficiente, ni siquiera un entrenamiento duro se traduce en crecimiento muscular.\n\nAdemás, la proteína tiene dos ventajas prácticas para el control del peso: sacia más que los carbohidratos o la grasa y tiene el mayor efecto térmico (entre un 20 y un 30 % de sus calorías se gastan en la digestión). Ambas cosas la convierten en el macronutriente más valioso al adelgazar.',
      },
      {
        title: '¿Cuánta proteína necesitas?',
        content: 'La cantidad mínima oficial para evitar carencias es de 0,8 g por kilo de peso corporal, pero está lejos del óptimo para deportistas. Un metanálisis amplio de Morton et al. (2018, British Journal of Sports Medicine) encontró que en torno a 1,6 g/kg aporta el mayor beneficio para el desarrollo muscular, con un posible beneficio adicional hasta unos 2,2 g/kg.\n\nAl adelgazar tiene más sentido el extremo alto. En déficit calórico las necesidades aumentan, porque la proteína protege la musculatura frente a la pérdida. Helms et al. (2014) recomiendan para atletas en déficit hasta 2,3–3,1 g por kilo de masa libre de grasa.\n\nPara la mayoría de quienes entrenan, una referencia sencilla de unos 2 g por kilo de peso corporal es práctica y eficaz. Más no perjudica a las personas sanas, pero apenas aporta un beneficio adicional.',
      },
      {
        title: 'Calidad y reparto',
        content: 'No todas las fuentes de proteína son iguales. Su «calidad» depende del contenido de aminoácidos esenciales, sobre todo leucina, y de la digestibilidad. Las fuentes animales (carne, pescado, huevos, lácteos) suelen ser completas; las vegetales son a menudo limitantes en algún aminoácido, pero se complementan combinándolas (por ejemplo legumbres con cereales).\n\nEl reparto a lo largo del día también cuenta. La síntesis de proteína muscular se estimula al máximo con unos 20–40 g de proteína de calidad por comida. Por eso tiene sentido repartir la proteína en tres a cinco comidas en lugar de concentrarla en una sola.\n\nEn la práctica: cada comida principal debería contener una buena fuente de proteína. Ahora bien, la cantidad total del día sigue siendo el factor más importante; el reparto perfecto es secundario frente a alcanzar el objetivo diario.',
      },
      {
        title: 'Mitos y seguridad',
        content: 'Un mito persistente es que mucha proteína daña los riñones. En personas sanas no está demostrado: los estudios controlados no muestran efectos negativos de una ingesta alta de proteína sobre la función renal (Devries et al., 2018, Journal of Nutrition). Solo con una enfermedad renal existente hace falta consultar con un médico.\n\nOtro mito: que el cuerpo solo puede «aprovechar» unos 30 g de proteína por comida. En realidad también digiere y utiliza más; lo que se atenúa es únicamente el estímulo agudo sobre la síntesis de proteína muscular. Las porciones mayores, por tanto, no se desperdician.\n\nLas proteínas en polvo como la whey son prácticas, pero no obligatorias. Son sencillamente una fuente de proteína cómoda y económica. Quien cubre sus necesidades con alimentos normales no necesita suplementos: son una herramienta, no un producto milagroso.',
      },
      {
        title: 'Resumen',
        content: 'La proteína es el macronutriente clave para el desarrollo muscular, la conservación del músculo y la saciedad. Para quien entrena, lo ideal son unos 1,6–2,2 g por kilo de peso corporal, y al adelgazar más bien en el extremo alto.\n\nApuesta por fuentes de calidad, reparte la proteína en varias comidas y, sobre todo, alcanza tu objetivo diario. Que sea animal o vegetal es secundario mientras la cantidad y la calidad totales sean correctas.\n\nLas advertencias habituales sobre «demasiada» proteína carecen de fundamento en personas sanas. La proteína es el macronutriente en el que más compensa ser preciso: es el que más diferencia marca en la composición corporal y la saciedad.',
      },
    ],
  },

  carbs: {
    name: 'Carbohidratos',
    summary: 'Los carbohidratos son la principal fuente de energía para el entrenamiento intenso. No engordan por sí mismos: lo decisivo es el balance calórico total. La calidad, la cantidad y el momento sí pueden influir claramente en el rendimiento y el bienestar.',
    quick: [
      { label: 'Función', text: 'Combustible principal del esfuerzo intenso; llenan los depósitos de glucógeno del músculo y el hígado.' },
      { label: 'En la práctica', text: 'Sobre todo fuentes ricas en fibra y poco procesadas; ajusta la cantidad a tu actividad.' },
    ],
    sections: [
      {
        title: 'Qué hacen los carbohidratos en el cuerpo',
        content: 'Los carbohidratos se descomponen en el cuerpo en glucosa, el combustible preferido para el trabajo muscular intenso y la principal fuente de energía del cerebro. La glucosa sobrante se almacena como glucógeno en los músculos y el hígado, una reserva de energía rápidamente disponible.\n\nEn el entrenamiento intenso de fuerza y de intervalos, el cuerpo recurre mucho a ese glucógeno muscular. Unos depósitos bien llenos significan más rendimiento, más repeticiones y mejor calidad de entrenamiento. Con una ingesta baja de carbohidratos durante mucho tiempo, esos depósitos pueden vaciarse en parte y el rendimiento en intensidades altas disminuye.\n\nAhora bien, los carbohidratos no son esenciales en sentido estricto: el cuerpo también puede fabricar glucosa. Aun así, para el rendimiento deportivo y el bienestar resultan muy útiles para la mayoría de las personas, sobre todo con entrenamiento intenso.',
      },
      {
        title: 'Calidad: carbohidratos complejos frente a simples',
        content: 'Las fuentes de carbohidratos se diferencian mucho en su efecto. Las fuentes ricas en fibra y poco procesadas, como los productos integrales, las legumbres, la fruta y la verdura, se digieren más despacio, sacian mejor y aportan micronutrientes. Las fuentes muy procesadas, como el azúcar y los productos de harina refinada, se absorben rápido y apenas sacian.\n\nLa fibra merece una atención especial. Favorece la digestión, alimenta a las bacterias intestinales y mejora la saciedad. Se recomiendan unos 25–35 g al día, cantidad que muchas personas no alcanzan ni de lejos. Una alimentación rica en fibra se asocia a mejor salud y a un control del peso más fácil.\n\nEso no significa que los carbohidratos simples estén prohibidos. Alrededor del entrenamiento, unos carbohidratos de rápida disponibilidad pueden incluso tener sentido. En el día a día, sin embargo, la mayor parte debería proceder de fuentes ricas en nutrientes y en fibra.',
      },
      {
        title: '¿Cuántos carbohidratos?',
        content: 'Después de la proteína y la grasa, puedes llenar con carbohidratos las calorías restantes de tu objetivo. No existe una cantidad «correcta» fija: depende de la actividad, las preferencias y los objetivos. Las personas muy activas se benefician de más carbohidratos; las menos activas se apañan con menos.\n\nPara quienes entrenan intensamente se mencionan a menudo 3–5 g por kilo de peso corporal o más. Quien hace poco deporte o prefiere una alimentación más baja en carbohidratos puede quedarse claramente por debajo sin desventajas, siempre que la proteína y las calorías totales sean correctas.\n\nLas dietas bajas en carbohidratos y las cetogénicas funcionan para adelgazar igual de bien que las más ricas en carbohidratos, siempre que las calorías sean iguales. No son un quemagrasas mágico, pero sí una opción legítima para quienes se encuentran mejor así o se sacian mejor.',
      },
      {
        title: 'El mito de la insulina',
        content: 'Un mito muy extendido sostiene que los carbohidratos engordan solo por la liberación de insulina. La insulina es una hormona de almacenamiento que aumenta tras las comidas ricas en carbohidratos; de ahí se dedujo la teoría de que los carbohidratos serían la verdadera causa del aumento de grasa.\n\nSin embargo, los estudios controlados lo desmienten con claridad. Con la misma cantidad de calorías y proteína, una alimentación baja en carbohidratos no produce más pérdida de grasa que una rica en carbohidratos (Hall et al., 2016, American Journal of Clinical Nutrition). La insulina regula procesos de almacenamiento a corto plazo, pero no esquiva el balance energético total.\n\nPara las personas sanas, las respuestas normales de insulina a los carbohidratos no suponen ningún problema. Distinto es el caso de la diabetes o la resistencia a la insulina: ahí el control de los carbohidratos es médicamente relevante y debería llevarse con acompañamiento médico.',
      },
      {
        title: 'Resumen',
        content: 'Los carbohidratos son el combustible principal del entrenamiento intenso y en absoluto engordan por sí mismos: lo decide el balance calórico. Llenan los depósitos de glucógeno y favorecen el rendimiento y la recuperación.\n\nElige sobre todo fuentes ricas en fibra y poco procesadas, y ajusta la cantidad a tu actividad. Alrededor del entrenamiento pueden tener sentido carbohidratos de absorción más rápida.\n\nNi lo bajo ni lo alto en carbohidratos es superior por principio: ambos funcionan con las calorías adecuadas. Elige el enfoque con el que te encuentres bien, entrenes bien y puedas mantener a largo plazo.',
      },
    ],
  },

  fats: {
    name: 'Grasas',
    summary: 'La grasa alimentaria es esencial para las hormonas, las membranas celulares y la absorción de las vitaminas liposolubles. Un mínimo es importante para la salud; el tipo de grasa cuenta más que la cantidad pura.',
    quick: [
      { label: 'Cantidad mínima', text: 'No bajar de forma sostenida de ~0,5–0,8 g por kg de peso corporal (función hormonal).' },
      { label: 'Calidad', text: 'Preferir grasas insaturadas (aceite de oliva, frutos secos, pescado); evitar las grasas trans.' },
    ],
    sections: [
      {
        title: 'El papel de la grasa alimentaria',
        content: 'La grasa es mucho más que un portador de energía. Es un componente de cada membrana celular, el material de partida de hormonas esteroideas como la testosterona y los estrógenos, y es necesaria para absorber las vitaminas liposolubles A, D, E y K. Una alimentación demasiado baja en grasa puede, por tanto, afectar a la producción hormonal y a la absorción de nutrientes.\n\nCon 9 calorías por gramo, la grasa es el macronutriente más denso en energía, más del doble que la proteína o los carbohidratos (4 kcal cada uno). Eso hace fácil ingerir muchas calorías sin darse cuenta a través de la grasa, por lo que un manejo consciente ayuda al adelgazar.\n\nDos ácidos grasos son esenciales: el omega-3 y el omega-6. El cuerpo no puede fabricarlos. Los ácidos grasos omega-3 del pescado azul son, en particular, deficitarios en muchas personas y se asocian a numerosos beneficios para la salud.',
      },
      {
        title: 'Tipos de grasa',
        content: 'Las grasas insaturadas se consideran especialmente favorables. Las monoinsaturadas (aceite de oliva, aguacate, frutos secos) y las poliinsaturadas (pescado azul, linaza, nueces) favorecen la salud del corazón y aportan ácidos grasos esenciales. Deberían componer la mayor parte del aporte de grasa.\n\nLas grasas saturadas (en la carne, la mantequilla, el aceite de coco) no son dañinas por sí mismas, pero conviene consumirlas con moderación. Las recomendaciones de la mayoría de las sociedades científicas se sitúan por debajo del 10 % de las calorías totales. Aunque se discute cuál es exactamente su efecto, sustituir una parte por grasas insaturadas se considera ventajoso.\n\nLas grasas trans artificiales son el único tipo de grasa que debe evitarse con claridad. Se producen al hidrogenar industrialmente los aceites y están fuertemente asociadas a las enfermedades cardiovasculares. En muchos países están hoy muy reguladas o prohibidas.',
      },
      {
        title: '¿Cuánta grasa?',
        content: 'A diferencia de la proteína, con la grasa hay que fijarse sobre todo en un límite inferior. Una alimentación muy baja en grasa de forma sostenida (por debajo de unos 0,5 g por kilo de peso corporal) puede afectar en algunas personas a la producción hormonal. Un mínimo razonable se sitúa en torno a 0,5–0,8 g por kilo.\n\nHacia arriba, la grasa es flexible. Una vez fijada la proteína, las calorías restantes pueden repartirse entre grasa y carbohidratos según las preferencias. Algunas personas se encuentran mejor con más grasa y menos carbohidratos, otras al revés; ambas opciones son defendibles desde el punto de vista de la salud.\n\nLas recomendaciones habituales se sitúan en torno al 20–35 % de las calorías totales procedentes de la grasa. Más importante que el porcentaje exacto es cubrir el mínimo, elegir sobre todo grasas de calidad y no perder de vista las calorías totales.',
      },
      {
        title: 'El omega-3 en primer plano',
        content: 'Entre las grasas, los ácidos grasos omega-3 EPA y DHA merecen una atención especial. Regulan la inflamación y se asocian a una mejor salud cardiovascular y cerebral. Su fuente principal es el pescado azul de aguas frías, como el salmón, la caballa y el arenque.\n\nMuchas personas toman poco omega-3 y, a la vez, mucho omega-6 (de aceites procesados), lo que desplaza la proporción de forma desfavorable. Dos o tres raciones de pescado azul por semana mejoran el aporte de forma notable.\n\nQuien no come pescado puede plantearse un suplemento de aceite de algas o de pescado. Las fuentes vegetales de omega-3 (linaza, nueces) aportan ALA, que el cuerpo convierte solo de forma limitada en las formas activas EPA y DHA. Ante dudas de salud sobre la suplementación, conviene consultar con un médico.',
      },
      {
        title: 'Resumen',
        content: 'La grasa es esencial para las hormonas, las membranas celulares y la absorción de vitaminas. No bajes de forma sostenida de unos 0,5–0,8 g por kilo de peso corporal, o pueden resentirse la función hormonal y el bienestar.\n\nLa calidad de la grasa cuenta: prefiere las grasas insaturadas del aceite de oliva, los frutos secos, el aguacate y el pescado azul, mantén moderadas las saturadas y evita las grasas trans artificiales. Cuida en especial un aporte suficiente de omega-3.\n\nPor encima del mínimo, la cantidad de grasa es flexible y cuestión de gusto. Elige el reparto entre grasa y carbohidratos que encaje con tus preferencias y con el que las calorías totales cuadren.',
      },
    ],
  },

  micronutrients: {
    name: 'Vitaminas y minerales',
    summary: 'Los micronutrientes no aportan energía, pero son imprescindibles para innumerables funciones del cuerpo. Una alimentación variada y completa suele cubrir las necesidades, aunque algunos nutrientes merecen una atención especial.',
    quick: [
      { label: 'Regla básica', text: 'Variedad de verdura, fruta, cereales integrales y fuentes de proteína cubre casi todos los micronutrientes.' },
      { label: 'Ojo con', text: 'Vitamina D, omega-3, en su caso hierro (mujeres), B12 (vegano), yodo y magnesio.' },
    ],
    sections: [
      {
        title: 'Qué son los micronutrientes',
        content: 'Los micronutrientes comprenden las vitaminas y los minerales, que el cuerpo necesita solo en pequeñas cantidades, a diferencia de los macronutrientes (proteína, carbohidratos, grasa), que aportan energía. Aunque no tienen calorías, participan en prácticamente todos los procesos metabólicos: obtención de energía, función inmunitaria, salud ósea, transporte de oxígeno y mucho más.\n\nUna carencia de micronutrientes puede manifestarse de forma sigilosa: cansancio, peor recuperación, propensión a las infecciones o caída del rendimiento. Precisamente con una alimentación reducida en calorías o monótona aumenta el riesgo de un aporte insuficiente.\n\nLa buena noticia: una alimentación variada, con mucha verdura, fruta, productos integrales, fuentes de proteína de calidad y grasas saludables, cubre de forma natural las necesidades de la mayoría de los micronutrientes. La variedad de alimentos es el mejor seguro contra las carencias.',
      },
      {
        title: 'Nutrientes críticos a vigilar',
        content: 'Algunos micronutrientes escasean con frecuencia incluso con una buena alimentación. La vitamina D se produce sobre todo con la luz solar y es deficitaria en muchas regiones, especialmente en invierno. Aquí suele tener sentido suplementar, idealmente tras un análisis de sangre.\n\nEl hierro es un tema especialmente para las mujeres que menstrúan, ya que las pérdidas regulares de sangre aumentan las necesidades. Su déficit se manifiesta con cansancio y caída del rendimiento. La vitamina B12 se encuentra casi exclusivamente en productos de origen animal: quienes viven en vegano deben suplementarla obligatoriamente.\n\nOtros nutrientes que escasean con frecuencia son el yodo, el magnesio, el zinc y el omega-3. En lugar de suplementar todo a ciegas, es más inteligente observar de forma dirigida las propias necesidades, idealmente con análisis de sangre y de acuerdo con un médico.',
      },
      {
        title: 'Los alimentos antes que los suplementos',
        content: 'Como principio: los alimentos completos son preferibles a los complementos alimenticios. Aportan micronutrientes en su conjunto natural, junto con fibra, compuestos vegetales y otras sustancias que actúan de forma conjunta. Una vitamina aislada en forma de pastilla no puede sustituir esa complejidad.\n\nLos estudios sobre preparados vitamínicos aislados muestran a menudo beneficios decepcionantes o nulos en personas sanas sin carencias, e incluso desventajas con la sobredosis. Más no es mejor: las vitaminas liposolubles (A, D, E, K) pueden acumularse y resultar dañinas en dosis altas.\n\nLos suplementos tienen sentido cuando existe una carencia real o unas necesidades mayores: por ejemplo vitamina D en invierno, B12 con alimentación vegana o hierro con un déficit demostrado. Como complemento dirigido son útiles; como sustituto de una buena alimentación, no.',
      },
      {
        title: 'Puesta en práctica',
        content: 'La estrategia más sencilla para un buen aporte de micronutrientes se llama variedad y color. Las verduras y frutas de distintos colores aportan distintas vitaminas y compuestos vegetales: «come el arcoíris» es una regla práctica muy útil.\n\nEn concreto ayuda incluir verdura en cada comida principal, incorporar con regularidad legumbres, frutos secos y semillas, ir rotando distintas fuentes de proteína y preferir los cereales integrales a los productos muy procesados. Así surge casi automáticamente una base amplia de nutrientes.\n\nQuien come mucho producto procesado y de forma monótona corre el riesgo de tener carencias pese a ingerir calorías suficientes, un fenómeno que a veces se describe como «sobrealimentado y desnutrido». La calidad de los alimentos es, por tanto, la clave de un aporte robusto de micronutrientes.',
      },
      {
        title: 'Resumen',
        content: 'Los micronutrientes no aportan energía, pero son imprescindibles para la salud, la recuperación y el rendimiento. Una alimentación variada y completa cubre las necesidades de la mayoría de las vitaminas y minerales.\n\nMerecen una atención especial la vitamina D y el omega-3 y, según la situación, el hierro, la B12, el yodo y el magnesio. En lugar de suplementar de forma indiscriminada, compensa mirar de forma dirigida las propias necesidades, idealmente con análisis de sangre.\n\nLos alimentos completos van por delante de los suplementos. La variedad y el color en el plato son la mejor y más sencilla estrategia para un buen aporte de micronutrientes.',
      },
    ],
  },

  meal_timing: {
    name: 'Momento de las comidas',
    summary: 'Cuándo y con qué frecuencia comes importa mucho menos que qué y cuánto. El momento puede afinar el rendimiento y el bienestar, pero nunca sustituye los fundamentos: calorías y proteína.',
    quick: [
      { label: 'Prioridad', text: 'Primero las calorías totales y la proteína; el momento es el acabado, no el cimiento.' },
      { label: 'Útil', text: 'Repartir la proteína a lo largo del día; comer lo suficiente alrededor del entrenamiento.' },
    ],
    sections: [
      {
        title: 'Ponerlo en su sitio',
        content: 'Alrededor del momento de las comidas circulan muchos mitos, desde la «ventana anabólica» justo después de entrenar hasta la prohibición de comer carbohidratos por la noche. En realidad, el momento es un factor de ajuste fino que solo cuenta cuando los fundamentos están en orden: calorías totales, proteína y calidad de los alimentos.\n\nLa jerarquía de la alimentación es clara: primero el balance energético, después los macronutrientes (sobre todo la proteína), luego la calidad de los alimentos y los micronutrientes, y solo después el momento y la frecuencia de las comidas. Quien descuida los niveles superiores no puede salvar nada con un timing perfecto.\n\nEso no significa que el momento sea inútil. Puede mejorar el rendimiento, la saciedad y el bienestar. Pero es la última y más pequeña palanca, no un motivo de estrés ni de reglas complicadas.',
      },
      {
        title: 'La «ventana anabólica»',
        content: 'Durante mucho tiempo rigió la regla de que había que tomar proteína y carbohidratos justo después de entrenar o el efecto del entrenamiento se perdería. Esa «ventana anabólica» estrecha ha resultado ser una exageración.\n\nUn metanálisis de Schoenfeld, Aragon y Krieger (2013, Journal of the International Society of Sports Nutrition) encontró que el momento exacto de la ingesta de proteína alrededor del entrenamiento importa mucho menos que la cantidad total de proteína del día. La «ventana» es más bien de varias horas que de unos pocos minutos.\n\nEn la práctica, eso significa: mientras comas suficiente proteína repartida a lo largo del día y no pases muchas horas completamente en ayunas antes y después de entrenar, no tienes que apresurarte. Quien entrena en ayunas sí puede beneficiarse de una comida relativamente próxima al entrenamiento, más por razones prácticas que por una urgencia fisiológica.',
      },
      {
        title: 'Frecuencia de comidas y ayuno intermitente',
        content: 'Que comas tres comidas grandes o seis pequeñas apenas influye en el metabolismo ni en la pérdida de grasa, siempre que las calorías y la proteína sean las mismas. La vieja creencia de que las comidas pequeñas y frecuentes «aceleran el metabolismo» está desmentida: el efecto térmico depende de la cantidad total, no de la frecuencia.\n\nEl ayuno intermitente (por ejemplo 16:8) es popular y para muchos una herramienta útil para controlar la ingesta calórica. Pero no es un quemagrasas mágico: con las mismas calorías no produce más pérdida de grasa que una alimentación repartida de forma uniforme. Su utilidad está sobre todo en que a algunas personas les resulta más fácil mantenerse en déficit.\n\nLa mejor frecuencia de comidas es la que encaja con tu día a día, te sacia bien y puedes mantener. Para el desarrollo muscular tiene sentido repartir la proteína en al menos tres o cuatro tomas; más allá de eso, la frecuencia es cuestión de gusto.',
      },
      {
        title: 'Un timing con sentido en la práctica',
        content: 'Aunque el momento sea secundario, hay algunos puntos prácticos útiles. Antes de entrenar, una comida con carbohidratos y algo de proteína entre una y tres horas antes proporciona buena energía y rendimiento. Un estómago demasiado lleno justo antes de la sesión, en cambio, puede resultar molesto.\n\nDespués de entrenar tiene sentido una comida con proteína y carbohidratos dentro de las horas siguientes, para favorecer la recuperación y la reposición de glucógeno. El momento exacto es flexible: no tiene que ser el famoso segundo después de la última serie.\n\nEl sueño y la digestión también se benefician del momento: las comidas muy copiosas o picantes justo antes de acostarse pueden alterar el sueño. Ahora bien, quien come carbohidratos por la noche no tiene por qué temer engordar: eso es un mito mientras el balance del día cuadre.',
      },
      {
        title: 'Resumen',
        content: 'El momento de las comidas es el acabado de la alimentación, no su cimiento. Las calorías totales y la proteína determinan la mayor parte del resultado; el momento y la frecuencia van después.\n\nLa «ventana anabólica» es de varias horas, no de minutos. La frecuencia de comidas y el ayuno intermitente son equivalentes con las mismas calorías: elige lo que encaje con tu día a día y te sacie bien.\n\nEs útil repartir la proteína a lo largo del día y comer lo suficiente alrededor del entrenamiento. Todo lo demás es optimización individual, no una obligación. No te estreses con el timing mientras los fundamentos estén en orden.',
      },
    ],
  },
};
