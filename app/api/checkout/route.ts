import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { recipeId, couponCode } = await request.json();

    if (!recipeId) {
      return NextResponse.json(
        { error: "ID de recette manquant" },
        { status: 400 },
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe || !recipe.isPremium) {
      return NextResponse.json(
        { error: "Recette non trouvée ou non premium" },
        { status: 404 },
      );
    }

    let price = recipe.price || 0;
    if (price <= 0) {
      return NextResponse.json(
        { error: "Cette recette premium n'a pas de prix défini" },
        { status: 400 },
      );
    }

    let appliedCouponId: string | undefined;

    // Validate coupon if provided
    if (couponCode) {
      // Import dynamically or ensure it exists
      const { validateCoupon } =
        await import("@/app/admin/coupons/actions/coupon");
      const validationResult = await validateCoupon(couponCode, recipe.id);

      if (!validationResult.success || !validationResult.coupon) {
        return NextResponse.json(
          { error: validationResult.error || "Code promo invalide" },
          { status: 400 },
        );
      }

      price = validationResult.newPrice;

      // Get the coupon ID to pass it in metadata
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
        select: { id: true },
      });
      if (coupon) {
        appliedCouponId = coupon.id;
      }
    }

    // Check if user already purchased the recipe
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id,
        recipeId: recipe.id,
      },
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: "Recette déjà achetée" },
        { status: 400 },
      );
    }

    const origin = (await headers()).get("origin") || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: recipe.title,
              description: `Accès premium à la recette : ${recipe.title}`,
              images: [recipe.image],
            },
            unit_amount: Math.round(price * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/recipes/${recipe.slug}?success=true`,
      cancel_url: `${origin}/recipes/${recipe.slug}?canceled=true`,
      metadata: {
        recipeId: recipe.id,
        userId: session.user.id,
        ...(appliedCouponId && { couponId: appliedCouponId }),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 },
    );
  }
}
