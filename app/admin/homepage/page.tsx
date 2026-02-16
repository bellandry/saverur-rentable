"use client";

import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomepageContentPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    aboutTitle: "",
    aboutText: "",
    aboutImage: "",
    newsletterEnabled: true,
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/homepage");
      const data = await response.json();
      setFormData(data);
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
    <div className="max-w-4xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-terracotta mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
          Page d&apos;accueil
        </h1>
        <p className="text-gray-600">
          Personnalisez le contenu de votre page d&apos;accueil
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Hero */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown">
            Section Hero (En-tête)
          </h2>

          <ImageUpload
            value={formData.heroImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, heroImage: url }))
            }
            label="Image de fond"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre principal
            </label>
            <input
              type="text"
              required
              value={formData.heroTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, heroTitle: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              placeholder="Ex: Cooking with Heart, Shared with Love"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sous-titre
            </label>
            <textarea
              required
              value={formData.heroSubtitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  heroSubtitle: e.target.value,
                }))
              }
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
              placeholder="Ex: Discover seasonal recipes and culinary techniques..."
            />
          </div>
        </div>

        {/* Section À propos */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown">
            Section À propos
          </h2>

          <ImageUpload
            value={formData.aboutImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, aboutImage: url }))
            }
            label="Image"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre
            </label>
            <input
              type="text"
              required
              value={formData.aboutTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, aboutTitle: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none"
              placeholder="Ex: About Our Kitchen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texte
            </label>
            <textarea
              required
              value={formData.aboutText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, aboutText: e.target.value }))
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
              placeholder="Parlez de votre cuisine, votre passion..."
            />
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-bold text-darkBrown mb-4">
            Options
          </h2>

          <label className="flex items-center gap-2 cursor-pointer">
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
            <span className="text-sm font-medium text-gray-700">
              Afficher la section Newsletter
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-terracotta text-white py-4 rounded-lg font-medium hover:bg-darkBrown transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
