import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        recipes: {
          include: {
            recipe: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform to include recipe count
    const collectionsWithCount = collections.map((collection) => ({
      ...collection,
      recipeCount: collection.recipes.length,
    }));

    return NextResponse.json(collectionsWithCount);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des collections" },
      { status: 500 },
    );
  }
}
