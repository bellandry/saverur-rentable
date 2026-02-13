import About from "@/components/about-chef";
import Categories from "@/components/categories";
import Collections from "@/components/collection";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Newsletter from "@/components/newsletter";
import { PopularRecipes } from "@/components/recipe/popular-recipes";
import RecipeGrid from "@/components/recipe/recipes-grid";
import { FEATURED_RECIPES, LATEST_RECIPES, POPULAR_RECIPES } from "@/constant";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <Hero />
      <Categories />
      <RecipeGrid recipes={LATEST_RECIPES} title="Latest Recipes" />
      <Collections />
      <RecipeGrid recipes={POPULAR_RECIPES} title="Most Popular Recipes" />
      <PopularRecipes popularRecipes={FEATURED_RECIPES} />
      <About />
      <Newsletter />
    </div>
  );
}
