import NutritionPets from '../components/NutritionPets/NutritionPets';

import { NutritionProvider } from '../context/NutritionContext';

export default function Nutrition() {
  return (
    <NutritionProvider>
      <NutritionPets />
    </NutritionProvider>
  );
}
