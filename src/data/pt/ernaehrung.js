// Portugiesische Fassung (pt-BR) von `src/data/nutritionKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fundamentos',
    makros: 'Macronutrientes',
    mikros: 'Micronutrientes',
    praxis: 'Prática',
  },

  energy_balance: {
    name: 'Balanço energético e calorias',
    summary: 'O balanço energético — calorias ingeridas contra calorias gastas — determina se você ganha ou perde peso. É o princípio mais básico da nutrição, acima de todos os outros detalhes.',
    quick: [
      { label: 'Ideia central', text: 'Déficit → emagrecer, superávit → engordar, manutenção → peso estável. Calorias são o que manda.' },
      { label: 'Prática', text: 'Calcular o GET por alto, definir a meta, observar 2 a 3 semanas e então ajustar.' },
    ],
    sections: [
      {
        title: 'O princípio do balanço energético',
        content: 'O balanço energético descreve a relação entre a energia que você ingere pela alimentação e a energia que o seu corpo gasta. Se você ingere mais do que gasta (superávit), o corpo armazena a energia excedente — sobretudo como gordura. Se gasta mais do que ingere (déficit), ele recorre às reservas e você emagrece.\n\nEsse princípio se apoia na primeira lei da termodinâmica: a energia não se perde, apenas se transforma. Inúmeros estudos controlados confirmam que o balanço energético é o fator decisivo para mudanças de peso — independentemente dos alimentos de onde vêm as calorias (Hall e Guo, 2017, Gastroenterology).\n\nIsso não significa que a qualidade dos alimentos seja indiferente. Ela influencia saciedade, saúde, desempenho e a facilidade de manter um determinado nível calórico. Mas, para a pergunta pura «engordar ou emagrecer», o que decide é o balanço calórico total.',
      },
      {
        title: 'Os componentes do gasto calórico',
        content: 'O gasto energético total diário (GET) é formado por quatro partes. A taxa metabólica basal (TMB) representa a maior fatia, de 60 a 70 % — é a energia de que o corpo precisa em repouso só para funções vitais como respiração, circulação e metabolismo celular.\n\nA termogênese induzida pelos alimentos (ETA) responde por cerca de 10 %: a energia gasta na digestão e no processamento da comida. A proteína tem o maior efeito térmico — um dos motivos pelos quais uma alimentação rica em proteína ajuda a emagrecer.\n\nA terceira parte, e a mais variável, é a atividade. Distingue-se entre esporte (EAT) e movimento do dia a dia (NEAT — termogênese da atividade não esportiva), como andar, se mexer e ficar de pé. O NEAT pode variar entre pessoas em várias centenas de calorias por dia e muitas vezes se ajusta sem que se perceba a um déficit calórico, com a pessoa se movendo menos.',
      },
      {
        title: 'Estimar a necessidade calórica',
        content: 'Para estimar sua necessidade, primeiro calcule a taxa metabólica basal, por exemplo com a fórmula de Mifflin-St Jeor, e multiplique por um fator de atividade (1,2 para muito pouco ativo até cerca de 1,9 para muito ativo). O resultado é seu GET estimado — a quantidade de calorias com a qual seu peso fica estável.\n\nImportante: essas fórmulas fornecem apenas valores aproximados. O gasto real pode variar de 10 a 20 % de pessoa para pessoa. Por isso o valor inicial é só um ponto de partida, não um roteiro exato.\n\nO caminho mais confiável é observar o peso corporal por duas a três semanas com ingestão calórica constante. Se ele ficar estável, você encontrou sua manutenção. Se subir ou cair, ajuste as calorias em cerca de 200 a 300. Assim você calibra a teoria pela sua realidade.',
      },
      {
        title: 'Mal-entendidos frequentes',
        content: 'Um engano difundido é acreditar num metabolismo «quebrado» ou extremamente lento. Distúrbios metabólicos reais são raros; em geral, superestima-se o gasto calórico e subestima-se a ingestão. Estudos mostram que as pessoas costumam subestimar a própria ingestão calórica em 20 a 50 % (Lichtman et al., 1992, New England Journal of Medicine).\n\nUm segundo engano: certos alimentos «acelerariam o metabolismo» e derreteriam gordura. Esses efeitos são mínimos e não mudam nada na equação básica. Nenhum alimento e nenhuma bebida burla o balanço energético.\n\nEm terceiro lugar, a adaptação metabólica é real, mas limitada: em déficit prolongado o gasto cai um pouco (termogênese adaptativa), mas isso não explica platôs completos. Quem não emagrece embora acredite estar em déficit costuma comer mais do que supõe.',
      },
      {
        title: 'Resumo',
        content: 'O balanço energético é o alicerce de toda alimentação: um déficit faz emagrecer, um superávit faz engordar, a manutenção segura o peso. Todos os demais detalhes — macros, horários, escolha de alimentos — atuam dentro desse quadro.\n\nEstime sua necessidade com uma fórmula, mas trate o valor apenas como ponto de partida e calibre-o pela evolução real do peso. Meça e ajuste, em vez de confiar só na teoria.\n\nQualidade dos alimentos, proteína e saciedade determinam com que conforto e saúde você sustenta um nível calórico — mas quem decide se você ganha ou perde peso é o balanço. Entender esse princípio deixa você independente de modismos de dieta.',
      },
    ],
  },

  protein: {
    name: 'Proteína',
    summary: 'A proteína é o macronutriente mais importante para ganhar e preservar músculo. É a que mais sacia, tem o maior efeito térmico e protege a musculatura durante o emagrecimento. Para quem treina, cerca de 1,6 a 2,2 g por quilo de peso corporal são ideais.',
    quick: [
      { label: 'Quantidade-alvo', text: 'Cerca de 1,6 a 2,2 g por kg de peso corporal por dia; ao emagrecer, mais para o topo da faixa.' },
      { label: 'Fontes', text: 'Carne, peixe, ovos, laticínios, leguminosas, tofu, whey ou proteína em pó.' },
    ],
    sections: [
      {
        title: 'Por que a proteína é tão importante',
        content: 'As proteínas são feitas de aminoácidos, os blocos de construção de músculos, enzimas, hormônios e praticamente toda estrutura do corpo. Nove desses aminoácidos são essenciais — o corpo não consegue produzi-los, eles precisam vir da alimentação.\n\nPara quem pratica esporte, a proteína é especialmente relevante porque estimula a síntese proteica muscular — o processo pelo qual, depois do treino, nova massa muscular é construída. Sem proteína suficiente, nem mesmo um treino duro se converte em crescimento muscular.\n\nAlém disso, a proteína traz duas vantagens práticas no controle de peso: sacia mais do que carboidratos ou gorduras e tem o maior efeito térmico (cerca de 20 a 30 % das calorias proteicas são consumidas na digestão). Os dois pontos fazem dela o macronutriente mais valioso para emagrecer.',
      },
      {
        title: 'De quanta proteína você precisa?',
        content: 'A quantidade mínima oficial para evitar carência é de 0,8 g por quilo de peso corporal — mas isso está longe do ideal para quem pratica esporte. Uma ampla metanálise de Morton et al. (2018, British Journal of Sports Medicine) encontrou que cerca de 1,6 g/kg trazem o maior benefício para o ganho de músculo, com possível benefício adicional até cerca de 2,2 g/kg.\n\nAo emagrecer, faz mais sentido ficar no topo da faixa. Em déficit calórico a necessidade sobe, porque a proteína protege a musculatura da degradação. Helms et al. (2014) recomendam para atletas em déficit até 2,3 a 3,1 g por quilo de massa livre de gordura.\n\nPara a maioria de quem treina, uma referência simples de cerca de 2 g por quilo de peso corporal é prática e eficaz. Mais do que isso não faz mal a pessoas saudáveis, mas quase não traz benefício adicional.',
      },
      {
        title: 'Qualidade e distribuição',
        content: 'Nem toda fonte de proteína é igual. A «qualidade» depende do teor de aminoácidos essenciais, em especial a leucina, e da digestibilidade. Fontes animais (carne, peixe, ovos, laticínios) costumam ser completas; fontes vegetais são muitas vezes limitadas em algum aminoácido, mas se complementam pela combinação (por exemplo, leguminosas com cereais).\n\nA distribuição ao longo do dia também tem papel. A síntese proteica muscular é estimulada ao máximo por cerca de 20 a 40 g de proteína de qualidade por refeição. Faz sentido, portanto, distribuir a proteína em três a cinco refeições em vez de comer tudo de uma vez.\n\nNa prática isso significa: toda refeição principal deveria conter uma boa fonte de proteína. Mas a quantidade total do dia segue sendo o fator mais importante — a distribuição perfeita vem depois de bater a meta diária.',
      },
      {
        title: 'Mitos e segurança',
        content: 'Um mito persistente diz que muita proteína prejudica os rins. Em pessoas saudáveis isso não está comprovado — estudos controlados não mostram efeitos negativos de ingestão proteica alta sobre a função renal (Devries et al., 2018, Journal of Nutrition). Só em caso de doença renal existente é preciso falar com um médico.\n\nOutro mito: o corpo só conseguiria «aproveitar» cerca de 30 g de proteína por refeição. Na verdade, quantidades maiores também são digeridas e usadas — o que se achata é apenas o estímulo agudo sobre a síntese proteica muscular. Porções maiores, portanto, não são desperdício.\n\nProteínas em pó como o whey são práticas, mas não obrigatórias. São simplesmente uma fonte de proteína cômoda e barata. Quem cobre a necessidade com alimentos normais não precisa de suplemento — eles são ferramenta, não milagre.',
      },
      {
        title: 'Resumo',
        content: 'A proteína é o macronutriente-chave para ganho de músculo, preservação muscular e saciedade. Para quem treina, cerca de 1,6 a 2,2 g por quilo de peso corporal são ideais; ao emagrecer, mais para o topo da faixa.\n\nAposte em fontes de qualidade, distribua a proteína em várias refeições e, acima de tudo, bata sua meta diária. Se é animal ou vegetal importa menos, desde que quantidade e qualidade totais estejam certas.\n\nOs avisos difundidos contra proteína «demais» não têm fundamento para pessoas saudáveis. É o macronutriente em que a precisão mais compensa — o que faz a maior diferença para a composição corporal e a saciedade.',
      },
    ],
  },

  carbs: {
    name: 'Carboidratos',
    summary: 'Os carboidratos são a principal fonte de energia para o treino intenso. Não engordam por si — o que decide é o balanço calórico total. Qualidade, quantidade e horário podem, porém, influenciar bastante desempenho e bem-estar.',
    quick: [
      { label: 'Função', text: 'Combustível principal para esforços intensos; enchem os estoques de glicogênio nos músculos e no fígado.' },
      { label: 'Prática', text: 'Predominantemente fontes ricas em fibras e pouco processadas; ajustar a quantidade à atividade.' },
    ],
    sections: [
      {
        title: 'O que os carboidratos fazem no corpo',
        content: 'Os carboidratos são quebrados em glicose, o combustível preferido do trabalho muscular intenso e a principal fonte de energia do cérebro. A glicose excedente é armazenada como glicogênio nos músculos e no fígado — uma reserva de energia rapidamente disponível.\n\nEm treinos intensos de força e intervalados, o corpo recorre bastante a esse glicogênio muscular. Estoques bem cheios significam mais desempenho, mais repetições e melhor qualidade de treino. Com ingestão baixa de carboidratos por muito tempo, esses estoques podem esvaziar em parte e o desempenho em alta intensidade cai.\n\nOs carboidratos, porém, não são essenciais em sentido estrito — o corpo consegue produzir glicose. Ainda assim, para o desempenho esportivo e o bem-estar eles são muito úteis para a maioria das pessoas, sobretudo com treino intenso.',
      },
      {
        title: 'Qualidade: carboidratos complexos ou simples',
        content: 'As fontes de carboidrato diferem bastante em seus efeitos. Fontes ricas em fibras e pouco processadas, como produtos integrais, leguminosas, frutas e verduras, são digeridas mais devagar, saciam melhor e fornecem micronutrientes. Fontes muito processadas, como açúcar e produtos de farinha branca, são absorvidas rápido e quase não saciam.\n\nAs fibras merecem atenção especial. Elas favorecem a digestão, alimentam as bactérias intestinais e melhoram a saciedade. Recomendam-se cerca de 25 a 35 g por dia, valor que muita gente fica bem abaixo. Uma alimentação rica em fibras está ligada a melhor saúde e a um controle de peso mais fácil.\n\nIsso não quer dizer que carboidratos simples sejam proibidos. Em torno do treino, carboidratos de rápida disponibilidade podem até fazer sentido. No dia a dia, porém, a maior parte deve vir de fontes ricas em nutrientes e fibras.',
      },
      {
        title: 'Quantos carboidratos?',
        content: 'Depois de proteína e gordura, você pode preencher com carboidratos as calorias restantes da sua meta. Não existe uma quantidade «certa» fixa — ela depende de atividade, preferências e objetivos. Pessoas muito ativas se beneficiam de mais carboidratos; as menos ativas se viram com menos.\n\nPara quem treina intensamente costuma-se citar 3 a 5 g por quilo de peso corporal ou mais. Quem faz pouco esporte ou prefere uma alimentação com menos carboidratos pode ficar bem abaixo disso, sem desvantagens — desde que proteína e calorias totais estejam certas.\n\nDietas low-carb e cetogênicas funcionam para emagrecer tão bem quanto as com mais carboidratos, se as calorias forem iguais. Não são queimadores mágicos de gordura, e sim uma opção legítima para quem se sente melhor assim ou fica mais saciado.',
      },
      {
        title: 'O mito da insulina',
        content: 'Um mito muito difundido diz que os carboidratos engordam só pela liberação de insulina. A insulina é um hormônio de armazenamento que sobe depois de refeições ricas em carboidratos — daí veio a teoria de que os carboidratos seriam a verdadeira causa do ganho de gordura.\n\nEstudos controlados, porém, refutam isso com clareza. Com as mesmas calorias e a mesma proteína, uma alimentação pobre em carboidratos não leva a mais perda de gordura do que uma rica em carboidratos (Hall et al., 2016, American Journal of Clinical Nutrition). A insulina comanda processos de armazenamento de curto prazo, mas não burla o balanço energético total.\n\nPara pessoas saudáveis, respostas normais de insulina aos carboidratos são absolutamente sem problema. É diferente em caso de diabetes ou resistência à insulina — aí o controle de carboidratos é medicamente relevante e deve ter acompanhamento médico.',
      },
      {
        title: 'Resumo',
        content: 'Os carboidratos são o combustível principal do treino intenso e de forma alguma engordam por si — o balanço calórico decide. Eles enchem os estoques de glicogênio e apoiam desempenho e recuperação.\n\nEscolha predominantemente fontes ricas em fibras e pouco processadas e ajuste a quantidade à sua atividade. Em torno do treino, carboidratos mais rápidos podem fazer sentido.\n\nNem low-carb nem high-carb é superior por princípio — os dois funcionam com calorias adequadas. Escolha a abordagem com a qual você se sente bem, treina bem e consegue manter a longo prazo.',
      },
    ],
  },

  fats: {
    name: 'Gorduras',
    summary: 'A gordura da dieta é essencial para hormônios, membranas celulares e a absorção das vitaminas lipossolúveis. Um mínimo é importante para a saúde; o tipo de gordura conta mais do que a quantidade pura.',
    quick: [
      { label: 'Quantidade mínima', text: 'Não ficar de forma duradoura abaixo de ~0,5 a 0,8 g por kg de peso corporal (função hormonal).' },
      { label: 'Qualidade', text: 'Preferir gorduras insaturadas (azeite, castanhas, peixe); evitar gorduras trans.' },
    ],
    sections: [
      {
        title: 'O papel da gordura da dieta',
        content: 'A gordura é muito mais do que um portador de energia. Ela é componente de toda membrana celular, matéria-prima de hormônios esteroides como testosterona e estrogênio, e necessária para a absorção das vitaminas lipossolúveis A, D, E e K. Uma alimentação pobre demais em gordura pode, portanto, prejudicar a produção hormonal e a absorção de nutrientes.\n\nCom 9 calorias por grama, a gordura é o macronutriente mais denso em energia — mais do que o dobro de proteína ou carboidrato (4 kcal cada). Isso torna fácil ingerir muitas calorias sem querer por meio da gordura, e por isso um manejo consciente ajuda ao emagrecer.\n\nDois ácidos graxos são essenciais: ômega-3 e ômega-6. O corpo não consegue produzi-los. Os ácidos graxos ômega-3 de peixes gordos, em especial, faltam a muita gente e estão ligados a inúmeros benefícios para a saúde.',
      },
      {
        title: 'Tipos de gordura',
        content: 'As gorduras insaturadas são consideradas especialmente favoráveis. As monoinsaturadas (azeite, abacate, castanhas) e as poli-insaturadas (peixe gordo, linhaça, nozes) apoiam a saúde do coração e fornecem ácidos graxos essenciais. Elas devem compor a maior parte da ingestão de gordura.\n\nAs gorduras saturadas (em carne, manteiga, óleo de coco) não são nocivas por si, mas devem ser consumidas com moderação. As recomendações da maioria das sociedades científicas ficam abaixo de 10 % das calorias totais. Os dados sobre o efeito exato delas são discutidos, mas substituir uma parte por gorduras insaturadas é tido como vantajoso.\n\nAs gorduras trans artificiais são o único tipo que deve ser claramente evitado. Elas surgem na hidrogenação industrial de óleos e têm forte ligação com doenças cardiovasculares. Em muitos países já são bastante reguladas ou proibidas.',
      },
      {
        title: 'Quanta gordura?',
        content: 'Diferentemente da proteína, na gordura o que se observa é sobretudo um limite inferior. Uma alimentação permanentemente muito pobre em gordura (abaixo de cerca de 0,5 g por quilo de peso corporal) pode, em algumas pessoas, prejudicar a produção hormonal. Um mínimo razoável fica em torno de 0,5 a 0,8 g por quilo.\n\nPara cima, a gordura é flexível. Assim que a proteína está definida, as calorias restantes podem ser distribuídas entre gordura e carboidratos conforme a preferência. Algumas pessoas se sentem melhor com mais gordura e menos carboidrato, outras ao contrário — as duas coisas são aceitáveis do ponto de vista da saúde.\n\nRecomendações típicas ficam em torno de 20 a 35 % das calorias totais vindas de gordura. Mais importante que a porcentagem exata é cobrir o mínimo, escolher predominantemente gorduras de qualidade e manter as calorias totais no radar.',
      },
      {
        title: 'Foco no ômega-3',
        content: 'Entre as gorduras, os ácidos graxos ômega-3 EPA e DHA merecem atenção especial. Eles regulam a inflamação e estão ligados a melhor saúde cardiovascular e cerebral. A principal fonte é peixe gordo de água fria, como salmão, cavala e arenque.\n\nMuitas pessoas consomem pouco ômega-3 e, ao mesmo tempo, muito ômega-6 (de óleos processados), o que desloca a proporção de forma desfavorável. Duas a três porções de peixe gordo por semana melhoram bastante o aporte.\n\nQuem não come peixe pode pensar em um suplemento de óleo de algas ou de peixe. Fontes vegetais de ômega-3 (linhaça, nozes) fornecem ALA, que o corpo converte apenas de forma limitada nas formas ativas EPA e DHA. Em dúvidas de saúde sobre suplementação, vale falar com um médico.',
      },
      {
        title: 'Resumo',
        content: 'A gordura é essencial para hormônios, membranas celulares e absorção de vitaminas. Não fique de forma duradoura abaixo de cerca de 0,5 a 0,8 g por quilo de peso corporal, senão função hormonal e bem-estar podem sofrer.\n\nA qualidade da gordura conta: prefira gorduras insaturadas de azeite, castanhas, abacate e peixe gordo, mantenha as saturadas moderadas e evite as trans artificiais. Cuide em especial de um aporte suficiente de ômega-3.\n\nAcima do mínimo, a quantidade de gordura é flexível e questão de gosto. Escolha a distribuição entre gordura e carboidratos que combine com suas preferências, com as calorias totais certas.',
      },
    ],
  },

  micronutrients: {
    name: 'Vitaminas e minerais',
    summary: 'Os micronutrientes não fornecem energia, mas são indispensáveis a inúmeras funções do corpo. Uma alimentação variada e integral costuma cobrir a necessidade — alguns nutrientes, porém, merecem atenção especial.',
    quick: [
      { label: 'Regra básica', text: 'Variedade de verduras, frutas, integrais e fontes de proteína cobre a maioria dos micronutrientes.' },
      { label: 'Ficar de olho', text: 'Vitamina D, ômega-3, eventualmente ferro (mulheres), B12 (veganos), iodo, magnésio.' },
    ],
    sections: [
      {
        title: 'O que são micronutrientes',
        content: 'Os micronutrientes abrangem vitaminas e minerais de que o corpo precisa apenas em pequenas quantidades — ao contrário dos macronutrientes (proteína, carboidratos, gordura), que fornecem energia. Embora não tenham calorias, participam de praticamente todo processo metabólico: produção de energia, função imune, saúde óssea, transporte de oxigênio e muito mais.\n\nUma carência de micronutrientes pode se manifestar aos poucos — por cansaço, recuperação pior, propensão a infecções ou queda de desempenho. Justamente em alimentação com calorias reduzidas ou monótona, o risco de aporte insuficiente aumenta.\n\nA boa notícia: uma alimentação variada, com muitas verduras, frutas, produtos integrais, boas fontes de proteína e gorduras saudáveis, cobre a necessidade da maior parte dos micronutrientes de forma natural. A variedade de alimentos é o melhor seguro contra carências.',
      },
      {
        title: 'Nutrientes críticos no radar',
        content: 'Alguns micronutrientes ficam escassos mesmo com boa alimentação. A vitamina D é produzida sobretudo pela luz do sol e está em falta em muitas regiões, em especial no inverno. Uma suplementação costuma fazer sentido aqui, de preferência depois de um exame de sangue.\n\nO ferro é tema sobretudo para mulheres que menstruam, já que as perdas regulares de sangue elevam a necessidade. A carência se manifesta em cansaço e queda de desempenho. A vitamina B12 aparece quase só em produtos de origem animal — pessoas veganas precisam obrigatoriamente suplementá-la.\n\nOutros nutrientes com frequência escassos são iodo, magnésio, zinco e ômega-3. Em vez de suplementar tudo sem critério, é mais inteligente olhar a própria necessidade de forma direcionada — de preferência por exames de sangue e em acordo com um médico.',
      },
      {
        title: 'Alimentos antes de suplementos',
        content: 'Em princípio vale: alimentos integrais são preferíveis a suplementos. Eles fornecem micronutrientes no conjunto natural, com fibras, compostos vegetais e outras substâncias que atuam juntas. Uma vitamina isolada em pílula não substitui essa complexidade.\n\nEstudos sobre preparações vitamínicas isoladas mostram muitas vezes benefícios decepcionantes ou nulos em pessoas saudáveis sem carência — às vezes até desvantagens em superdosagem. Mais não é melhor: vitaminas lipossolúveis (A, D, E, K) podem se acumular e ser nocivas em doses altas.\n\nSuplementos fazem sentido quando existe uma carência real ou uma necessidade aumentada — por exemplo vitamina D no inverno, B12 em alimentação vegana ou ferro com carência comprovada. Como complemento direcionado são úteis; como substituto de uma boa alimentação, não.',
      },
      {
        title: 'Aplicação prática',
        content: 'A estratégia mais simples para um bom aporte de micronutrientes chama-se variedade e cor. Verduras e frutas de cores diferentes fornecem vitaminas e compostos vegetais diferentes — «coma o arco-íris» é uma regra prática.\n\nNa prática ajuda incluir verduras em toda refeição principal, incorporar com regularidade leguminosas, castanhas e sementes, alternar diferentes fontes de proteína e preferir integrais a produtos muito processados. Assim surge quase automaticamente uma base ampla de nutrientes.\n\nQuem come muita coisa processada e de forma monótona arrisca carências apesar de calorias suficientes — fenômeno às vezes descrito como «superalimentado e subnutrido». A qualidade dos alimentos é, portanto, a chave de um aporte robusto de micronutrientes.',
      },
      {
        title: 'Resumo',
        content: 'Os micronutrientes não fornecem energia, mas são indispensáveis para saúde, recuperação e desempenho. Uma alimentação variada e integral cobre a necessidade da maioria das vitaminas e minerais.\n\nMerecem atenção especial a vitamina D, o ômega-3 e, conforme a situação, ferro, B12, iodo e magnésio. Em vez de suplementar por atacado, vale um olhar direcionado à própria necessidade, de preferência por exames de sangue.\n\nAlimentos integrais vêm antes de suplementos. Variedade e cor no prato são a melhor e mais simples estratégia para um bom aporte de micronutrientes.',
      },
    ],
  },

  meal_timing: {
    name: 'Horário das refeições',
    summary: 'Quando e com que frequência você come importa bem menos do que o quê e o quanto. O horário pode afinar desempenho e bem-estar, mas nunca substitui os fundamentos calorias e proteína.',
    quick: [
      { label: 'Prioridade', text: 'Calorias totais e proteína primeiro — horário é acabamento, não alicerce.' },
      { label: 'Útil', text: 'Distribuir a proteína ao longo do dia; comer o suficiente em torno do treino.' },
    ],
    sections: [
      {
        title: 'Colocando as coisas no lugar',
        content: 'Em torno do horário das refeições circulam muitos mitos — da «janela anabólica» logo depois do treino até a proibição de comer carboidratos à noite. Na realidade, o horário é um fator de acabamento, que só conta quando os fundamentos estão certos: calorias totais, proteína e qualidade dos alimentos.\n\nA hierarquia da nutrição é clara: primeiro vem o balanço energético, depois os macronutrientes (sobretudo a proteína), depois a qualidade dos alimentos e os micronutrientes — e só então horário e frequência das refeições. Quem descuida dos níveis de cima não salva nada com um horário perfeito.\n\nIsso não quer dizer que o horário seja inútil. Ele pode melhorar desempenho, saciedade e bem-estar. Mas é a última e menor alavanca — não motivo para estresse nem para regras complicadas.',
      },
      {
        title: 'A «janela anabólica»',
        content: 'Por muito tempo valeu a regra de que era preciso ingerir proteína e carboidratos logo depois do treino, senão o efeito da sessão se perderia. Essa «janela anabólica» estreita se mostrou um exagero.\n\nUma metanálise de Schoenfeld, Aragon e Krieger (2013, Journal of the International Society of Sports Nutrition) encontrou que o momento exato da ingestão de proteína em torno do treino importa bem menos do que a quantidade total de proteína do dia. A «janela» é larga de várias horas, não de poucos minutos.\n\nNa prática isso significa: enquanto você comer proteína suficiente distribuída ao longo do dia e não ficar muitas horas totalmente em jejum antes e depois do treino, não precisa correr. Quem treina em jejum pode se beneficiar de uma refeição relativamente próxima ao fim do treino — mais por razões práticas do que por urgência fisiológica.',
      },
      {
        title: 'Frequência de refeições e jejum intermitente',
        content: 'Se você faz três refeições grandes ou seis pequenas quase não influencia metabolismo ou perda de gordura, desde que calorias e proteína sejam as mesmas. A velha crença de que refeições pequenas e frequentes «acelerariam o metabolismo» está refutada — o efeito térmico depende da quantidade total, não da frequência.\n\nO jejum intermitente (por exemplo 16:8) é popular e, para muitos, uma ferramenta útil para controlar a ingestão calórica. Mas não é queimador mágico de gordura: com as mesmas calorias, não leva a mais perda de gordura do que uma alimentação distribuída de forma uniforme. Seu benefício está sobretudo em algumas pessoas conseguirem se manter em déficit com mais facilidade.\n\nA melhor frequência de refeições é a que combina com sua rotina, sacia bem e você consegue manter. Para o ganho de músculo faz sentido distribuir a proteína em pelo menos três a quatro porções — além disso, a frequência é questão de gosto.',
      },
      {
        title: 'Horário útil na prática',
        content: 'Mesmo o horário sendo secundário, há alguns pontos praticamente úteis. Antes do treino, uma refeição com carboidratos e um pouco de proteína de uma a três horas antes garante boa energia e bom desempenho. Já um estômago muito cheio pouco antes da sessão pode ser desconfortável.\n\nDepois do treino, uma refeição com proteína e carboidratos dentro de algumas horas faz sentido, para apoiar a recuperação e a reposição de glicogênio. O momento exato é flexível — não precisa ser o famigerado segundo depois da última série.\n\nSono e digestão também se beneficiam do horário: refeições muito grandes ou muito apimentadas logo antes de dormir podem atrapalhar o sono. Mas quem come carboidratos à noite não precisa temer ganho de gordura — isso é mito, desde que o balanço do dia esteja certo.',
      },
      {
        title: 'Resumo',
        content: 'O horário das refeições é o acabamento da alimentação, não seu alicerce. Calorias totais e proteína determinam a maior parte do resultado; horário e frequência vêm depois.\n\nA «janela anabólica» tem várias horas de largura, não minutos. Frequência de refeições e jejum intermitente se equivalem com as mesmas calorias — escolha o que combina com sua rotina e sacia bem.\n\nÚtil é distribuir a proteína ao longo do dia e comer o suficiente em torno do treino. Todo o resto é otimização individual, não obrigação. Não se estresse com horário enquanto os fundamentos estiverem certos.',
      },
    ],
  },
};
