export const dynamic = "force-dynamic";

import { getCategories, getLatestRecipes } from "@/lib/fetch-datas";
import { Suspense } from "react";
import RecipesClient from "./page-client";

export default async function RecipesPage() {
  const [recipes, categories] = await Promise.all([
    getLatestRecipes(100),
    getCategories(),
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipesClient recipes={recipes} categories={categories} />
    </Suspense>
  );
}
