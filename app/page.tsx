import Categories from "@/components/categories";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import RecipeGrid from "@/components/recipes-grid";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <Hero />
      <Categories />
      <RecipeGrid />
    </div>
  );
}
