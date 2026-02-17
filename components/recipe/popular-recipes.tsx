import { Recipe } from "@/types";
import { PopularRecipeFeaturedCard } from "./popular-recipe-featured-card";
import { PopularRecipeListItem } from "./popular-recipe-list-item";

export type PopularRecipesProps = {
  popularRecipes: Recipe[];
  title?: string;
};

export const PopularRecipes = ({
  popularRecipes,
  title = "Community Favorites",
}: PopularRecipesProps) => {
  return (
    <section className="bg-stone-900 container mx-auto text-white rounded-4xl px-6 py-16 md:py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-500 font-bold tracking-widest uppercase text-xs">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl font-serif md:text-4xl font-bold serif">
              {title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <PopularRecipeFeaturedCard recipe={popularRecipes[0]} />

          <div className="lg:col-span-5 flex flex-col gap-6">
            {popularRecipes.slice(1).map((recipe, idx) => (
              <PopularRecipeListItem
                key={recipe.id}
                recipe={recipe}
                rank={idx + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
