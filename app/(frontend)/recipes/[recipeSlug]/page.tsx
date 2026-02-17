import { getRecipeBySlug } from "@/lib/fetch-datas";
import { notFound } from "next/navigation";
import { RecipeDetail } from "./page-client";

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

  return <RecipeDetail recipe={recipe} />;
};

export default RecipeDetailPage;
