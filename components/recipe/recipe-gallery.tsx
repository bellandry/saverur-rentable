"use client";

import { cn } from "@/lib/utils";
import { Recipe } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { GalleryDatas } from "./gallery-datas";

interface RecipeGalleryProps {
  mainImage: string;
  additionalImages?: string[];
  recipe: Recipe;
  hasPurchased: boolean;
}

export const RecipeGallery = ({
  mainImage,
  additionalImages = [],
  recipe,
  hasPurchased,
}: RecipeGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const allImages = [mainImage, ...additionalImages].filter(Boolean);

  if (allImages.length <= 1) {
    return (
      <div className=" flex-1">
        <Image
          src={mainImage}
          alt={recipe.title}
          fill
          className="w-full relative h-full object-cover aspect-video transform scale-105 rounded-[32px] md:rounded-[40px]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20"></div>
        <GalleryDatas recipe={recipe} hasPurchased={hasPurchased} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row gap-6">
      {/* Thumbnails Container */}
      <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-y-auto h-full py-2 lg:max-h-[600px]">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={cn(
              "relative w-16 h-16 lg:w-20 lg:h-20 shrink-0 rounded-2xl overflow-hidden transition-all duration-300 border-2",
              selectedImage === img
                ? "border-terracotta scale-105 shadow-lg shadow-terracotta/10"
                : "border-transparent opacity-60 hover:opacity-100 hover:scale-105 bg-stone-100",
            )}
          >
            <Image
              src={img}
              alt={`${recipe.title} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Display Container */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="relative flex-1 w-full aspect-square md:aspect-video overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl order-1 lg:order-2 bg-stone-100">
          <Image
            src={selectedImage}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20"></div>
          {/* Hero Content */}
          <div className="absolute bottom-12 left-6 right-6 md:left-16 md:right-16 z-10">
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
            <h1 className="text-3xl md:text-5xl font-medium font-serif text-white serif mb-6 max-w-4xl leading-tight">
              {recipe.title}
            </h1>
            <p className="text-stone-300 md:text-lg line-clamp-2 font-light max-w-2xl leading-relaxed">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
