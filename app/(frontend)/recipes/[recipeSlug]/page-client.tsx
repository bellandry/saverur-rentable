"use client";

import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import { User } from "better-auth";
import {
  ArrowLeft,
  Bookmark,
  ChevronRight,
  Clock,
  PanelBottomOpen,
  Printer,
  Share,
  Signal,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface RecipeDetailProps {
  recipe: Recipe;
  hasPurchased: boolean;
  user?: User;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  hasPurchased,
  user,
}) => {
  const router = useRouter();
  const [isBuying, setIsBuying] = React.useState(false);

  const handlePurchase = async () => {
    if (!user) {
      router.push(
        "/sign-in?redirect=" + encodeURIComponent(window.location.pathname),
      );
      return;
    }

    setIsBuying(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: recipe.id }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur lors de la redirection vers Stripe");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Une erreur est survenue");
    } finally {
      setIsBuying(false);
    }
  };

  const showContent = !recipe.isPremium || hasPurchased;

  return (
    <main className="max-w-6xl mx-auto px-6 py-32 min-h-screen font-sans">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-terracotta mb-6">
        <Link href="/recipes" className="hover:underline">
          Recipes
        </Link>
        <ChevronRight className="text-terracotta size-4" />
        <Link
          href={`/recipes/?category=${recipe.category}`}
          className="hover:underline"
        >
          {recipe.category.name}
        </Link>
        <ChevronRight className="text-terracotta size-4" />
        <span className="text-darkBrown font-medium">{recipe.title}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden rounded-[48px] mb-12">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/20 to-stone-900/10"></div>

        {/* Back Navigation */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
          <button
            onClick={() => router.back()}
            className="bg-black/10 backdrop-blur-md text-white border border-white/20 px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-black/20 transition-all group"
          >
            <ArrowLeft />
            Back
          </button>

          <div className="flex gap-3">
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-full hover:bg-white/20 transition-all">
              <Bookmark />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-full hover:bg-white/20 transition-all">
              <Share />
            </button>
          </div>
        </div>

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
          <p className="text-stone-300 md:text-lg font-light max-w-2xl leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </section>

      {/* Metadata and Actions Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-beige pb-6 mb-10 gap-6">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2">
            <Clock className="size-6 text-terracotta" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta">
                Prep Time
              </p>
              <p className="font-bold text-darkBrown">{recipe.prepTime}</p>
            </div>
          </div>
          <div className="w-px h-8 bg-beige"></div>
          <div className="flex items-center gap-2">
            <PanelBottomOpen className="size-6 text-terracotta" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta">
                Cook Time
              </p>
              <p className="font-bold text-darkBrown">30m</p>
            </div>
          </div>
          <div className="w-px h-8 bg-beige"></div>
          <div className="flex items-center gap-2">
            <Signal className="size-6 text-terracotta" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta">
                Difficulty
              </p>
              <p className="font-bold text-darkBrown">{recipe.difficulty}</p>
            </div>
          </div>
          {recipe.servings && (
            <>
              <div className="w-px h-8 bg-beige"></div>
              <div className="flex items-center gap-2">
                <Users className="size-6 text-terracotta" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-terracotta">
                    Servings
                  </p>
                  <p className="font-bold text-darkBrown">
                    {recipe.servings} People(s)
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => window.print()}
            className="flex items-center gap-2 border bg-transparent border-terracotta text-terracotta px-4 py-2 rounded-lg font-bold text-sm hover:bg-terracotta/5 transition-colors"
          >
            <Printer className="size-6 text-terracotta" />
            Print Recipe
          </Button>
          {recipe.isPremium && !hasPurchased && (
            <Button
              onClick={handlePurchase}
              disabled={isBuying}
              className="bg-terracotta text-white px-8 py-2 rounded-lg font-bold text-sm hover:bg-darkBrown transition-all shadow-lg shadow-terracotta/20"
            >
              {isBuying
                ? "Redirection..."
                : `Débloquer la recette (${recipe.price?.toFixed(2)} €)`}
            </Button>
          )}
        </div>
      </div>

      {/* Recipe Content Columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Ingredients */}
        <aside className="md:col-span-4 lg:col-span-3">
          <h3 className="text-2xl font-serif font-bold mb-6 border-b-2 border-terracotta w-fit pr-4 text-darkBrown">
            Ingredients
          </h3>
          <ul className="space-y-4">
            {showContent ? (
              recipe.ingredients?.map((ingredient, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <input
                    className="mt-1 h-5 w-5 rounded border-sage text-terracotta focus:ring-terracotta/20 cursor-pointer accent-terracotta"
                    type="checkbox"
                  />
                  <span className="text-base leading-snug text-darkBrown/80 group-hover:text-terracotta transition-colors">
                    {ingredient}
                  </span>
                </li>
              ))
            ) : (
              <div className="p-4 bg-beige/10 border border-dashed border-terracotta/30 rounded-lg">
                <p className="text-sm text-darkBrown/60 text-center italic">
                  Les ingrédients sont réservés aux membres premium.
                </p>
              </div>
            )}
          </ul>

          {/* Newsletter Card */}
          <div className="mt-12 p-6 bg-beige/20 rounded-xl border border-beige">
            <h4 className="font-serif font-bold text-lg mb-2 text-darkBrown">
              Love this recipe?
            </h4>
            <p className="text-sm text-darkBrown/60 mb-4">
              Get our weekly artisan cooking tips delivered to your inbox.
            </p>
            <input
              className="w-full text-sm rounded-lg border-beige bg-white focus:border-terracotta focus:ring-terracotta mb-3 px-3 py-2 outline-none"
              placeholder="Email address"
              type="email"
            />
            <button className="w-full bg-terracotta text-white py-2 rounded-lg font-bold text-sm hover:bg-darkBrown transition-colors uppercase tracking-widest">
              Join the Club
            </button>
          </div>
        </aside>

        {/* Right Column: Preparation */}
        <section className="md:col-span-8 lg:col-span-9">
          <h3 className="text-2xl font-serif font-bold mb-8 border-b-2 border-terracotta w-fit pr-4 text-darkBrown">
            Preparation
          </h3>
          <div className="space-y-12">
            {showContent ? (
              recipe.instructions?.map((instruction, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-terracotta text-white font-bold text-sm shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-xl font-serif font-bold uppercase tracking-wide text-terracotta/80">
                        {idx === 0
                          ? "Prep and Cook"
                          : idx === recipe.instructions!.length - 1
                            ? "Finish and Serve"
                            : `Step ${idx + 1}`}
                      </h4>
                    </div>
                    <p className="text-lg leading-relaxed text-darkBrown/90 font-light">
                      {instruction}
                    </p>
                  </div>
                  <div className="lg:w-1/3 shrink-0">
                    <div
                      className="aspect-video lg:aspect-square bg-cover bg-center rounded-lg shadow-md"
                      style={{
                        backgroundImage: `url('${(recipe.additionalImages && recipe.additionalImages[idx]) || recipe.image}')`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative group overflow-hidden rounded-2xl border border-beige bg-beige/5 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-terracotta"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-darkBrown mb-4">
                    Contenu Premium
                  </h4>
                  <p className="text-darkBrown/60 mb-8 leading-relaxed">
                    Achetez cette recette pour débloquer les instructions de
                    préparation détaillées et les conseils exclusifs du chef.
                  </p>
                  <Button
                    onClick={handlePurchase}
                    disabled={isBuying}
                    className="w-full bg-terracotta text-white py-4 rounded-xl font-bold hover:bg-darkBrown transition-all shadow-xl shadow-terracotta/20"
                  >
                    {isBuying
                      ? "Redirection..."
                      : `Acheter pour ${recipe.price?.toFixed(2)} €`}
                  </Button>
                </div>
              </div>
            )}

            {/* Premium Tip Box */}
            <div className="bg-sage/10 border-l-4 border-sage p-8 rounded-r-xl my-10 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sage">
                <span className="material-symbols-outlined">lightbulb</span>
                <span className="font-bold uppercase tracking-widest text-sm">
                  Chef&apos;s Secret
                </span>
              </div>
              <p className="text-lg italic font-medium leading-relaxed text-darkBrown/80">
                &quot;For the best results with this{" "}
                {recipe.title.toLowerCase()}, ensure all your ingredients are at
                room temperature. The secret is in the layering of flavors—never
                rush the seasoning process.&quot;
              </p>
            </div>
          </div>

          {/* Recipe Footer */}
          <div className="mt-16 pt-8 border-t border-beige flex flex-wrap gap-4">
            <p className="text-sm font-bold text-terracotta uppercase tracking-wider">
              Tags:
            </p>
            <span className="px-3 py-1 bg-white border border-beige rounded-full text-sm text-darkBrown/60 hover:border-terracotta hover:text-terracotta transition-colors">
              {recipe.category.name}
            </span>
            <span className="px-3 py-1 bg-white border border-beige rounded-full text-sm text-darkBrown/60 hover:border-terracotta hover:text-terracotta transition-colors">
              Artisanal
            </span>
            <span className="px-3 py-1 bg-white border border-beige rounded-full text-sm text-darkBrown/60 hover:border-terracotta hover:text-terracotta transition-colors">
              Homemade
            </span>
            <span className="px-3 py-1 bg-white border border-beige rounded-full text-sm text-darkBrown/60 hover:border-terracotta hover:text-terracotta transition-colors">
              Seasonal
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};
