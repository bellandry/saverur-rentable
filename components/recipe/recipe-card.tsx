"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Recipe } from "../../types";
import { Button } from "../ui/button";
import QuickViewModal from "./quickview-modal";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [quickViewRecipe, setQuickViewRecipe] = useState<Recipe | null>(null);
  const handleQuickView = () => {
    setQuickViewRecipe(recipe);
  };

  return (
    <>
      <div className={`group cursor-pointer`}>
        <div
          className={`relative overflow-hidden rounded-2xl aspect-square mb-4 md:mb-0`}
        >
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />

          {/* Hover Overlay with Quick View Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleQuickView();
              }}
              className="bg-white/90 backdrop-blur-md text-stone-900 px-6 py-2.5 rounded-full text-sm font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white active:scale-95"
            >
              Quick View
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
            {recipe.isPremium && (
              <span className="bg-amber-100/90 backdrop-blur-md text-amber-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Premium
              </span>
            )}
          </div>
        </div>

        <div className={"p-4"}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-700 text-xs font-semibold tracking-wider uppercase">
              {typeof recipe.category === "string"
                ? recipe.category
                : recipe.category.name}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 text-xs">{recipe.prepTime}</span>
          </div>

          <h3
            className={`text-xl mb-1 font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors`}
          >
            <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
          </h3>
        </div>
      </div>

      <QuickViewModal
        recipe={quickViewRecipe}
        onClose={() => setQuickViewRecipe(null)}
      />
    </>
  );
};

export default RecipeCard;
