import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { slug: recipeSlug } = await params;
    const userId = session.user.id;

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { slug: recipeSlug },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 },
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId: recipe.id,
        },
      },
    });

    if (existingFavorite) {
      // Unfavorite
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return NextResponse.json({ favorited: false });
    } else {
      // Favorite
      await prisma.favorite.create({
        data: {
          userId,
          recipeId: recipe.id,
        },
      });
      return NextResponse.json({ favorited: true });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des favoris" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ isFavorited: false });
    }

    const { slug: recipeSlug } = await params;
    const userId = session.user.id;

    const recipe = await prisma.recipe.findUnique({
      where: { slug: recipeSlug },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 },
      );
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId: recipe.id,
        },
      },
    });

    return NextResponse.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json({ isFavorited: false });
  }
}
