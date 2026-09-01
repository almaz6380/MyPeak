// Portugiesische Fassung (pt-BR) von `src/data/bloodworkKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Hormônios',
    stoffwechsel: 'Metabolismo',
    vitamine: 'Vitaminas e minerais',
    herz: 'Cardiovascular',
  },

  testosterone: {
    name: 'Testosterona',
    summary: 'A testosterona é o principal hormônio anabólico e influencia ganho de músculo, densidade óssea, libido, humor e energia. O valor pode ser influenciado de forma positiva pelo estilo de vida — mas promessas extremas devem ser vistas com cautela.',
    quick: [
      { label: 'Importância', text: 'Ganho de músculo, densidade óssea, libido, disposição, humor.' },
      { label: 'Favorecer naturalmente', text: 'Treino de força, bom sono, peso saudável, gordura e micronutrientes suficientes.' },
    ],
    sections: [
      {
        title: 'O que a testosterona faz no corpo',
        content: 'A testosterona é o principal hormônio sexual masculino, mas também está presente em quantidades menores nas mulheres, onde igualmente importa. Ela pertence aos hormônios anabólicos (construtores) e tem papel central para ganho de músculo, força, densidade óssea, distribuição de gordura, libido, humor e energia.\n\nNos homens, a testosterona é produzida predominantemente nos testículos, comandada por uma interação entre cérebro (hipotálamo, hipófise) e testículos. A produção segue um ritmo diário com valores mais altos pela manhã — por isso as coletas de sangue para dosar testosterona costumam ser feitas no período da manhã.\n\nUm nível saudável de testosterona apoia a adaptação ao treino de força e o bem-estar geral. Tanto valores baixos demais quanto valores artificialmente muito elevados (por exemplo com anabolizantes) têm, porém, consequências para a saúde.',
      },
      {
        title: 'Faixas de referência e medição',
        content: 'A testosterona é medida no sangue, em geral como testosterona total; a testosterona livre (biologicamente ativa) traz informação adicional. As faixas de referência variam conforme o laboratório, a idade e o método de medição, por isso os valores precisam sempre ser lidos no contexto do laboratório e dos sintomas.\n\nPara homens adultos, a faixa de referência da testosterona total costuma ficar entre cerca de 300 e 1000 ng/dl, mas os limites são fluidos. Um valor isolado é, além disso, apenas um retrato momentâneo — horário, sono, estresse e doenças agudas podem influenciá-lo. Diante de valores alterados costuma-se pedir nova medição.\n\nÉ importante lembrar que um valor de laboratório sozinho não é diagnóstico. Só a combinação de sintomas (por exemplo falta de disposição, perda de libido, perda muscular) com valores medidos repetidamente permite uma interpretação médica sensata.',
      },
      {
        title: 'O que influencia o nível de testosterona',
        content: 'Muitos fatores de estilo de vida atuam sobre o nível de testosterona. O excesso de peso, sobretudo muita gordura abdominal, está ligado a valores mais baixos; a perda de peso pode melhorá-los. A falta crônica de sono reduz a testosterona de forma mensurável — já uma semana com apenas cinco horas de sono pode diminuir os valores de modo claro (Leproult e Van Cauter, 2011, JAMA).\n\nTreino de força e movimento suficiente têm efeito favorável a longo prazo, enquanto overtraining extremo ou déficits calóricos muito fortes podem baixar a testosterona. Um aporte suficiente de gordura na dieta e de micronutrientes como zinco e vitamina D também é importante para a produção hormonal — alimentação muito pobre em gordura pode reduzir os valores.\n\nO estresse crônico eleva o hormônio cortisol, que atua em sentido oposto ao da testosterona. Um estilo de vida saudável, com bom sono, alimentação equilibrada, treino regular e manejo do estresse, é portanto a base natural mais eficaz para um nível saudável de testosterona.',
      },
      {
        title: 'Expectativas realistas e orientação médica',
        content: 'O mercado está cheio de «boosters de testosterona» que prometem aumentos dramáticos. A maioria dessas preparações não mostra, nos estudos, efeito algum ou efeitos mínimos em pessoas com valores normais. Um estilo de vida saudável eleva um valor baixo de forma mais eficaz do que qualquer produto de venda livre — e com valores normais não há como «impulsionar» a testosterona de forma útil.\n\nUm nível de testosterona de fato baixo demais (hipogonadismo), com sintomas correspondentes, é um diagnóstico médico, que deve ser esclarecido e, se for o caso, tratado por um médico. Uma terapia com testosterona pertence exclusivamente às mãos médicas, porque exige ponderar cuidadosamente benefícios e riscos.\n\nO uso por conta própria de esteroides anabolizantes para melhorar o desempenho é fortemente desaconselhado: eles podem suprimir a produção do próprio corpo e causar danos sérios à saúde. Em caso de suspeita de problema hormonal, o caminho certo é sempre procurar um médico.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'Vitamina D (25-OH)',
    summary: 'O valor sanguíneo de vitamina D (25-OH-vitamina D) mostra o aporte da «vitamina do sol». A carência é comum sobretudo no inverno e pode afetar ossos, músculos e sistema imunológico. O valor pode ser melhorado de forma direcionada.',
    quick: [
      { label: 'O que se mede', text: '25-OH-vitamina D no sangue — o valor padrão para o status de vitamina D.' },
      { label: 'Melhorar', text: 'Luz do sol, peixe gordo e, com carência, suplemento — dose ajustada por exame de sangue.' },
    ],
    sections: [
      {
        title: 'Por que o valor de vitamina D importa',
        content: 'A vitamina D age no corpo como um hormônio e é central para o metabolismo do cálcio, para ossos saudáveis, para a função muscular e para o sistema imunológico. Como o corpo a produz sob ação do sol, o aporte depende bastante da estação, do local onde se mora e do estilo de vida.\n\nO melhor marcador do aporte é a 25-hidroxi-vitamina D (25-OH-D) no sangue. Ela reflete a forma de armazenamento e dá uma visão confiável do status das últimas semanas. É exatamente esse valor que é dosado em um exame de sangue.\n\nComo a carência de vitamina D é muito difundida e difícil de compensar só pela alimentação, esse valor está entre os exames de rotina mais úteis — sobretudo para quem vive em regiões ao norte e nos meses de pouco sol.',
      },
      {
        title: 'Entender as faixas de referência',
        content: 'O status de vitamina D costuma ser dado em nanogramas por mililitro (ng/ml) ou nanomols por litro (nmol/l). Em linhas gerais, muitos laboratórios se orientam pela seguinte divisão: valores abaixo de cerca de 20 ng/ml (50 nmol/l) contam como carência, e a faixa acima disso como suficiente, com limites exatos variando conforme a sociedade científica.\n\nEsses limites são discutidos tecnicamente e não estão gravados em pedra. Alguns especialistas consideram sensatas metas um pouco mais altas; outros alertam para o excesso de tratamento. O decisivo é interpretar o próprio valor ao longo do tempo e em acordo com um médico.\n\nUm valor muito baixo às vezes explica queixas inespecíficas como cansaço, fraqueza muscular ou infecções frequentes. Um valor de laboratório isolado, porém, deve sempre ser visto no quadro geral — é uma peça, não um diagnóstico completo.',
      },
      {
        title: 'Como melhorar o valor',
        content: 'A fonte mais natural é a luz do sol: exposição regular e moderada da pele estimula a produção do próprio corpo. Nos meses de verão muitas vezes bastam períodos curtos ao ar livre, enquanto no inverno, em latitudes ao norte, a radiação UV-B não é suficiente.\n\nPela alimentação, fornecem vitamina D sobretudo o peixe gordo (salmão, cavala, arenque), a gema de ovo e produtos fortificados — em geral, porém, em quantidades que sozinhas não compensam uma carência. Por isso, com carência comprovada, um suplemento (vitamina D3) costuma ser a solução mais confiável.\n\nO caminho mais inteligente é ajustar a dose do suplemento pelo valor sanguíneo: medir o ponto de partida, suplementar, controlar depois de alguns meses e ajustar. Assim se permanece na faixa eficaz e segura. Como a vitamina D é lipossolúvel e pode se acumular, doses altas devem ter acompanhamento médico.',
      },
      {
        title: 'Contexto e orientação médica',
        content: 'A vitamina D é um dos poucos suplementos com relevância ampla e real — ao mesmo tempo, não se deve dramatizar uma carência nem superestimar a vitamina D como panaceia. Ela não resolve todo problema de saúde, mas é uma peça importante.\n\nComo as vitaminas lipossolúveis podem se acumular, uma dose alta sem controle não é inofensiva. Doses extremamente altas por muito tempo podem levar a um excesso perigoso de cálcio. Vale portanto: medir o valor, suplementar de forma direcionada e buscar orientação médica em caso de dúvida.\n\nO valor de vitamina D é um bom exemplo de como faz sentido agir com base em dados: em vez de adivinhar, o exame de sangue traz clareza e permite uma correção direcionada e segura. Estes conteúdos, porém, não substituem uma orientação médica.',
      },
    ],
  },

  iron_ferritin: {
    name: 'Ferro e ferritina',
    summary: 'O ferro é indispensável ao transporte de oxigênio no sangue. A ferritina mostra os estoques de ferro. Uma carência — comum sobretudo em mulheres que menstruam e em atletas de resistência — leva a cansaço e queda de desempenho.',
    quick: [
      { label: 'O que se mede', text: 'Ferritina (estoques), muitas vezes com hemoglobina, transferrina e saturação de transferrina.' },
      { label: 'Grupos de risco', text: 'Mulheres que menstruam, atletas de resistência, alimentação vegetariana ou vegana.' },
    ],
    sections: [
      {
        title: 'O papel do ferro',
        content: 'O ferro é um mineral essencial e componente central da hemoglobina, o pigmento vermelho do sangue que transporta oxigênio dos pulmões a todos os tecidos. Sem ferro suficiente, o corpo não consegue formar hemoglobina funcional em quantidade adequada, o que prejudica o fornecimento de oxigênio.\n\nNo músculo o ferro também tem papel, via mioglobina, no armazenamento de oxigênio, e participa da produção de energia nas células. Uma carência de ferro se reflete, portanto, diretamente em resistência, força e desempenho geral.\n\nSintomas típicos de carência são cansaço, palidez, falta de ar ao esforço, dificuldade de concentração e uma queda perceptível de desempenho no treino. Como esses sintomas são inespecíficos, a carência de ferro muitas vezes passa despercebida por um tempo, até ser comprovada pelo sangue.',
      },
      {
        title: 'Ferritina e os principais valores',
        content: 'Para avaliar o status de ferro consideram-se vários valores. O mais importante é a ferritina, a forma de armazenamento do ferro: ela mostra o quanto as reservas estão cheias e costuma cair antes de uma carência manifesta aparecer no hemograma. Uma ferritina baixa é, portanto, um sinal de alerta precoce.\n\nComplementarmente, observam-se a hemoglobina (o pigmento vermelho propriamente dito), a transferrina (a proteína de transporte) e a saturação de transferrina. Só o quadro completo permite uma boa interpretação: ferritina baixa com hemoglobina ainda normal indica estoques vazios antes de surgir uma anemia de fato.\n\nÉ importante saber que a ferritina também pode subir em inflamações, mascarando então uma carência. Por isso os valores de ferro devem sempre ser interpretados por um médico, junto com outros marcadores e com o quadro clínico.',
      },
      {
        title: 'Grupos de risco e causas',
        content: 'Certos grupos têm risco bem maior de carência de ferro. Mulheres que menstruam perdem sangue com regularidade e, com ele, ferro — a carência de ferro é nelas a deficiência mais frequente de todas. Gestantes também têm necessidade bastante elevada.\n\nAtletas de resistência igualmente correm risco, entre outros por necessidade aumentada, perdas pelo suor e pelo trato gastrointestinal e pelo chamado impacto do pé na corrida. Pessoas com alimentação vegetariana ou vegana absorvem o ferro em uma forma menos aproveitável e devem acompanhar o próprio status.\n\nOutras causas podem ser ingestão insuficiente, doenças digestivas com absorção prejudicada ou perdas de sangue ocultas. Justamente porque as causas são variadas, uma carência de ferro sem explicação ou persistente deve sempre ser investigada por um médico.',
      },
      {
        title: 'Melhorar — mas do jeito certo',
        content: 'Pela alimentação, a carne vermelha fornece sobretudo ferro heme, bem aproveitável; fontes vegetais como leguminosas, integrais e verduras verdes contêm ferro não heme, absorvido pior. A vitamina C (por exemplo de frutas ou verduras na refeição) melhora bastante a absorção do ferro vegetal, enquanto café e chá a inibem.\n\nCom carência comprovada, a alimentação muitas vezes não basta para encher os estoques rapidamente — aí podem ser necessárias preparações de ferro. Elas não devem, porém, ser tomadas no chute: suplementar ferro sem carência não é inofensivo, porque o ferro excedente pode se acumular no corpo e causar dano.\n\nPor isso, no ferro vale especialmente: primeiro medir, depois agir de forma direcionada. Dose e duração de uma terapia com ferro pertencem às mãos médicas, assim como a busca da causa. Estes conteúdos servem para informar e não substituem um diagnóstico médico.',
      },
    ],
  },

  cholesterol: {
    name: 'Colesterol e lipídios sanguíneos',
    summary: 'Colesterol e triglicerídeos são lipídios sanguíneos importantes. Seu perfil (LDL, HDL, triglicerídeos) é um marcador central da saúde cardiovascular. O estilo de vida tem grande influência — mas a avaliação pertence às mãos médicas.',
    quick: [
      { label: 'Valores importantes', text: 'Colesterol total, LDL, HDL, triglicerídeos — juntos, o perfil lipídico.' },
      { label: 'Influenciar de forma favorável', text: 'Fibras, gorduras insaturadas, movimento, peso saudável, pouca gordura trans.' },
    ],
    sections: [
      {
        title: 'O que é colesterol',
        content: 'O colesterol é uma substância semelhante à gordura de que o corpo precisa para construir membranas celulares, hormônios e ácidos biliares. Ele é, portanto, vital e nada fundamentalmente «ruim». O corpo produz a maior parte do colesterol; uma parte vem da alimentação.\n\nComo o colesterol é lipossolúvel, ele é ligado no sangue a proteínas de transporte — as lipoproteínas. As mais conhecidas são LDL («Low Density Lipoprotein») e HDL («High Density Lipoprotein»). De forma simplificada, o LDL transporta colesterol para os tecidos, enquanto o HDL leva o colesterol excedente de volta ao fígado.\n\nOutro valor lipídico importante são os triglicerídeos, a forma principal de gordura armazenada. Juntos, colesterol total, LDL, HDL e triglicerídeos formam o perfil lipídico determinado em um exame de sangue.',
      },
      {
        title: 'LDL, HDL e a avaliação',
        content: 'A relação e o nível dos valores individuais importam para a saúde cardiovascular. Um LDL permanentemente elevado está ligado a maior risco de depósitos nos vasos (aterosclerose), por isso o LDL é chamado com frequência de colesterol «desfavorável». O HDL, ao contrário, é tido como mais «favorável», por participar do transporte de volta.\n\nTriglicerídeos elevados também são fator de risco, muitas vezes associados a sobrepeso, alto consumo de açúcar e falta de movimento. Para avaliar o risco, porém, não conta um valor isolado, e sim o perfil completo junto com outros fatores, como pressão arterial, tabagismo, histórico familiar e glicemia.\n\nAs faixas-alvo exatas dependem bastante do risco global individual e são definidas pelo médico. Um valor «alto» não significa automaticamente necessidade de agir, e um «normal» não exclui totalmente risco — por isso a interpretação médica é decisiva.',
      },
      {
        title: 'O que cabe ao estilo de vida',
        content: 'O estilo de vida tem influência considerável sobre os lipídios sanguíneos. Uma alimentação rica em fibras, com muitas verduras, frutas, leguminosas e integrais, pode baixar o colesterol LDL. Trocar gorduras saturadas por insaturadas (azeite, castanhas, peixe gordo) tem efeito favorável, enquanto gorduras trans artificiais são claramente desfavoráveis e devem ser evitadas.\n\nAtividade física regular melhora o perfil lipídico, em especial triglicerídeos e HDL. Também um peso corporal saudável, não fumar e um consumo moderado de álcool contribuem para a saúde cardiovascular. Essas medidas atuam em conjunto e são a base de qualquer melhora.\n\nÉ importante a leitura realista: parte dos valores de colesterol é genética e só pode ser influenciada de forma limitada pelo estilo de vida. Algumas pessoas têm valores elevados apesar de um modo de vida saudável — aqui pode ser necessário tratamento medicamentoso, decisão que cabe exclusivamente ao médico.',
      },
      {
        title: 'Contexto e orientação médica',
        content: 'O perfil lipídico é um dos exames de sangue de rotina mais importantes para estimar o risco cardiovascular. Justamente porque depósitos nos vasos não causam sintomas por muito tempo, o controle regular faz sentido — sobretudo com o avanço da idade ou com histórico familiar.\n\nA interpretação é complexa e pertence às mãos médicas. Se e como um valor será tratado depende do risco global individual, não de um número isolado. Mudanças de estilo de vida são quase sempre o primeiro passo; medicamentos como estatinas entram diante de risco correspondente e são bem estudados.\n\nUse este conhecimento para entender melhor o próprio perfil lipídico e atuar de forma direcionada sobre fatores de estilo de vida. A avaliação concreta e o tratamento dos seus valores, porém, devem sempre ser feitos com um médico — estes conteúdos não substituem orientação médica.',
      },
    ],
  },

  blood_sugar: {
    name: 'Glicemia e HbA1c',
    summary: 'A glicemia (glicose) e o valor de longo prazo HbA1c mostram quão bem o corpo processa o açúcar. São marcadores centrais do metabolismo e do risco de diabetes. Alimentação e movimento têm grande influência.',
    quick: [
      { label: 'O que se mede', text: 'Glicemia de jejum (valor momentâneo) e HbA1c (média dos últimos ~3 meses).' },
      { label: 'Influenciar de forma favorável', text: 'Movimento, peso saudável, alimentação rica em fibras, pouco açúcar; treino de força ajuda.' },
    ],
    sections: [
      {
        title: 'Glicemia e insulina',
        content: 'A glicose (açúcar no sangue) é um portador central de energia do corpo. Depois de comer, a glicemia sobe, e então o pâncreas libera o hormônio insulina. A insulina leva a glicose para dentro das células e assim baixa de novo a glicemia a um nível normal.\n\nEsse sistema finamente ajustado mantém a glicemia em uma faixa estreita. Quando funciona bem, o açúcar é processado com eficiência. Se a ação da insulina está perturbada (resistência à insulina), o corpo precisa produzir cada vez mais insulina e a glicemia permanece alta demais — um estágio anterior ao diabetes tipo 2.\n\nA musculatura tem aqui papel importante: músculos ativos captam glicose e melhoram a sensibilidade à insulina. Treino regular, sobretudo de força, é portanto um dos fatores mais eficazes para um metabolismo do açúcar saudável.',
      },
      {
        title: 'Glicemia de jejum e HbA1c',
        content: 'Dois valores são especialmente informativos. A glicemia de jejum é medida depois de várias horas sem comer e mostra o nível atual de açúcar. É um retrato momentâneo e pode oscilar conforme alimentação, estresse e horário.\n\nO HbA1c («açúcar de longo prazo») reflete a glicemia média dos últimos dois a três meses aproximadamente. Ele mede a parcela do pigmento hemoglobina à qual se ligou açúcar. Como cobre um período mais longo, é mais robusto diante de oscilações de curto prazo e é usado no diagnóstico e no acompanhamento.\n\nOs dois valores juntos dão um bom retrato do metabolismo do açúcar. Valores elevados podem indicar um estágio anterior ao diabetes (pré-diabetes) ou um diabetes já existente. Os limites exatos e sua interpretação são definidos pelo médico.',
      },
      {
        title: 'Influência de alimentação e movimento',
        content: 'O metabolismo do açúcar pode ser bastante influenciado pelo estilo de vida. Uma alimentação rica em fibras, com verduras, leguminosas e integrais, leva a uma subida da glicemia mais lenta e uniforme do que alimentos muito processados e ricos em açúcar. Reduzir bebidas adoçadas e produtos de farinha branca é especialmente eficaz.\n\nO movimento é fator-chave. Tanto o treino de resistência quanto o de força melhoram a sensibilidade à insulina e ajudam os músculos a captar glicose. Já uma caminhada depois da refeição pode amortecer a subida da glicemia. Ganhar massa muscular ainda amplia o «depósito de açúcar» do corpo.\n\nUm peso corporal saudável, em especial a redução da gordura abdominal, melhora bastante os valores de glicemia. Essas medidas de estilo de vida são a estratégia mais eficaz e a primeira a adotar para conter o pré-diabetes e baixar o risco de diabetes.',
      },
      {
        title: 'Contexto e orientação médica',
        content: 'Glicemia e HbA1c estão entre os exames de sangue preventivos mais importantes, porque um metabolismo do açúcar perturbado não causa sintomas por muito tempo, mas pode ter consequências sérias. Reconhecer cedo um pré-diabetes abre a chance de reagir com mudanças de estilo de vida antes que o diabetes se instale.\n\nValores elevados são um sinal de alerta importante, mas não um autodiagnóstico. A interpretação, a investigação adicional e um possível tratamento pertencem às mãos médicas. Com diabetes já existente, um acompanhamento médico estruturado é indispensável.\n\nUse este conhecimento para entender o significado dos seus valores e empregar alimentação e movimento de forma direcionada. Treino de força e uma alimentação equilibrada e rica em fibras são aliados fortes para um metabolismo do açúcar saudável. Estes conteúdos, porém, não substituem orientação nem diagnóstico médicos.',
      },
    ],
  },

  thyroid: {
    name: 'Tireoide (TSH)',
    summary: 'A tireoide comanda, por seus hormônios, o metabolismo, a energia e a temperatura corporal. O valor de TSH é o principal teste de triagem para hiper ou hipofunção. Alterações devem sempre ser investigadas por um médico.',
    quick: [
      { label: 'O que se mede', text: 'TSH como teste de triagem; em caso de alteração, também fT3/fT4 e, se for o caso, anticorpos.' },
      { label: 'Sintomas', text: 'Cansaço, mudança de peso, sensibilidade ao frio ou ao calor, humor — inespecíficos, investigar com médico.' },
    ],
    sections: [
      {
        title: 'A tireoide e seus hormônios',
        content: 'A tireoide é uma glândula pequena, em forma de borboleta, no pescoço, com grande efeito. Ela produz os hormônios tireoidianos T3 (tri-iodotironina) e T4 (tiroxina), que regulam a taxa metabólica basal, o metabolismo energético, a temperatura corporal, os batimentos cardíacos e muitas outras funções.\n\nA tireoide é comandada por um circuito de regulação com o cérebro. A hipófise libera o hormônio TSH (hormônio estimulante da tireoide), que estimula a tireoide a produzir hormônios. Esse circuito ajusta finamente a quantidade de hormônios à necessidade do corpo.\n\nQuando a função da tireoide está perturbada, isso se reflete no corpo inteiro. Uma hipofunção (hipotireoidismo) desacelera o metabolismo; uma hiperfunção (hipertireoidismo) o acelera — as duas se manifestam em uma série de sintomas inespecíficos.',
      },
      {
        title: 'Por que o TSH é o valor mais importante',
        content: 'O valor de TSH é o teste de triagem mais sensível para a função da tireoide. A razão está no circuito de regulação: se a tireoide produz poucos hormônios, o corpo tenta compensar e libera mais TSH — um TSH alto, portanto, muitas vezes indica hipofunção. Se ela produz demais, o TSH cai, o que pode indicar hiperfunção.\n\nComo o TSH reage já a pequenos desvios, ele é o primeiro valor dosado. Se o TSH estiver alterado, seguem outros exames: os hormônios tireoidianos livres fT3 e fT4 e, se for o caso, anticorpos, para reconhecer causas como a doença autoimune de Hashimoto.\n\nAs faixas de referência do TSH variam conforme o laboratório, e a interpretação depende do caso — por exemplo da idade, de uma gravidez ou dos sintomas presentes. Um único valor limítrofe não significa automaticamente doença.',
      },
      {
        title: 'Sintomas e distúrbios frequentes',
        content: 'Uma hipofunção da tireoide se manifesta com frequência por cansaço, falta de disposição, ganho de peso, sensibilidade ao frio, pele seca e humor deprimido. Uma hiperfunção, em contrapartida, aparece muitas vezes como nervosismo, taquicardia, perda de peso apesar do apetite, sensibilidade ao calor e distúrbios do sono.\n\nEsses sintomas são inespecíficos e podem ter muitas outras causas — justamente por isso o exame de sangue é tão valioso, para verificar ou descartar a tireoide como causa de forma direcionada. Para pessoas ativas no esporte, uma tireoide funcionando bem é importante, porque influencia energia, recuperação e metabolismo.\n\nDistúrbios frequentes são a doença autoimune de Hashimoto (que leva em geral à hipofunção) e a doença de Graves (que leva à hiperfunção). Também a carência de iodo pode prejudicar a tireoide. O diagnóstico preciso exige sempre um exame médico.',
      },
      {
        title: 'Contexto e orientação médica',
        content: 'A tireoide é um exemplo de como um órgão pequeno influencia o corpo inteiro. O valor de TSH é um teste de triagem simples e informativo, que pode fazer sentido diante de sintomas pouco claros, como cansaço persistente, mudanças de peso inexplicáveis ou oscilações de humor.\n\nAo contrário de alguns outros valores, um distúrbio real da função tireoidiana não se resolve simplesmente «treinando». Um aporte suficiente de iodo (sal iodado e alimentos) apoia a função normal, mas um distúrbio instalado precisa de tratamento médico direcionado, muitas vezes com preparações hormonais.\n\nPor isso aqui vale especialmente: valores alterados da tireoide ou sintomas correspondentes pertencem sempre às mãos médicas. Este conhecimento ajuda você a entender o significado do TSH e a levar sintomas a sério — mas expressamente não substitui diagnóstico nem tratamento.',
      },
    ],
  },
};
