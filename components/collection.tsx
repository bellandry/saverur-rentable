import { Recipe } from "@/types";
import React from "react";
import { RecipeCollectionCard } from "./recipe/recipe-collection-card";

interface CollectionsProps {
  title?: string;
  recipes?: Recipe[];
}

const Collections: React.FC<CollectionsProps> = ({
  title = "Menus & Collections",
  recipes = [],
}) => {
  return (
    <section className="py-24 bg-darkBrown text-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-terracotta uppercase tracking-[0.3em] font-semibold text-xs mb-4 block">
            Curated Experience
          </span>
          <h2 className="text-4xl font-serif mb-4">{title}</h2>
          <p className="text-cream/60 max-w-lg mx-auto font-light">
            Expertly crafted weekly plans and themed collections to inspire your
            kitchen journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCollectionCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
