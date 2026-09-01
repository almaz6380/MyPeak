// Portugiesische Fassung (pt-BR) von `src/data/supplementsKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fundamentos',
    leistung: 'Desempenho',
    gesundheit: 'Saúde',
  },

  creatine: {
    name: 'Creatina',
    summary: 'A creatina é o suplemento mais bem pesquisado e mais eficaz para força e ganho de músculo. É segura, barata e melhora comprovadamente o desempenho em esforços curtos e intensos. O monoidrato de creatina é a forma preferida.',
    quick: [
      { label: 'Dosagem', text: '3 a 5 g de monoidrato por dia, de forma contínua — o horário não importa. Fase de saturação opcional.' },
      { label: 'Efeito', text: 'Mais força e repetições, apoia o ganho de músculo, bem documentada e segura.' },
    ],
    sections: [
      {
        title: 'O que é a creatina e como ela age',
        content: 'A creatina é uma substância produzida pelo próprio corpo, presente nos músculos e no cérebro, e também obtida por alimentos de origem animal como carne e peixe. No músculo ela é armazenada como fosfocreatina e serve à regeneração rápida do ATP, o portador de energia imediato da célula.\n\nEm esforços curtos e intensos — como séries pesadas na musculação ou tiros de velocidade — o ATP se esgota em segundos. A fosfocreatina ajuda a reconstruí-lo depressa, de modo que mais força se mantenha por mais repetições. Estoques cheios de creatina significam, portanto, mais desempenho no treino.\n\nCom a suplementação é possível elevar o teor de creatina no músculo em cerca de 20 a 40 % acima do nível normal. É exatamente esse aumento que explica o efeito ergogênico, confirmado de forma consistente em centenas de estudos.',
      },
      {
        title: 'O que dizem os estudos',
        content: 'Nenhum suplemento para praticantes de força é mais bem estudado do que a creatina. Um posicionamento da International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) resume: o monoidrato de creatina é o suplemento alimentar mais eficaz para aumentar o desempenho em esforços de alta intensidade e para apoiar o ganho de músculo.\n\nOs efeitos são bem mensuráveis: combinada com treino de força, a creatina aumenta os ganhos de força e a massa livre de gordura bem mais do que o treino sozinho. O benefício aparece em praticamente todas as faixas etárias e níveis.\n\nAlém do esporte, a creatina vem sendo cada vez mais estudada por possíveis benefícios cognitivos e de saúde, por exemplo em exaustão mental ou no envelhecimento. Essa pesquisa é promissora, mas ainda não tão clara quanto os dados sobre desempenho físico.',
      },
      {
        title: 'Dosagem e uso',
        content: 'O uso é simples. O mais comum é uma dose de manutenção diária de 3 a 5 g de monoidrato de creatina. O horário não tem papel relevante — importa apenas a ingestão diária e contínua, já que os estoques se enchem ao longo do tempo.\n\nOpcionalmente existe uma fase de saturação: cerca de 20 g por dia (divididos em quatro porções) por cinco a sete dias, para encher os estoques mais rápido. Depois vem a dose normal de manutenção. A fase de saturação só acelera o efeito; sem ela, os estoques também ficam cheios após cerca de três a quatro semanas.\n\nO monoidrato de creatina é a forma mais estudada e mais barata — variantes mais caras (por exemplo Kre-Alkalyn, creatina HCl) não oferecem benefício adicional comprovado. Vale procurar um produto com selo de qualidade, como o Creapure.',
      },
      {
        title: 'Segurança e mitos',
        content: 'A creatina está entre os suplementos mais seguros que existem. Estudos de longo prazo, ao longo de vários anos, não mostram efeitos nocivos em pessoas saudáveis. O mito persistente de que a creatina prejudica os rins não se sustenta em pessoas com rins saudáveis (Kreider et al., 2017). Com doença renal existente, porém, o uso deve ser avaliado por um médico.\n\nOutro mito é que a creatina causa «retenção de líquido» no sentido de um aspecto inchado. Na verdade, a creatina puxa água para dentro das células musculares, o que resulta em um músculo mais cheio, não em retenção visível. Um leve aumento de peso no começo é normal e desejado.\n\nA queda de cabelo também é às vezes associada à creatina, com base em um único estudo. Essa ligação não está comprovada cientificamente. No conjunto, a creatina é bem tolerada; algumas pessoas reagem a doses únicas muito altas com desconforto gastrointestinal, o que se evita com porções menores.',
      },
      {
        title: 'Resumo',
        content: 'A creatina é o suplemento mais eficaz e mais bem documentado para força e ganho de músculo — segura, barata e simples de usar. De 3 a 5 g de monoidrato por dia, de forma contínua, é tudo de que você precisa.\n\nO horário é indiferente e a fase de saturação é opcional. Escolha monoidrato puro; formas mais caras não agregam valor. Os avisos difundidos sobre danos aos rins ou aos cabelos não se comprovam em pessoas saudáveis.\n\nSe você escolhesse um único suplemento para melhorar o desempenho, a creatina seria a escolha mais óbvia. Com condições de saúde preexistentes, como sempre, vale conversar com um médico.',
      },
    ],
  },

  protein_powder: {
    name: 'Proteína em pó (whey e outras)',
    summary: 'A proteína em pó não é milagre, e sim uma fonte de proteína cômoda e barata. Ela ajuda a cobrir a necessidade diária quando isso é difícil com alimentos comuns — nem mais, nem menos.',
    quick: [
      { label: 'Finalidade', text: 'Complemento prático para bater a meta diária de proteína — não é obrigatório.' },
      { label: 'Escolha', text: 'Whey (rápida), caseína (lenta), vegetal (vegana). Todas eficazes em quantidade suficiente.' },
    ],
    sections: [
      {
        title: 'O que é proteína em pó',
        content: 'Proteína em pó é proteína alimentar concentrada, em geral do leite (whey e caseína), mas também de fontes vegetais como ervilha, arroz ou soja. Ela fornece os mesmos aminoácidos que alimentos ricos em proteína, só que em forma prática e de preparo rápido.\n\nO ponto mais importante primeiro: proteína em pó não é um milagre «anabólico». É simplesmente comida — uma forma cômoda de cobrir a necessidade de proteína. Quem alcança a meta diária sem problema com carne, peixe, ovos, laticínios e leguminosas não precisa de pó nenhum.\n\nO valor dela está na praticidade: um shake é rápido de preparar, fácil de porcionar, barato por grama de proteína e simples de levar. Para quem tem necessidade alta de proteína, pouco tempo ou pouco apetite, é um recurso útil.',
      },
      {
        title: 'Whey, caseína e proteínas vegetais',
        content: 'A whey (proteína do soro do leite) é a forma mais popular. É digerida rápido, rica no aminoácido leucina e estimula fortemente a síntese proteica muscular. Existe como concentrado (barato, com um pouco de lactose), isolado (mais puro, pobre em lactose) e hidrolisado (pré-digerido, mais caro).\n\nA caseína também é proteína do leite, mas digerida devagar, liberando aminoácidos ao longo de várias horas. Algumas pessoas a usam antes de intervalos longos sem comer, por exemplo antes de dormir. Na prática, porém, a diferença para a whey é pequena para a maioria.\n\nAs proteínas vegetais (ervilha, arroz, soja) são a escolha de quem é vegano. Fontes vegetais isoladas podem ser limitadas em determinados aminoácidos, por isso bons produtos combinam várias fontes. Com quantidade total suficiente, os pós vegetais são tão eficazes para o ganho de músculo quanto a whey.',
      },
      {
        title: 'Uso sensato',
        content: 'A proteína em pó serve sempre que uma fonte de proteína rápida e de qualidade é prática: depois do treino, como lanche, na aveia ou para bater a meta de proteína em dias corridos. Uma a duas porções por dia fazem sentido para a maioria.\n\nEla deve, porém, complementar os alimentos normais, não substituí-los. Fontes integrais de proteína trazem ainda micronutrientes, saciam melhor e fazem parte de uma alimentação equilibrada. Um shake é ferramenta do dia a dia, não alimento básico.\n\nNa escolha do produto vale olhar a lista de ingredientes: o mínimo possível de aditivos, um bom teor de proteína por porção e, de preferência, um selo de controle independente. Pós muito baratos às vezes contêm muito enchimento ou açúcar.',
      },
      {
        title: 'Segurança e contexto',
        content: 'Para pessoas saudáveis, a proteína em pó é segura. A preocupação de que a ingestão alta de proteína em pó prejudique os rins vale — como para a proteína em geral — apenas com doença renal existente. Com intolerância à lactose, o isolado ou as variantes vegetais são mais bem tolerados.\n\nUm aspecto de qualidade é a pureza. Como os suplementos são menos regulados do que os medicamentos, valem a pena produtos com análise laboratorial independente (por exemplo para metais pesados ou substâncias dopantes), sobretudo para atletas de competição.\n\nEm resumo, a proteína em pó é um produto prático, não essencial. Ela não substitui uma boa alimentação, mas pode ajudar a cobrir a necessidade de proteína de forma cômoda e barata. Em dúvidas de saúde, vale falar com um médico ou nutricionista.',
      },
    ],
  },

  caffeine: {
    name: 'Cafeína',
    summary: 'A cafeína é um dos recursos legais mais eficazes para melhorar o desempenho. Ela reduz a sensação de cansaço e aumenta foco e resistência de força. O efeito é bem documentado, mas a dose deve ser individual e moderada.',
    quick: [
      { label: 'Dosagem', text: 'Cerca de 3 a 6 mg por kg de peso corporal, 30 a 60 min antes do treino.' },
      { label: 'Atenção', text: 'Proteger o sono (nada tarde no dia), considerar a tolerância, testar a própria sensibilidade.' },
    ],
    sections: [
      {
        title: 'Como a cafeína age',
        content: 'A cafeína é um estimulante que age principalmente bloqueando os receptores de adenosina no cérebro. A adenosina é um mensageiro que sinaliza cansaço; ao ocupar seus pontos de ligação, a cafeína amortece a sensação de fadiga e reduz o esforço percebido.\n\nO resultado é um estado de maior alerta, melhor foco e mais disposição para o esforço. Para o treino isso significa que as cargas parecem mais leves, o que leva a mais repetições, mais resistência e, muitas vezes, melhor desempenho.\n\nA cafeína é um dos poucos suplementos com efeito claramente comprovado e imediatamente perceptível. É obtida por café, chá, energéticos ou como cafeína pura (comprimidos, pó) e age em cerca de 30 a 60 minutos.',
      },
      {
        title: 'O que dizem os estudos',
        content: 'A cafeína está entre as substâncias ergogênicas mais bem estudadas. Uma ampla revisão (Grgic et al., 2020, British Journal of Sports Medicine) confirma efeitos positivos sobre força, resistência muscular, tiros de velocidade e desempenho de resistência em muitos esportes.\n\nOs tamanhos de efeito são moderados, mas confiáveis. Sobretudo em esforços repetidos e desgastantes e em situações de falta de sono ou de baixa motivação, a cafeína pode fazer diferença perceptível. O desempenho cognitivo — tempo de reação, atenção — também se beneficia.\n\nA dose eficaz fica, na maioria dos estudos, em torno de 3 a 6 mg por quilo de peso corporal. Doses maiores raramente trazem mais desempenho, mas aumentam efeitos colaterais como nervosismo, taquicardia e distúrbios do sono.',
      },
      {
        title: 'Dosagem e horário',
        content: 'Para o desempenho no treino se mostraram bons cerca de 3 a 6 mg por quilo de peso corporal, tomados uns 30 a 60 minutos antes do esforço. Para uma pessoa de 75 kg isso equivale, grosso modo, a 225 a 450 mg — para comparação, uma xícara de café coado tem cerca de 80 a 120 mg.\n\nQuem reage com sensibilidade ou está pouco acostumado deve começar com dose baixa e testar a tolerância. As diferenças individuais são grandes: alguns toleram muito, outros já reagem a pequenas quantidades com agitação ou palpitações.\n\nUm ponto importante é o horário ao longo do dia. A cafeína tem meia-vida de cerca de cinco a seis horas — treino tardio com dose alta pode atrapalhar bastante o sono. Como regra prática, evite quantidades maiores nas últimas seis a oito horas antes de dormir.',
      },
      {
        title: 'Tolerância, efeitos colaterais e segurança',
        content: 'Com consumo regular o corpo desenvolve certa tolerância — o efeito diminui. Por isso algumas pessoas fazem pausas planejadas ou guardam doses maiores para treinos importantes. Uma abstinência completa, porém, não é necessária; o consumo regular moderado continua eficaz.\n\nEntre os efeitos colaterais possíveis estão nervosismo, taquicardia, desconforto estomacal, sensação de ansiedade e distúrbios do sono — em geral com dose alta demais. Em certas doenças cardiovasculares, na gravidez ou em transtornos de ansiedade é preciso cautela e vale conversar com um médico.\n\nNo conjunto, a cafeína é considerada segura em quantidades moderadas (até cerca de 400 mg por dia para adultos saudáveis). Doses únicas muito altas, sobretudo de pó de cafeína pura, podem ser perigosas — aqui a medição exata é decisiva. Como em toda substância vale: encontre a dose eficaz que você tolera, não a máxima.',
      },
      {
        title: 'Resumo',
        content: 'A cafeína é um recurso eficaz, bem documentado e legal para melhorar o desempenho. Ela reduz a sensação de cansaço e melhora foco, resistência de força e desempenho de resistência.\n\nUma dose de cerca de 3 a 6 mg por quilo de peso corporal 30 a 60 minutos antes do treino é usual. Comece baixo, teste sua tolerância e proteja seu sono evitando cafeína tarde.\n\nA cafeína é segura em quantidades moderadas, mas pode causar problemas em superdosagem ou com condições preexistentes. Use-a de forma direcionada como ferramenta, não como dose máxima diária — e consulte um médico em dúvidas de saúde.',
      },
    ],
  },

  omega3: {
    name: 'Ácidos graxos ômega-3',
    summary: 'Os ácidos graxos ômega-3 (EPA e DHA) são essenciais e regulam a inflamação. Muita gente tem aporte insuficiente. Peixe gordo é a melhor fonte; um suplemento pode fazer sentido para quem quase não come peixe.',
    quick: [
      { label: 'Fonte e dose', text: 'Peixe gordo 2 a 3 vezes por semana; como suplemento, muitas vezes ~1 a 2 g de EPA+DHA por dia.' },
      { label: 'Benefício', text: 'Saúde cardiovascular e cerebral, regulação da inflamação; para veganos, óleo de algas.' },
    ],
    sections: [
      {
        title: 'O que são os ácidos graxos ômega-3',
        content: 'Os ácidos graxos ômega-3 são um grupo de gorduras poli-insaturadas que o corpo não consegue produzir e que, portanto, precisam vir da alimentação. Os mais importantes são o EPA (ácido eicosapentaenoico) e o DHA (ácido docosaexaenoico), presentes sobretudo em peixes gordos, além do ALA (ácido alfa-linolênico) de fontes vegetais.\n\nEPA e DHA são componentes das membranas celulares e precursores de mensageiros que regulam processos inflamatórios. O DHA é ainda um componente importante do cérebro e da retina. Esses ácidos graxos têm, assim, relevância para o coração, o cérebro e o sistema imunológico.\n\nO problema: a alimentação moderna costuma fornecer muito ômega-6 (de óleos vegetais processados), mas pouco ômega-3. Esse desequilíbrio, somado a um baixo consumo de peixe, faz com que muita gente fique com aporte insuficiente.',
      },
      {
        title: 'Importância para a saúde',
        content: 'A pesquisa sobre ômega-3 é extensa. O mais bem comprovado é o benefício para a saúde cardiovascular: EPA e DHA podem baixar os triglicerídeos no sangue e estão associados a um perfil de risco cardiovascular mais favorável. As sociedades científicas recomendam consumo regular de peixe gordo.\n\nAlém disso, investiga-se um efeito regulador da inflamação, que poderia ser relevante para a saúde das articulações e para a recuperação depois do treino. Para a função cerebral e o humor também há indícios de efeitos positivos, ainda que os dados aí sejam menos claros.\n\nÉ importante distinguir promessas comprovadas de promessas exageradas. O ômega-3 não é panaceia, mas um aporte suficiente é um componente sensato de uma alimentação saudável — em especial para quem come peixe raramente.',
      },
      {
        title: 'Fontes e suplementação',
        content: 'A melhor fonte de EPA e DHA é peixe gordo de água fria: salmão, cavala, arenque, sardinha. Duas a três porções por semana cobrem a necessidade da maioria das pessoas. Fontes vegetais como linhaça ou nozes fornecem ALA, que o corpo converte apenas em pequena parte em EPA e DHA.\n\nQuem come pouco ou nenhum peixe pode considerar um suplemento. Cápsulas de óleo de peixe ou de algas fornecem EPA e DHA diretamente; o óleo de algas é a alternativa vegetal e vegana. Doses típicas de suplemento ficam em torno de 1 a 2 g de EPA mais DHA por dia, sendo a necessidade exata individual.\n\nNa escolha do produto, a qualidade importa: observe o teor real de EPA/DHA (não só a quantidade total de óleo de peixe), a frescura (óleo rançoso não é desejável) e, de preferência, testes de pureza. O índice de ômega-3 no sangue pode mostrar o aporte de forma objetiva.',
      },
      {
        title: 'Segurança e contexto',
        content: 'Suplementos de ômega-3 são considerados seguros e bem tolerados nas doses usuais. Efeitos colaterais possíveis são um retrogosto de peixe ou leve desconforto gastrointestinal. Em doses muito altas, o ômega-3 pode influenciar a coagulação do sangue — quem toma anticoagulantes ou planeja cirurgias deve avaliar o uso com um médico.\n\nComo em todo suplemento vale: eles complementam uma boa alimentação, não a substituem. Quem come peixe gordo com regularidade em geral não precisa de óleo adicional. O suplemento faz sentido sobretudo para quem não come peixe e para veganos (óleo de algas).\n\nEm dúvidas de saúde, doenças existentes ou uso de medicamentos, vale conversar com um médico. Um exame de sangue do índice de ômega-3 ajuda a estimar a necessidade individual de forma direcionada, em vez de suplementar por atacado.',
      },
    ],
  },

  vitamin_d: {
    name: 'Vitamina D',
    summary: 'A vitamina D é importante para ossos, músculos e sistema imunológico. Ela é formada sobretudo pela luz do sol, por isso a carência é comum nos meses de pouco sol. Uma suplementação costuma fazer sentido então — de preferência depois de um exame de sangue.',
    quick: [
      { label: 'Fonte', text: 'Luz do sol (pele), pouco pela alimentação. No inverno, muitas vezes é preciso suplemento.' },
      { label: 'Prática', text: 'Com carência, frequentemente ~1000 a 2000 UI por dia; ajustar a dose de preferência por exame de sangue.' },
    ],
    sections: [
      {
        title: 'Por que a vitamina D é especial',
        content: 'A vitamina D ocupa um lugar à parte entre as vitaminas, porque o corpo consegue produzi-la na pele sob efeito da luz do sol (radiação UV-B). A rigor, ela age mais como um hormônio: regula a absorção de cálcio e fosfato e é, portanto, central para ossos e dentes saudáveis.\n\nAlém da saúde óssea, a vitamina D tem funções na musculatura e no sistema imunológico. Seus receptores estão em muitos tecidos do corpo, o que explica sua ampla importância. Uma carência marcada pode contribuir para fraqueza muscular, problemas ósseos e maior propensão a infecções.\n\nO que a torna especial e ao mesmo tempo problemática: como a fonte principal é a luz do sol, o aporte depende bastante de onde se mora, da estação, da cor da pele e do estilo de vida. Em muitas regiões, a radiação solar do inverno não basta para formar vitamina D suficiente.',
      },
      {
        title: 'A carência é muito difundida',
        content: 'A carência de vitamina D está entre os déficits nutricionais mais frequentes do mundo, sobretudo em latitudes ao norte e nos meses de inverno. Pessoas que trabalham muito em ambientes fechados, têm pele mais escura, se cobrem ou são mais velhas têm risco maior, porque a produção própria é limitada.\n\nPela alimentação sozinha é difícil cobrir a necessidade. Apenas poucos alimentos contêm quantidades relevantes — sobretudo peixe gordo, gema de ovo e produtos fortificados. Eles em geral não bastam para compensar uma carência quando falta a formação pelo sol.\n\nO status de vitamina D pode ser determinado por um exame de sangue simples (25-OH-vitamina D). É o caminho mais confiável para saber se e quanto suplementar — em vez de adivinhar.',
      },
      {
        title: 'Suplementação na prática',
        content: 'Quando existe carência ou quando, nos meses de pouco sol, a produção própria é baixa, uma suplementação faz sentido. Costumam-se citar doses de manutenção na faixa de cerca de 1000 a 2000 UI (unidades internacionais) por dia, ainda que a necessidade individual varie bastante.\n\nO melhor é ajustar a dose pelo valor sanguíneo: um exame mostra o ponto de partida e, depois de algumas semanas a meses de uso, dá para conferir o resultado e ajustar a dose. Assim se evitam tanto o aporte insuficiente quanto a superdosagem.\n\nA vitamina D3 (colecalciferol) é a forma preferida. Como é lipossolúvel, é mais bem absorvida junto com uma refeição que contenha gordura. Ela é muitas vezes combinada com vitamina K2, que apoia o metabolismo do cálcio — a evidência para isso é promissora, mas não conclusiva.',
      },
      {
        title: 'Segurança e acompanhamento médico',
        content: 'A vitamina D é lipossolúvel e pode se acumular no corpo — ao contrário das vitaminas hidrossolúveis. Doses muito altas por longo tempo podem levar a um excesso perigoso de cálcio no sangue. O «mais é melhor» expressamente não vale aqui; megadoses sem controle médico devem ser evitadas.\n\nPara a maioria das pessoas, doses de manutenção moderadas são seguras. Quem considera doses altas, tem doenças preexistentes ou toma medicamentos deve fazê-lo com acompanhamento médico. O exame de sangue é também aqui a ferramenta decisiva para permanecer na faixa segura e eficaz.\n\nEm resumo, a vitamina D é um dos poucos suplementos que de fato trazem benefício real para muita gente — sobretudo no inverno. O caminho mais inteligente é medir o status e orientar o uso por ele, em vez de dosar alto por atacado.',
      },
    ],
  },

  magnesium: {
    name: 'Magnésio',
    summary: 'O magnésio participa de mais de 300 processos enzimáticos, entre eles a função muscular e nervosa, o metabolismo energético e o sono. Uma carência leve é comum. Dá para cobrir pela alimentação e, se preciso, suplementar bem.',
    quick: [
      { label: 'Função', text: 'Função muscular e nervosa, metabolismo energético, sono, ossos.' },
      { label: 'Fontes', text: 'Castanhas, sementes, integrais, leguminosas, verduras verdes; suplemento se necessário.' },
    ],
    sections: [
      {
        title: 'O papel do magnésio',
        content: 'O magnésio é um mineral essencial e cofator de mais de 300 reações enzimáticas no corpo. Participa da produção de energia (metabolismo do ATP), da função muscular e nervosa, da síntese de proteínas, da regulação da glicemia e da saúde óssea.\n\nPara pessoas ativas no esporte, o magnésio é especialmente relevante, porque tem papel central na contração e no relaxamento muscular e no metabolismo energético. Uma carência pode se manifestar, entre outros, em cãibras, cansaço, irritabilidade e pior qualidade de sono.\n\nPelo suor e pelo metabolismo elevado, o treino intenso pode aumentar um pouco a necessidade de magnésio. Ao mesmo tempo, a ingestão de muita gente fica no limite, já que uma alimentação muito processada contém pouco magnésio.',
      },
      {
        title: 'Carência e necessidade',
        content: 'Uma carência marcada de magnésio é rara com alimentação saudável, mas uma carência leve ou um aporte no limite é relativamente comum — sobretudo com dieta monótona e muito processada. A necessidade diária de adultos fica em torno de 300 a 400 mg, conforme sexo e idade.\n\nComo o magnésio está em muitos alimentos não processados, a necessidade em princípio se cobre bem pela alimentação. Boas fontes são castanhas e sementes (por exemplo sementes de abóbora, amêndoas), produtos integrais, leguminosas, folhas verdes e chocolate amargo.\n\nUma carência de magnésio só se detecta de forma limitada no sangue, porque a maior parte está armazenada em células e ossos. Sintomas como cãibras frequentes, exaustão ou problemas de sono podem — junto com outras causas — ser indícios e devem ser avaliados por um médico em caso de suspeita.',
      },
      {
        title: 'Suplementação',
        content: 'Quando a ingestão pela alimentação não basta ou existe necessidade aumentada, um suplemento de magnésio pode fazer sentido. A forma importa para a tolerância: compostos orgânicos como citrato, glicinato ou malato de magnésio são bem tolerados e bem absorvidos. O óxido de magnésio é barato, mas é absorvido pior e pode ter efeito laxante.\n\nDoses complementares usuais ficam em torno de 200 a 400 mg de magnésio elementar por dia, muitas vezes tomadas à noite, já que o magnésio pode ter efeito relaxante e apoiar o sono. Doses maiores podem causar fezes moles ou diarreia — sinal para reduzir a quantidade.\n\nA evidência para suplementos de magnésio é mais forte em caso de carência comprovada. Em pessoas com aporte suficiente, o benefício adicional é limitado. Como sempre vale: alimentos primeiro, suplemento como complemento direcionado.',
      },
      {
        title: 'Segurança e resumo',
        content: 'O magnésio da alimentação é inofensivo; o excedente o corpo normalmente elimina pelos rins. Com suplementos, o efeito colateral mais frequente é o laxante, em dose alta demais. Pessoas com função renal comprometida devem tomar suplementos de magnésio apenas após avaliação médica, porque a eliminação pode estar prejudicada.\n\nEm resumo, o magnésio é um mineral importante, com ampla relevância para músculos, nervos, metabolismo energético e sono. Uma carência leve é comum, mas se corrige bem com uma alimentação integral rica em castanhas, sementes, integrais e verduras verdes.\n\nUm suplemento é opção sensata em caso de necessidade aumentada, ingestão insuficiente ou sintomas correspondentes — de preferência em forma bem tolerada e em acordo com um médico, quando houver condições preexistentes.',
      },
    ],
  },
};
