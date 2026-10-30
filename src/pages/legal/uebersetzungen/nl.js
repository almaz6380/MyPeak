// Nederlandse vertaling van de juridische teksten.
//
// Het Duitse origineel in `legalContent.js` blijft de bindende tekst — daarom
// begint elk document met het onderdeel „Bindende versie”. Zo doen meertalige
// juridische teksten het: je vertaalt zodat het begrepen wordt, niet om een
// tweede versie met eigen geldigheid te scheppen.
//
// Naam, adres en de verwijzingen naar het Oostenrijkse recht (§ 5 ECG, GISA,
// GewO, § 6 UStG) worden niet vertaald: het zijn eigennamen en wetsartikelen.
const BETREIBER = `Josef Gallab (eenmanszaak)
Oberhofenweg 21b
6380 St. Johann in Tirol, Oostenrijk
E-mail: kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Bindende versie',
  body: 'Dit is een vrijblijvende vertaling van de oorspronkelijke Duitse tekst. Bij afwijkingen of twijfel over de uitleg geldt de Duitse versie. Je kunt die bekijken door in je profiel de taal van de app op „Deutsch” te zetten.',
};

export default {
  imprint: {
    title: 'Colofon',
    updated: 'Bijgewerkt: 17 september 2026',
    sections: [
      VORRANG,
      {
        heading: 'Gegevens volgens § 5 ECG en § 25 MedienG (Oostenrijk)',
        body: BETREIBER,
      },
      {
        heading: 'Bedrijfsdoel',
        body: 'Exploitatie van de fitness- en voedingswebapp „FullRep” (fullrep.pages.dev).',
      },
      {
        heading: 'Gegevens over de beroepsuitoefening',
        body: 'Vrij beroep (Freies Gewerbe): „Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik” (diensten op het gebied van automatische gegevensverwerking en informatietechnologie)\nGISA-nummer: 39801937\nLid van de Kamer van Koophandel van Tirol (Wirtschaftskammer Tirol, afdeling Kitzbühel)\nToezichthoudende instantie: Bezirkshauptmannschaft Kitzbühel\nToepasselijke regelgeving: Gewerbeordnung (GewO), te raadplegen op ris.bka.gv.at\nBtw: kleine ondernemer volgens § 6 Abs. 1 Z 27 UStG (geen btw-nummer)',
      },
      {
        heading: 'Geschillenbeslechting voor consumenten',
        body: 'Wij zijn niet bereid en niet verplicht deel te nemen aan geschillenbeslechtingsprocedures voor een geschillencommissie voor consumenten. Het vroegere Europese platform voor onlinegeschillenbeslechting is op 20 juli 2025 opgeheven.',
      },
      {
        heading: 'Aansprakelijkheid voor de inhoud',
        body: 'De inhoud van deze app is met de grootste zorg samengesteld. Voor juistheid, volledigheid en actualiteit wordt geen garantie gegeven. Alle inhoud over training, voeding en kennis dient uitsluitend als algemene informatie en is geen medisch advies.',
      },
    ],
  },

  privacy: {
    title: 'Privacyverklaring',
    updated: 'Bijgewerkt: 30 oktober 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Verwerkingsverantwoordelijke',
        body: `Verantwoordelijk voor de gegevensverwerking in de app „FullRep” is:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Welke gegevens we verwerken',
        body: 'Accountgegevens: e-mailadres en wachtwoord (versleuteld) voor de registratie.\n\nProfielgegevens: naam, leeftijd, geslacht, lengte, gewicht, trainingsdoel, activiteitsniveau en ervaring — door jou opgegeven tijdens de onboarding.\n\nGebruiksgegevens: je trainingen (oefeningen, sets, gewichten), voedingsregistraties (levensmiddelen, calorieën, macro’s), waterregistraties, supplementen, gewichtsverloop, trainingsschema’s, vriendschappen en ervaringspunten.\n\nGezondheidsgegevens (art. 9 AVG): lichaamsgewicht en lichaamsmaten, voedings- en trainingsgegevens, cyclusgegevens en klachtendagboek (als je cyclustracking inschakelt), stappen en gewicht uit Apple Health / Health Connect (als je de koppeling inschakelt) en alles wat je aan de AI-coach schrijft — bijvoorbeeld bloedwaarden. Deze gegevens verwerken we uitsluitend op basis van je uitdrukkelijke toestemming, die je tijdens de onboarding in een aparte stap geeft (het tijdstip leggen we vast in je profiel) en die je op elk moment met werking voor de toekomst kunt intrekken — in het profiel via „Toestemming voor gezondheidsgegevens intrekken” of door je account te verwijderen. De verwerking tot aan de intrekking blijft rechtmatig. Omdat FullRep zonder deze gegevens niet zinvol werkt, kun je je account na een intrekking pas weer gebruiken als je opnieuw toestemming geeft, of je kunt het laten verwijderen.\n\nApple Health / Health Connect (optioneel): als je de koppeling in het profiel inschakelt, leest FullRep het aantal stappen en het gewicht uit Apple Health (iOS) of Google Health Connect (Android) om ze in de app te tonen en over te nemen in je gewichtsverloop. De toestemming geef je in het systeemvenster en je kunt haar daar op elk moment intrekken; je kunt de koppeling bovendien in het profiel uitschakelen. Los daarvan kun je in het profiel „Workouts opslaan in Health” inschakelen: FullRep slaat dan elke afgeronde training op als trainingssessie (soort, begin, einde) in Apple Health of Health Connect — geen sets, gewichten, calorieën of hartslag. Wat daar staat, beheert het systeem; FullRep verwijdert het niet als je de schakelaar weer uitzet. FullRep gebruikt deze gegevens nooit voor advertenties.\n\nActieve calorieën en stappen tellen op het toestel (optioneel, sinds versie 1.6.2): met de Health-koppeling leest FullRep ook je actieve (verbrande) calorieën van vandaag om ze op het startscherm en in de widget te tonen. Daarnaast kun je in je profiel ‘Stappen tellen met je telefoon’ inschakelen: FullRep leest dan het aantal stappen rechtstreeks van de bewegingssensor van je toestel (iOS: Beweging en fitness; Android: stappenteller, waarvoor de app elke 15 minuten kort de teller uitleest). Deze stapgegevens blijven op je toestel en worden niet naar ons verstuurd. Je geeft en trekt toestemming in via de systeeminstellingen; je kunt de functie ook in je profiel uitschakelen.\n\nFoto’s: oefening- en productfoto’s worden uitsluitend lokaal op je apparaat opgeslagen (IndexedDB) en niet naar ons verzonden. Maaltijdfoto’s voor de AI-analyse worden naar Google (Gemini API) verzonden — zie punt 4.\n\nAdvertentie- en aankoopgegevens (alleen in de apps voor iOS en Android): voor het tonen van advertenties verwerkt Google AdMob de advertentie-ID van je apparaat, je IP-adres en technische apparaatgegevens. Voor het Premium-abonnement sturen we een interne gebruikers-ID van de app en het aankoopbewijs van de store naar RevenueCat. De webapp toont geen advertenties.\n\nFoutrapporten: als de app crasht, sturen we een technische foutmelding met app-versie en apparaattype naar Sentry — zonder naam, e-mail of inhoud (voor zover foutregistratie in de betreffende build is ingeschakeld).',
      },
      {
        heading: '3. Doeleinden en rechtsgronden',
        body: 'Levering van de functies van de app: art. 6, lid 1, onder b) AVG (uitvoering van de overeenkomst).\n\nGezondheidsgegevens: uitsluitend je uitdrukkelijke toestemming, art. 9, lid 2, onder a) AVG.\n\nAdvertenties in de apps: gepersonaliseerde advertenties tonen we alleen met je toestemming (art. 6, lid 1, onder a) AVG), die we vóór de eerste advertentie vragen via het toestemmingsvenster van Google — op iOS daarnaast via het venster voor App Tracking Transparency van Apple. Weiger je, dan zie je alleen niet-gepersonaliseerde advertenties; de rechtsgrond daarvoor is ons gerechtvaardigd belang bij de financiering van de gratis versie (art. 6, lid 1, onder f) AVG). Je kunt je keuze op elk moment in het profiel aanpassen onder „Advertentietoestemming wijzigen”. Met een Premium-abonnement verdwijnen de advertenties volledig. Je gezondheids- en gebruiksgegevens worden nooit voor advertenties gebruikt of met advertentiepartners gedeeld.\n\nFoutrapporten en beveiliging: gerechtvaardigd belang bij een stabiele en veilige app (art. 6, lid 1, onder f) AVG).\n\nMinimumleeftijd: een account kan pas vanaf 16 jaar worden aangemaakt; de onboarding controleert de geboortedatum. De reden is dat de toestemming voor de verwerking van gezondheidsgegevens en voor gepersonaliseerde advertenties in sommige EU-landen, zoals Duitsland, pas vanaf 16 jaar geldig kan worden gegeven (art. 8 AVG).\n\nDe webapp toont geen advertenties en plaatst geen advertentiecookies. Voor het meten van het bereik van de webversie gebruiken we Cloudflare Web Analytics (zie punt 4).',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. Ontvangers en verwerkers',
        body: 'Supabase, Inc. (VS; database en inlogsysteem): slaat je account-, profiel- en gebruiksgegevens op.\n\nCloudflare, Inc. (VS; hosting): levert de app en onze serverfuncties uit; daarbij ontstaan technisch noodzakelijke serverlogs (bijv. IP-adres). In de webversie telt Cloudflare Web Analytics daarnaast de paginabezoeken (bezochte pagina, tijdstip, verwijzende pagina, land, apparaattype, browser, laadtijd) — zonder cookies, zonder opslag op je apparaat en zonder opslag van het IP-adres. De rechtsgrond is ons gerechtvaardigd belang bij een privacyvriendelijke bereikmeting (art. 6, lid 1, onder f) AVG). In de apps vindt geen bezoekerstelling plaats.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — alleen als je de fotoanalyse van maaltijden gebruikt, wordt de gemaakte foto ter beoordeling naar Google verzonden; alleen als je de AI-coach gebruikt, worden je berichten aan de coach, inclusief het verloop van het huidige gesprek, door Google (Gemini API) verwerkt om het antwoord te genereren. Google verwerkt deze invoer volgens zijn voorwaarden voor de Gemini API. We sturen daarbij geen naam, e-mailadres of account-ID mee; foto’s en berichten slaan we niet op onze servers op. (2) AdMob — advertenties in de apps voor iOS en Android (zie punt 2 en 3).\n\nAnthropic, PBC (VS; AI-coach): antwoorden van de AI-coach kunnen in plaats van door Gemini ook door modellen van Anthropic (Claude) worden gegenereerd. Dan verwerkt Anthropic je berichten, inclusief het verloop van het huidige gesprek — eveneens zonder naam, e-mail of account-ID.\n\nRevenueCat, Inc. (VS; Premium-abonnement): ontvangt een interne gebruikers-ID van de app en de aankoopbevestiging van de store om je abonnement te beheren en op een nieuw apparaat te herstellen. De betaling zelf wordt door Apple of Google afgehandeld; wij zien geen betaalgegevens.\n\nFunctional Software, Inc. (Sentry, VS; foutrapporten): ontvangt technische foutmeldingen zonder persoonsgegevens, voor zover foutregistratie is ingeschakeld.\n\nOpen Food Facts (levensmiddelendatabase): bij het zoeken naar levensmiddelen en het scannen van barcodes worden de zoekterm of de barcode (geen persoonsgegevens) naar Open Food Facts verzonden.\n\nVoor zover de aanbieders verwerkersovereenkomsten volgens art. 28 AVG aanbieden, gelden deze voor ons gebruik van hun diensten. Bij doorgifte naar de VS baseren we ons op de standaardcontractbepalingen van de EU of op het EU-US Data Privacy Framework, voor zover de aanbieder daar gecertificeerd is.',
      },
      {
        heading: '5. Lokale opslag op je apparaat',
        body: 'De app slaat je gegevens daarnaast lokaal op je apparaat op (localStorage/IndexedDB), zodat ze offline en zonder wachttijd beschikbaar zijn. In de gastmodus blijven alle gegevens uitsluitend op je apparaat en worden ze niet naar ons verzonden. In de Android-app is de automatische back-up via Google (Android-back-up) uitgeschakeld; je lokale app-gegevens komen dus niet in je Google Drive-back-up terecht.',
      },
      {
        heading: '6. Bewaartermijn',
        body: 'We bewaren je gegevens zolang je account bestaat. Verwijder je je account, dan worden al je gegevens direct uit onze database verwijderd. Ter bescherming tegen gegevensverlies maken we dagelijks een back-up van de database, die na 14 dagen automatisch wordt verwijderd — tot dan kan een verwijderd account nog in een back-up staan; deze kopieën dienen uitsluitend voor herstel na een storing.\n\nHet verloop van je gesprekken met de AI-coach staat alleen op je apparaat (de laatste 60 berichten); op onze servers tellen we alleen hoeveel vragen je per dag hebt gesteld.',
      },
      {
        heading: '7. Account en gegevens verwijderen',
        body: 'Je kunt je account met alle gegevens op elk moment zelf in de app verwijderen: Profiel → Account verwijderen. Daarnaast kun je de verwijdering vormvrij per e-mail aan het hierboven genoemde adres vragen.',
      },
      {
        heading: '8. Je rechten',
        body: 'Je hebt het recht op inzage, rectificatie, wissing, beperking van de verwerking, overdraagbaarheid van gegevens en bezwaar, en het recht om een gegeven toestemming op elk moment in te trekken — de toestemming voor gezondheidsgegevens in het profiel onder „Toestemming voor gezondheidsgegevens intrekken”, de advertentietoestemming onder „Advertentietoestemming wijzigen”. Je kunt bovendien een klacht indienen bij de Oostenrijkse gegevensbeschermingsautoriteit (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Gebruiksvoorwaarden',
    updated: 'Bijgewerkt: 4 oktober 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Toepassingsgebied',
        body: `Deze gebruiksvoorwaarden gelden voor het gebruik van de app „FullRep” voor iOS en Android en van de webversie (fullrep.pages.dev), aangeboden door:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Beschrijving van de dienst',
        body: 'FullRep is een app om training en voeding bij te houden, met aanvullende kennisinhoud. De basisfuncties zijn gratis; de gratis versie van de apps voor iOS en Android wordt gefinancierd met advertenties. Extra functies — momenteel vooral de AI-coach — en gebruik zonder advertenties zijn beschikbaar met FullRep Premium (punt 3). Er bestaat geen recht op permanente beschikbaarheid; functies kunnen veranderen of worden stopgezet. Tijdens een reeds betaalde abonnementsperiode beperken we de Premium-functies niet wezenlijk zonder objectieve reden.',
      },
      {
        heading: '3. FullRep Premium (abonnement)',
        body: 'FullRep Premium wordt aangeboden als automatisch verlengend abonnement per maand of per jaar. Het kan alleen worden gekocht via de App Store van Apple of via Google Play; betaling en facturering verlopen via de betreffende store, waarvan de voorwaarden aanvullend gelden.\n\nDe actuele prijs wordt je vóór de aankoop in het venster van de store getoond. De betaling wordt bij het bevestigen van de aankoop van je Apple- of Google-account afgeschreven. Het abonnement wordt automatisch met de gekozen periode verlengd, tenzij je het uiterlijk 24 uur vóór het einde van de lopende periode opzegt.\n\nJe kunt het abonnement op elk moment beheren en opzeggen in de abonnementsinstellingen van je Apple- of Google-account. Het verwijderen van de app of van je FullRep-account beëindigt het abonnement niet. Na het opzeggen blijft Premium actief tot het einde van de reeds betaalde periode.\n\nMet Premium verdwijnen de advertenties in de app en worden Premium-functies zoals de AI-coach (binnen een dagelijks tegoed) vrijgegeven.',
      },
      {
        heading: '4. Gratis proefperiode',
        body: 'Nieuwe gebruikers kunnen Premium eenmalig 7 dagen gratis uitproberen. De proefperiode wordt in de app gestart en is gekoppeld aan je FullRep-account. Ze eindigt vanzelf en wordt geen betaald abonnement: je hoeft niets op te zeggen. Een abonnement ontstaat alleen als je het uitdrukkelijk in de store afsluit.',
      },
      {
        heading: '5. Herroeping en terugbetaling',
        body: 'Aankopen worden door Apple of Google afgehandeld; wij ontvangen geen betaalgegevens en kunnen aankopen daarom niet terugbetalen. Terugbetalingen en het uitoefenen van een wettelijk herroepingsrecht verlopen volgens de voorwaarden en procedures van de betreffende store (Apple: reportaproblem.apple.com; Google Play: bestelgeschiedenis van je Google-account). Dwingende consumentenrechten blijven onverlet.',
      },
      {
        heading: '6. Account en verplichtingen',
        body: 'Om je gegevens blijvend te bewaren is een account nodig. Je verplicht je om je inloggegevens geheim te houden en geen inhoud te plaatsen die inbreuk maakt op rechten van derden. Gegevens die je aan de community bijdraagt (bijv. voedingswaarden van producten via de barcode), stel je beschikbaar aan alle gebruikers. Om een account aan te maken moet je minstens 16 jaar oud zijn.',
      },
      {
        heading: '7. Gezondheidsinformatie — geen medisch advies',
        body: 'Alle inhoud van de app — in het bijzonder trainingsschema’s, informatie over voeding en diëten, calorieberekeningen en de kennisbibliotheek (inclusief informatie over supplementen en peptiden) — dient uitsluitend als algemene informatie en is geen medisch, therapeutisch of voedingskundig advies. Ze vervangt in geen geval onderzoek, diagnose of behandeling door een arts. Raadpleeg een arts voordat je met een trainings- of voedingsprogramma begint en voordat je supplementen gaat gebruiken, vooral bij bestaande aandoeningen, zwangerschap of medicijngebruik. De AI-ondersteunde fotoanalyse van maaltijden geeft schattingen waarvan de juistheid niet gegarandeerd is. Meer details in de gezondheidsinformatie in de app (Profiel → Gezondheidsinformatie).',
      },
      {
        heading: '8. Aansprakelijkheid',
        body: 'We zijn onbeperkt aansprakelijk bij opzet en grove nalatigheid en voor schade door letsel aan leven, lichaam of gezondheid. Voor het overige is aansprakelijkheid voor lichte nalatigheid uitgesloten. Het opvolgen van de trainings- en voedingsadviezen gebeurt op eigen verantwoordelijkheid.',
      },
      {
        heading: '9. Wijzigingen',
        body: 'We kunnen deze gebruiksvoorwaarden met werking voor de toekomst wijzigen. Over wezenlijke wijzigingen informeren we je in de app.',
      },
      {
        heading: '10. Toepasselijk recht',
        body: 'Het Oostenrijkse recht is van toepassing, met uitsluiting van de verwijzingsregels. Dwingende consumentenbeschermingsbepalingen van het land waar je woont blijven onverlet.',
      },
    ],
  },

  health: {
    title: 'Gezondheidsinformatie',
    updated: 'Bijgewerkt: 17 september 2026',
    sections: [
      VORRANG,
      {
        heading: 'FullRep vervangt geen medisch advies',
        body: 'Ga bij gezondheidsvragen, voor een diagnose of een behandeling altijd naar een arts. FullRep is een app om training en voeding bij te houden: het is geen medisch hulpmiddel en vervangt geen medisch onderzoek, diagnose of behandeling.',
      },
      {
        heading: 'Wanneer je medisch advies moet vragen',
        body: 'Voordat je met een trainings- of voedingsprogramma begint, voor een dieet en voordat je voedingssupplementen gaat gebruiken — vooral bij bestaande aandoeningen, klachten, zwangerschap, borstvoeding of als je medicijnen gebruikt.\n\nStop met trainen en vraag medisch advies bij klachten zoals pijn op de borst, kortademigheid, duizeligheid of flauwvallen.',
      },
      {
        heading: 'Wat de inhoud van de app is — en wat niet',
        body: 'Trainingsschema’s, informatie over voeding en diëten, berekeningen van calorieën en macro’s en de kennisbibliotheek (inclusief supplementen, bloedwaarden en peptiden) dienen uitsluitend als algemene informatie. Ze zijn algemeen en houden geen rekening met je persoonlijke situatie.\n\nDe informatie over bloedwaarden deelt waarden alleen grofweg in en is geen diagnose. Alleen een arts kan je waarden beoordelen.\n\nOver peptiden: in veel landen zijn deze stoffen alleen op recept verkrijgbaar of niet toegelaten. De inhoud bevat bewust geen doseringen.',
      },
      {
        heading: 'Schattingen, geen metingen',
        body: 'De energieverbruikcalculator (Mifflin-St Jeor) en de AI-ondersteunde fotoanalyse van maaltijden geven schattingen. Hun juistheid is niet gegarandeerd; ze vervangen geen meting en geen advies van een voedingsdeskundige.',
      },
      {
        heading: 'De AI-coach is geen arts',
        body: 'De AI-coach beantwoordt algemene vragen over training, voeding en supplementen. Hij stelt geen diagnoses, raadt geen therapieën aan en noemt geen doseringen. Zijn antwoorden kunnen fouten bevatten. Ga voor medisch advies, een diagnose of een behandeling naar een arts.',
      },
      {
        heading: 'In een noodgeval',
        body: 'Bel bij een medisch noodgeval de hulpdiensten (112 in de Europese Unie). Gebruik FullRep niet om in een noodsituatie hulp te zoeken of om medische hulp uit te stellen.',
      },
    ],
  },
};
