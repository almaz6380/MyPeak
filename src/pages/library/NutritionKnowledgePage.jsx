import KnowledgePage from './KnowledgePage';
import { nutritionTopics, nutritionCategories } from '../../data/nutritionKnowledge';

export default function NutritionKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={nutritionTopics}
      titleDE="Ernährungs-Wissen"
      titleEN="Nutrition Knowledge"
      categories={nutritionCategories}
      disclaimer="general"
    />
  );
}
