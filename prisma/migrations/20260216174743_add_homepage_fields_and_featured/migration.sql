-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HomePageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "heroButton1Text" TEXT NOT NULL DEFAULT 'Discover Recipes',
    "heroButton2Text" TEXT NOT NULL DEFAULT 'Premium Recipes',
    "showCategories" BOOLEAN NOT NULL DEFAULT true,
    "showLatestRecipes" BOOLEAN NOT NULL DEFAULT true,
    "latestRecipesTitle" TEXT NOT NULL DEFAULT 'Latest Recipes',
    "showCollections" BOOLEAN NOT NULL DEFAULT true,
    "collectionsLabel" TEXT NOT NULL DEFAULT 'Curated Experience',
    "collectionsTitle" TEXT NOT NULL DEFAULT 'Menus & Collections',
    "collectionsDesc" TEXT NOT NULL DEFAULT 'Expertly crafted weekly plans and themed collections to inspire your kitchen journey.',
    "showPopularRecipes" BOOLEAN NOT NULL DEFAULT true,
    "popularRecipesTitle" TEXT NOT NULL DEFAULT 'Most Popular Recipes',
    "showFeaturedRecipes" BOOLEAN NOT NULL DEFAULT true,
    "featuredRecipesLabel" TEXT NOT NULL DEFAULT 'Trending Now',
    "featuredRecipesTitle" TEXT NOT NULL DEFAULT 'Community Favorites',
    "aboutImage" TEXT,
    "aboutLabel" TEXT NOT NULL DEFAULT 'Meet the Chef',
    "aboutTitle" TEXT,
    "aboutText" TEXT,
    "aboutButtonText" TEXT NOT NULL DEFAULT 'Read My Story',
    "newsletterEnabled" BOOLEAN NOT NULL DEFAULT true,
    "newsletterTitle" TEXT NOT NULL DEFAULT 'Rejoignez la table Saveurs & Rentables',
    "newsletterDesc" TEXT NOT NULL DEFAULT 'Accédez à nos archives premium, recevez des menus hebdomadaires personnalisés et participez à nos masterclasses mensuelles.',
    "newsletterBenefit1" TEXT NOT NULL DEFAULT '200+ Recettes Premium',
    "newsletterBenefit2" TEXT NOT NULL DEFAULT 'Expérience sans publicité',
    "newsletterBenefit3" TEXT NOT NULL DEFAULT 'Plans de repas téléchargeables',
    "newsletterBenefit4" TEXT NOT NULL DEFAULT 'Histoires exclusives',
    "newsletterEmailLabel" TEXT NOT NULL DEFAULT 'Adresse Email',
    "newsletterButtonText" TEXT NOT NULL DEFAULT 'Devenir Membre',
    "newsletterPriceText" TEXT NOT NULL DEFAULT 'À partir de 4,99€/mois. Annulable à tout moment.',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HomePageContent" ("aboutImage", "aboutText", "aboutTitle", "heroImage", "heroSubtitle", "heroTitle", "id", "newsletterEnabled", "updatedAt") SELECT "aboutImage", "aboutText", "aboutTitle", "heroImage", "heroSubtitle", "heroTitle", "id", "newsletterEnabled", "updatedAt" FROM "HomePageContent";
DROP TABLE "HomePageContent";
ALTER TABLE "new_HomePageContent" RENAME TO "HomePageContent";
CREATE TABLE "new_Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "additionalImages" TEXT,
    "prepTime" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "servings" INTEGER,
    "ingredients" TEXT,
    "instructions" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("additionalImages", "categoryId", "createdAt", "description", "difficulty", "id", "image", "ingredients", "instructions", "isPopular", "isPremium", "prepTime", "servings", "slug", "title", "updatedAt") SELECT "additionalImages", "categoryId", "createdAt", "description", "difficulty", "id", "image", "ingredients", "instructions", "isPopular", "isPremium", "prepTime", "servings", "slug", "title", "updatedAt" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
