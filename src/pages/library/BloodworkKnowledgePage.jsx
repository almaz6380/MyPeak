import KnowledgePage from './KnowledgePage';
import { bloodworkTopics, bloodworkCategories } from '../../data/bloodworkKnowledge';

export default function BloodworkKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={bloodworkTopics}
      titleDE="Blutwerte-Wissen"
      titleEN="Blood Work Knowledge"
      categories={bloodworkCategories}
      disclaimer="medical"
    />
  );
}
