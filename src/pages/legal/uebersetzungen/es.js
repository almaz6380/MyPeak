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
    updated: 'Actualizado: 17 de septiembre de 2026',
    sections: [
      VORRANG,
      {
        heading: 'Datos conforme al § 5 ECG y al § 25 MedienG (Austria)',
        body: BETREIBER,
      },
      {
        heading: 'Objeto de la empresa',
        body: 'Explotación de la aplicación web de fitness y nutrición «FullRep» (fullrep.pages.dev).',
      },
      {
        heading: 'Datos sobre la actividad profesional',
        body: 'Actividad libre: «Servicios de procesamiento automático de datos y tecnología de la información»\nNúmero GISA: 39801937\nMiembro de la Cámara de Comercio del Tirol (delegación de Kitzbühel)\nAutoridad de supervisión: Bezirkshauptmannschaft Kitzbühel\nNormativa aplicable: Gewerbeordnung (GewO), disponible en ris.bka.gv.at\nIVA: pequeño empresario conforme al § 6 apdo. 1 nº 27 UStG (sin número de IVA)',
      },
      {
        heading: 'Resolución de litigios con consumidores',
        body: 'No estamos dispuestos ni obligados a participar en procedimientos de resolución de litigios ante una junta arbitral de consumo. La antigua plataforma europea de resolución de litigios en línea se cerró el 20 de julio de 2025.',
      },
      {
        heading: 'Responsabilidad por los contenidos',
        body: 'Los contenidos de esta aplicación se han elaborado con el máximo cuidado. No se asume ninguna garantía sobre su exactitud, integridad o actualidad. Todos los contenidos de entrenamiento, nutrición y conocimiento sirven exclusivamente como información general y no constituyen asesoramiento médico.',
      },
    ],
  },

  privacy: {
    title: 'Política de privacidad',
    updated: 'Actualizado: 10 de octubre de 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Responsable del tratamiento',
        body: `Responsable del tratamiento de datos en la aplicación «FullRep»:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Qué datos tratamos',
        body: 'Datos de la cuenta: dirección de correo electrónico y contraseña (cifrada) para el registro.\n\nDatos del perfil: nombre, edad, sexo, estatura, peso, objetivo de entrenamiento, nivel de actividad y experiencia — indicados por ti en el onboarding.\n\nDatos de uso: tus entrenamientos (ejercicios, series, pesos), registros de nutrición (alimentos, calorías, macros), registros de agua, suplementos, historial de peso, planes de entrenamiento, amistades y puntos de experiencia.\n\nDatos de salud (art. 9 RGPD): peso y medidas corporales, datos de nutrición y entrenamiento, datos del ciclo y diario de síntomas (si activas el seguimiento del ciclo), pasos y peso de Apple Health / Health Connect (si activas la conexión) y todo lo que escribas al coach de IA — por ejemplo, valores sanguíneos. Tratamos estos datos exclusivamente sobre la base de tu consentimiento explícito, que otorgas en un paso propio del onboarding (guardamos el momento en tu perfil) y que puedes retirar en cualquier momento con efecto para el futuro — en el perfil con «Retirar el consentimiento para datos de salud» o eliminando tu cuenta. El tratamiento realizado hasta la retirada sigue siendo lícito. Como FullRep no funciona de forma razonable sin estos datos, tras la retirada solo podrás seguir usando tu cuenta si vuelves a dar tu consentimiento; si no, puedes pedir que se elimine.\n\nApple Health / Health Connect (opcional): si activas la conexión en el perfil, FullRep lee el número de pasos y el peso de Apple Health (iOS) o Google Health Connect (Android) para mostrarlos en la app e incorporarlos a tu historial de peso. El permiso lo concedes en el diálogo del sistema y puedes revocarlo allí en cualquier momento; también puedes desactivar la conexión en el perfil. FullRep no escribe datos en Apple Health ni en Health Connect y nunca usa estos datos para publicidad.\n\nFotos: las fotos de ejercicios y productos se guardan exclusivamente en tu dispositivo (IndexedDB) y no se nos transmiten. Las fotos de comidas para el análisis de IA se transmiten a Google (Gemini API) — véase el punto 4.\n\nDatos de publicidad y compras (solo en las apps para iOS y Android): para mostrar publicidad, Google AdMob trata el identificador publicitario de tu dispositivo, tu dirección IP y datos técnicos del dispositivo. Para la suscripción Premium transmitimos un identificador de usuario interno de la app y el recibo de compra de la tienda a RevenueCat. La app web no muestra publicidad.\n\nInformes de errores: si la app se bloquea, enviamos un mensaje de error técnico con la versión de la app y el tipo de dispositivo a Sentry — sin nombre, correo ni contenidos (si el registro de errores está activado en la compilación correspondiente).',
      },
      {
        heading: '3. Finalidades y bases jurídicas',
        body: 'Prestación de las funciones de la app: art. 6, apdo. 1, letra b) RGPD (ejecución del contrato).\n\nDatos de salud: exclusivamente tu consentimiento explícito, art. 9, apdo. 2, letra a) RGPD.\n\nPublicidad en las apps: solo mostramos publicidad personalizada con tu consentimiento (art. 6, apdo. 1, letra a) RGPD), que solicitamos antes del primer anuncio mediante el diálogo de consentimiento de Google — en iOS, además, mediante el diálogo de transparencia de seguimiento de Apple. Si lo rechazas, solo verás publicidad no personalizada; su base jurídica es nuestro interés legítimo en financiar la versión gratuita (art. 6, apdo. 1, letra f) RGPD). Puedes cambiar tu decisión en cualquier momento en el perfil, en «Cambiar el consentimiento publicitario». Con una suscripción Premium la publicidad desaparece por completo. Tus datos de salud y de uso nunca se usan para publicidad ni se comparten con socios publicitarios.\n\nInformes de errores y seguridad: interés legítimo en una app estable y segura (art. 6, apdo. 1, letra f) RGPD).\n\nEdad mínima: solo se puede crear una cuenta a partir de los 16 años; el onboarding comprueba la fecha de nacimiento. El motivo es que, en algunos Estados de la UE como Alemania, el consentimiento para el tratamiento de datos de salud y para la publicidad personalizada solo puede otorgarse válidamente a partir de los 16 años (art. 8 RGPD).\n\nLa app web no muestra publicidad y no utiliza cookies publicitarias. Para medir la audiencia de la versión web usamos Cloudflare Web Analytics (véase el punto 4).',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. Destinatarios y encargados del tratamiento',
        body: 'Supabase, Inc. (EE. UU.; base de datos y sistema de inicio de sesión): almacena tus datos de cuenta, perfil y uso.\n\nCloudflare, Inc. (EE. UU.; alojamiento): entrega la app y nuestras funciones de servidor; se generan registros de servidor técnicamente necesarios (p. ej. dirección IP). En la versión web, Cloudflare Web Analytics cuenta además las visitas a las páginas (página visitada, hora, página de referencia, país, tipo de dispositivo, navegador, tiempo de carga), sin cookies, sin guardar nada en tu dispositivo y sin almacenar la dirección IP. La base jurídica es nuestro interés legítimo en una medición de audiencia respetuosa con la privacidad (art. 6.1.f RGPD). En las apps no se realiza ningún recuento de visitas.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — solo si usas el análisis de fotos de comidas, la foto tomada se transmite a Google para su evaluación; solo si usas el coach de IA, Google (Gemini API) trata tus mensajes, incluido el historial de la conversación actual, para generar la respuesta. Google trata estas entradas conforme a sus condiciones para la Gemini API. No enviamos tu nombre, correo ni ID de cuenta; no guardamos fotos ni mensajes en nuestros servidores. (2) AdMob — publicidad en las apps para iOS y Android (véanse los puntos 2 y 3).\n\nAnthropic, PBC (EE. UU.; coach de IA): las respuestas del coach de IA también pueden generarse con modelos de Anthropic (Claude) en lugar de Gemini. En ese caso Anthropic trata tus mensajes, incluido el historial de la conversación actual — igualmente sin nombre, correo ni ID de cuenta.\n\nRevenueCat, Inc. (EE. UU.; suscripción Premium): recibe un identificador de usuario interno de la app y la confirmación de compra de la tienda para gestionar tu suscripción y restaurarla en un dispositivo nuevo. El pago lo gestionan Apple o Google; nosotros no vemos datos de pago.\n\nFunctional Software, Inc. (Sentry, EE. UU.; informes de errores): recibe mensajes de error técnicos sin referencia personal, si el registro de errores está activado.\n\nOpen Food Facts (base de datos de alimentos): al buscar alimentos o escanear códigos de barras, el término de búsqueda o el código de barras (sin datos personales) se transmite a Open Food Facts.\n\nCuando los proveedores ofrecen condiciones de encargo del tratamiento conforme al art. 28 RGPD, estas se aplican a nuestro uso de sus servicios. En las transferencias a EE. UU. nos basamos en las cláusulas contractuales tipo de la UE o en el Marco de Privacidad de Datos UE-EE. UU., si el proveedor está certificado.',
      },
      {
        heading: '5. Almacenamiento local en tu dispositivo',
        body: 'La aplicación guarda además tus datos localmente en tu dispositivo (localStorage/IndexedDB) para que estén disponibles sin conexión y sin esperas. En el modo invitado, todos los datos permanecen exclusivamente en tu dispositivo y no se transmiten a nosotros. En la app para Android está desactivada la copia de seguridad automática de Google (Android Backup), de modo que tus datos locales de la app no acaban en tu copia de Google Drive.',
      },
      {
        heading: '6. Plazo de conservación',
        body: 'Conservamos tus datos mientras exista tu cuenta. Si eliminas tu cuenta, todos tus datos se borran de inmediato de nuestra base de datos. Para protegernos contra la pérdida de datos hacemos una copia de seguridad diaria de la base de datos, que se elimina automáticamente a los 14 días — hasta entonces, una cuenta eliminada puede seguir en una copia de seguridad; estas copias se usan exclusivamente para la recuperación tras una avería.\n\nEl historial de tus conversaciones con el coach de IA se guarda solo en tu dispositivo (los últimos 60 mensajes); en nuestros servidores solo contamos cuántas preguntas has hecho por día.',
      },
      {
        heading: '7. Eliminar la cuenta y los datos',
        body: 'Puedes eliminar tu cuenta con todos sus datos en cualquier momento desde la propia aplicación: Perfil → Eliminar cuenta. Además puedes solicitar la eliminación sin formalidades por correo electrónico a la dirección indicada arriba.',
      },
      {
        heading: '8. Tus derechos',
        body: 'Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad de los datos y oposición, así como derecho a revocar en cualquier momento un consentimiento otorgado — el de datos de salud en el perfil con «Retirar el consentimiento para datos de salud», el de publicidad con «Cambiar el consentimiento publicitario». También puedes presentar una reclamación ante la autoridad austriaca de protección de datos (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Condiciones de uso',
    updated: 'Actualizado: 4 de octubre de 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Ámbito de aplicación',
        body: `Estas condiciones de uso se aplican al uso de la aplicación «FullRep» para iOS y Android y de su versión web (fullrep.pages.dev), operada por:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Descripción del servicio',
        body: 'FullRep es una aplicación para registrar el entrenamiento y la alimentación, con contenidos de conocimiento complementarios. Las funciones básicas son gratuitas; la versión gratuita de las apps para iOS y Android se financia con publicidad. Las funciones adicionales — actualmente, sobre todo, el coach de IA — y el uso sin publicidad están disponibles con FullRep Premium (punto 3). No existe derecho a una disponibilidad permanente; las funciones pueden cambiar o suspenderse. Durante un periodo de suscripción ya pagado no limitaremos de forma sustancial las funciones Premium sin un motivo objetivo.',
      },
      {
        heading: '3. FullRep Premium (suscripción)',
        body: 'FullRep Premium se ofrece como suscripción de renovación automática, mensual o anual. Solo puede comprarse a través del App Store de Apple o de Google Play; el pago y la facturación los gestiona la tienda correspondiente, cuyas condiciones se aplican además.\n\nEl precio vigente se te muestra en el diálogo de la tienda antes de la compra. El pago se carga a tu cuenta de Apple o Google al confirmar la compra. La suscripción se renueva automáticamente por el periodo elegido salvo que la canceles al menos 24 horas antes de que termine el periodo en curso.\n\nPuedes gestionar y cancelar la suscripción en cualquier momento en los ajustes de suscripciones de tu cuenta de Apple o Google. Eliminar la app o tu cuenta de FullRep no pone fin a la suscripción. Tras la cancelación, Premium sigue activo hasta el final del periodo ya pagado.\n\nCon Premium desaparece la publicidad en la app y se desbloquean funciones Premium como el coach de IA (dentro de un cupo diario).',
      },
      {
        heading: '4. Periodo de prueba gratuito',
        body: 'Los nuevos usuarios pueden probar Premium gratis una sola vez durante 7 días. La prueba se inicia en la app y está vinculada a tu cuenta de FullRep. Termina automáticamente y no se convierte en una suscripción de pago: no hace falta cancelar nada. Solo se crea una suscripción si la contratas expresamente en la tienda.',
      },
      {
        heading: '5. Desistimiento y reembolsos',
        body: 'Las compras las gestionan Apple o Google; nosotros no recibimos datos de pago y por eso no podemos reembolsar compras. Los reembolsos y el ejercicio de un derecho legal de desistimiento se rigen por las condiciones y procedimientos de la tienda correspondiente (Apple: reportaproblem.apple.com; Google Play: historial de pedidos de tu cuenta de Google). Los derechos imperativos de los consumidores permanecen inalterados.',
      },
      {
        heading: '6. Cuenta y obligaciones',
        body: 'Para conservar tus datos de forma permanente es necesaria una cuenta. Te comprometes a mantener en secreto tus credenciales de acceso y a no publicar contenidos que vulneren derechos de terceros. Los datos que aportes a la comunidad (p. ej. valores nutricionales de productos mediante código de barras) los pones a disposición del conjunto de los usuarios. Para crear una cuenta debes tener al menos 16 años.',
      },
      {
        heading: '7. Aviso de salud — no es asesoramiento médico',
        body: 'Todos los contenidos de la aplicación — en particular los planes de entrenamiento, la información sobre nutrición y dietas, los cálculos de calorías y la biblioteca de conocimiento (incluida la información sobre suplementos y péptidos) — sirven exclusivamente como información general y no constituyen asesoramiento médico, terapéutico ni nutricional. En ningún caso sustituyen la exploración, el diagnóstico o el tratamiento por parte de personal médico. Consulta a un médico antes de iniciar un programa de entrenamiento o de alimentación y antes de tomar suplementos, especialmente en caso de enfermedades previas, embarazo o toma de medicamentos. El análisis de comidas por foto asistido por IA ofrece valores estimados cuya exactitud no está garantizada. Más detalles en el aviso de salud de la app (Perfil → Aviso de salud).',
      },
      {
        heading: '8. Responsabilidad',
        body: 'Respondemos de forma ilimitada por dolo y culpa grave, así como por daños derivados de lesiones a la vida, la integridad física o la salud. Por lo demás, queda excluida la responsabilidad por negligencia leve. El uso de las recomendaciones de entrenamiento y alimentación se realiza bajo tu propia responsabilidad.',
      },
      {
        heading: '9. Modificaciones',
        body: 'Podemos modificar estas condiciones de uso con efecto para el futuro. Te informaremos en la aplicación sobre los cambios sustanciales.',
      },
      {
        heading: '10. Derecho aplicable',
        body: 'Se aplica el derecho austriaco, con exclusión de sus normas de remisión. Las disposiciones imperativas de protección de los consumidores del Estado en el que resides permanecen inalteradas.',
      },
    ],
  },

  health: {
    title: 'Aviso de salud',
    updated: 'Actualizado: 17 de septiembre de 2026',
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
