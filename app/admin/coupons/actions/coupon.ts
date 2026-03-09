"use server";

import prisma from "@/lib/prisma";
import { Category, Recipe } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CouponFormData, couponSchema } from "./coupon-schema";

// --- ADMIN ACTIONS ---

export async function getCoupons() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { purchases: true },
        },
      },
    });
    return { success: true, coupons };
  } catch (error) {
    console.error("Erreur gertCoupons:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des coupons",
    };
  }
}

export async function createCoupon(data: CouponFormData) {
  try {
    const validated = couponSchema.parse(data);

    // Vérifier si le code existe déjà
    const existing = await prisma.coupon.findUnique({
      where: { code: validated.code },
    });

    if (existing) {
      return { success: false, error: "Ce code promo existe déjà" };
    }

    const { validCategoryIds, validRecipeIds, ...couponData } = validated;

    await prisma.coupon.create({
      data: {
        ...couponData,
        validCategories: validated.appliesToAll
          ? undefined
          : {
              connect: validCategoryIds.map((id) => ({ id })),
            },
        validRecipes: validated.appliesToAll
          ? undefined
          : {
              connect: validRecipeIds.map((id) => ({ id })),
            },
      },
    });

    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Données invalides" };
    }
    console.error("Erreur createCoupon:", error);
    return { success: false, error: "Erreur lors de la création du coupon" };
  }
}

export async function toggleCouponStatus(id: string, isActive: boolean) {
  try {
    await prisma.coupon.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (err) {
    console.error("Erreur toggleCouponStatus:", err);
    return {
      success: false,
      error: "Erreur lors de la modification du statut",
    };
  }
}

export async function deleteCoupon(id: string) {
  try {
    // Vérifier s'il a déjà été utilisé
    const coupon = await prisma.coupon.findUnique({
      where: { id },
      include: { _count: { select: { purchases: true } } },
    });

    if (!coupon) return { success: false, error: "Coupon introuvable" };

    if (coupon._count.purchases > 0) {
      // S'il a été utilisé, on le désactive seulement au lieu de le supprimer pour l'historique
      await prisma.coupon.update({
        where: { id },
        data: { isActive: false },
      });
      return {
        success: true,
        message:
          "Le coupon a été utilisé, il a été désactivé au lieu d'être supprimé.",
      };
    }

    await prisma.coupon.delete({ where: { id } });
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (err) {
    console.error("Erreur deleteCoupon:", err);
    return { success: false, error: "Erreur lors de la suppression du coupon" };
  }
}

// --- CLIENT ACTIONS (CHECKOUT) ---

export async function validateCoupon(code: string, recipeId: string) {
  try {
    // 1. Chercher le code et la recette (avec ses catégories)
    const [coupon, recipe] = await Promise.all([
      prisma.coupon.findUnique({
        where: { code: code.toUpperCase() },
        include: {
          validCategories: true,
          validRecipes: true,
        },
      }),
      prisma.recipe.findUnique({
        where: { id: recipeId },
        select: { price: true, categoryId: true, isPremium: true },
      }),
    ]);

    if (!recipe || !recipe.isPremium || !recipe.price) {
      return { success: false, error: "Cette recette n'est pas éligible" };
    }

    if (!coupon) {
      return { success: false, error: "Code promo invalide" };
    }

    if (!coupon.isActive) {
      return { success: false, error: "Ce code promo n'est plus actif" };
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return { success: false, error: "Ce code promo a expiré" };
    }

    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      return {
        success: false,
        error: "Ce code promo a atteint sa limite d'utilisation",
      };
    }

    // 2. Vérifier les restrictions
    let isValidForRecipe = coupon.appliesToAll;

    if (!isValidForRecipe) {
      const isRecipeValid = coupon.validRecipes.some(
        (r: Recipe) => r.id === recipeId,
      );
      const isCategoryValid = coupon.validCategories.some(
        (c: Category) => c.id === recipe.categoryId,
      );

      isValidForRecipe = isRecipeValid || isCategoryValid;
    }

    if (!isValidForRecipe) {
      return {
        success: false,
        error: "Ce code n'est pas applicable à cette recette",
      };
    }

    // 3. Calcul du nouveau prix
    let discountAmount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      discountAmount = (recipe.price * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    // Ne pas avoir de prix négatif
    const newPrice = Math.max(0, recipe.price - discountAmount);

    // Arrondir correctement pour Stripe (centimes) plus tard, mais on garde des floats ici.
    return {
      success: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      originalPrice: recipe.price,
      newPrice: Number(newPrice.toFixed(2)),
      discountAmount: Number(discountAmount.toFixed(2)),
    };
  } catch (error) {
    console.error("Erreur validateCoupon:", error);
    return { success: false, error: "Erreur lors de la validation du code" };
  }
}
