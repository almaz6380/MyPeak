import KnowledgePage from './KnowledgePage';
import { supplementsTopics, supplementsCategories } from '../../data/supplementsKnowledge';

export default function SupplementsKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={supplementsTopics}
      titleDE="Supplemente-Wissen"
      titleEN="Supplements Knowledge"
      categories={supplementsCategories}
      disclaimer="medical"
    />
  );
}
