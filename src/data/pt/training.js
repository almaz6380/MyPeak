// Portugiesische Fassung (pt-BR) von `src/data/trainingKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fundamentos',
    hypertrophie: 'Ganho de músculo',
    programmierung: 'Programação',
    regeneration: 'Recuperação',
  },

  progressive_overload: {
    name: 'Sobrecarga progressiva',
    summary: 'O princípio mais importante para progredir a longo prazo: o estímulo do treino precisa aumentar de forma sistemática ao longo do tempo, para que o corpo continue se adaptando. Sem progressão, força e ganho de músculo estagnam.',
    quick: [
      { label: 'Ideia central', text: 'Aos poucos mais carga, repetições, séries ou técnica melhor — o estímulo precisa subir.' },
      { label: 'Para quem', text: 'Todos os níveis. Iniciantes progridem rápido; avançados precisam de passos menores e mais planejados.' },
    ],
    sections: [
      {
        title: 'O que é sobrecarga progressiva?',
        content: 'Sobrecarga progressiva descreve o aumento gradual das exigências sobre o corpo durante o treino. A ideia de fundo remonta ao princípio da supercompensação: um estímulo de treino perturba o equilíbrio biológico, o corpo se repara e se adapta a um nível de desempenho um pouco maior. Se depois o estímulo continuar igual, não há motivo para nova adaptação — o progresso para.\n\nO termo vem originalmente da reabilitação: Thomas DeLorme desenvolveu nos anos 1940 o conceito de «progressive resistance exercise» para recuperar a força muscular de soldados feridos (DeLorme, 1945, Journal of Bone and Joint Surgery). Desde então tornou-se o alicerce de todo treino sério de força e de ganho muscular.\n\nÉ importante entender que «mais carga» é apenas uma entre várias formas de progressão. O estímulo também pode ser aumentado com mais repetições, mais séries, pausas mais curtas, maior amplitude de movimento ou execução mais lenta e controlada.',
      },
      {
        title: 'Base científica',
        content: 'A necessidade de progressão gradual é um dos princípios mais bem documentados das ciências do treino. O posicionamento do American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) cita expressamente a sobrecarga progressiva como condição para ganhos contínuos de força e hipertrofia e recomenda um aumento planejado de carga e volume.\n\nUma revisão de Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) mostra que tanto cargas altas quanto moderadas podem provocar crescimento muscular — o decisivo é que as séries sejam levadas perto da exaustão muscular e que o estímulo aumente com o tempo. Isso ressalta que a progressão pode ser conduzida com flexibilidade.\n\nAs adaptações ao treino seguem ainda o princípio SAID («Specific Adaptation to Imposed Demands»): o corpo se adapta exatamente à carga que recebe. Se a carga não sobe, a adaptação também não acontece — uma relação confirmada de forma consistente na fisiologia do esporte há décadas.',
      },
      {
        title: 'Métodos de progressão',
        content: 'Há vários caminhos praticáveis para aumentar o estímulo. O mais conhecido é o aumento de carga: mais peso na barra. Na maioria dos exercícios fazem sentido saltos de 2,5 kg (parte superior) ou 5 kg (parte inferior), assim que o número maior de repetições é alcançado com técnica limpa.\n\nA progressão dupla é um método especialmente amigável para iniciantes: escolhe-se uma faixa de repetições (por exemplo 8 a 12). Primeiro sobe-se dentro dessa faixa (mais repetições com a mesma carga) e, assim que o limite superior é atingido em todas as séries, aumenta-se a carga e recomeça-se pela parte de baixo.\n\nOutras possibilidades são: mais séries por grupo muscular (aumento de volume), pausas mais curtas com o mesmo desempenho, amplitude de movimento maior ou uma fase excêntrica mais controlada e lenta. É importante mudar sempre só uma variável por vez, para acompanhar o progresso com clareza.',
      },
      {
        title: 'Erros frequentes',
        content: 'O erro mais frequente é progredir rápido demais: quem aumenta a carga antes de dominar a técnica se arrisca a lesões e muitas vezes deixa de trabalhar o músculo-alvo. A carga só deveria subir quando todas as repetições planejadas saem com boa execução.\n\nUm segundo erro é acreditar que a progressão precisa acontecer em toda sessão. Avançados, em especial, não conseguem colocar mais peso toda semana — aqui conta a tendência ao longo de semanas e meses, não o dia de treino isolado. Pequenas oscilações por sono, estresse ou alimentação são normais.\n\nO terceiro erro é a falta de registro. Sem anotar carga, repetições e séries quase não dá para dirigir a progressão — simplesmente não se sabe se houve melhora. Um diário de treino é, portanto, a ferramenta mais importante para o progresso de longo prazo.',
      },
      {
        title: 'Resumo',
        content: 'A sobrecarga progressiva é a lei básica do treino: sem estímulo crescente não há adaptação duradoura. Ela pode ser aplicada por carga, repetições, séries, pausas, amplitude de movimento ou ritmo de execução — não só com mais peso.\n\nPara iniciantes, a progressão dupla na faixa de 8 a 12 repetições funciona muito bem. Avançados deveriam pensar em ciclos mais longos e planejar sua progressão em vez de forçá-la. Em todo caso, o decisivo é documentar o progresso e colocar a técnica à frente da carga.\n\nQuem progride com paciência e método constrói força e músculo de forma contínua ao longo dos anos — e isso é exatamente o núcleo de um treino bem-sucedido.',
      },
    ],
  },

  volume_frequency: {
    name: 'Volume e frequência de treino',
    summary: 'Volume (séries × repetições × carga) é a alavanca mais forte para o ganho de músculo. Frequência descreve quantas vezes por semana um músculo é treinado. Juntos, determinam quanto estímulo um músculo recebe — e quão bem ele consegue se recuperar.',
    quick: [
      { label: 'Referência de volume', text: 'Cerca de 10 a 20 séries duras por grupo muscular por semana para a maioria das pessoas.' },
      { label: 'Referência de frequência', text: 'Treinar cada músculo 2 vezes por semana costuma ser melhor do que 1 vez, com o mesmo volume semanal.' },
    ],
    sections: [
      {
        title: 'O que significa volume?',
        content: 'Volume de treino é a medida da quantidade total de trabalho realizado. O mais usual é contar as «séries duras» por grupo muscular por semana — ou seja, séries levadas para perto da falha muscular (cerca de 0 a 4 repetições em reserva). De forma mais precisa, o volume pode ser calculado como séries × repetições × carga (tonelagem), mas a contagem de séries se firmou na prática como uma aproximação robusta.\n\nO volume é considerado o fator isolado mais importante para o crescimento muscular. A metanálise de Schoenfeld, Ogborn e Krieger (2017, Journal of Sports Sciences) encontrou uma relação dose-resposta clara: mais séries semanais levaram a mais hipertrofia — até um ponto a partir do qual o benefício adicional diminui e a recuperação sofre.\n\nPara a maioria, a faixa útil fica em torno de 10 a 20 séries duras por grupo muscular por semana. Iniciantes já se beneficiam da parte de baixo; avançados muitas vezes precisam de mais para continuar gerando estímulo.',
      },
      {
        title: 'O que significa frequência?',
        content: 'Frequência descreve quantas vezes um músculo é treinado dentro de uma semana. Se um músculo é solicitado 1, 2 ou 3 vezes por semana isso não muda necessariamente o volume semanal — apenas o distribui de outra forma. Quem divide 16 séries de peitoral em duas sessões faz 8 séries por sessão em vez de 16 em uma.\n\nA metanálise de Schoenfeld, Grgic e Krieger (2019, Journal of Sports Sciences) mostra: com o mesmo volume semanal, uma frequência maior tende a levar a um pouco mais de crescimento muscular, provavelmente porque a síntese proteica muscular fica elevada apenas por cerca de 24 a 48 horas depois do treino e estímulos mais frequentes a acionam mais vezes.\n\nNa prática isso significa: treinar cada músculo duas vezes por semana é, para a maioria, um bom equilíbrio entre estímulo, recuperação e qualidade de treino. Frequências muito altas trazem pouco benefício adicional, desde que o volume esteja certo.',
      },
      {
        title: 'Como conduzir o volume',
        content: 'O volume não deve ser estático, e sim tratado de forma individual e dinâmica. Um bom começo é a parte de baixo da faixa (cerca de 10 séries por músculo por semana). Daí o volume pode subir devagar ao longo de semanas, enquanto recuperação, sono e desempenho acompanharem.\n\nO conceito de «Maximum Recoverable Volume» (MRV) descreve o limite de volume do qual a pessoa ainda consegue se recuperar. Ultrapassado esse limite, o desempenho cai e o risco de lesão sobe. Sinais de volume em excesso são quedas de desempenho persistentes, sono ruim, dores musculares constantes e perda de motivação.\n\nGrupos musculares atrasados ou pontos fracos podem ser priorizados com um pouco mais de volume, enquanto áreas já bem desenvolvidas se sustentam com um volume de manutenção (muitas vezes 6 a 10 séries). Assim a capacidade limitada de recuperação é usada de forma direcionada.',
      },
      {
        title: 'Erros frequentes',
        content: 'O erro clássico de iniciante é volume demais cedo demais. Mais não é automaticamente melhor — além do limite individual de recuperação, volume adicional até freia o progresso. É mais inteligente começar com menos e subir devagar.\n\nUm segundo erro é contar «junk volume»: séries longe da falha ou com técnica ruim quase não contribuem para o crescimento, mas custam recuperação. Só as séries que realmente exigem do músculo-alvo contam como volume efetivo.\n\nEm terceiro lugar, frequência é muitas vezes confundida com volume. Treinar um músculo mais vezes só rende mais se o volume semanal for suficiente. Seis sessões por semana com estímulo insuficiente em cada uma valem menos do que três sessões bem feitas.',
      },
      {
        title: 'Resumo',
        content: 'Volume é a alavanca mais forte para o ganho de músculo; uma faixa de cerca de 10 a 20 séries duras por músculo por semana serve para a maioria. A frequência distribui esse volume — duas vezes por semana por músculo é um padrão consagrado.\n\nComece na parte de baixo da faixa de volume e aumente devagar, observando recuperação e desempenho. Conte só séries efetivas e exigentes e ajuste o volume de cada grupo muscular aos seus objetivos.\n\nVolume e frequência não são regras rígidas, e sim ferramentas que você ajusta à sua capacidade de recuperação. Quem conduz as duas com consciência treina de forma mais eficiente e evita tanto a subcarga quanto a sobrecarga.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Como os músculos crescem',
    summary: 'O crescimento muscular (hipertrofia) acontece quando o treino eleva a síntese proteica muscular acima da degradação e esse estímulo é repetido com regularidade. O principal motor é a tensão mecânica de séries exigentes — combinada com proteína e recuperação suficientes.',
    quick: [
      { label: 'Motor principal', text: 'Tensão mecânica: séries perto da exaustão com técnica controlada.' },
      { label: 'Pré-requisitos', text: 'Proteína suficiente (cerca de 1,6 a 2,2 g/kg), calorias na manutenção ou em leve superávit, sono.' },
    ],
    sections: [
      {
        title: 'A biologia do crescimento muscular',
        content: 'Os músculos são formados por fibras que contêm proteínas contráteis (actina e miosina). Crescer significa, antes de tudo, que essas fibras ficam mais grossas, porque mais proteínas contráteis são depositadas — fala-se em hipertrofia miofibrilar. O corpo constrói proteína muscular o tempo todo (síntese proteica muscular) e a degrada (proteólise muscular); o crescimento só aparece quando a construção predomina por um período prolongado.\n\nO treino é o gatilho: uma série exigente eleva a síntese proteica muscular por cerca de 24 a 48 horas (Damas et al., 2016, Journal of Physiology). Se esse estímulo é dado com regularidade e abastecido com material (proteína) e energia suficientes, o crescimento se acumula ao longo de semanas e meses.\n\nAs células satélites também têm papel: essas células-tronco específicas do músculo são ativadas pelo treino e ajudam a reparar fibras danificadas e a fornecer novos núcleos celulares, o que possibilita crescimento maior a longo prazo.',
      },
      {
        title: 'Os três mecanismos da hipertrofia',
        content: 'Brad Schoenfeld descreveu em um trabalho muito citado (2010, Journal of Strength and Conditioning Research) três mecanismos possíveis de crescimento muscular: tensão mecânica, estresse metabólico e dano muscular.\n\nA tensão mecânica é hoje considerada o principal motor. Ela surge quando os músculos trabalham contra uma resistência alta ao longo de uma amplitude completa — em especial nas últimas repetições, as mais duras, de uma série. Essa tensão é percebida pelas células musculares como sinal («mecanotransdução») e dispara os processos de crescimento.\n\nO estresse metabólico (a «queimação» pelos produtos do metabolismo em repetições mais altas) e um dano muscular leve podem apoiar o processo, mas são menos decisivos do que se supôs por muito tempo. Pesquisas mais recentes indicam que dano muscular acentuado é mais um subproduto do que um requisito do crescimento.',
      },
      {
        title: 'Como otimizar o estímulo de crescimento',
        content: 'Para maximizar a tensão mecânica, as séries devem ser levadas para perto da exaustão muscular — geralmente com 0 a 4 repetições em reserva. A faixa exata de repetições é surpreendentemente flexível: o crescimento é possível numa faixa ampla, de cerca de 5 a 30 repetições por série, desde que a série seja dura o bastante (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).\n\nNa prática, uma faixa moderada de cerca de 6 a 15 repetições se mostrou útil, porque oferece um bom equilíbrio entre tensão, volume e fadiga. Repetições muito baixas exigem mais das articulações e do sistema nervoso; repetições muito altas são desagradáveis e desgastantes.\n\nÉ importante ter execução controlada com amplitude completa. A posição alongada do músculo sob carga parece ser um estímulo de crescimento especialmente forte — repetições profundas e completas costumam, portanto, ser mais eficazes do que repetições curtas e truncadas.',
      },
      {
        title: 'Alimentação e recuperação',
        content: 'Sem material suficiente nenhum músculo cresce. A proteína fornece os aminoácidos para a síntese proteica muscular; a pesquisa recomenda para quem treina cerca de 1,6 a 2,2 g de proteína por quilo de peso corporal por dia (Morton et al., 2018, British Journal of Sports Medicine). Distribuir em várias refeições de 20 a 40 g cada faz sentido.\n\nA energia também é decisiva. O ganho de músculo funciona melhor na manutenção calórica ou em leve superávit (cerca de +5 a 15 %). Em déficit forte o crescimento é possível, mas bem mais lento — sobretudo iniciantes e pessoas com sobrepeso podem, no começo, perder gordura e ganhar músculo ao mesmo tempo.\n\nO sono é o fator mais subestimado. Durante o sono profundo acontecem a recuperação e adaptações hormonais. A falta crônica de sono reduz comprovadamente a síntese proteica muscular e aumenta a degradação — de sete a nove horas por noite são uma meta razoável.',
      },
      {
        title: 'Resumo',
        content: 'Os músculos crescem quando um estímulo exigente eleva a síntese proteica muscular acima da degradação e esse processo se repete com regularidade. O principal motor é a tensão mecânica de séries duras com execução controlada e completa.\n\nA faixa eficaz de repetições é ampla (cerca de 5 a 30); na prática, 6 a 15 repetições perto da exaustão se mostraram boas. Volume, progressão e técnica determinam o estímulo, enquanto proteína, energia e sono tornam a adaptação possível.\n\nGanhar músculo é um processo lento e cumulativo. Quem treina duro com paciência, come e dorme o suficiente vai construir musculatura de forma contínua ao longo de meses e anos.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Recuperação e overtraining',
    summary: 'A adaptação não acontece no treino, e sim na recuperação depois dele. Quem treina demais e se recupera de menos estagna ou fica mais fraco. Sono, alimentação, pausas e um manejo sensato da carga são, portanto, tão importantes quanto o próprio treino.',
    quick: [
      { label: 'Regra básica', text: 'O músculo cresce na pausa. Sem recuperação não há progresso.' },
      { label: 'Principais alavancas', text: 'Sono (7 a 9 h), calorias e proteína suficientes, semanas de deload, manejo do estresse.' },
    ],
    sections: [
      {
        title: 'Por que a recuperação é decisiva',
        content: 'O treino é um estímulo, mas a adaptação em si — músculos mais fortes e maiores, um sistema nervoso mais eficiente — acontece na fase de recuperação seguinte. Esse jogo é descrito pelo modelo da supercompensação: depois de uma carga, o desempenho primeiro cai, se recupera e então sobe acima do nível inicial — desde que sobre tempo suficiente para se recuperar.\n\nSe o próximo estímulo duro vier cedo demais, antes de a recuperação terminar, a fadiga se acumula. No curto prazo isso é normal e até faz parte do treino; de forma permanente, porém, leva a perdas de desempenho. E o corpo não distingue entre estresse de treino e outros estresses — trabalho, falta de sono e carga psíquica entram na conta.\n\nRecuperação não é, portanto, um «não fazer nada» passivo, e sim a parte ativa em que o estímulo do treino se converte em progresso. Quem a negligencia joga fora boa parte do próprio trabalho.',
      },
      {
        title: 'O sono como principal fator de recuperação',
        content: 'Nenhum outro fator influencia tanto a recuperação quanto o sono. Durante o sono acontecem o reparo dos tecidos, a consolidação de padrões motores e processos hormonais importantes, entre eles a liberação de hormônio do crescimento.\n\nOs dados são claros: a falta de sono piora força, desempenho e recuperação. Um estudo de Nedeltcheva et al. (2010, Annals of Internal Medicine) mostrou que, em alimentação com calorias reduzidas, pessoas que dormiam pouco perderam bem mais massa muscular e menos gordura do que as que dormiam o suficiente — sob falta de sono, o corpo sacrificou preferencialmente o músculo. A taxa de lesões também sobe de forma mensurável com falta crônica de sono.\n\nDe sete a nove horas por noite são uma meta razoável para a maioria. Horários regulares de dormir, um quarto escuro e fresco e evitar telas e cafeína à noite melhoram bastante a qualidade do sono.',
      },
      {
        title: 'Sinais de overtraining',
        content: 'A síndrome de overtraining de verdade é rara e leva semanas a meses para se recuperar; mais comum é o chamado overreaching — uma sobrecarga temporária. Os dois se manifestam com sinais de alerta parecidos, que devem ser levados a sério.\n\nSinais típicos são: queda de desempenho persistente apesar do treino, dor muscular incomum ou muito prolongada, distúrbios do sono, frequência cardíaca de repouso elevada, irritabilidade, perda de motivação e infecções mais frequentes. Quando vários deles se somam, é um sinal claro para reduzir a carga.\n\nImportante: um único dia ruim de treino não é overtraining. Só um padrão persistente ao longo de uma a duas semanas deve levar a ajustes. O melhor remédio costuma não ser mais, e sim menos — com volume reduzido, mais sono e, se for o caso, uma semana de deload.',
      },
      {
        title: 'Deload e manejo de carga',
        content: 'Uma semana de deload é uma fase planejada de carga reduzida, em que volume e/ou intensidade são baixados de propósito — normalmente para cerca de metade do volume ou com cargas bem mais leves. Ela serve para dissipar a fadiga acumulada sem perder o estímulo de treino por completo.\n\nQuando um deload faz sentido depende de cada um. Muita gente se beneficia de uma semana assim a cada 4 a 8 semanas de treino intenso, ou sempre que os sinais de alerta se acumulam. Avançados com volume alto precisam dela com mais frequência do que iniciantes.\n\nAlém dos deloads planejados, o manejo corrente da carga importa: ajustar a intensidade à forma do dia, alternar sessões duras e mais leves e considerar os estressores da vida. Recuperação não é um esquema rígido, e sim uma escuta flexível dos sinais do corpo.',
      },
      {
        title: 'Resumo',
        content: 'O progresso nasce na recuperação, não no treino em si. Quem dá o estímulo mas negligencia a recuperação abre mão de resultados e arrisca sobrecarga.\n\nAs alavancas mais eficazes são sono (7 a 9 horas), calorias e proteína suficientes e um manejo consciente da carga com semanas de deload ocasionais. Sinais de alerta como queda de desempenho persistente, sono ruim e perda de motivação devem ser levados a sério.\n\nRecuperação não é sinal de fraqueza, e sim a parte do treino em que a adaptação de fato acontece. Quem a planeja e a respeita treina de forma mais saudável e bem-sucedida a longo prazo.',
      },
    ],
  },

  technique_rom: {
    name: 'Técnica e amplitude de movimento',
    summary: 'Técnica limpa em amplitude completa torna os exercícios mais eficazes e mais seguros. Ela garante que o músculo-alvo receba o estímulo, reduz o risco de lesão e é a base de toda progressão.',
    quick: [
      { label: 'Regra básica', text: 'Amplitude completa, controlada, com foco no músculo-alvo — técnica antes da carga.' },
      { label: 'Por que importa', text: 'Estímulo melhor, menor risco de lesão, base limpa para a progressão.' },
    ],
    sections: [
      {
        title: 'Por que a técnica conta',
        content: 'Uma boa técnica de execução tem duas funções centrais: ela faz com que a carga realmente chegue ao músculo-alvo e mantém as articulações em posições seguras. As duas juntas determinam se um exercício é eficaz e sustentável.\n\nQuem treina com técnica ruim muitas vezes desloca a carga para músculos indesejados ou para estruturas passivas, como ligamentos e tendões. Isso não só diminui o efeito do treino como também aumenta o risco de lesões por sobrecarga. A técnica não é, portanto, um fim em si, e sim a condição para que o treino cumpra seu propósito.\n\nSobretudo no início vale a pena aprender os padrões de movimento com cargas leves. O sistema nervoso fixa esses padrões pela repetição — uma técnica bem assentada forma a base sobre a qual cargas mais pesadas poderão depois ser conduzidas com segurança.',
      },
      {
        title: 'A amplitude completa',
        content: 'A amplitude de movimento (Range of Motion, ROM) descreve o trecho em que um músculo trabalha durante um exercício. Como regra prática: uma amplitude o mais completa possível é superior a uma encurtada, em especial para o ganho de músculo.\n\nVários estudos sustentam isso. Um trabalho de Schoenfeld e Grgic (2020, SAGE Open Medicine) resume que amplitudes completas em geral levam a mais crescimento muscular do que movimentos parciais. A posição alongada sob carga parece ser um estímulo especialmente forte — agachamentos profundos, por exemplo, desenvolvem mais as coxas do que agachamentos pela metade.\n\nHá exceções: em alguns exercícios ou diante de limitações de saúde, uma amplitude levemente adaptada pode fazer sentido. Em princípio, porém, deve-se buscar a maior amplitude possível que se consiga controlar com boa técnica e sem dor.',
      },
      {
        title: 'Ritmo e controle',
        content: 'A velocidade de execução de uma repetição influencia o estímulo. A fase excêntrica (a descida da carga) em especial deve ser controlada — não deixar o peso cair, e sim freá-lo ativamente. Isso mantém a tensão no músculo e melhora o controle.\n\nUm erro frequente é o uso de impulso. Quem arranca a carga com movimentos bruscos transfere o trabalho dos músculos para o impulso e reduz assim o efeito do treino. Repetições controladas e conscientes são quase sempre mais eficazes do que repetições rápidas e desleixadas.\n\nIsso não quer dizer que toda repetição precise ser extremamente lenta. Uma orientação útil: fase concêntrica (a subida) ágil, mas controlada; fase excêntrica (a descida) ao longo de cerca de dois a três segundos. O foco está sempre em sentir e comandar o músculo-alvo de forma consciente.',
      },
      {
        title: 'Erros frequentes e como corrigi-los',
        content: 'O erro mais frequente é carga demais à custa da técnica. Se as últimas repetições só saem com impulso, movimentos compensatórios ou amplitude incompleta, a carga está alta demais. A solução é simples: reduzir e executar o movimento com limpeza.\n\nUm segundo erro é negligenciar a fase excêntrica. Muitos deixam a carga cair sem controle e jogam fora boa parte do estímulo. Frear de forma consciente resolve isso na hora.\n\nUm terceiro ponto é a falta de atenção ao músculo-alvo. A «conexão músculo-mente» — o foco consciente no músculo que trabalha — pode melhorar a ativação, sobretudo em exercícios isolados. Gravações em vídeo da própria execução ou o retorno de praticantes experientes ajudam a identificar e corrigir falhas técnicas.',
      },
      {
        title: 'Resumo',
        content: 'Técnica limpa em amplitude completa é a base de um treino eficaz e seguro. Ela garante que o músculo-alvo receba o estímulo e protege as articulações.\n\nBusque a maior amplitude controlada possível, execute com atenção sobretudo a fase excêntrica e dispense o impulso. A técnica vem sempre antes da carga — só quando o movimento está assentado faz sentido aumentar o peso.\n\nBoa técnica não é assunto de uma vez só, e sim uma prioridade permanente. Quem a cultiva treina com mais eficácia, fica mais tempo livre de lesões e assenta a fundação do progresso contínuo.',
      },
    ],
  },

  periodization: {
    name: 'Periodização e planejamento',
    summary: 'Periodização é a estruturação planejada do treino ao longo do tempo — com fases alternadas de volume, intensidade e recuperação. Ela ajuda a evitar platôs, prevenir overtraining e progredir de forma contínua a longo prazo.',
    quick: [
      { label: 'Ideia central', text: 'Planejar o treino em fases, em vez de treinar igual toda semana.' },
      { label: 'Para quem', text: 'Sobretudo avançados; iniciantes se viram por muito tempo com uma progressão linear simples.' },
    ],
    sections: [
      {
        title: 'O que é periodização?',
        content: 'Periodização é o planejamento sistemático do treino ao longo de diferentes períodos. Em vez de treinar de forma idêntica semana após semana, variáveis como volume, intensidade, faixas de repetição e escolha de exercícios são variadas de propósito, para obter progresso por mais tempo e administrar a fadiga.\n\nO conceito vem originalmente do esporte de alto rendimento e remonta aos trabalhos de Leonid Matveiev e Tudor Bompa. O objetivo era levar atletas ao auge da forma em competições específicas. Mas a ideia de fundo — alternar carga e recuperação de forma planejada — é útil para qualquer praticante.\n\nCostuma-se distinguir macrociclo (o plano inteiro ao longo de meses até um ano), mesociclo (blocos de várias semanas com um foco) e microciclo (em geral uma semana de treino). Essa estrutura ajuda a dividir a meta grande em etapas administráveis que se apoiam umas nas outras.',
      },
      {
        title: 'Modelos de periodização',
        content: 'Há vários modelos estabelecidos. A periodização linear começa com volume alto e intensidade baixa e se desloca ao longo das semanas para menos volume e mais intensidade — classicamente, de fases de hipertrofia para fases de força.\n\nA periodização ondulatória varia a carga em intervalos mais curtos, muitas vezes de sessão para sessão dentro de uma semana — por exemplo, um dia pesado com poucas repetições, outro moderado e um terceiro com repetições altas. Uma metanálise sugere que os dois modelos são eficazes e que as diferenças na prática costumam ser pequenas (Williams et al., 2017, Sports Medicine).\n\nA periodização em blocos se concentra por várias semanas em um único foco (por exemplo, um bloco de volume, seguido de um bloco de intensidade). Qual modelo se encaixa melhor depende de objetivos, experiência e preferências — o decisivo é ter um plano com variação intencional.',
      },
      {
        title: 'Iniciantes precisam de periodização?',
        content: 'Para iniciantes, uma periodização complexa costuma ser desnecessária. Nos primeiros meses, o corpo reage tão fortemente a qualquer estímulo que uma progressão linear simples — um pouco mais de carga ou de repetições a cada semana — já traz progressos excelentes. Essa fase costuma ser chamada de «novice gains».\n\nSó quando essa progressão inicial rápida se achata, tipicamente depois de alguns meses até cerca de um ano de treino consistente, é que uma estrutura mais elaborada se torna realmente útil. Aí fases alternadas ajudam a continuar gerando estímulo sem cair em overtraining ou estagnação.\n\nPara iniciantes vale, portanto: consistência, boa técnica e progressão simples batem qualquer planejamento complicado. Periodização é ferramenta para avançados, não obrigação para quem começa.',
      },
      {
        title: 'Montar um plano simples',
        content: 'Um bom plano de treino começa pelos objetivos e pelo tempo disponível. Disso decorre a frequência de treino (por exemplo, 3 a 4 sessões por semana) e a divisão — corpo inteiro com poucas sessões, ou uma divisão superior/inferior ou push-pull-pernas com mais sessões.\n\nSobre essa base distribuem-se exercícios e volume, de modo que cada grupo muscular seja idealmente treinado duas vezes por semana com um total de cerca de 10 a 20 séries duras. Os exercícios básicos (agachamento, levantamento terra, supino e desenvolvimento, barra fixa, remada) formam o alicerce, complementados por exercícios isolados para pontos fracos.\n\nAo longo das semanas progride-se (mais carga ou repetições) e a cada 4 a 8 semanas pode-se prever uma semana de deload. Um plano não precisa ser complicado — precisa caber na sua vida, ser cumprido com consistência e ajustado com regularidade conforme os progressos.',
      },
      {
        title: 'Resumo',
        content: 'Periodização é a variação planejada do treino ao longo do tempo, para evitar platôs e overtraining. Modelos comuns são a linear, a ondulatória e a em blocos — na prática, as diferenças costumam ser menores do que se pensa.\n\nIniciantes não precisam de periodização complexa; a progressão linear simples os leva longe nos primeiros meses. Só os avançados se beneficiam de forma perceptível de fases planejadas.\n\nO mais importante é um plano que se encaixe nos objetivos e na rotina, que treine cada grupo muscular de forma adequada, que seja progressivo e que preveja recuperação. Estrutura e consistência batem qualquer método «perfeito».',
      },
    ],
  },
};
