import KnowledgePage from './KnowledgePage';
import { supplementsTopics, supplementsCategories } from '../../data/supplementsKnowledge';

export default function SupplementsKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={supplementsTopics}
      titleDE="Supplemente-Wissen"
      titleEN="Supplements Knowledge"
      titleES="Conocimiento sobre suplementos"
      bereich="supplements"
      categories={supplementsCategories}
      disclaimer="medical"
    />
  );
}
