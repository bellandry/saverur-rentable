"use client";

import { cn } from "@/lib/utils";
import { Recipe } from "@/types";
import { BookOpen, ChevronRight, Clock, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecipeTabsProps {
  purchasedRecipes: Recipe[];
  favoriteRecipes: Recipe[];
}

export const RecipeTabs = ({
  purchasedRecipes,
  favoriteRecipes,
}: RecipeTabsProps) => {
  const [activeTab, setActiveTab] = useState<"purchased" | "favorites">(
    purchasedRecipes.length > 0 ? "purchased" : "favorites",
  );

  const recipes =
    activeTab === "purchased" ? purchasedRecipes : favoriteRecipes;

  return (
    <div className="space-y-12">
      {/* Tabs list */}
      <div className="flex items-center gap-4 border-b border-beige">
        <button
          onClick={() => setActiveTab("purchased")}
          className={cn(
            "pb-4 px-2 font-serif font-bold text-lg transition-all relative",
            activeTab === "purchased"
              ? "text-darkBrown"
              : "text-darkBrown/40 hover:text-darkBrown/60",
          )}
        >
          Mes Recettes Premium
          {activeTab === "purchased" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={cn(
            "pb-4 px-2 font-serif font-bold text-lg transition-all relative",
            activeTab === "favorites"
              ? "text-darkBrown"
              : "text-darkBrown/40 hover:text-darkBrown/60",
          )}
        >
          Mes Favoris
          {activeTab === "favorites" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta rounded-t-full" />
          )}
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="bg-beige/10 rounded-[32px] border border-beige p-12 text-center">
          {activeTab === "purchased" ? (
            <BookOpen size={48} className="text-terracotta/40 mx-auto mb-6" />
          ) : (
            <Heart size={48} className="text-terracotta/40 mx-auto mb-6" />
          )}
          <h2 className="text-2xl font-serif font-bold text-darkBrown mb-4">
            {activeTab === "purchased"
              ? "Aucune recette achetée pour le moment"
              : "Aucune recette en favoris"}
          </h2>
          <p className="text-darkBrown/60 mb-8 max-w-md mx-auto">
            {activeTab === "purchased"
              ? "Explorez notre catalogue de recettes premium pour débloquer des saveurs exclusives."
              : "Enregistrez vos recettes préférées pour les retrouver facilement ici."}
          </p>
          <Link
            href="/recipes"
            className="text-terracotta font-bold hover:underline"
          >
            Parcourir les recettes →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-beige hover:shadow-xl hover:shadow-terracotta/5 transition-all duration-500"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-darkBrown border border-white">
                    {recipe.category.name}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-bold text-darkBrown mb-3 group-hover:text-terracotta transition-colors leading-tight">
                  {recipe.title}
                </h3>
                <p className="text-darkBrown/60 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
                <div className="mt-auto pt-6 border-t border-beige/50 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-terracotta">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>{recipe.servings} PERS.</span>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
