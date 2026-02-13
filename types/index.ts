export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  additionalImages?: string[];
  prepTime: string;
  difficulty: "Easy" | "Intermediate" | "Advanced";
  isPremium: boolean;
  category: string;
  ingredients?: string[];
  instructions?: string[];
}

export interface CollectionRecipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isLocked: boolean;
}
