import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let homeContent = await prisma.homePageContent.findFirst();

    // Si pas de contenu, créer un contenu par défaut
    if (!homeContent) {
      homeContent = await prisma.homePageContent.create({
        data: {
          // Hero Section - Set defaults
          heroEnabled: true,
          heroTitle: "Saveurs Authentiques",
          heroSubtitle:
            "Découvrez des recettes savoureuses et accessibles pour toute la famille",
          heroImage:
            "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1920",
          heroButtonText: "Voir les recettes",
          heroButtonLink: "/recipes",

          // Categories Section
          categoriesEnabled: true,
          categoriesTitle: "Catégories",

          // Latest Recipes Section
          latestRecipesEnabled: true,
          latestRecipesTitle: "Dernières Recettes",
          latestRecipesLimit: 6,

          // Collections Section
          collectionsEnabled: true,
          collectionsTitle: "Nos Collections",

          // Popular Recipes Section
          popularRecipesEnabled: true,
          popularRecipesTitle: "Recettes Populaires",
          popularRecipesLimit: 6,

          // Featured Recipes Section
          featuredRecipesEnabled: true,
          featuredRecipesTitle: "Recettes en Vedette",

          // About Section
          aboutEnabled: true,
          aboutTitle: "À Propos de Notre Cuisine",
          aboutText:
            "Nous croyons au pouvoir de la cuisine maison pour rassembler les gens.",
          aboutImage:
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920",
          aboutButtonText: "En savoir plus",
          aboutButtonLink: "/about",

          // Newsletter Section
          newsletterEnabled: true,
          newsletterTitle: "Restez informé",
          newsletterSubtitle:
            "Inscrivez-vous pour recevoir nos dernières recettes",
        },
      });
    }

    return NextResponse.json(homeContent);
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du contenu" },
      { status: 500 },
    );
  }
}
