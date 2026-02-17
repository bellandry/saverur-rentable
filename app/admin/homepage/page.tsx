"use client";

import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomepageContentPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    // Hero Section
    heroEnabled: true,
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    heroButtonText: "Voir les recettes",
    heroButtonLink: "/recipes",

    // Categories Section
    categoriesEnabled: true,
    categoriesTitle: "Catégories",

    // Latest Recipes Section
    latestRecipesEnabled: true,
    latestRecipesTitle: "Dernières Recettes",
    latestRecipesLimit: 6,

    // Collections Section
    collectionsEnabled: true,
    collectionsTitle: "Nos Collections",

    // Popular Recipes Section
    popularRecipesEnabled: true,
    popularRecipesTitle: "Recettes Populaires",
    popularRecipesLimit: 6,

    // Featured Recipes Section
    featuredRecipesEnabled: true,
    featuredRecipesTitle: "Recettes en Vedette",

    // About Section
    aboutEnabled: true,
    aboutTitle: "",
    aboutText: "",
    aboutImage: "",
    aboutButtonText: "En savoir plus",
    aboutButtonLink: "/about",

    // Newsletter Section
    newsletterEnabled: true,
    newsletterTitle: "Restez informé",
    newsletterSubtitle: "Inscrivez-vous pour recevoir nos dernières recettes",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/homepage");
      const data = await response.json();
      setFormData((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      alert("Contenu mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Erreur lors de la mise à jour du contenu");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-terracotta mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
          Gestion de la Page d&apos;Accueil
        </h1>
        <p className="text-gray-600">
          Personnalisez toutes les sections de votre page d&apos;accueil.
          Activez ou désactivez les sections, modifiez les titres et les
          contenus.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Hero (En-tête)
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.heroEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    heroEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.heroEnabled && (
            <>
              <ImageUpload
                value={formData.heroImage}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, heroImage: url }))
                }
                label="Image d'arrière-plan *"
              />

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre principal *
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroTitle: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                    placeholder="Ex: Saveurs Authentiques"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-titre *
                  </label>
                  <textarea
                    value={formData.heroSubtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroSubtitle: e.target.value,
                      }))
                    }
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
                    placeholder="Description courte..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.heroButtonText}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          heroButtonText: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lien du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.heroButtonLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          heroButtonLink: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Categories Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Catégories
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.categoriesEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoriesEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.categoriesEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la section
              </label>
              <input
                type="text"
                value={formData.categoriesTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoriesTitle: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Les catégories affichées sont gérées depuis la section
                &quot;Catégories&quot; du dashboard.
              </p>
            </div>
          )}
        </div>

        {/* Latest Recipes Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Dernières Recettes
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.latestRecipesEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    latestRecipesEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.latestRecipesEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la section
                </label>
                <input
                  type="text"
                  value={formData.latestRecipesTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      latestRecipesTitle: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de recettes à afficher
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.latestRecipesLimit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      latestRecipesLimit: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Collections Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Collections
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.collectionsEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    collectionsEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.collectionsEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la section
              </label>
              <input
                type="text"
                value={formData.collectionsTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    collectionsTitle: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Les collections sont gérées depuis la section
                &quot;Collections&quot; du dashboard. Les recettes font partie
                d&apos;une collection en cochant la case appropriée lors de
                l&apos;édition de la recette.
              </p>
            </div>
          )}
        </div>

        {/* Popular Recipes Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Recettes Populaires
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.popularRecipesEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    popularRecipesEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.popularRecipesEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la section
                </label>
                <input
                  type="text"
                  value={formData.popularRecipesTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      popularRecipesTitle: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de recettes à afficher
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.popularRecipesLimit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      popularRecipesLimit: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
              <p className="text-sm text-gray-500 col-span-2">
                Les recettes populaires sont marquées en cochant &quot;Recette
                Populaire&quot; lors de l&apos;édition d&apos;une recette.
              </p>
            </div>
          )}
        </div>

        {/* Featured Recipes Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Recettes en Vedette
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featuredRecipesEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuredRecipesEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.featuredRecipesEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la section
              </label>
              <input
                type="text"
                value={formData.featuredRecipesTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuredRecipesTitle: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Les recettes en vedette sont marquées en cochant &quot;Recette
                Mise en Avant (Featured)&quot; lors de l&apos;édition d&apos;une
                recette.
              </p>
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section À Propos
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aboutEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    aboutEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.aboutEnabled && (
            <>
              <ImageUpload
                value={formData.aboutImage}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, aboutImage: url }))
                }
                label="Image"
              />

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.aboutTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        aboutTitle: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte
                  </label>
                  <textarea
                    value={formData.aboutText}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        aboutText: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.aboutButtonText}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aboutButtonText: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lien du bouton
                    </label>
                    <input
                      type="text"
                      value={formData.aboutButtonLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aboutButtonLink: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Section Newsletter
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.newsletterEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    newsletterEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <span className="text-gray-700 font-medium">Activer</span>
            </label>
          </div>

          {formData.newsletterEnabled && (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.newsletterTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newsletterTitle: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre
                </label>
                <input
                  type="text"
                  value={formData.newsletterSubtitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newsletterSubtitle: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-terracotta text-white py-4 rounded-lg font-medium hover:bg-darkBrown transition disabled:opacity-50 text-lg"
          >
            {loading ? "Enregistrement..." : "Sauvegarder les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
