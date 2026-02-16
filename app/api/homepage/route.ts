import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let homeContent = await prisma.homePageContent.findFirst();

    // Si pas de contenu, créer un contenu par défaut
    if (!homeContent) {
      homeContent = await prisma.homePageContent.create({
        data: {
          heroTitle: "Cooking with Heart, Shared with Love",
          heroSubtitle:
            "Discover seasonal recipes and culinary techniques for the authentic home cook.",
          heroImage:
            "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1920",
          aboutTitle: "About Our Kitchen",
          aboutText:
            "We believe in the power of home cooking to bring people together.",
          aboutImage:
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920",
          newsletterEnabled: true,
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
