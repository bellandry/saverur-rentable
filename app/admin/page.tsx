"use client";

import { Category, Purchase, Recipe } from "@prisma/client";
import { BookOpen, CreditCard, Grid, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    recipes: 0,
    categories: 0,
    purchases: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [recipesRes, categoriesRes, purchasesRes] = await Promise.all([
          fetch("/api/recipes"),
          fetch("/api/categories"),
          fetch("/api/purchases"),
        ]);

        const recipes = (await recipesRes.json()) as Recipe[];
        const categories = (await categoriesRes.json()) as Category[];
        const purchases = (await purchasesRes.json()) as Purchase[];

        const totalRevenue = purchases.reduce((acc, p) => acc + p.amount, 0);

        setStats({
          recipes: recipes.length,
          categories: categories.length,
          purchases: purchases.length,
          revenue: totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      name: "Recettes",
      value: stats.recipes,
      icon: BookOpen,
      color: "bg-terracotta",
      href: "/admin/recipes",
    },
    {
      name: "Catégories",
      value: stats.categories,
      icon: Grid,
      color: "bg-sage",
      href: "/admin/categories",
    },
    {
      name: "Paiements",
      value: `${stats.purchases} (${stats.revenue.toFixed(2)}€)`,
      icon: CreditCard,
      color: "bg-darkBrown",
      href: "/admin/payments",
    },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-darkBrown mb-2">
          Tableau de bord
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Bienvenue dans votre espace d&apos;administration
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-darkBrown">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-darkBrown mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link
            href="/admin/recipes/new"
            className="flex items-center gap-3 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-terracotta hover:bg-terracotta/5 transition"
          >
            <Plus className="w-5 h-5 text-terracotta shrink-0" />
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Ajouter une nouvelle recette
            </span>
          </Link>
          <Link
            href="/admin/payments"
            className="flex items-center gap-3 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-darkBrown hover:bg-darkBrown/5 transition"
          >
            <CreditCard className="w-5 h-5 text-darkBrown shrink-0" />
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Voir les derniers paiements
            </span>
          </Link>
        </div>
      </div>

      {/* Guide */}
      <div className="mt-6 sm:mt-8 bg-linear-to-r from-terracotta/10 to-sage/10 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-darkBrown mb-3">
          📚 Guide rapide
        </h3>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          <li>
            • <strong>Recettes</strong> : Ajoutez et gérez vos recettes
          </li>
          <li>
            • <strong>Catégories</strong> : Organisez vos recettes par thème
          </li>
          <li>
            • <strong>Paiements</strong> : Suivez vos ventes et revenus
          </li>
          <li>
            • <strong>Page d&apos;accueil</strong> : Personnalisez le contenu de
            votre site
          </li>
          <li>
            • <strong>À Propos</strong> : Gérez votre histoire et vos valeurs
          </li>
        </ul>
      </div>
    </div>
  );
}
