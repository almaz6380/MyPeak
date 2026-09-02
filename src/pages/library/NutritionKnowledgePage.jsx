import KnowledgePage from './KnowledgePage';
import { nutritionTopics, nutritionCategories } from '../../data/nutritionKnowledge';

export default function NutritionKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={nutritionTopics}
      titelSchluessel="library.nutritionKnowledge"
      bereich="nutrition"
      categories={nutritionCategories}
      disclaimer="general"
    />
  );
}
