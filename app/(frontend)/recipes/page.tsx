import { getCategories, getLatestRecipes } from "@/lib/fetch-datas";
import RecipesClient from "./page-client";

export default async function RecipesPage() {
  const [recipes, categories] = await Promise.all([
    getLatestRecipes(100),
    getCategories(),
  ]);
  return (
    <>
      <RecipesClient recipes={recipes} categories={categories} />
    </>
  );
}
