-- CreateTable
CREATE TABLE "AboutPageContent" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL DEFAULT 'À Propos de Saveur Rentable',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Découvrez notre passion pour la cuisine et notre engagement envers vous.',
    "heroImage" TEXT NOT NULL DEFAULT '',
    "storyTitle" TEXT NOT NULL DEFAULT 'Notre Histoire',
    "storyText" TEXT NOT NULL DEFAULT '',
    "storyImage" TEXT NOT NULL DEFAULT '',
    "valuesTitle" TEXT NOT NULL DEFAULT 'Nos Valeurs',
    "values" TEXT NOT NULL DEFAULT '[]',
    "stats" TEXT NOT NULL DEFAULT '[]',
    "ctaTitle" TEXT NOT NULL DEFAULT 'Prêt à cuisiner ?',
    "ctaSubtitle" TEXT NOT NULL DEFAULT 'Explorez nos recettes et commencez votre voyage culinaire dès aujourd''hui.',
    "ctaButtonText" TEXT NOT NULL DEFAULT 'Découvrir les recettes',
    "ctaButtonLink" TEXT NOT NULL DEFAULT '/recipes',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutPageContent_pkey" PRIMARY KEY ("id")
);
