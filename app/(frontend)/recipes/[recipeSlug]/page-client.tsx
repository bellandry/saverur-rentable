"use client";

import { RecipeHero } from "@/components/recipe/recipe-hero";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import { User } from "better-auth";
import { ChevronRight } from "lucide-react";
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
        "/login?redirect=" + encodeURIComponent(window.location.pathname),
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
          Recettes
        </Link>
        <ChevronRight className="text-terracotta size-4" />
        <Link
          href={`/recipes/?category=${recipe.category.slug}`}
          className="hover:underline"
        >
          {recipe.category.name}
        </Link>
        <ChevronRight className="text-terracotta size-4" />
        <span className="text-darkBrown font-medium line-clamp-1">
          {recipe.title}
        </span>
      </nav>

      {/* Hero Section */}
      <RecipeHero recipe={recipe} hasPurchased={hasPurchased} />

      {/* Purchase Bar (Stays for action if needed) */}
      {!hasPurchased && recipe.isPremium && (
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-beige pb-10 mb-10 gap-6">
          <p className="text-darkBrown/60 italic">
            Débloquez la recette complète avec tous les ingrédients et étapes
            détaillées.
          </p>
          <Button
            onClick={handlePurchase}
            disabled={isBuying}
            className="bg-terracotta text-white px-8 py-4 rounded-xl font-bold hover:bg-darkBrown transition-all shadow-xl shadow-terracotta/20"
          >
            {isBuying
              ? "Redirection..."
              : `Débloquer la recette (${recipe.price?.toFixed(2)} $)`}
          </Button>
        </div>
      )}

      {/* Recipe Content Columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Ingredients */}
        <aside className="md:col-span-4 lg:col-span-3">
          <h3 className="text-2xl font-serif font-bold mb-6 border-b-2 border-terracotta w-fit pr-4 text-darkBrown">
            Ingrédients
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
              Vous aimez cette recette ?
            </h4>
            <p className="text-sm text-darkBrown/60 mb-4">
              Recevez nos conseils de cuisine artisanale chaque semaine dans
              votre boîte mail.
            </p>
            <input
              className="w-full text-sm rounded-lg border-beige bg-white focus:border-terracotta focus:ring-terracotta mb-3 px-3 py-2 outline-none"
              placeholder="Adresse e-mail"
              type="email"
            />
            <button className="w-full bg-terracotta text-white py-2 rounded-lg font-bold text-sm hover:bg-darkBrown transition-colors uppercase tracking-widest">
              Rejoindre le Club
            </button>
          </div>
        </aside>

        {/* Right Column: Preparation */}
        <section className="md:col-span-8 lg:col-span-9">
          <h3 className="text-2xl font-serif font-bold mb-8 border-b-2 border-terracotta w-fit pr-4 text-darkBrown">
            Préparation
          </h3>
          <div className="space-y-12">
            {showContent ? (
              recipe.instructions?.map((instruction, idx) => (
                <div key={idx} className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-terracotta text-white font-bold text-sm shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-xl font-serif font-bold uppercase tracking-wide text-terracotta/80">
                      {idx === 0
                        ? "Préparation et Cuisson"
                        : idx === recipe.instructions!.length - 1
                          ? "Finition et Service"
                          : `Étape ${idx + 1}`}
                    </h4>
                  </div>
                  <div
                    className="prose prose-lg max-w-none text-darkBrown/90 font-light tiptap-content"
                    dangerouslySetInnerHTML={{ __html: instruction }}
                  />
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
                  Secret du Chef
                </span>
              </div>
              <p className="text-lg italic font-medium leading-relaxed text-darkBrown/80">
                &quot;Pour obtenir les meilleurs résultats avec ce{" "}
                {recipe.title.toLowerCase()}, assurez-vous que tous vos
                ingrédients sont à température ambiante. Le secret réside dans
                la superposition des saveurs — ne précipitez jamais
                l&apos;assaisonnement.&quot;
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
              Fait Maison
            </span>
            <span className="px-3 py-1 bg-white border border-beige rounded-full text-sm text-darkBrown/60 hover:border-terracotta hover:text-terracotta transition-colors">
              De Saison
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};
