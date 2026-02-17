-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "isInCollection" BOOLEAN NOT NULL DEFAULT false,
    "cookTime" TEXT NOT NULL DEFAULT '30 minutes',
    "tips" TEXT,
    "nutritionInfo" TEXT,
    "servings" INTEGER,
    "ingredients" TEXT,
    "instructions" TEXT,
    "categoryId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("additionalImages", "categoryId", "createdAt", "description", "difficulty", "id", "image", "ingredients", "instructions", "isFeatured", "isInCollection", "isPopular", "isPremium", "prepTime", "servings", "slug", "status", "title", "updatedAt") SELECT "additionalImages", "categoryId", "createdAt", "description", "difficulty", "id", "image", "ingredients", "instructions", "isFeatured", "isInCollection", "isPopular", "isPremium", "prepTime", "servings", "slug", "status", "title", "updatedAt" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
