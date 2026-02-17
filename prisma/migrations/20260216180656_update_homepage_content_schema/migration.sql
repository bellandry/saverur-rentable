/*
  Warnings:

  - You are about to drop the column `aboutLabel` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `collectionsDesc` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `collectionsLabel` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `featuredRecipesLabel` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `heroButton1Text` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `heroButton2Text` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterBenefit1` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterBenefit2` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterBenefit3` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterBenefit4` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterButtonText` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterDesc` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterEmailLabel` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `newsletterPriceText` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `showCategories` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `showCollections` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `showFeaturedRecipes` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `showLatestRecipes` on the `HomePageContent` table. All the data in the column will be lost.
  - You are about to drop the column `showPopularRecipes` on the `HomePageContent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HomePageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroEnabled" BOOLEAN NOT NULL DEFAULT true,
    "heroTitle" TEXT NOT NULL DEFAULT '',
    "heroSubtitle" TEXT NOT NULL DEFAULT '',
    "heroImage" TEXT NOT NULL DEFAULT '',
    "heroButtonText" TEXT NOT NULL DEFAULT 'Voir les recettes',
    "heroButtonLink" TEXT NOT NULL DEFAULT '/recipes',
    "categoriesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "categoriesTitle" TEXT NOT NULL DEFAULT 'Catégories',
    "latestRecipesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "latestRecipesTitle" TEXT NOT NULL DEFAULT 'Dernières Recettes',
    "latestRecipesLimit" INTEGER NOT NULL DEFAULT 6,
    "collectionsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "collectionsTitle" TEXT NOT NULL DEFAULT 'Nos Collections',
    "popularRecipesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "popularRecipesTitle" TEXT NOT NULL DEFAULT 'Recettes Populaires',
    "popularRecipesLimit" INTEGER NOT NULL DEFAULT 6,
    "featuredRecipesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "featuredRecipesTitle" TEXT NOT NULL DEFAULT 'Recettes en Vedette',
    "aboutEnabled" BOOLEAN NOT NULL DEFAULT true,
    "aboutImage" TEXT NOT NULL DEFAULT '',
    "aboutTitle" TEXT NOT NULL DEFAULT '',
    "aboutText" TEXT NOT NULL DEFAULT '',
    "aboutButtonText" TEXT NOT NULL DEFAULT 'En savoir plus',
    "aboutButtonLink" TEXT NOT NULL DEFAULT '/about',
    "newsletterEnabled" BOOLEAN NOT NULL DEFAULT true,
    "newsletterTitle" TEXT NOT NULL DEFAULT 'Restez informé',
    "newsletterSubtitle" TEXT NOT NULL DEFAULT 'Inscrivez-vous pour recevoir nos dernières recettes',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HomePageContent" ("aboutButtonText", "aboutImage", "aboutText", "aboutTitle", "collectionsTitle", "featuredRecipesTitle", "heroImage", "heroSubtitle", "heroTitle", "id", "latestRecipesTitle", "newsletterEnabled", "newsletterTitle", "popularRecipesTitle", "updatedAt") SELECT "aboutButtonText", coalesce("aboutImage", '') AS "aboutImage", coalesce("aboutText", '') AS "aboutText", coalesce("aboutTitle", '') AS "aboutTitle", "collectionsTitle", "featuredRecipesTitle", "heroImage", "heroSubtitle", "heroTitle", "id", "latestRecipesTitle", "newsletterEnabled", "newsletterTitle", "popularRecipesTitle", "updatedAt" FROM "HomePageContent";
DROP TABLE "HomePageContent";
ALTER TABLE "new_HomePageContent" RENAME TO "HomePageContent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
