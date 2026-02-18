import prisma from "@/lib/prisma";
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
    const dataToUpdate = {
      ...body,
      ingredients: body.ingredients
        ? JSON.stringify(body.ingredients)
        : undefined,
      instructions: body.instructions
        ? JSON.stringify(body.instructions)
        : undefined,
      additionalImages: body.additionalImages
        ? JSON.stringify(body.additionalImages)
        : undefined,
    };

    // Update recipe
    const recipe = await prisma.recipe.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la recette" },
      { status: 500 },
    );
  }
}
