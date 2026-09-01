// Traducción al español de los textos legales.
//
// El original alemán en `legalContent.js` sigue siendo el texto vinculante —
// por eso cada documento empieza con la sección «Versión vinculante». Así lo
// hacen los textos legales multilingües: se traduce para que se entienda, no
// para crear una segunda versión con validez propia.
//
// Nombre, dirección y las referencias al derecho austriaco (§ 5 ECG, GISA,
// GewO) no se traducen: son nombres propios y citas legales.
const BETREIBER = `Josef Gallab (empresario individual)
Oberhofenweg 21b
6380 St. Johann in Tirol, Austria
Correo electrónico: kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Versión vinculante',
  body: 'Esta es una traducción de cortesía del texto original en alemán. En caso de discrepancia o de duda de interpretación, prevalece la versión alemana. Puedes consultarla cambiando el idioma de la aplicación a «Deutsch» en tu perfil.',
};

export default {
  imprint: {
    title: 'Aviso legal',
    updated: 'Actualizado: julio de 2026',
    sections: [
      VORRANG,
      {
        heading: 'Datos conforme al § 5 ECG y al § 25 MedienG (Austria)',
        body: BETREIBER,
      },
      {
        heading: 'Objeto de la empresa',
        body: 'Explotación de la aplicación web de fitness y nutrición «FullRep» (fullrep.vercel.app).',
      },
      {
        heading: 'Datos sobre la actividad profesional',
        body: 'Actividad libre: «Servicios de procesamiento automático de datos y tecnología de la información»\nNúmero GISA: 39801937\nMiembro de la Cámara de Comercio del Tirol (delegación de Kitzbühel)\nAutoridad de supervisión: Bezirkshauptmannschaft Kitzbühel\nNormativa aplicable: Gewerbeordnung (GewO), disponible en ris.bka.gv.at\nIVA: pequeño empresario conforme al § 6 apdo. 1 nº 27 UStG (sin número de IVA)',
      },
      {
        heading: 'Resolución de litigios con consumidores',
        body: 'No estamos dispuestos ni obligados a participar en procedimientos de resolución de litigios ante una junta arbitral de consumo. La plataforma europea de resolución de litigios en línea está disponible en https://ec.europa.eu/consumers/odr',
      },
      {
        heading: 'Responsabilidad por los contenidos',
        body: 'Los contenidos de esta aplicación se han elaborado con el máximo cuidado. No se asume ninguna garantía sobre su exactitud, integridad o actualidad. Todos los contenidos de entrenamiento, nutrición y conocimiento sirven exclusivamente como información general y no constituyen asesoramiento médico.',
      },
    ],
  },

  privacy: {
    title: 'Política de privacidad',
    updated: 'Actualizado: julio de 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Responsable del tratamiento',
        body: `Responsable del tratamiento de datos en la aplicación «FullRep»:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Qué datos tratamos',
        body: 'Datos de la cuenta: dirección de correo electrónico y contraseña (cifrada) para el registro.\n\nDatos del perfil: nombre, edad, sexo, altura, peso, objetivo de entrenamiento, nivel de actividad y experiencia — indicados por ti durante la configuración inicial.\n\nDatos de uso: tus entrenamientos (ejercicios, series, pesos), registros de nutrición (alimentos, calorías, macros), registros de agua, suplementos, evolución del peso, planes de entrenamiento, amistades y puntos de experiencia.\n\nDatos de salud (art. 9 RGPD): peso corporal, datos del ciclo y diario de síntomas (si activas el seguimiento del ciclo). Tratamos estos datos exclusivamente sobre la base de tu consentimiento expreso, que otorgas en la configuración inicial y que puedes revocar en cualquier momento eliminando tu cuenta.\n\nApple Health / Health Connect (opcional): si activas la conexión en tu perfil, FullRep lee el número de pasos y el peso de Apple Health (iOS) o de Google Health Connect (Android) para mostrarlos en la aplicación e incorporarlos a tu evolución de peso. El permiso lo concedes en el diálogo del sistema y puedes retirarlo allí en cualquier momento; además puedes desactivar la conexión en tu perfil. FullRep no escribe datos en Apple Health ni en Health Connect.\n\nFotos: las fotos de ejercicios y de productos se guardan exclusivamente en tu dispositivo (IndexedDB) y no se transmiten a nosotros. Las fotos de comidas para el análisis con IA se envían a Google (Gemini API) — véase el punto 4.',
      },
      {
        heading: '3. Finalidades y bases jurídicas',
        body: 'Tratamos tus datos para prestar las funciones de la aplicación (art. 6 apdo. 1 letra b RGPD — ejecución de un contrato) y, en el caso de los datos de salud, sobre la base de tu consentimiento expreso (art. 9 apdo. 2 letra a RGPD). No se realiza ningún seguimiento con fines publicitarios; no utilizamos cookies publicitarias ni herramientas de análisis.',
      },
      {
        heading: '4. Destinatarios y encargados del tratamiento',
        body: 'Supabase Inc. (base de datos y sistema de acceso): almacena los datos de tu cuenta, tu perfil y tu uso.\n\nVercel Inc. (alojamiento): sirve la aplicación; en el proceso se generan registros de servidor técnicamente necesarios (p. ej. la dirección IP).\n\nGoogle LLC (Gemini API): solo si utilizas el análisis de comidas por foto, la imagen tomada se transmite a Google para su evaluación. La foto no se almacena de forma permanente en nuestros sistemas.\n\nOpen Food Facts (base de datos de alimentos): al buscar alimentos o escanear un código de barras se transmite el término de búsqueda o el código (ningún dato personal) a Open Food Facts.\n\nCon los proveedores existen, en la medida necesaria, contratos de encargo del tratamiento; para las transferencias a terceros países (EE. UU.), los proveedores se basan en las cláusulas contractuales tipo de la UE o en el Marco de Privacidad de Datos UE-EE. UU.',
      },
      {
        heading: '5. Almacenamiento local en tu dispositivo',
        body: 'La aplicación guarda además tus datos localmente en tu dispositivo (localStorage/IndexedDB) para que estén disponibles sin conexión y sin esperas. En el modo invitado, todos los datos permanecen exclusivamente en tu dispositivo y no se transmiten a nosotros.',
      },
      {
        heading: '6. Plazo de conservación',
        body: 'Conservamos tus datos mientras exista tu cuenta. Si eliminas tu cuenta, todos tus datos se borran de nuestra base de datos de forma inmediata y permanente.',
      },
      {
        heading: '7. Eliminar la cuenta y los datos',
        body: 'Puedes eliminar tu cuenta con todos sus datos en cualquier momento desde la propia aplicación: Perfil → Eliminar cuenta. Además puedes solicitar la eliminación sin formalidades por correo electrónico a la dirección indicada arriba.',
      },
      {
        heading: '8. Tus derechos',
        body: 'Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad de los datos y oposición, así como derecho a revocar en cualquier momento un consentimiento otorgado. También puedes presentar una reclamación ante la autoridad austriaca de protección de datos (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Condiciones de uso',
    updated: 'Actualizado: julio de 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Ámbito de aplicación',
        body: `Estas condiciones de uso se aplican al uso de la aplicación web «FullRep» (fullrep.vercel.app), operada por:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Descripción del servicio',
        body: 'FullRep es una aplicación para registrar el entrenamiento y la alimentación, con contenidos de conocimiento complementarios. Su uso es actualmente gratuito. No existe derecho a una disponibilidad permanente; las funciones pueden cambiar o suspenderse.',
      },
      {
        heading: '3. Cuenta y obligaciones',
        body: 'Para conservar tus datos de forma permanente es necesaria una cuenta. Te comprometes a mantener en secreto tus credenciales de acceso y a no publicar contenidos que vulneren derechos de terceros. Los datos que aportes a la comunidad (p. ej. valores nutricionales de productos mediante código de barras) los pones a disposición del conjunto de los usuarios.',
      },
      {
        heading: '4. Aviso de salud — no es asesoramiento médico',
        body: 'Todos los contenidos de la aplicación — en particular los planes de entrenamiento, la información sobre nutrición y dietas, los cálculos de calorías y la biblioteca de conocimiento (incluida la información sobre suplementos y péptidos) — sirven exclusivamente como información general y no constituyen asesoramiento médico, terapéutico ni nutricional. En ningún caso sustituyen la exploración, el diagnóstico o el tratamiento por parte de personal médico. Consulta a un médico antes de iniciar un programa de entrenamiento o de alimentación y antes de tomar suplementos, especialmente en caso de enfermedades previas, embarazo o toma de medicamentos. El análisis de comidas por foto asistido por IA ofrece valores estimados cuya exactitud no está garantizada.',
      },
      {
        heading: '5. Responsabilidad',
        body: 'Respondemos de forma ilimitada por dolo y culpa grave, así como por daños derivados de lesiones a la vida, la integridad física o la salud. Por lo demás, queda excluida la responsabilidad por negligencia leve. El uso de las recomendaciones de entrenamiento y alimentación se realiza bajo tu propia responsabilidad.',
      },
      {
        heading: '6. Modificaciones',
        body: 'Podemos modificar estas condiciones de uso con efecto para el futuro. Te informaremos en la aplicación sobre los cambios sustanciales.',
      },
      {
        heading: '7. Derecho aplicable',
        body: 'Se aplica el derecho austriaco, con exclusión de sus normas de remisión. Las disposiciones imperativas de protección de los consumidores del Estado en el que resides permanecen inalteradas.',
      },
    ],
  },

  health: {
    title: 'Aviso de salud',
    updated: 'Actualizado: julio de 2026',
    sections: [
      VORRANG,
      {
        heading: 'FullRep no sustituye el consejo médico',
        body: 'Ante cualquier duda de salud, para un diagnóstico o un tratamiento, acude siempre a un médico. FullRep es una aplicación para registrar el entrenamiento y la alimentación: no es un producto sanitario ni sustituye la exploración, el diagnóstico o la terapia médicas.',
      },
      {
        heading: 'Cuándo debes buscar consejo médico',
        body: 'Antes de iniciar un programa de entrenamiento o de alimentación, antes de una dieta y antes de tomar complementos alimenticios — especialmente en caso de enfermedades previas, molestias, embarazo, lactancia o si tomas medicamentos.\n\nInterrumpe el entrenamiento y busca consejo médico si aparecen molestias, como dolor en el pecho, falta de aire, mareo o desmayo.',
      },
      {
        heading: 'Qué son los contenidos de la aplicación — y qué no',
        body: 'Los planes de entrenamiento, la información sobre nutrición y dietas, los cálculos de calorías y macros y la biblioteca de conocimiento (incluidos suplementos, análisis de sangre y péptidos) sirven exclusivamente como información general. Son genéricos y no tienen en cuenta tu situación personal.\n\nLas indicaciones sobre análisis de sangre clasifican los valores solo de forma aproximada y no constituyen un diagnóstico. La valoración de tus valores solo puede hacerla un médico.\n\nSobre los péptidos: en muchos países estas sustancias requieren receta médica o no están autorizadas. Los contenidos no incluyen deliberadamente ninguna indicación de dosis.',
      },
      {
        heading: 'Estimaciones, no mediciones',
        body: 'La calculadora de gasto energético (Mifflin-St Jeor) y el análisis de comidas por foto asistido por IA ofrecen estimaciones. Su exactitud no está garantizada; no sustituyen una medición ni el asesoramiento de un profesional de la nutrición.',
      },
      {
        heading: 'El coach de IA no es un médico',
        body: 'El coach de IA responde preguntas generales sobre entrenamiento, nutrición y suplementos. No emite diagnósticos, no recomienda terapias y no indica dosis. Sus respuestas pueden contener errores. Para obtener consejo médico, un diagnóstico o un tratamiento, acude a un médico.',
      },
      {
        heading: 'En caso de emergencia',
        body: 'Ante una emergencia médica, llama a los servicios de emergencia (112 en la Unión Europea). No utilices FullRep para buscar ayuda en una situación de emergencia ni para retrasar la atención médica.',
      },
    ],
  },
};
