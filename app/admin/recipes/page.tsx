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
import { Copy, Edit, Plus, Search, Trash2 } from "lucide-react";
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
  isFeatured: boolean;
  isInCollection: boolean;
  status: string;
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
  const [duplicating, setDuplicating] = useState<string | null>(null);

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

  const handleDuplicate = async (id: string) => {
    setDuplicating(id);
    try {
      const response = await fetch(`/api/admin/recipes/${id}/duplicate`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Erreur lors de la duplication");

      toast.success("Recette dupliquée avec succès (Brouillon)");
      fetchRecipes();
    } catch (error) {
      console.error("Error duplicating recipe:", error);
      toast.error("Erreur lors de la duplication de la recette");
    } finally {
      setDuplicating(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mt:items-center justify-between mb-8">
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
                      {recipe.isFeatured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Vedette
                        </span>
                      )}
                      {recipe.isInCollection && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Collection
                        </span>
                      )}
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
                      {recipe.status === "draft" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          Brouillon
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Publié
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-end gap-2">
                      <Link href={`/admin/recipes/${recipe.id}/edit`}>
                        <Button variant="ghost" size="icon" title="Modifier">
                          <Edit className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDuplicate(recipe.id)}
                        disabled={duplicating === recipe.id}
                        title="Dupliquer"
                      >
                        <Copy
                          className={`w-5 h-5 text-blue-600 ${
                            duplicating === recipe.id ? "animate-pulse" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setDeleteConfirm({
                            id: recipe.id,
                            title: recipe.title,
                          })
                        }
                        title="Supprimer"
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
