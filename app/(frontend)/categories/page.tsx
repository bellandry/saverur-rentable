import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catégories de Recettes",
  description:
    "Explorez nos recettes par thématiques : entrées, plats, desserts et bien plus pour trouver l'inspiration.",
};

export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/fetch-datas";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="container mx-auto pt-32 pb-24 min-h-screen bg-cream">
      <section className="mb-24">
        <h1 className="text-4xl text-darkBrown font-serif md:text-5xl font-bold mb-6">
          Curated Categories
        </h1>
        <p className="text-stone-500 md:text-lg max-w-2xl font-light leading-relaxed mb-16">
          Each category is a curated volume of flavor, designed to guide you
          through specific culinary themes and dietary preferences.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/recipes/?category=${category.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-[40px] mb-3 shadow-xl shadow-stone-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors" />
              </div>
              <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-serif font-semibold text-darkBrown group-hover:text-amber-700 transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-stone-400 text-sm font-medium">
                    {/* TODO: Add count of recipes */}
                    {/* {category.recipes.length} Recipes */}
                  </span>
                </div>
                <p className="text-amber-950 font-light leading-relaxed mb-6 line-clamp-2">
                  {category.description}
                </p>
                <div className="text-stone-900 font-bold text-sm flex items-center gap-2 group/btn">
                  Explore Category
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seasonal Highlight */}
      <section className="bg-amber-50 rounded-[48px] p-12 md:p-24 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <span className="text-amber-700 font-bold tracking-widest uppercase text-xs mb-4 block">
            Seasonal Special
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 serif mb-6">
            Autumn Harvest Favorites
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed mb-8">
            As the leaves turn, we invite you to explore our warmest collection
            yet. Featuring earthy spices, roasted vegetables, and comfort that
            feeds the soul.
          </p>
          <Button
            asChild
            size={"lg"}
            className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-stone-800 transition-all shadow-xl active:scale-95"
          >
            <Link href="/recipes/?category=autumn">View Autumn Guide</Link>
          </Button>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl mb-8 shadow-xl shadow-stone-200">
            <Image
              fill
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop"
              className="shadow-lg"
              alt="Seasonal 1"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl mt-8 mb-8 shadow-xl shadow-stone-200">
            <Image
              fill
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop"
              className="shadow-lg"
              alt="Seasonal 2"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
