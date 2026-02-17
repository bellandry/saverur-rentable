import { PrismaClient } from "@prisma/client";
import { ALL_RECIPES, CATEGORIES } from "../constant/index";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // Nettoyer les données existantes
  await prisma.recipe.deleteMany();
  await prisma.category.deleteMany();
  await prisma.homePageContent.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Données existantes supprimées");

  // Créer les catégories
  console.log("📂 Création des catégories...");
  const categoryMap = new Map();

  for (const cat of CATEGORIES) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        icon: cat.icon,
      },
    });
    categoryMap.set(cat.slug, category.id);
  }

  console.log(`✅ ${CATEGORIES.length} catégories créées`);

  // Créer les recettes (filtrer les doublons par slug)
  console.log("🍳 Création des recettes...");
  const createdRecipes = [];
  const seenSlugs = new Set<string>();

  for (const recipe of ALL_RECIPES) {
    // Ignorer les recettes avec des slugs en double
    if (seenSlugs.has(recipe.slug)) {
      console.warn(`⚠️  Slug en double ignoré: ${recipe.slug}`);
      continue;
    }
    seenSlugs.add(recipe.slug);

    const categoryId = categoryMap.get(recipe.category);

    if (!categoryId) {
      console.warn(
        `⚠️  Catégorie non trouvée pour la recette: ${recipe.title}`,
      );
      continue;
    }

    const created = await prisma.recipe.create({
      data: {
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        image: recipe.image,
        additionalImages: recipe.additionalImages
          ? JSON.stringify(recipe.additionalImages)
          : null,
        prepTime: recipe.prepTime,
        difficulty: recipe.difficulty,
        isPremium: recipe.isPremium,
        isPopular: recipe.isPopular || false,
        isFeatured: recipe.isFeatured || false,
        isInCollection: recipe.isInCollection || false,
        servings: recipe.servings,
        ingredients: recipe.ingredients
          ? JSON.stringify(recipe.ingredients)
          : null,
        instructions: recipe.instructions
          ? JSON.stringify(recipe.instructions)
          : null,
        categoryId,
      },
    });

    createdRecipes.push(created);
  }

  console.log(`✅ ${createdRecipes.length} recettes créées`);

  // Créer le contenu de la page d'accueil
  console.log("🏠 Création du contenu de la page d'accueil...");

  await prisma.homePageContent.create({
    data: {
      heroTitle: "Cooking with Heart, Shared with Love",
      heroSubtitle:
        "Discover seasonal recipes and culinary techniques for the authentic home cook.",
      heroImage:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1920",
      aboutTitle: "About Our Kitchen",
      aboutText:
        "We believe in the power of home cooking to bring people together. Every recipe is crafted with care and tested in real kitchens.",
      aboutImage:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920",
      newsletterEnabled: true,
    },
  });

  console.log("✅ Contenu de la page d'accueil créé");

  // Créer un utilisateur admin par défaut
  console.log("👤 Création de l'utilisateur admin...");

  await prisma.user.create({
    data: {
      email: "admin@saveur-rentable.com",
      name: "Administrateur",
      emailVerified: true,
    },
  });

  console.log("✅ Utilisateur admin créé (email: admin@saveur-rentable.com)");
  console.log("\n🎉 Seed terminé avec succès!");
  console.log("\n📝 Pour configurer le mot de passe admin:");
  console.log("   1. Démarrez le serveur: npm run dev");
  console.log("   2. Accédez à http://localhost:3000/api/auth/sign-up");
  console.log("   3. Envoyez une requête POST avec:");
  console.log(
    '      { "email": "admin@saveur-rentable.com", "password": "votre_mot_de_passe", "name": "Administrateur" }',
  );
  console.log("\n   OU créez un script setup-admin.ts pour automatiser cela.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
