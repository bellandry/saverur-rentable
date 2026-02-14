export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isPopular: boolean;
  additionalImages?: string[];
  prepTime: string;
  difficulty: "Easy" | "Intermediate" | "Advanced";
  isPremium: boolean;
  category: string;
  servings?: number;
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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
}
