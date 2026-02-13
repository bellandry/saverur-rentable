import Categories from "@/components/categories";
import Collections from "@/components/collection";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import RecipeGrid from "@/components/recipe/recipes-grid";
import { FEATURED_RECIPES, POPULAR_RECIPES } from "@/constant";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <Hero />
      <Categories />
      <RecipeGrid recipes={FEATURED_RECIPES} title="Latest Recipes" />
      <Collections />
      <RecipeGrid recipes={POPULAR_RECIPES} title="Most Popular Recipes" />
    </div>
  );
}
