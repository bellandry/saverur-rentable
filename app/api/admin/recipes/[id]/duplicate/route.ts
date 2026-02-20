import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Fetch original recipe
    const originalRecipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!originalRecipe) {
      return NextResponse.json(
        { error: "Recette originale non trouvée" },
        { status: 404 },
      );
    }

    // 2. Create the copy with explicit fields
    const duplicatedRecipe = await prisma.recipe.create({
      data: {
        title: `${originalRecipe.title} (Copie)`,
        slug: `${originalRecipe.slug}-copie-${Math.random().toString(36).substring(2, 7)}`,
        description: originalRecipe.description,
        image: originalRecipe.image,
        additionalImages: originalRecipe.additionalImages,
        prepTime: originalRecipe.prepTime,
        difficulty: originalRecipe.difficulty,
        isPremium: originalRecipe.isPremium,
        price: originalRecipe.price,
        isPopular: originalRecipe.isPopular,
        isFeatured: originalRecipe.isFeatured,
        isInCollection: originalRecipe.isInCollection,
        cookTime: originalRecipe.cookTime,
        tips: originalRecipe.tips,
        nutritionInfo: originalRecipe.nutritionInfo,
        servings: originalRecipe.servings,
        ingredients: originalRecipe.ingredients,
        instructions: originalRecipe.instructions,
        categoryId: originalRecipe.categoryId,
        status: "draft", // Always start as draft
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(duplicatedRecipe);
  } catch (error) {
    console.error("Error duplicating recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la duplication de la recette" },
      { status: 500 },
    );
  }
}
