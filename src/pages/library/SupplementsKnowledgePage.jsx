import KnowledgePage from './KnowledgePage';
import { supplementsTopics, supplementsCategories } from '../../data/supplementsKnowledge';

export default function SupplementsKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={supplementsTopics}
      titelSchluessel="library.supplementsKnowledge"
      bereich="supplements"
      categories={supplementsCategories}
      disclaimer="medical"
    />
  );
}
