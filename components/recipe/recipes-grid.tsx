"use client";

import { FEATURED_RECIPES } from "@/constant";
import Link from "next/link";
import { Button } from "../ui/button";
import RecipeCard from "./recipe-card";

const RecipeGrid = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold font-serif text-darkBrown">
            Latest Recipes
          </h2>
          <Button
            asChild
            className="text-xs bg-transparent hover:bg-transparent font-bold text-terracotta uppercase tracking-widest hover:opacity-80 transition-all border-b border-terracotta/20 pb-0.5"
          >
            <Link href="/recipes">View All</Link>
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-6 -mx-6 px-6 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
          {FEATURED_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="min-w-[75vw] sm:min-w-[300px] md:min-w-0 snap-center bg-transparent rounded-2xl overflow-hidden transition-all duration-500 group cursor-pointer border border-beige/20 flex flex-col h-full"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeGrid;
