import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PopularRecipeListItemProps {
  recipe: Recipe;
  rank: number;
}

export const PopularRecipeListItem = ({
  recipe,
  rank,
}: PopularRecipeListItemProps) => {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="flex items-center gap-6 p-4 rounded-3xl bg-stone-800/30 hover:bg-stone-800/60 transition-all group cursor-pointer border border-stone-700/30"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden">
        <Image
          src={recipe.image}
          fill
          className="w-full h-full object-cover"
          alt={recipe.title}
        />
        <div className="absolute top-2 left-2 w-7 h-7 bg-white/90 backdrop-blur-md text-stone-900 rounded-full flex items-center justify-center text-xs font-bold">
          #{rank}
        </div>
      </div>
      <div className="grow">
        <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-1 block">
          {recipe.category}
        </span>
        <h4 className="text-xl font-serif font-semibold group-hover:text-amber-400 transition-colors line-clamp-1">
          {recipe.title}
        </h4>
        <p className="text-stone-500 font-light mb-6 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>
      </div>
    </Link>
  );
};
