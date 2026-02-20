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
  price?: number | null;
  category: Category;
  servings: number | null;
  ingredients?: string[];
  instructions?: string[];
  tips?: string | null;
  nutritionInfo?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
