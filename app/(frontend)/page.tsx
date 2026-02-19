export const dynamic = "force-dynamic";

import About from "@/components/about-chef";
import Categories from "@/components/categories";
import Collections from "@/components/collection";
import Hero from "@/components/hero";
import { PopularRecipes } from "@/components/recipe/popular-recipes";
import RecipeGrid from "@/components/recipe/recipes-grid";
import {
  getCategories,
  getCollectionRecipes,
  getFeaturedRecipes,
  getHomepageContent,
  getLatestRecipes,
  getPopularRecipes,
} from "@/lib/fetch-datas";

export default async function Home() {
  // Fetch all in promise
  const [homeContent, categories, featuredRecipes, collectionRecipes] =
    await Promise.all([
      getHomepageContent(),
      getCategories(),
      getFeaturedRecipes(),
      getCollectionRecipes(3),
    ]);

  // Fetch recipes based on configuration
  const [latestRecipes, popularRecipes] = await Promise.all([
    homeContent.latestRecipesEnabled
      ? getLatestRecipes(homeContent.latestRecipesLimit)
      : [],
    homeContent.popularRecipesEnabled
      ? getPopularRecipes(homeContent.popularRecipesLimit)
      : [],
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {homeContent.heroEnabled && (
        <Hero
          title={homeContent.heroTitle}
          subtitle={homeContent.heroSubtitle}
          image={homeContent.heroImage}
          buttonText={homeContent.heroButtonText}
          buttonLink={homeContent.heroButtonLink}
        />
      )}

      {homeContent.categoriesEnabled && <Categories categories={categories} />}

      {homeContent.latestRecipesEnabled && latestRecipes.length > 0 && (
        <RecipeGrid
          recipes={latestRecipes}
          title={homeContent.latestRecipesTitle}
        />
      )}

      {homeContent.collectionsEnabled && collectionRecipes.length > 0 && (
        <Collections
          recipes={collectionRecipes}
          title={homeContent.collectionsTitle}
        />
      )}

      {homeContent.popularRecipesEnabled && popularRecipes.length > 0 && (
        <RecipeGrid
          recipes={popularRecipes}
          title={homeContent.popularRecipesTitle}
        />
      )}

      {homeContent.featuredRecipesEnabled && featuredRecipes.length > 0 && (
        <PopularRecipes
          popularRecipes={featuredRecipes}
          title={homeContent.featuredRecipesTitle}
        />
      )}

      {homeContent.aboutEnabled && (
        <About
          title={homeContent.aboutTitle}
          text={homeContent.aboutText}
          image={homeContent.aboutImage}
          buttonText={homeContent.aboutButtonText}
          buttonLink={homeContent.aboutButtonLink}
        />
      )}
    </div>
  );
}
