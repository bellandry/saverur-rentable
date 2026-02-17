import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const recipe = await prisma.recipe.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 },
      );
    }

    // Parse JSON fields
    const recipeWithParsedData = {
      ...recipe,
      additionalImages: recipe.additionalImages
        ? JSON.parse(recipe.additionalImages)
        : [],
      ingredients: recipe.ingredients ? JSON.parse(recipe.ingredients) : [],
      instructions: recipe.instructions ? JSON.parse(recipe.instructions) : [],
    };

    return NextResponse.json(recipeWithParsedData);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la recette" },
      { status: 500 },
    );
  }
}
