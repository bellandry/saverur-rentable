"use client";

import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

interface StatItem {
  label: string;
  value: string;
}

export default function AboutContentPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    heroTitle: "À Propos de Saveur Rentable",
    heroSubtitle:
      "Découvrez notre passion pour la cuisine et notre engagement envers vous.",
    heroImage: "",
    storyTitle: "Notre Histoire",
    storyText: "",
    storyImage: "",
    valuesTitle: "Nos Valeurs",
    values: [] as ValueItem[],
    stats: [] as StatItem[],
    ctaTitle: "Prêt à cuisiner ?",
    ctaSubtitle:
      "Explorez nos recettes et commencez votre voyage culinaire dès aujourd'hui.",
    ctaButtonText: "Découvrir les recettes",
    ctaButtonLink: "/recipes",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/admin/about");
      const data = await response.json();
      if (data && data.id) {
        setFormData({
          ...data,
          values:
            typeof data.values === "string"
              ? JSON.parse(data.values)
              : data.values || [],
          stats:
            typeof data.stats === "string"
              ? JSON.parse(data.stats)
              : data.stats || [],
        });
      }
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
      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          values: JSON.stringify(formData.values),
          stats: JSON.stringify(formData.stats),
        }),
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

  const addValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [...prev.values, { icon: "ChefHat", title: "", text: "" }],
    }));
  };

  const removeValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const updateValue = (
    index: number,
    field: keyof ValueItem,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "", value: "" }],
    }));
  };

  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-terracotta mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
          Gestion de la Page À Propos
        </h1>
        <p className="text-gray-600">
          Personnalisez le contenu de votre page de présentation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown">
            Section Hero
          </h2>
          <ImageUpload
            value={formData.heroImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, heroImage: url }))
            }
            label="Image de fond *"
            className="aspect-video w-full relative"
          />
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
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
              />
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown">
            Notre Histoire
          </h2>
          <ImageUpload
            value={formData.storyImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, storyImage: url }))
            }
            label="Image d'illustration"
            className="aspect-video w-full"
          />
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <input
                type="text"
                value={formData.storyTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storyTitle: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texte *
              </label>
              <textarea
                value={formData.storyText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storyText: e.target.value,
                  }))
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Nos Valeurs
            </h2>
            <button
              type="button"
              onClick={addValue}
              className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-darkBrown transition font-medium"
            >
              <Plus className="w-4 h-4" />
              Ajouter une valeur
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la section
              </label>
              <input
                type="text"
                value={formData.valuesTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    valuesTitle: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
            </div>
            {formData.values.map((value, index) => (
              <div
                key={index}
                className="p-4 border border-gray-100 rounded-lg bg-gray-50 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-700">
                    Valeur n°{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeValue(index)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) =>
                        updateValue(index, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Icône (Lucide-react name)
                    </label>
                    <input
                      type="text"
                      value={value.icon}
                      onChange={(e) =>
                        updateValue(index, "icon", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                    value={value.text}
                    onChange={(e) => updateValue(index, "text", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-darkBrown">
              Statistiques
            </h2>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-darkBrown transition font-medium"
            >
              <Plus className="w-4 h-4" />
              Ajouter une statistique
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {formData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex gap-2 items-end p-4 border border-gray-100 rounded-lg bg-gray-50"
              >
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    Valeur (ex: 500+)
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <div className="flex-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Label (ex: Recettes)
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="p-2 text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown">
            Section Appel à l&apos;action (CTA)
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <input
                type="text"
                value={formData.ctaTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ctaTitle: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre *
              </label>
              <textarea
                value={formData.ctaSubtitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ctaSubtitle: e.target.value,
                  }))
                }
                rows={2}
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
                  value={formData.ctaButtonText}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ctaButtonText: e.target.value,
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
                  value={formData.ctaButtonLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ctaButtonLink: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 z-10">
          <button
            type="submit"
            disabled={loading}
            className="bg-terracotta text-white px-8 py-4 rounded-full font-bold hover:bg-darkBrown transition shadow-2xl flex items-center gap-2"
          >
            {loading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
