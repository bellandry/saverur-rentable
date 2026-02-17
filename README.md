# Saveur Rentable 🍳

**Saveur Rentable** est une plateforme moderne de partage et de vente de recettes culinaires. Elle permet aux passionnés de cuisine de découvrir des recettes gratuites et premium, tout en offrant aux administrateurs un contrôle total sur le contenu et l'apparence de la plateforme.

## ✨ Fonctionnalités

### 🏠 Espace Public

- **Accueil Dynamique** : Sections modulables (Dernières recettes, Populaires, En vedette, Collections).
- **Catalogue de Recettes** : Filtrage par catégories et recherche facilitée.
- **Recettes Premium** : Accès restreint aux contenus exclusifs via un système de paiement.
- **Newsletter** : Inscription pour rester informé des nouveautés.

### 🔐 Administration

- **Gestionnaire de Recettes** : Création et modification complète (Ingrédients, instructions, photos via Cloudinary).
- **Gestion des Catégories** : Organisation du contenu par thématiques.
- **Personnalisation de l'Accueil** : Modification en temps réel du texte, des images et des sections actives.
- **Tableau de Bord Sécurisé** : Accès restreint aux administrateurs via Better Auth.

## 🛠️ Stack Technique

- **Frontend** : [Next.js 15+](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend** : Next.js API Routes, Server Actions
- **Base de données** : [PostgreSQL](https://www.postgresql.org/) avec [Prisma ORM](https://www.prisma.io/)
- **Authentification** : [Better Auth](https://www.better-auth.com/)
- **Stockage d'images** : [Cloudinary](https://cloudinary.com/)
- **Paiements** : [Stripe](https://stripe.com/)
- **Composants UI** : [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Installation

1. **Cloner le projet**

   ```bash
   git clone https://github.com/bellandry/saveur-rentable.git
   cd saveur-rentable
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Variables d'environnement**
   Copiez le fichier `.env.example` en `.env` et remplissez les informations nécessaires (DATABASE_URL, CLOUDINARY_URL, STRIPE_SECRET_KEY, etc.).

4. **Préparer la base de données**

   ```bash
   npx prisma db push
   npx prisma db seed # Pour des données de test
   ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## 📖 Développement

- `npm run dev` : Lance le serveur de développement.
- `npm run build` : Génère le client Prisma et construit l'application pour la production.
- `npm run lint` : Vérifie la qualité du code.
- `npm run prisma:generate` : Régénère le client Prisma après modification du schema.

---

Projet développé avec passion pour les amoureux de la bonne cuisine. 🥘
