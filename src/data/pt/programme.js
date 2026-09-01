// Versão em português dos 21 programas Peak de `src/data/peakPrograms.js`.
//
// Forma por programa: { name, desc, why, progression, fokus: { <dia>: '…' } }.
// `fokus` só existe nos programas de artes marciais (ali aparece um foco sob o
// rótulo do dia).
//
// Os rótulos dos dias de treino («Push», «Parte superior») NÃO ficam aqui, e
// sim em `src/data/tagesbeschriftung.js` — eles se repetem entre programas.
//
// `studien` é indexado por «Nome|Ano», porque o mesmo estudo é citado em
// vários programas; nome e ano não são traduzidos.
export default {
  kategorien: {
    strength: 'Musculação',
    cardio: 'Cardio',
    hiit: 'HIIT',
    martial_arts: 'Artes marciais',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Metanálise dose-resposta: 10 ou mais séries por grupo muscular por semana produzem crescimento muscular significativamente maior do que um número menor de séries.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Metanálise: treinar cada grupo muscular 2 vezes por semana gera mais hipertrofia do que 1 vez por semana.',
    'Helms et al.|2016': 'A escala RIR («repetições em reserva») é uma ferramenta válida para regular o esforço na musculação — encerre a maioria das séries com 1 a 3 RIR.',
    'Schoenfeld, Grgic & Krieger|2019': 'Com o mesmo volume semanal, a frequência de treino é secundária: o que decide é o volume total por grupo muscular.',
    'Pedisic et al.|2020': 'Metanálise: corredores têm risco de mortalidade por todas as causas cerca de 27% menor — e volumes pequenos de corrida (1 vez por semana) já mostram esse efeito.',
    'Lee et al.|2014': 'Mesmo 5 a 10 minutos diários de corrida lenta se associaram a uma mortalidade geral e cardiovascular claramente menor.',
    'Helgerud et al.|2007': 'Intervalos de 4×4 minutos a 90–95% da frequência cardíaca máxima elevaram o VO₂máx significativamente mais do que o treino contínuo moderado com o mesmo trabalho total.',
    'Milanović et al.|2015': 'Metanálise: o HIIT melhora o VO₂máx em adultos saudáveis mais do que o treino de resistência clássico.',
    'Gunnarsson & Bangsbo|2012': 'Com o conceito 10-20-30, corredores melhoraram o VO₂máx (~4%) e seus tempos nos 1500 m e nos 5 km, apesar de reduzirem o volume de treino em cerca de 50%.',
    'Seiler|2010': 'Atletas de resistência de elite realizam cerca de 80% do volume em baixa intensidade (zonas 1–2) — esse modelo polarizado entrega as melhores adaptações a longo prazo.',
    'Stöggl & Sperlich|2014': 'O treino polarizado (muito leve + pouco muito forte) elevou o VO₂máx e o desempenho em atletas de resistência treinados mais do que o trabalho de limiar ou o HIT puro.',
    'Esteve-Lanao et al.|2007': 'Corredores que treinaram cerca de 80% do volume em baixa intensidade melhoraram seu tempo de prova mais do que um grupo que treinou mais na faixa de intensidade média.',
    'Billat et al.|1999': 'Intervalos na velocidade do VO₂máx (vVO₂máx) melhoraram de forma mensurável a economia de corrida e o ritmo em corredores treinados.',
    'Tabata et al.|1996': '6 semanas de sessões de 4 minutos (8×20 s/10 s) elevaram o VO₂máx em cerca de 7 ml/kg/min e a capacidade anaeróbia em 28% — o treino contínuo moderado melhorou apenas a capacidade aeróbia.',
    'Weston et al.|2014': 'Metanálise: o HIIT melhorou a aptidão cardiorrespiratória quase o dobro do treino contínuo moderado.',
    'Gibala et al.|2006': '6 sessões de intervalos de sprint em 2 semanas (~2,5 h de treino) produziram adaptações de resistência muscular semelhantes a cerca de 10,5 h de treino de resistência clássico.',
    'Little et al.|2010': 'Intervalos de 8 a 12×60 segundos com 75 s de pausa elevaram nitidamente a capacidade mitocondrial do músculo — em apenas 20 a 25 minutos por sessão.',
    'McRae et al.|2012': '4 vezes por semana, apenas 4 minutos de intervalos de corpo inteiro melhoraram a resistência E a resistência muscular de forma comparável a 30 minutos de treino contínuo.',
    'Chaabène et al.|2015': 'Revisão: o boxe amador exige alta capacidade aeróbia e anaeróbia ao mesmo tempo — boxeadores de elite chegam a valores de VO₂máx em torno de 60 ml/kg/min.',
    'Ouergui et al.|2014': 'Os rounds de kickboxing levam a frequência cardíaca para perto do máximo: o treino por rounds age fisiologicamente como um treino intervalado de alta intensidade.',
    'James et al.|2016': 'Revisão: o MMA exige força, velocidade e resistência combinadas — recomenda-se um condicionamento variado e organizado por rounds.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'A clássica divisão de 6 dias para o máximo ganho de massa. Cada grupo muscular é treinado 2 vezes por semana.',
    why: 'O PPL combina as duas alavancas mais fortes para ganhar massa: volume semanal alto (16 a 20 séries por grupo muscular) e frequência de 2 vezes por semana. A divisão por padrões de movimento (empurrar/puxar/pernas) permite que cada grupo muscular se recupere por completo, mesmo treinando quase todos os dias.',
    progression: 'Progressão dupla: mantenha as séries e a faixa de repetições e avance nas repetições. Quando alcançar o limite superior em todas as séries com boa técnica, aumente a carga em 2,5 kg e recomece pela base. Encerre a maioria das séries com 1 a 3 repetições em reserva (RIR).',
  },
  upper_lower_4x: {
    name: 'Superior / inferior',
    desc: 'Divisão eficaz de 4 dias para iniciantes e intermediários. Cada grupo muscular é treinado 2 vezes por semana.',
    why: 'A divisão parte superior/inferior é o melhor equilíbrio entre tempo investido e resultado: 4 sessões por semana bastam para a frequência de 2 vezes por grupo muscular que, nas metanálises, produz mais crescimento do que 1 vez. Primeiro os exercícios básicos, depois os de isolamento.',
    progression: 'Progressão dupla: primeiro aumente as repetições dentro da faixa-alvo, depois acrescente 2,5 kg. Encerre os básicos (agachamento, supino, terra) com 2 RIR e os de isolamento com 1 RIR. Insira uma semana leve a cada 6 a 8 semanas.',
  },
  split_5x: {
    name: 'Divisão de 5 dias',
    desc: 'Divisão avançada de 5 dias com volume alto por grupo muscular. Para atletas experientes.',
    why: 'Para avançados que precisam de mais volume: a divisão de 5 dias permite de 15 a 20+ séries por grupo muscular, com atenção total a uma região por sessão. A pesquisa dose-resposta mostra: quem já treina há mais tempo continua crescendo com mais séries semanais.',
    progression: 'Progressão dupla por exercício. Além disso, a cada 3 ou 4 semanas acrescente uma série ao primeiro exercício do dia, enquanto a recuperação permitir. Faça da semana 10 uma descarga (cargas −30%, metade das séries).',
  },
  fullbody_3x: {
    name: 'Corpo completo 3 dias',
    desc: 'Perfeito para iniciantes: 3 treinos de corpo completo por semana com os exercícios básicos mais importantes.',
    why: 'Para quem está começando, treinar o corpo inteiro 3 vezes por semana é o modelo mais eficiente: cada grupo muscular recebe estímulo 3 vezes por semana, os exercícios básicos melhoram rápido pela prática frequente e três sessões cabem em qualquer rotina. Iniciantes já progridem de forma consistente com volume moderado.',
    progression: 'Progressão linear: aumente a carga a cada sessão em 2,5 kg (parte inferior) ou 1,25 a 2,5 kg (parte superior), enquanto todas as repetições saírem com boa técnica. Se um exercício falhar 2 vezes seguidas, reduza a carga em 10% e volte a subir.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4 dias',
    desc: '4 treinos por semana divididos em movimentos de empurrar e puxar. As pernas ficam integradas.',
    why: 'Push/Pull com pernas integradas é a alternativa eficiente em tempo ao PPL de 6 dias: a mesma frequência de 2 vezes por grupo muscular, mas com apenas 4 dias de academia. O quadríceps vai para Push (o agachamento é um empurrar) e a cadeia posterior para Pull (o terra é um puxar) — um agrupamento biomecanicamente coerente.',
    progression: 'Progressão dupla: aumente as repetições dentro da faixa-alvo e depois acrescente 2,5 kg. Progrida com cautela no terra e no agachamento (só quando todas as séries saírem com 2 RIR). Após a semana 8, faça uma semana de descarga antes de repetir o ciclo.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'A clássica divisão de fisiculturismo: cada grupo muscular tem seu próprio dia, com volume alto.',
    why: 'A abordagem clássica do fisiculturismo: um grupo muscular por dia, mas com foco total e muito volume numa única sessão. A pesquisa mais recente mostra: com o mesmo volume semanal, a distribuição é secundária — quem gosta do pump e do foco de um dia dedicado desenvolve igualmente.',
    progression: 'Progressão dupla por exercício, com a maioria das séries até 1 ou 2 RIR. Como cada grupo muscular só aparece 1 vez por semana, cada sessão conta: anote suas cargas com rigor e busque toda semana ao menos uma repetição a mais.',
  },
  couch_to_5k: {
    name: 'Do sofá aos 5K',
    desc: 'De zero a 5 quilômetros em 9 semanas — com intervalos de corrida e caminhada que crescem a cada semana.',
    why: 'O conceito para iniciantes mais testado do mundo: trechos curtos de corrida intercalados com caminhada permitem que tendões, articulações e sistema cardiovascular se adaptem em vez de serem sobrecarregados. A progressão é propositalmente suave — é justamente isso que torna o programa sustentável. Mesmo volumes pequenos de corrida reduzem de forma mensurável o risco de mortalidade.',
    progression: 'A cada semana os trechos de corrida ficam mais longos e as pausas caminhando mais curtas — de 8×1 minuto correndo (semana 1) até 30 minutos seguidos (semana 9). Corra os trechos conscientemente devagar (ritmo de conversa, RPE 5–6). Repita uma semana se ela parecer difícil demais.',
  },
  norwegian_4x4: {
    name: '4×4 norueguês',
    desc: 'O protocolo de VO₂máx vindo da pesquisa: 4 intervalos de 4 minutos a 90–95% da frequência cardíaca máxima.',
    why: 'Poucos protocolos são mais bem documentados: intervalos de 4 minutos perto da frequência cardíaca máxima são o estímulo mais forte conhecido para o VO₂máx — o melhor marcador isolado de desempenho de resistência e de longevidade. As pausas ativas de 3 minutos mantêm alta a qualidade dos intervalos. Funciona correndo, pedalando e remando.',
    progression: 'Semanas 1–2: 3 intervalos para se adaptar. A partir da semana 3: o 4×4 completo. Semanas 7–8: pausa ativa reduzida para 2:30. Intensidade: os últimos 2 minutos de cada intervalo devem parecer um RPE 9 — falar já é impossível.',
  },
  interval_10_20_30: {
    name: 'Intervalos 10-20-30',
    desc: 'O conceito dinamarquês: 30 s leve, 20 s firme, 10 s de sprint — ficar mais rápido com metade do volume de treino.',
    why: 'Desenvolvido na Universidade de Copenhague: os corredores ficaram mais rápidos e mais em forma apesar de terem reduzido pela metade o volume de treino. Os sprints de apenas 10 segundos dão um estímulo máximo, mas são curtos o bastante para distribuir bem a carga. Ideal quando você tem pouco tempo e quer ficar mais rápido.',
    progression: 'Um bloco = 5×(30 s leve · 20 s firme · 10 s de sprint). Semanas 1–2: 2 blocos; semanas 3–4: 3 blocos; semanas 5–6: 4 blocos — com 2 minutos de trote entre os blocos. Os sprints de 10 segundos são quase máximos (RPE 9); o resto, propositalmente leve.',
  },
  zone2_base: {
    name: 'Base na zona 2',
    desc: 'A base de resistência dos profissionais: sessões contínuas leves na zona 2 de pulso, cada vez mais longas.',
    why: 'Atletas de resistência de elite treinam cerca de 80% do volume exatamente aqui: leve o bastante para conseguir conversar. A zona 2 desenvolve mitocôndrias e metabolismo de gordura — o alicerce sobre o qual qualquer treino duro faz efeito. O erro mais comum dos amadores é correr essas sessões rápido demais.',
    progression: 'As sessões curtas crescem 5 minutos a cada 2 semanas (25→40 min) e a corrida longa 5 minutos por semana, com semanas de descarga (35→60 min). Controle de ritmo: você precisa conseguir conversar em frases completas (RPE 3–4, zona 2). Se não conseguir, vá mais devagar.',
  },
  '10k_training': {
    name: 'Treino para 10K',
    desc: 'Preparação estruturada de 10 km em 10 semanas: intervalos, corrida em ritmo, corrida leve e corrida longa.',
    why: 'O clássico do planejamento de corrida pelo princípio 80/20: duas sessões duras por semana (intervalos de VO₂máx + corrida em ritmo) dão o estímulo de desempenho, e duas sessões leves constroem a base aeróbia. A corrida longa cresce progressivamente com semanas de descarga, e nas duas últimas semanas há polimento — você chega descansado à largada.',
    progression: 'Intervalos: de 4 a 6×3 minutos (RPE 9). Corrida em ritmo: de 15 a 25 minutos «confortavelmente forte» (RPE 7). Corrida longa: de 40 a 70 minutos leves, com descarga nas semanas 4 e 7. Semanas 9–10: polimento — menos volume, mais frescor. A corrida leve de quinta continua sempre leve.',
  },
  tabata_classic: {
    name: 'Tabata clássico',
    desc: 'O protocolo Tabata original: 20 segundos no máximo, 10 segundos de pausa — com número crescente de rounds.',
    why: 'O protocolo de HIIT mais famoso do mundo, pesquisado em 1996 com patinadores de velocidade japoneses: 8 rounds de 20/10 melhoraram ao mesmo tempo a capacidade aeróbia E a anaeróbia — algo que o treino contínuo moderado não consegue. A intensidade é decisiva: «no máximo» significa realmente no máximo.',
    progression: 'Semanas 1–2: 8 rounds (1 bloco Tabata, 4 minutos). Semanas 3–4: 12 rounds. Semanas 5–6: 16 rounds (2 blocos). Cada fase de trabalho em RPE 9–10 — se você já não completa os últimos rounds com boa técnica, fique mais uma semana no nível atual.',
  },
  gibala_sit: {
    name: 'Protocolo Gibala 60/75',
    desc: 'O «SIT prático» vindo da pesquisa: 8 a 12 intervalos de 60 segundos fortes, com 75 segundos de pausa.',
    why: 'O grupo de Martin Gibala mostrou que poucos minutos de intervalos intensos desencadeiam adaptações celulares semelhantes a um tempo muito maior de treino de resistência clássico. A variante 60/75 é a versão viável no dia a dia: forte, mas sem sprints máximos — por isso segura e adequada a exercícios de corpo inteiro.',
    progression: 'Semanas 1–2: 8 intervalos. Semanas 3–4: 10 intervalos. Semanas 5–6: 12 intervalos. Fases de trabalho em RPE 8–9 («muito forte, mas sustentável por 60 segundos»); nas pausas, movimente-se levemente em vez de ficar parado.',
  },
  hiit_beginner: {
    name: 'HIIT para iniciantes 30/30',
    desc: 'Entrada suave no treino intervalado: 30 segundos de esforço, 30 segundos de pausa — de 6 a 10 rounds.',
    why: 'A relação 1:1 entre esforço e pausa é a porta de entrada ideal para o HIIT: intensa o bastante para os efeitos comprovados sobre a forma física, mas com recuperação suficiente para manter a técnica limpa. Segundo as metanálises, o HIIT melhora a forma física quase o dobro do treino contínuo moderado — numa fração do tempo.',
    progression: 'Semanas 1–2: 6 rounds. Semanas 3–4: 8 rounds. Semanas 5–6: 10 rounds. Fases de trabalho em RPE 7–8 — ao fim de cada pausa você deve estar pronto de novo. Qualidade antes de velocidade: repetições limpas valem mais que muitas repetições.',
  },
  hiit_advanced: {
    name: 'HIIT avançado 40/15',
    desc: 'HIIT intenso para avançados: 40 segundos de esforço e apenas 15 segundos de pausa, até 12 rounds.',
    why: 'A pausa curta (quase 3:1) mantém a frequência cardíaca alta o tempo todo — assim você treina a capacidade de continuar rendendo sob fadiga. Quatro sessões temáticas por semana (potência, core, pernas, corpo inteiro) distribuem a carga por diferentes grupos musculares.',
    progression: 'Semanas 1–2: 8 rounds. Semanas 3–6: 10 rounds. Semanas 7–8: 12 rounds. Fases de trabalho em RPE 8–9. Se a técnica quebrar, encerre o round antes — estar sem lesão vale mais que o número de rounds.',
  },
  emom_challenge: {
    name: 'Desafio EMOM',
    desc: 'Every Minute On the Minute: a cada minuto começa um exercício novo — a pausa é o que sobra do minuto.',
    why: 'O EMOM traz o pacing embutido: quem trabalha mais rápido ganha mais pausa — o que mantém a densidade alta e ensina um ritmo constante. Intervalos de corpo inteiro desse tipo melhoram ao mesmo tempo a resistência e a resistência muscular, como mostram os estudos sobre protocolos minimalistas de corpo inteiro.',
    progression: 'Semanas 1–2: rounds base (10 a 15 conforme o dia). Semanas 3–4: +2 rounds. Semanas 5–6: mais +2 rounds. Escolha as repetições por minuto de modo a sobrar 15 a 20 segundos de pausa — se não sobrar pausa, reduza as repetições.',
  },
  boxing_basics: {
    name: 'Boxe: fundamentos',
    desc: 'Aprenda os fundamentos do boxe: jab, cruzado, gancho e movimentação — em rounds clássicos de 3 minutos.',
    why: 'Treinar boxe em rounds de 3 minutos é HIIT disfarçado: a frequência cardíaca oscila entre trabalho intenso e pausa curta enquanto você aprende coordenação e técnica. Cada sessão tem um foco próprio — assim você constrói uma base sólida, semana após semana.',
    progression: 'Semanas 1–2: 6 rounds (8 na sexta). Semanas 3–4: +1 round por sessão. Semanas 5–6: mais +1 round. Primeiro a técnica, depois o ritmo: as combinações devagar e limpas antes de acelerar. O último round de cada sessão pode ser «condicionamento puro».',
    fokus: {
      mon: 'Golpes básicos e guarda',
      wed: 'Combinações e potência de soco',
      fri: 'Resistência ao longo dos rounds',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboxing: condicionamento',
    desc: 'Treino de kickboxing com foco em condicionamento e técnica: chutes, socos e combinações em rounds.',
    why: 'O kickboxing combina parte superior e inferior como poucos esportes: os chutes exigem pernas, quadril e core; os socos, ombros e braços. Estudos mostram que os rounds de kickboxing levam a frequência cardíaca para perto do máximo — você ganha efeitos de HIIT e mobilidade de uma vez.',
    progression: 'Semana 4: +1 round em cada sessão. Semana 7: mais +1 round. Os dias de técnica vêm antes dos de condicionamento: aprenda os chutes novos devagar no ar antes de executá-los sob fadiga. Alongue brevemente o quadril todos os dias.',
    fokus: {
      mon: 'Técnica de chute',
      tue: 'Explosão e resistência',
      thu: 'Combinações de soco e chute',
      sat: 'Simulação de luta',
    },
  },
  mma_fundamentals: {
    name: 'MMA: fundamentos',
    desc: 'Iniciação às artes marciais mistas: golpes, chutes e condicionamento específico de luta reunidos em uma semana.',
    why: 'O MMA é a arte marcial mais completa: golpear, chutar e lutar no chão exigem força, velocidade e resistência ao mesmo tempo. As ciências do esporte recomendam exatamente o que este programa reproduz — treino por rounds com focos alternados mais um dia dedicado ao condicionamento, com sprawls e corda.',
    progression: 'Semana 4: golpes de 8 para 9 rounds, condicionamento de 5 para 6 rounds. Semana 7: chutes de 6 para 7 rounds. O sábado longo (rounds de 5 minutos como no MMA real) permanece constante: ali conta a qualidade sob fadiga, não mais volume.',
    fokus: {
      mon: 'Técnica de golpe',
      tue: 'Chutes e joelhadas',
      thu: 'Condicionamento de luta',
      sat: 'Rounds de 5 minutos como em competição',
    },
  },
  boxing_advanced: {
    name: 'Boxe avançado',
    desc: 'Treino de boxe avançado: mais volume, sessões mais longas, combinações complexas.',
    why: 'Em nível avançado, quem decide é a capacidade de trabalho: boxeadores de elite chegam com VO₂máx em torno de 60 ml/kg/min — construído justamente por esta estrutura de rounds de técnica, saco pesado e condicionamento. A simulação de sparring do sábado junta tudo sob fadiga próxima à da luta.',
    progression: 'Semana 4: técnica e saco pesado +1 round. Semana 7: mais +1 round, condicionamento de 8 para 10 rounds. Semanas 9–10: mantenha o volume e aumente a intensidade das combinações (mais rápido, mais forte, menos pausa entre elas).',
    fokus: {
      mon: 'Combinações complexas',
      tue: 'Potência de soco e ritmo',
      fri: 'Capacidade de trabalho',
      sat: 'Tudo sob fadiga',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Treino de fitness inspirado nas artes marciais e sem pré-requisitos: elementos de boxe e chutes como treino de corpo inteiro.',
    why: 'A porta de entrada para quem quer o preparo físico dos esportes de combate sem ambição competitiva: shadow boxing, chutes e exercícios com o peso do corpo em rounds curtos de 2 minutos. O treino por rounds age fisiologicamente como o intervalado — com o bônus motivador de aprender técnicas de verdade.',
    progression: 'Semana 3: um round a mais por sessão. Semana 5: rounds alongados de 2:00 para 2:30. Mantenha as pausas disciplinadas em 60 segundos — o efeito sobre a forma física vem da relação entre esforço e pausa.',
    fokus: {
      mon: 'Socos e parte superior',
      wed: 'Chutes e pernas',
      sat: 'Tudo combinado',
    },
  },
};
