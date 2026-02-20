import { auth } from "@/lib/auth";
import { getRecipeBySlug } from "@/lib/fetch-datas";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { RecipeDetail } from "./page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ recipeSlug: string }>;
}): Promise<Metadata> {
  const { recipeSlug } = await params;
  const recipe = await getRecipeBySlug(recipeSlug);

  if (!recipe) {
    return {
      title: "Recette non trouvée",
    };
  }

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
    },
  };
}

const RecipeDetailPage = async ({
  params,
}: {
  params: Promise<{ recipeSlug: string }>;
}) => {
  const { recipeSlug } = await params;
  const recipe = await getRecipeBySlug(recipeSlug);

  if (!recipe) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let hasPurchased = false;
  if (session?.user && recipe) {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id,
        recipeId: recipe.id,
      },
    });
    hasPurchased = !!purchase;
  }

  // JSON-LD structured data for recipes
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [recipe.image, ...(recipe.additionalImages || [])],
    author: {
      "@type": "Person",
      name: "Chef Saveur Rentable",
    },
    datePublished: recipe.createdAt.toISOString(),
    prepTime: "PT" + (recipe.prepTime || "30M"), // Basic formatting, ideally would be more precise
    cookTime: "PT" + (recipe.cookTime || "30M"),
    recipeYield: recipe.servings || "4",
    recipeCategory: recipe.category.name,
    recipeCuisine: "French",
    keywords: recipe.slug.split("-").join(", "),
    recipeIngredient: [], // Ingredients are not currently in the Recipe model directly or need transformation
    recipeInstructions: [], // Same for instructions
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipeDetail
        recipe={recipe}
        hasPurchased={hasPurchased}
        user={session?.user}
      />
    </>
  );
};

export default RecipeDetailPage;
