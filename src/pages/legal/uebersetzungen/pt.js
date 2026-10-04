// Tradução em português dos textos jurídicos.
//
// O original alemão em `legalContent.js` continua sendo o texto vinculante —
// por isso cada documento começa com a seção «Versão vinculante». É assim que
// se faz com textos jurídicos multilíngues: traduz-se para que se entenda, não
// para criar uma segunda versão com validade própria.
//
// Nome, endereço e as referências ao direito austríaco (§ 5 ECG, GISA, GewO)
// não são traduzidos: são nomes próprios e citações legais.
const BETREIBER = `Josef Gallab (empresário individual)
Oberhofenweg 21b
6380 St. Johann in Tirol, Áustria
E-mail: kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Versão vinculante',
  body: 'Esta é uma tradução de cortesia do texto original em alemão. Em caso de divergência ou dúvida de interpretação, prevalece a versão alemã. Você pode consultá-la mudando o idioma do aplicativo para «Deutsch» no seu perfil.',
};

export default {
  imprint: {
    title: 'Informações legais',
    updated: 'Atualizado: 17 de setembro de 2026',
    sections: [
      VORRANG,
      {
        heading: 'Dados conforme o § 5 ECG e o § 25 MedienG (Áustria)',
        body: BETREIBER,
      },
      {
        heading: 'Objeto da empresa',
        body: 'Operação do aplicativo web de fitness e nutrição «FullRep» (fullrep.pages.dev).',
      },
      {
        heading: 'Dados sobre a atividade profissional',
        body: 'Atividade livre: «Serviços de processamento automático de dados e tecnologia da informação»\nNúmero GISA: 39801937\nMembro da Câmara de Comércio do Tirol (delegação de Kitzbühel)\nAutoridade de supervisão: Bezirkshauptmannschaft Kitzbühel\nNorma aplicável: Gewerbeordnung (GewO), disponível em ris.bka.gv.at\nIVA: pequeno empresário conforme o § 6 n.º 1 al. 27 UStG (sem número de IVA)',
      },
      {
        heading: 'Resolução de litígios de consumo',
        body: 'Não estamos dispostos nem obrigados a participar de procedimentos de resolução de litígios perante um órgão de arbitragem de consumo. A antiga plataforma europeia de resolução de litígios em linha foi encerrada em 20 de julho de 2025.',
      },
      {
        heading: 'Responsabilidade pelos conteúdos',
        body: 'Os conteúdos deste aplicativo foram elaborados com o máximo cuidado. Não assumimos qualquer garantia quanto à sua exatidão, integridade ou atualidade. Todos os conteúdos de treino, nutrição e conhecimento servem exclusivamente como informação geral e não constituem orientação médica.',
      },
    ],
  },

  privacy: {
    title: 'Política de privacidade',
    updated: 'Atualizado: 4 de outubro de 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Responsável pelo tratamento',
        body: `Responsável pelo tratamento de dados no aplicativo «FullRep»:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Quais dados tratamos',
        body: 'Dados da conta: endereço de e-mail e senha (criptografada) para o cadastro.\n\nDados do perfil: nome, idade, sexo, altura, peso, objetivo de treino, nível de atividade e experiência — informados por você no onboarding.\n\nDados de uso: seus treinos (exercícios, séries, cargas), registros de nutrição (alimentos, calorias, macros), registros de água, suplementos, histórico de peso, planos de treino, amizades e pontos de experiência.\n\nDados de saúde (art. 9 do RGPD): peso e medidas corporais, dados de nutrição e treino, dados do ciclo e diário de sintomas (se você ativar o acompanhamento do ciclo), passos e peso do Apple Health / Health Connect (se você ativar a conexão) e tudo o que você escrever ao coach de IA — por exemplo, valores sanguíneos. Tratamos esses dados exclusivamente com base no seu consentimento explícito, dado em uma etapa própria do onboarding (registramos o momento no seu perfil), que você pode retirar a qualquer momento excluindo sua conta.\n\nApple Health / Health Connect (opcional): se você ativar a conexão no perfil, o FullRep lê o número de passos e o peso do Apple Health (iOS) ou do Google Health Connect (Android) para exibi-los no app e incorporá-los ao seu histórico de peso. A permissão é concedida no diálogo do sistema e pode ser revogada lá a qualquer momento; você também pode desativar a conexão no perfil. O FullRep não grava dados no Apple Health nem no Health Connect e nunca usa esses dados para publicidade.\n\nFotos: fotos de exercícios e produtos ficam armazenadas exclusivamente no seu aparelho (IndexedDB) e não são transmitidas a nós. Fotos de refeições para a análise de IA são transmitidas ao Google (Gemini API) — veja o item 4.\n\nDados de publicidade e compras (somente nos apps para iOS e Android): para exibir anúncios, o Google AdMob trata o identificador de publicidade do seu aparelho, seu endereço IP e dados técnicos do aparelho. Para a assinatura Premium, transmitimos ao RevenueCat um identificador de usuário interno do app e o recibo de compra da loja. O app web não exibe anúncios.\n\nRelatórios de erro: se o app travar, enviamos ao Sentry uma mensagem técnica de erro com a versão do app e o tipo de aparelho — sem nome, e-mail ou conteúdos (se o registro de erros estiver ativado na respectiva versão).',
      },
      {
        heading: '3. Finalidades e bases jurídicas',
        body: 'Disponibilização das funções do app: art. 6, n.º 1, alínea b) do RGPD (execução do contrato).\n\nDados de saúde: exclusivamente o seu consentimento explícito, art. 9, n.º 2, alínea a) do RGPD.\n\nPublicidade nos apps: só exibimos anúncios personalizados com o seu consentimento (art. 6, n.º 1, alínea a) do RGPD), obtido antes do primeiro anúncio pelo diálogo de consentimento do Google — no iOS, adicionalmente pelo diálogo de transparência de rastreamento da Apple. Se você recusar, verá apenas anúncios não personalizados; a base jurídica para isso é o nosso interesse legítimo em financiar a versão gratuita (art. 6, n.º 1, alínea f) do RGPD). Você pode alterar sua decisão a qualquer momento no perfil, em «Alterar consentimento de anúncios». Com uma assinatura Premium, a publicidade desaparece por completo. Seus dados de saúde e de uso nunca são usados para publicidade nem compartilhados com parceiros publicitários.\n\nRelatórios de erro e segurança: interesse legítimo em um app estável e seguro (art. 6, n.º 1, alínea f) do RGPD).\n\nO app web não exibe anúncios e não usa cookies de publicidade nem ferramentas de análise.',
      },
      {
        heading: '4. Destinatários e operadores',
        body: 'Supabase, Inc. (EUA; banco de dados e sistema de login): armazena seus dados de conta, perfil e uso.\n\nCloudflare, Inc. (EUA; hospedagem): entrega o app e nossas funções de servidor; são gerados registros de servidor tecnicamente necessários (p. ex. endereço IP). Não há contagem de visitas nem análise, nem na versão web nem nos apps.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — somente se você usar a análise de fotos de refeições, a foto tirada é transmitida ao Google para avaliação; somente se você usar o coach de IA, suas mensagens a ele, incluindo o histórico da conversa atual, vão para o Google. Não enviamos nome, e-mail nem ID de conta; não armazenamos fotos nem mensagens em nossos servidores. (2) AdMob — publicidade nos apps para iOS e Android (veja os itens 2 e 3).\n\nAnthropic, PBC (EUA; coach de IA): para as respostas do coach de IA usamos, como alternativa ao Gemini, modelos da Anthropic — com os mesmos dados acima, igualmente sem nome, e-mail ou ID de conta.\n\nRevenueCat, Inc. (EUA; assinatura Premium): recebe um identificador de usuário interno do app e a confirmação de compra da loja para gerenciar sua assinatura e restaurá-la em um novo aparelho. O pagamento em si é processado pela Apple ou pelo Google; não vemos dados de pagamento.\n\nFunctional Software, Inc. (Sentry, EUA; relatórios de erro): recebe mensagens técnicas de erro sem referência pessoal, se o registro de erros estiver ativado.\n\nOpen Food Facts (banco de dados de alimentos): ao pesquisar alimentos ou escanear códigos de barras, o termo de busca ou o código de barras (sem dados pessoais) é transmitido ao Open Food Facts.\n\nCom todos os operadores existem contratos conforme o art. 28 do RGPD. Nas transferências para os EUA baseamo-nos nas cláusulas contratuais-tipo da UE ou no Quadro de Privacidade de Dados UE-EUA, quando o fornecedor está certificado.',
      },
      {
        heading: '5. Armazenamento local no seu aparelho',
        body: 'O aplicativo guarda seus dados também localmente no seu aparelho (localStorage/IndexedDB), para que estejam disponíveis offline e sem espera. No modo convidado, todos os dados permanecem exclusivamente no seu aparelho e não são transmitidos a nós.',
      },
      {
        heading: '6. Prazo de conservação',
        body: 'Conservamos seus dados enquanto sua conta existir. Se você excluir sua conta, todos os seus dados são apagados imediatamente do nosso banco de dados. Para proteção contra perda de dados fazemos diariamente uma cópia de segurança do banco, excluída automaticamente após 14 dias — até lá, uma conta excluída ainda pode constar em uma cópia; essas cópias servem exclusivamente à recuperação após uma falha.\n\nO histórico das suas conversas com o coach de IA fica somente no seu aparelho (as últimas 60 mensagens); em nossos servidores contamos apenas quantas perguntas você fez por dia.',
      },
      {
        heading: '7. Excluir a conta e os dados',
        body: 'Você pode excluir sua conta com todos os dados a qualquer momento dentro do aplicativo: Perfil → Excluir conta. Além disso, pode solicitar a exclusão sem formalidades por e-mail para o endereço indicado acima.',
      },
      {
        heading: '8. Seus direitos',
        body: 'Você tem direito de acesso, retificação, apagamento, limitação do tratamento, portabilidade dos dados e oposição, bem como o direito de revogar a qualquer momento um consentimento dado. Pode ainda apresentar reclamação junto à autoridade austríaca de proteção de dados (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Termos de uso',
    updated: 'Atualizado: 17 de setembro de 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Âmbito de aplicação',
        body: `Estes termos de uso aplicam-se ao uso do aplicativo web «FullRep» (fullrep.pages.dev), operado por:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Descrição do serviço',
        body: 'O FullRep é um aplicativo para registrar treino e alimentação, com conteúdos de conhecimento complementares. O uso é atualmente gratuito. Não há direito a disponibilidade permanente; as funções podem mudar ou ser descontinuadas.',
      },
      {
        heading: '3. Conta e obrigações',
        body: 'Para guardar seus dados de forma permanente é necessária uma conta. Você se compromete a manter seus dados de acesso em segredo e a não publicar conteúdos que violem direitos de terceiros. Os dados que você contribuir para a comunidade (p. ex. valores nutricionais de produtos via código de barras) ficam à disposição do conjunto dos usuários.',
      },
      {
        heading: '4. Aviso de saúde — não é orientação médica',
        body: 'Todos os conteúdos do aplicativo — em especial os planos de treino, as informações sobre nutrição e dietas, os cálculos de calorias e a biblioteca de conhecimento (incluindo as informações sobre suplementos e peptídeos) — servem exclusivamente como informação geral e não constituem orientação médica, terapêutica ou nutricional. Em nenhum caso substituem o exame, o diagnóstico ou o tratamento por parte de um médico. Consulte um médico antes de iniciar um programa de treino ou de alimentação e antes de tomar suplementos, especialmente em caso de doenças prévias, gravidez ou uso de medicamentos. A análise de refeições por foto assistida por IA fornece valores estimados cuja exatidão não é garantida.',
      },
      {
        heading: '5. Responsabilidade',
        body: 'Respondemos de forma ilimitada por dolo e culpa grave, bem como por danos decorrentes de lesão à vida, à integridade física ou à saúde. Quanto ao restante, fica excluída a responsabilidade por culpa leve. O uso das recomendações de treino e alimentação ocorre por sua própria conta e risco.',
      },
      {
        heading: '6. Alterações',
        body: 'Podemos alterar estes termos de uso com efeito para o futuro. Informaremos você no aplicativo sobre alterações substanciais.',
      },
      {
        heading: '7. Direito aplicável',
        body: 'Aplica-se o direito austríaco, com exclusão das suas normas de reenvio. As disposições imperativas de proteção do consumidor do país onde você reside permanecem inalteradas.',
      },
    ],
  },

  health: {
    title: 'Aviso de saúde',
    updated: 'Atualizado: 17 de setembro de 2026',
    sections: [
      VORRANG,
      {
        heading: 'O FullRep não substitui orientação médica',
        body: 'Em qualquer questão de saúde, para um diagnóstico ou um tratamento, procure sempre um médico. O FullRep é um aplicativo para registrar treino e alimentação — não é um dispositivo médico e não substitui exame, diagnóstico ou terapia.',
      },
      {
        heading: 'Quando procurar orientação médica',
        body: 'Antes de iniciar um programa de treino ou de alimentação, antes de uma dieta e antes de tomar suplementos alimentares — especialmente em caso de doenças prévias, sintomas, gravidez, amamentação ou se você usa medicamentos.\n\nInterrompa o treino e procure orientação médica se surgirem sintomas — como dor no peito, falta de ar, tontura ou desmaio.',
      },
      {
        heading: 'O que os conteúdos do aplicativo são — e o que não são',
        body: 'Os planos de treino, as informações sobre nutrição e dietas, os cálculos de calorias e macros e a biblioteca de conhecimento (incluindo suplementos, exames de sangue e peptídeos) servem exclusivamente como informação geral. São genéricos e não levam em conta a sua situação pessoal.\n\nAs indicações sobre exames de sangue apenas classificam os valores de forma aproximada e não constituem diagnóstico. Só um médico pode avaliar os seus resultados.\n\nSobre os peptídeos: em muitos países essas substâncias exigem receita médica ou não são aprovadas. Os conteúdos não trazem, deliberadamente, qualquer indicação de dosagem.',
      },
      {
        heading: 'Estimativas, não medições',
        body: 'A calculadora de gasto energético (Mifflin-St Jeor) e a análise de refeições por foto assistida por IA fornecem estimativas. A exatidão delas não é garantida; não substituem uma medição nem orientação de um nutricionista.',
      },
      {
        heading: 'O coach de IA não é médico',
        body: 'O coach de IA responde a perguntas gerais sobre treino, nutrição e suplementos. Não faz diagnósticos, não recomenda terapias e não indica dosagens. Suas respostas podem conter erros. Para orientação médica, um diagnóstico ou um tratamento, procure um médico.',
      },
      {
        heading: 'Em caso de emergência',
        body: 'Em uma emergência médica, ligue para o serviço de emergência (192 no Brasil, 112 na União Europeia). Não use o FullRep para buscar ajuda em uma emergência nem para adiar atendimento médico.',
      },
    ],
  },
};
