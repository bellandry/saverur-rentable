import { auth } from "@/lib/auth";
import { getFavoriteRecipes, getPurchasedRecipes } from "@/lib/fetch-datas";
import { ChevronRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RecipeTabs } from "./recipe-tabs";

export default async function MyRecipesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const [purchasedRecipes, favoriteRecipes] = await Promise.all([
    getPurchasedRecipes(session.user.id),
    getFavoriteRecipes(session.user.id),
  ]);

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mb-4">
            Mes <span className="text-terracotta">Recettes</span>
          </h1>
          <p className="text-lg text-darkBrown/60 max-w-2xl leading-relaxed">
            Retrouvez ici toutes vos recettes favorites et celles que vous avez
            débloquées.
          </p>
        </div>
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-full font-bold hover:bg-darkBrown transition-all shadow-lg shadow-terracotta/20 shrink-0 self-start"
        >
          Découvrir plus
          <ChevronRight size={20} />
        </Link>
      </div>

      <RecipeTabs
        purchasedRecipes={purchasedRecipes}
        favoriteRecipes={favoriteRecipes}
      />
    </div>
  );
}
