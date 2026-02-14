"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Recipe {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: {
    name: string;
  };
  isPremium: boolean;
  isPopular: boolean;
  createdAt: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, recipes]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Erreur lors du chargement des recettes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await fetch(`/api/admin/recipes?id=${deleteConfirm.id}`, {
        method: "DELETE",
      });
      toast.success("Recette supprimée avec succès");
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Erreur lors de la suppression de la recette");
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
            Recettes
          </h1>
          <p className="text-gray-600">Gérez toutes vos recettes</p>
        </div>
        <Link href="/admin/recipes/new">
          <Button>
            <Plus className="w-5 h-5" />
            Nouvelle recette
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Recipes Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm
              ? "Aucune recette trouvée"
              : "Aucune recette pour le moment"}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Titre
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 min-w-[150px]">
                  Catégorie
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Statut
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="aspect-square relative w-16 h-16">
                      <Image
                        fill
                        src={recipe.image}
                        alt={recipe.title}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </td>
                  <td className="p-4 min-w-[250px]">
                    <div className="font-medium text-gray-900 line-clamp-2">
                      {recipe.title}
                    </div>
                    <div className="text-sm text-gray-500">{recipe.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sage/20 text-sage">
                      {recipe.category.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {recipe.isPopular && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-terracotta/20 text-terracotta">
                          Populaire
                        </span>
                      )}
                      {recipe.isPremium && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Premium
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-end gap-2">
                      <Link href={`/admin/recipes/${recipe.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setDeleteConfirm({
                            id: recipe.id,
                            title: recipe.title,
                          })
                        }
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûre de vouloir supprimer la recette &apos;
              {deleteConfirm?.title}&apos; ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
