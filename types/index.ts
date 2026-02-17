import { Category } from "@prisma/client";

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isPopular: boolean;
  isFeatured: boolean;
  isInCollection: boolean;
  additionalImages?: string[];
  prepTime: string;
  cookTime?: string;
  difficulty: string | "Advanced";
  isPremium: boolean;
  category: Category;
  servings: number | null;
  ingredients?: string[];
  instructions?: string[];
  tips?: string;
  nutritionInfo?: string;
}
