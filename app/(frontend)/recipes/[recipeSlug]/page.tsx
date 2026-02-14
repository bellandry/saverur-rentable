import { ALL_RECIPES } from "@/constant";
import { notFound } from "next/navigation";
import { RecipeDetail } from "./page-client";

const RecipeDetailPage = async ({
  params,
}: {
  params: Promise<{ recipeSlug: string }>;
}) => {
  const { recipeSlug } = await params;
  const recipe = ALL_RECIPES.find((r) => r.slug === recipeSlug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
};

export default RecipeDetailPage;
