import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";

export type RecipeCollectionCardProps = {
  recipe: Recipe;
};

export const RecipeCollectionCard = ({ recipe }: RecipeCollectionCardProps) => {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      key={recipe.id}
      className="group relative rounded-sm overflow-hidden h-[450px] block"
    >
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-t from-darkBrown via-darkBrown/20 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 space-y-4">
        {recipe.isPremium && (
          <div className="inline-flex items-center bg-terracotta/20 border border-terracotta/40 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
            <span className="text-[10px] uppercase tracking-widest text-white flex items-center">
              <svg
                className="w-3 h-3 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              Premium Access
            </span>
          </div>
        )}
        <h3 className="text-2xl font-serif">{recipe.title}</h3>
        <p className="text-sm text-cream/70 font-light leading-relaxed line-clamp-2">
          {recipe.description}
        </p>
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta group-hover:text-white transition-colors flex items-center">
          Explore Recipe
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </div>
      </div>
    </Link>
  );
};
