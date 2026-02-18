"use server";

import { Recipe } from "@/types";
import { Recipe as PrismaRecipe, Purchase } from "@prisma/client";
import prisma from "./prisma";

export async function getHomepageContent() {
  // Fetch homepage configuration
  let homeContent = await prisma.homePageContent.findFirst();

  // Create default if not exists
  if (!homeContent) {
    homeContent = await prisma.homePageContent.create({
      data: {
        heroEnabled: true,
        heroTitle: "Saveurs Authentiques",
        heroSubtitle:
          "Découvrez des recettes savoureuses et accessibles pour toute la famille",
        heroImage:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1920",
        heroButtonText: "Voir les recettes",
        heroButtonLink: "/recipes",
        categoriesEnabled: true,
        categoriesTitle: "Catégories",
        latestRecipesEnabled: true,
        latestRecipesTitle: "Dernières Recettes",
        latestRecipesLimit: 6,
        collectionsEnabled: true,
        collectionsTitle: "Nos Collections",
        popularRecipesEnabled: true,
        popularRecipesTitle: "Recettes Populaires",
        popularRecipesLimit: 6,
        featuredRecipesEnabled: true,
        featuredRecipesTitle: "Recettes en Vedette",
        aboutEnabled: true,
        aboutTitle: "À Propos de Notre Cuisine",
        aboutText:
          "Nous croyons au pouvoir de la cuisine maison pour rassembler les gens.",
        aboutImage:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920",
        aboutButtonText: "En savoir plus",
        aboutButtonLink: "/about",
        newsletterEnabled: true,
        newsletterTitle: "Restez informé",
        newsletterSubtitle:
          "Inscrivez-vous pour recevoir nos dernières recettes",
      },
    });
  }

  return homeContent;
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    where: {
      available: true,
    },
    include: {
      recipes: true,
    },
  });
  return categories;
}

// Helper function to transform Prisma recipe to Recipe type
export async function transformRecipe(
  prismaRecipe: PrismaRecipe,
): Promise<Recipe> {
  const category = await prisma.category.findUnique({
    where: { id: prismaRecipe.categoryId },
  });
  return {
    ...prismaRecipe,
    category: category!,
    additionalImages: prismaRecipe.additionalImages
      ? JSON.parse(prismaRecipe.additionalImages)
      : [],
    ingredients: prismaRecipe.ingredients
      ? JSON.parse(prismaRecipe.ingredients)
      : [],
    instructions: prismaRecipe.instructions
      ? JSON.parse(prismaRecipe.instructions)
      : [],
    price: prismaRecipe.price,
  };
}

export async function getLatestRecipes(limit: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return Promise.all(recipes.map(transformRecipe));
}

export async function getPopularRecipes(limit: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { isPopular: true },
    take: limit,
    include: { category: true },
  });
  return Promise.all(recipes.map(transformRecipe));
}

export async function getFeaturedRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { isFeatured: true },
    include: { category: true },
  });
  return Promise.all(recipes.map(transformRecipe));
}

export async function getCollectionRecipes(limit: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { isInCollection: true },
    take: limit,
    include: { category: true },
  });
  return Promise.all(recipes.map(transformRecipe));
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: { category: true },
  });
  return recipe ? transformRecipe(recipe) : null;
}

export async function getNewsletterData(): Promise<{
  newsletterTitle: string;
  newsletterSubtitle: string;
  isAvailable: boolean;
} | null> {
  const newsletter = await prisma.homePageContent.findFirst({
    select: {
      newsletterTitle: true,
      newsletterSubtitle: true,
      newsletterEnabled: true,
    },
  });
  return newsletter
    ? {
        newsletterTitle: newsletter.newsletterTitle,
        newsletterSubtitle: newsletter.newsletterSubtitle,
        isAvailable: newsletter.newsletterEnabled,
      }
    : null;
}

export async function getPurchasedRecipes(userId: string): Promise<Recipe[]> {
  const purchases = await prisma.purchase.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          category: true,
        },
      },
    },
  });

  return Promise.all(purchases.map((p: any) => transformRecipe(p.recipe)));
}

export type PurchaseWithDetails = Purchase & {
  user: {
    name: string | null;
    email: string;
  };
  recipe: {
    title: string;
    slug: string;
  };
};

export async function getAllPurchases(): Promise<PurchaseWithDetails[]> {
  const purchases = await prisma.purchase.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      recipe: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return purchases as PurchaseWithDetails[];
}
