import { auth } from "@/lib/auth";
import { getRecipeBySlug } from "@/lib/fetch-datas";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { RecipeDetail } from "./page-client";

const RecipeDetailPage = async ({
  params,
}: {
  params: Promise<{ recipeSlug: string }>;
}) => {
  const { recipeSlug } = await params;
  const recipe = await getRecipeBySlug(recipeSlug);

  if (!recipe) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let hasPurchased = false;
  if (session?.user && recipe) {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id,
        recipeId: recipe.id,
      },
    });
    hasPurchased = !!purchase;
  }

  return (
    <RecipeDetail
      recipe={recipe}
      hasPurchased={hasPurchased}
      user={session?.user}
    />
  );
};

export default RecipeDetailPage;
