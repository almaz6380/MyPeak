import KnowledgePage from './KnowledgePage';
import { bloodworkTopics, bloodworkCategories } from '../../data/bloodworkKnowledge';

export default function BloodworkKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={bloodworkTopics}
      titleDE="Blutwerte-Wissen"
      titleEN="Blood Work Knowledge"
      titleES="Conocimiento sobre análisis de sangre"
      bereich="bloodwork"
      categories={bloodworkCategories}
      disclaimer="medical"
    />
  );
}
