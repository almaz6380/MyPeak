import KnowledgePage from './KnowledgePage';
import { bloodworkTopics, bloodworkCategories } from '../../data/bloodworkKnowledge';

export default function BloodworkKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={bloodworkTopics}
      titelSchluessel="library.bloodworkKnowledge"
      bereich="bloodwork"
      categories={bloodworkCategories}
      disclaimer="medical"
    />
  );
}
