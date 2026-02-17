import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is missing");
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error(`Webhook Error: ${error}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 },
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const metadata = session.metadata;

    if (!metadata?.recipeId || !metadata?.userId) {
      console.error("Missing metadata in checkout session");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      await prisma.purchase.create({
        data: {
          userId: metadata.userId,
          recipeId: metadata.recipeId,
          amount: (session.amount_total || 0) / 100,
        },
      });
      console.log(
        `Purchase recorded for user ${metadata.userId} and recipe ${metadata.recipeId}`,
      );
    } catch (error) {
      console.error("Error creating purchase record:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
