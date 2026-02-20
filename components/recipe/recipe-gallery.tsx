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
      <div className="flex flex-1 flex-col gap-6">
        <div className="relative flex-1 w-full aspect-square md:aspect-video overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl order-1 lg:order-2 bg-stone-100">
          <Image
            src={mainImage}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover transform scale-105 rounded-[32px] md:rounded-[40px]"
            priority
          />
          <GalleryDatas recipe={recipe} hasPurchased={hasPurchased} />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20" />
        </div>
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
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20" />

          <GalleryDatas recipe={recipe} hasPurchased={hasPurchased} />
        </div>
      </div>
    </div>
  );
};
