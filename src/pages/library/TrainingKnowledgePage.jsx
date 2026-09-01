import KnowledgePage from './KnowledgePage';
import { trainingTopics, trainingCategories } from '../../data/trainingKnowledge';

export default function TrainingKnowledgePage({ onBack }) {
  return (
    <KnowledgePage
      onBack={onBack}
      data={trainingTopics}
      titleDE="Training-Wissen"
      titleEN="Training Knowledge"
      titleES="Conocimiento sobre entrenamiento"
      bereich="training"
      categories={trainingCategories}
      disclaimer="general"
    />
  );
}
