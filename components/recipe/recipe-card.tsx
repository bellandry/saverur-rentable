"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Recipe } from "../../types";
import { Button } from "../ui/button";
import QuickViewModal from "./quickview-modal";

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
  onQuickView?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  featured,
  onQuickView,
}) => {
  const [quickViewRecipe, setQuickViewRecipe] = useState<Recipe | null>(null);
  const handleQuickView = () => {
    setQuickViewRecipe(recipe);
  };

  return (
    <>
      <div
        className={`group cursor-pointer ${featured ? "md:flex md:gap-8 items-center" : ""}`}
      >
        <div
          className={`relative overflow-hidden rounded-2xl ${featured ? "md:w-3/5 aspect-4/3" : "aspect-square"} mb-4 md:mb-0`}
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

        <div className={featured ? "md:w-2/5 py-4 px-2" : "p-4"}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-700 text-xs font-semibold tracking-wider uppercase">
              {recipe.category}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 text-xs">{recipe.prepTime}</span>
          </div>

          <h3
            className={`${featured ? "text-3xl md:text-4xl mb-4" : "text-xl mb-1"} font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors`}
          >
            {recipe.title}
          </h3>

          {featured && (
            <p className="text-stone-500 font-light mb-6 line-clamp-3 leading-relaxed">
              {recipe.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-stone-400 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>{recipe.difficulty}</span>
            </div>

            {featured && (
              <button
                onClick={() => onQuickView?.(recipe)}
                className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200"
              >
                Read Recipe
              </button>
            )}
          </div>
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
