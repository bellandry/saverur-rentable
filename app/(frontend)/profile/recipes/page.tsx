import { auth } from "@/lib/auth";
import { getPurchasedRecipes } from "@/lib/fetch-datas";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronRight, Clock, Users } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface MyRecipesPageProps {
  className?: string;
}

export default async function MyRecipesPage({ className }: MyRecipesPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const recipes = await getPurchasedRecipes(session.user.id);

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mb-4">
            Mes Recettes <span className="text-terracotta">Premium</span>
          </h1>
          <p className="text-lg text-darkBrown/60 max-w-2xl leading-relaxed">
            Retrouvez ici toutes les recettes que vous avez débloquées. Explorez
            à nouveau vos saveurs préférées.
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

      {recipes.length === 0 ? (
        <div className="bg-beige/10 rounded-[32px] border border-beige p-12 text-center">
          <BookOpen size={48} className="text-terracotta/40 mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-darkBrown mb-4">
            Aucune recette achetée pour le moment
          </h2>
          <p className="text-darkBrown/60 mb-8 max-w-md mx-auto">
            Explorez notre catalogue de recettes premium pour débloquer des
            saveurs exclusives et des secrets de chefs.
          </p>
          <Link
            href="/recipes"
            className="text-terracotta font-bold hover:underline"
          >
            Parcourir les recettes →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className={cn(
                "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className,
              )}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-darkBrown border border-white">
                    {recipe.category.name}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-bold text-darkBrown mb-3 group-hover:text-terracotta transition-colors leading-tight">
                  {recipe.title}
                </h3>
                <p className="text-darkBrown/60 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
                <div className="mt-auto pt-6 border-t border-beige/50 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-terracotta">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>{recipe.servings} PERS.</span>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
