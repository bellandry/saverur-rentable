"use client";

import RecipeCard from "@/components/recipe/recipe-card";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import { Category } from "@prisma/client";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 8;

interface RecipesClientProps {
  recipes: Recipe[];
  categories: Category[];
}

const RecipesClient = ({ recipes, categories }: RecipesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useQueryState("category");
  const [selectedDifficulty, setSelectedDifficulty] =
    useQueryState("difficulty");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || recipe.category.slug === selectedCategory;
      const matchesDifficulty =
        !selectedDifficulty || recipe.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, recipes]);

  const displayedRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-serif text-darkBrown mb-4 tracking-tight">
            La Collection Saveurs & Rentables
          </h1>
          <p className="text-darkBrown/60 max-w-2xl mx-auto font-light leading-relaxed">
            Explorez notre sélection rigoureuse de recettes authentiques. Des
            repas rapides en semaine aux projets artisanaux détaillés, il y a
            une place à table pour chacun.
          </p>
        </header>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white border border-stone-200 p-4 rounded-[32px] shadow-sm mb-12">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            <Button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === null
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Toutes
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {`${cat.icon} ${cat.name}`}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-10 flex justify-between items-center text-xs uppercase tracking-[0.2em] font-bold text-darkBrown/40">
          <span>{filteredRecipes.length} Recettes Trouvées</span>
          <div className="flex items-center space-x-6">
            <span className="hidden md:inline">Trier par :</span>
            <div className="flex items-center space-x-2">
              <Button
                variant={"link"}
                onClick={() =>
                  setSelectedDifficulty(
                    selectedDifficulty === "Easy" ? null : "Easy",
                  )
                }
                className={`px-3 py-1 rounded transition-colors ${selectedDifficulty === "Easy" ? "bg-sage text-white" : "hover:text-sage"}`}
              >
                Facile
              </Button>
              <Button
                variant={"link"}
                onClick={() =>
                  setSelectedDifficulty(
                    selectedDifficulty === "Intermediate"
                      ? null
                      : "Intermediate",
                  )
                }
                className={`px-3 py-1 rounded transition-colors ${selectedDifficulty === "Intermediate" ? "bg-sage text-white" : "hover:text-sage"}`}
              >
                Intermédiaire
              </Button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {displayedRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {displayedRecipes.map((recipe) => (
                <div key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-24 text-center">
                <Button
                  onClick={handleLoadMore}
                  className="px-12 py-4 border border-darkBrown/20 text-darkBrown text-sm font-semibold uppercase tracking-[0.2em] hover:bg-darkBrown hover:text-white transition-all duration-300 rounded-sm"
                >
                  Charger plus de recettes
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="py-32 text-center bg-white/30 rounded-2xl border border-dashed border-beige">
            <p className="font-serif italic text-2xl text-darkBrown/40 mb-4">
              Aucune recette trouvée pour votre recherche.
            </p>
            <Button
              variant={"ghost"}
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedDifficulty(null);
              }}
              className="text-terracotta font-bold uppercase tracking-widest text-xs border-b border-terracotta/20 hover:border-terracotta transition-all"
            >
              Effacer tous les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesClient;
