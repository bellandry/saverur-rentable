"use client";

import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

export default function EditRecipePage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    additionalImages: [] as string[],
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "Facile",
    categoryId: "",
    ingredients: [""],
    instructions: [""],
    tips: "",
    nutritionInfo: "",
    isPremium: false,
    price: "",
    isPopular: false,
    isFeatured: false,
    isInCollection: false,
    status: "published",
  });

  useEffect(() => {
    if (recipeId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const fetchData = async () => {
    try {
      // Fetch recipe
      const recipeRes = await fetch(`/api/admin/recipes/${recipeId}`);
      const recipe = await recipeRes.json();

      // Fetch categories
      const categoriesRes = await fetch("/api/categories");
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);

      // Parse JSON fields
      const parseJsonField = (field: string | null | undefined): string[] => {
        if (typeof field === "string") {
          try {
            const parsed = JSON.parse(field);
            return parsed;
          } catch {
            return [];
          }
        }
        return [];
      };

      // Map difficulty from API (English) to form (French)
      const mapDifficultyFromApi = (difficulty: string): string => {
        const mapping: Record<string, string> = {
          Easy: "Facile",
          Intermediate: "Moyen",
          Advanced: "Difficile",
        };
        return mapping[difficulty] || "Facile";
      };

      // Populate form
      const formDataToSet = {
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        image: recipe.image,
        additionalImages: parseJsonField(recipe.additionalImages),
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime || "",
        servings: recipe.servings?.toString() || "",
        difficulty: mapDifficultyFromApi(recipe.difficulty),
        categoryId: recipe.categoryId,
        ingredients: parseJsonField(recipe.ingredients),
        instructions: parseJsonField(recipe.instructions),
        tips: recipe.tips || "",
        nutritionInfo: recipe.nutritionInfo || "",
        isPremium: recipe.isPremium || false,
        price: recipe.price?.toString() || "",
        isPopular: recipe.isPopular || false,
        isFeatured: recipe.isFeatured || false,
        isInCollection: recipe.isInCollection || false,
        status: recipe.status || "published",
      };

      setFormData(formDataToSet);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Erreur lors du chargement de la recette");
    } finally {
      setLoading(false);
    }
  };

  const mapDifficultyToApi = (difficulty: string): string => {
    const mapping: Record<string, string> = {
      Facile: "Easy",
      Moyen: "Intermediate",
      Difficile: "Advanced",
    };
    return mapping[difficulty] || "Easy";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          image: formData.image,
          additionalImages: formData.additionalImages.filter((img) => img),
          prepTime: formData.prepTime,
          cookTime: formData.cookTime,
          servings: parseInt(formData.servings),
          difficulty: mapDifficultyToApi(formData.difficulty),
          categoryId: formData.categoryId,
          ingredients: formData.ingredients.filter((i) => i.trim()),
          instructions: formData.instructions.filter((i) => i.trim()),
          tips: formData.tips || null,
          nutritionInfo: formData.nutritionInfo || null,
          isPremium: formData.isPremium,
          price: formData.isPremium ? parseFloat(formData.price) : 0,
          isPopular: formData.isPopular,
          isFeatured: formData.isFeatured,
          isInCollection: formData.isInCollection,
          status: formData.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      router.push("/admin/recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Erreur lors de la mise à jour de la recette");
    } finally {
      setSaving(false);
    }
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? value : ing,
      ),
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) =>
        i === index ? value : inst,
      ),
    }));
  };

  const addAdditionalImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, url],
    }));
  };

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/recipes"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-darkBrown">
            Modifier la recette
          </h1>
          <p className="text-gray-600 mt-1">
            Mettez à jour les informations de la recette
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image principale */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown mb-4">
            Image principale
          </h2>
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            label="Image de couverture *"
            className="aspect-video w-full md:w-1/2"
          />
        </div>

        {/* Informations de base */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown mb-4">
            Informations de base
          </h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>

              <div className="hidden">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temps de préparation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.prepTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prepTime: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                  placeholder="Ex: 15 min"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temps de cuisson *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cookTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cookTime: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                  placeholder="Ex: 30 min"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portions *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Ex: 3"
                  value={formData.servings}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      servings: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulté *
                </label>
                <select
                  required
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      difficulty: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                >
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Difficile">Difficile</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ingrédients */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Ingrédients
            </h2>
            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center gap-2 text-terracotta hover:text-darkBrown transition"
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>

          <div className="space-y-3">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                  placeholder={`Ingrédient ${index + 1}`}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Instructions
            </h2>
            <button
              type="button"
              onClick={addInstruction}
              className="flex items-center gap-2 text-terracotta hover:text-darkBrown transition"
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>

          <div className="space-y-3">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <div className="shrink-0 w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center font-medium mt-2">
                  {index + 1}
                </div>
                <textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
                  placeholder={`Étape ${index + 1}`}
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Flags */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown mb-4">
            Statuts de la recette
          </h2>
          <div className="flex gap-6 flex-wrap">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPremium}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPremium: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Recette Premium</span>
            </label>

            {formData.isPremium && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Prix (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPopular: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">
                Recette Populaire
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">
                Recette Mise en Avant (Featured)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isInCollection}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isInCollection: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">
                Afficher dans Collections (max 3)
              </span>
            </label>

            <div className="w-full pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut de publication
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, status: "published" }))
                  }
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition font-medium ${
                    formData.status === "published"
                      ? "border-terracotta bg-terracotta/5 text-terracotta"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Publié
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, status: "draft" }))
                  }
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition font-medium ${
                    formData.status === "draft"
                      ? "border-gray-400 bg-gray-100 text-gray-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Brouillon
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Images additionnelles */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown mb-4">
            Images additionnelles
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {formData.additionalImages.map((img, index) => (
              <div key={index} className="relative group">
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  width={300}
                  height={128}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <ImageUpload
            value=""
            onChange={addAdditionalImage}
            label="Ajouter une image"
          />
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown mb-4">
            Informations supplémentaires
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conseils
              </label>
              <textarea
                value={formData.tips}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tips: e.target.value }))
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
                placeholder="Conseils de préparation ou de présentation..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informations nutritionnelles
              </label>
              <textarea
                value={formData.nutritionInfo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nutritionInfo: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
                placeholder="Calories, protéines, etc..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving || !formData.image}
            className="flex-1 text-sm bg-terracotta text-white py-2 md:py-4 rounded-lg font-medium hover:bg-darkBrown transition disabled:opacity-50 md:text-lg"
          >
            {saving ? "Enregistrement..." : "Mettre à jour la recette"}
          </button>
          <Link
            href="/admin/recipes"
            className="px-4 py-2 md:px-8 md:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition text-sm md:text-lg"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
