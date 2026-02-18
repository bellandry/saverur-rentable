import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const featured = searchParams.get("featured");
    const popular = searchParams.get("popular");
    const limit = searchParams.get("limit");

    const where: any = {};

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (popular === "true") {
      where.isPopular = true;
    }

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit ? parseInt(limit) : undefined,
    });

    // Parse JSON fields
    const recipesWithParsedData = recipes.map((recipe) => ({
      ...recipe,
      additionalImages: recipe.additionalImages
        ? JSON.parse(recipe.additionalImages)
        : [],
      ingredients: recipe.ingredients ? JSON.parse(recipe.ingredients) : [],
      instructions: recipe.instructions ? JSON.parse(recipe.instructions) : [],
    }));

    return NextResponse.json(recipesWithParsedData);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des recettes" },
      { status: 500 },
    );
  }
}
