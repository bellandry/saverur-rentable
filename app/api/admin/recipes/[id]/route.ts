import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        category: true,
        collections: {
          include: {
            collection: true,
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 },
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la recette" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { collections, ...recipeData } = body;

    // Serialize JSON fields
    const dataToUpdate = {
      ...recipeData,
      ingredients: recipeData.ingredients
        ? JSON.stringify(recipeData.ingredients)
        : undefined,
      instructions: recipeData.instructions
        ? JSON.stringify(recipeData.instructions)
        : undefined,
      additionalImages: recipeData.additionalImages
        ? JSON.stringify(recipeData.additionalImages)
        : undefined,
    };

    // Update recipe
    const recipe = await prisma.recipe.update({
      where: { id },
      data: dataToUpdate,
    });

    // Update collections if provided
    if (collections) {
      // Delete existing collection relations
      await prisma.recipeCollection.deleteMany({
        where: { recipeId: id },
      });

      // Create new collection relations
      if (collections.length > 0) {
        await prisma.recipeCollection.createMany({
          data: collections.map((collectionId: string) => ({
            recipeId: id,
            collectionId,
          })),
        });
      }
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la recette" },
      { status: 500 },
    );
  }
}
