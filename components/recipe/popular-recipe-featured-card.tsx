import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PopularRecipeFeaturedCardProps {
  recipe: Recipe;
}

export const PopularRecipeFeaturedCard = ({
  recipe,
}: PopularRecipeFeaturedCardProps) => {
  return (
    <div className="lg:col-span-7 group cursor-pointer relative">
      <Link href={`/recipes/${recipe.slug}`}>
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-4">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent"></div>
          <div className="absolute top-6 left-6 size-10 md:size-14 bg-amber-500 rounded-full flex items-center justify-center text-stone-900 font-bold text-xl md:text-2xl shadow-xl border-4 border-stone-900/20">
            #1
          </div>
          <div className="absolute p-6 bottom-0 left-0 right-0">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 block">
              {recipe.category.name}
            </span>
            <h3 className="text-2xl font-serif md:text-4xl font-semibold serif mb-2">
              {recipe.title}
            </h3>
            <p className="text-gray-200 font-light mb-6 line-clamp-2 leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
