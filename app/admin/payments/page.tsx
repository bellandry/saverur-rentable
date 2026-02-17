"use client";

import { PurchaseWithDetails } from "@/lib/fetch-datas";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CreditCard, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [purchases, setPurchases] = useState<PurchaseWithDetails[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<
    PurchaseWithDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch("/api/purchases");
        const data = await res.json();
        setPurchases(data);
        setFilteredPurchases(data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = purchases.filter(
      (p) =>
        p.user.email.toLowerCase().includes(term) ||
        p.user.name?.toLowerCase().includes(term) ||
        p.recipe.title.toLowerCase().includes(term),
    );
    setFilteredPurchases(filtered);
  }, [searchTerm, purchases]);

  const totalRevenue = purchases.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-darkBrown mb-2">
            Paiements & Ventes
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Suivez l&apos;activité commerciale de votre plateforme
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-beige flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              Revenu Total
            </p>
            <p className="text-xl font-bold text-terracotta">
              {totalRevenue.toFixed(2)}€
            </p>
          </div>
          <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
            <CreditCard className="text-terracotta w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher par client ou recette..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta bg-white transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-beige overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige/10 border-b border-beige">
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Recette
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige/50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-6 bg-gray-100 rounded-full w-16 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : filteredPurchases.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500 font-serif italic"
                  >
                    Aucun paiement trouvé
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="hover:bg-beige/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-darkBrown">
                          {purchase.user.name || "Utilisateur"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {purchase.user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-darkBrown">
                      {purchase.recipe.title}
                    </td>
                    <td className="px-6 py-4 font-bold text-terracotta">
                      {purchase.amount.toFixed(2)}€
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(purchase.createdAt), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 uppercase tracking-wider">
                        Complété
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
