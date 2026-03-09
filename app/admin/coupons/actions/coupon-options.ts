"use server";

import prisma from "@/lib/prisma";

export async function getOptionsForCoupons() {
  try {
    const [recipes, categories] = await Promise.all([
      prisma.recipe.findMany({
        select: { id: true, title: true, isPremium: true },
        orderBy: { title: "asc" },
      }),
      prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);

    return { success: true, recipes, categories };
  } catch (error) {
    console.error("Erreur getOptionsForCoupons:", error);
    return { success: false, error: "Impossible de récupérer les options" };
  }
}
