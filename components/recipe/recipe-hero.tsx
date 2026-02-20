"use client";

import { RecipeGallery } from "@/components/recipe/recipe-gallery";
import { Recipe } from "@/types";
import { Clock, PanelBottomOpen, Signal, Users } from "lucide-react";
import React from "react";

interface RecipeHeroProps {
  recipe: Recipe;
  hasPurchased: boolean;
}

export const RecipeHero: React.FC<RecipeHeroProps> = ({
  recipe,
  hasPurchased,
}) => {
  return (
    <section className="flex flex-col gap-8 lg:gap-12 mb-16">
      <div className="w-full">
        <div className="relative min-h-[350px] lg:min-h-[500px]">
          <RecipeGallery
            mainImage={recipe.image}
            additionalImages={recipe.additionalImages}
            recipe={recipe}
            hasPurchased={hasPurchased}
          />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center">
        <div className="mt-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-beige/10 rounded-3xl border border-beige">
            <div className="flex items-center md:justify-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-beige/40">
                <Clock className="size-5 text-terracotta" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-tighter font-bold text-terracotta/60">
                  Prep Time
                </p>
                <p className="font-bold text-darkBrown text-sm">
                  {recipe.prepTime}
                </p>
              </div>
            </div>
            <div className="flex items-center md:justify-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-beige/40">
                <PanelBottomOpen className="size-5 text-terracotta" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-tighter font-bold text-terracotta/60">
                  Cook Time
                </p>
                <p className="font-bold text-darkBrown text-sm">
                  {recipe.cookTime || "30m"}
                </p>
              </div>
            </div>
            <div className="flex items-center md:justify-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-beige/40">
                <Signal className="size-5 text-terracotta" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-tighter font-bold text-terracotta/60">
                  Difficulty
                </p>
                <p className="font-bold text-darkBrown text-sm">
                  {recipe.difficulty}
                </p>
              </div>
            </div>
            <div className="flex items-center md:justify-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-beige/40">
                <Users className="size-5 text-terracotta" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-tighter font-bold text-terracotta/60">
                  Servings
                </p>
                <p className="font-bold text-darkBrown text-sm">
                  {recipe.servings ? `${recipe.servings} Pers.` : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
