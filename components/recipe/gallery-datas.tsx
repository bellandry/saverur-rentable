"use client";

import { cn } from "@/lib/utils";
import { Recipe } from "@/types";
import { ArrowLeft, Bookmark, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface GalleryDatasProps {
  recipe: Recipe;
  hasPurchased: boolean;
}

export const GalleryDatas = ({ recipe, hasPurchased }: GalleryDatasProps) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipe.slug}/favorite`);
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [recipe.slug]);

  const toggleFavorite = async () => {
    setLoadingFavorite(true);
    try {
      const response = await fetch(`/api/recipes/${recipe.slug}/favorite`, {
        method: "POST",
      });

      if (response.status === 401) {
        toast.error("Veuillez vous connecter pour enregistrer des recettes");
        return;
      }

      if (!response.ok) throw new Error();

      const data = await response.json();
      setIsFavorited(data.favorited);
      toast.success(
        data.favorited
          ? "Recette ajoutée aux favoris"
          : "Recette retirée des favoris",
      );
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setLoadingFavorite(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: recipe.description,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Lien copié dans le presse-papiers");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
  return (
    <>
      {/* Back Navigation */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
        <button
          onClick={() => router.back()}
          className="bg-black/10 backdrop-blur-md text-white border border-white/20 px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-black/20 transition-all group"
        >
          <ArrowLeft />
          Retour
        </button>

        <div className="flex gap-3">
          <button
            onClick={toggleFavorite}
            disabled={loadingFavorite}
            className={cn(
              "flex-1 lg:flex-none flex items-center justify-center gap-2 p-3 rounded-full font-bold text-sm transition-all shadow-sm border",
              isFavorited
                ? "bg-terracotta text-white border-terracotta"
                : "bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-full hover:bg-white/20 transition-all",
            )}
          >
            <Bookmark />
          </button>
          <button
            onClick={handleShare}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-full hover:bg-white/20 transition-all"
          >
            <Share />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-6 right-6 md:left-16 md:right-16 z-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-amber-500 text-stone-900 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-500/20">
            {recipe.category.name}
          </span>
          {recipe.isPremium && (
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30 flex items-center gap-1.5">
              <svg
                className="w-3 h-3 text-amber-400"
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
          {recipe.isPremium && !hasPurchased && recipe.price && (
            <span className="bg-terracotta text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-terracotta/20">
              {recipe.price.toFixed(2)} €
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-medium font-serif text-white serif mb-6 max-w-4xl leading-tight line-clamp-2">
          {recipe.title}
        </h1>
        <p className="text-stone-300 md:text-lg line-clamp-2 font-light max-w-2xl leading-relaxed">
          {recipe.description}
        </p>
      </div>
    </>
  );
};
