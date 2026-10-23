import { AlertTriangle } from 'lucide-react';
import { beschriftung } from '../lib/sprache';

// Arzt-Hinweis fuer alle gesundheitsbezogenen Bereiche.
//
// Google Play hat am 30.07.2026 die Richtlinie zu gesundheitsbezogenen Inhalten
// durchgesetzt: die App erinnere Nutzer nicht daran, "einen Arzt aufzusuchen, wenn
// sie medizinischen Rat, eine Diagnose oder eine Behandlung benoetigen". Der Satz
// unten nennt deshalb alle drei Faelle ausdruecklich — Rat, Diagnose, Behandlung.
// Beim Kuerzen also aufpassen: das ist juristischer Text, keine UI-Kopie.
//
// Sprachwahl wie in References.jsx ueber ein `lang`-Prop statt ueber i18n-Keys —
// der Wortlaut soll sich nicht nebenbei mitaendern lassen.
//
//   type   'medical' (Standard) | 'general' — general fuer Trainings-/Ernaehrungswissen
//   extra  optionaler Zusatzabsatz, z. B. der Evidenz-Hinweis bei den Peptiden

const TEXTS = {
  medical: {
    de: 'FullRep ersetzt keine ärztliche Beratung. Wende dich bei gesundheitlichen Fragen, für eine Diagnose oder eine Behandlung immer an eine Ärztin oder einen Arzt.',
    en: 'FullRep does not replace medical advice. For any health concern, diagnosis or treatment, always consult a doctor.',
    es: 'FullRep no sustituye el consejo médico. Ante cualquier duda de salud, para un diagnóstico o un tratamiento, consulta siempre a un médico.',
    fr: 'FullRep ne remplace pas un avis médical. Pour toute question de santé, tout diagnostic ou tout traitement, consulte toujours un médecin.',
    pt: 'O FullRep não substitui orientação médica. Para qualquer dúvida de saúde, diagnóstico ou tratamento, procure sempre um médico.',
    ar: 'لا يغني FullRep عن الاستشارة الطبية. وعند أي سؤال صحي أو لتشخيص أو علاج، راجع الطبيب دائمًا.',
    nl: 'FullRep vervangt geen medisch advies. Neem bij gezondheidsvragen, voor een diagnose of een behandeling altijd contact op met een arts.',
    pl: 'FullRep nie zastępuje porady lekarskiej. W sprawach zdrowotnych, w celu diagnozy lub leczenia zawsze zwróć się do lekarki lub lekarza.',
    it: 'FullRep non sostituisce il parere medico. Per qualsiasi questione di salute, per una diagnosi o un trattamento rivolgiti sempre a un medico.',
    tr: 'FullRep tıbbi danışmanlığın yerini tutmaz. Sağlıkla ilgili her soru, teşhis veya tedavi için mutlaka bir doktora başvur.',
    ja: 'FullRepは医師の助言に代わるものではありません。健康上の疑問、診断や治療については、必ず医師にご相談ください。',
    ko: 'FullRep은 의학적 조언을 대신하지 않아요. 건강 문제, 진단 또는 치료가 필요하면 반드시 의사와 상담하세요.',
    zh: 'FullRep 不能替代医生的建议。如有任何健康问题、需要诊断或治疗，请务必咨询医生。',
  },
  general: {
    de: 'Diese Informationen dienen zu Bildungszwecken. Trainings- und Ernährungsempfehlungen sind allgemein gehalten und ersetzen keine individuelle oder ärztliche Beratung. Wende dich bei gesundheitlichen Fragen, für eine Diagnose oder eine Behandlung an eine Ärztin oder einen Arzt.',
    en: 'This information is for educational purposes. Training and nutrition recommendations are general and do not replace individual or medical advice. For any health concern, diagnosis or treatment, consult a doctor.',
    es: 'Esta información tiene fines educativos. Las recomendaciones de entrenamiento y nutrición son generales y no sustituyen el asesoramiento individual ni médico. Ante cualquier duda de salud, para un diagnóstico o un tratamiento, consulta a un médico.',
    fr: 'Ces informations ont une visée éducative. Les recommandations d’entraînement et de nutrition sont générales et ne remplacent ni un accompagnement individuel ni un avis médical. Pour toute question de santé, tout diagnostic ou tout traitement, consulte un médecin.',
    pt: 'Estas informações têm finalidade educativa. As recomendações de treino e de nutrição são gerais e não substituem orientação individual nem médica. Para qualquer dúvida de saúde, diagnóstico ou tratamento, procure um médico.',
    ar: 'هذه المعلومات لأغراض تعليمية. وتوصيات التدريب والتغذية عامة ولا تغني عن استشارة فردية أو طبية. وعند أي سؤال صحي أو لتشخيص أو علاج، راجع الطبيب.',
    nl: 'Deze informatie is bedoeld voor educatieve doeleinden. Trainings- en voedingsadviezen zijn algemeen en vervangen geen persoonlijk of medisch advies. Neem bij gezondheidsvragen, voor een diagnose of een behandeling contact op met een arts.',
    pl: 'Te informacje służą celom edukacyjnym. Zalecenia treningowe i żywieniowe mają charakter ogólny i nie zastępują indywidualnej ani lekarskiej porady. W sprawach zdrowotnych, w celu diagnozy lub leczenia zwróć się do lekarki lub lekarza.',
    it: 'Queste informazioni hanno scopo educativo. I consigli su allenamento e alimentazione sono generali e non sostituiscono una consulenza individuale o medica. Per qualsiasi questione di salute, per una diagnosi o un trattamento rivolgiti a un medico.',
    tr: 'Bu bilgiler eğitim amaçlıdır. Antrenman ve beslenme önerileri geneldir; kişisel veya tıbbi danışmanlığın yerini tutmaz. Sağlıkla ilgili her soru, teşhis veya tedavi için bir doktora başvur.',
    ja: 'この情報は教育を目的としたものです。トレーニングと食事のアドバイスは一般的な内容であり、個別の助言や医師の助言に代わるものではありません。健康上の疑問、診断や治療については、医師にご相談ください。',
    ko: '이 정보는 교육 목적으로 제공돼요. 운동 및 식단 권장 사항은 일반적인 내용이며 개인 맞춤 조언이나 의학적 조언을 대신하지 않아요. 건강 문제, 진단 또는 치료가 필요하면 의사와 상담하세요.',
    zh: '这些信息仅供学习参考。训练和饮食建议是一般性的，不能替代个人化建议或医生的建议。如有任何健康问题、需要诊断或治疗，请咨询医生。',
  },
};

// Nur der Wortlaut, ohne Kasten. Fuer Stellen, an denen die auffaellige Box die
// Oberflaeche stoeren wuerde — etwa die Fusszeile unter dem Coach-Eingabefeld.
// Der Satz bleibt damit trotzdem an einer einzigen Stelle gepflegt.
export function medicalDisclaimerText(lang, type = 'medical') {
  return beschriftung(TEXTS[type] || TEXTS.medical, lang);
}

export default function MedicalDisclaimer({ lang, type = 'medical', extra, className = '' }) {
  const text = medicalDisclaimerText(lang, type);

  return (
    <div className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed whitespace-pre-line">
        {extra ? `${text}\n\n${extra}` : text}
      </p>
    </div>
  );
}
