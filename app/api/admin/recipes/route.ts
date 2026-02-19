import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const recipeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  additionalImages: z.array(z.string().url()).optional(),
  prepTime: z.string(),
  difficulty: z.enum(["Easy", "Intermediate", "Advanced"]),
  isPremium: z.boolean(),
  isPopular: z.boolean(),
  isFeatured: z.boolean(),
  isInCollection: z.boolean(),
  servings: z.number().optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  categoryId: z.string(),
  price: z.number().nullable().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = recipeSchema.parse(body);

    const recipe = await prisma.recipe.create({
      data: {
        ...data,
        price: data.price ?? 0,
        additionalImages: data.additionalImages
          ? JSON.stringify(data.additionalImages)
          : null,
        ingredients: JSON.stringify(data.ingredients),
        instructions: JSON.stringify(data.instructions),
        status: data.status || "published",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la recette" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const validated = recipeSchema.parse(data);

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        ...validated,
        price: validated.price ?? 0,
        additionalImages: validated.additionalImages
          ? JSON.stringify(validated.additionalImages)
          : null,
        ingredients: JSON.stringify(validated.ingredients),
        instructions: JSON.stringify(validated.instructions),
        status: validated.status,
      },
      include: {
        category: true,
      },
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la recette" },
      { status: 500 },
    );
  }
}
