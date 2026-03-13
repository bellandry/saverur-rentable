"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SocialLinksPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    pinterest: "",
    tiktok: "",
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/social-links");
      const data = await res.json();
      if (!data.error) {
        setFormData({
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          youtube: data.youtube || "",
          twitter: data.twitter || "",
          pinterest: data.pinterest || "",
          tiktok: data.tiktok || "",
        });
      }
    } catch (error) {
      console.error("Error fetching social links:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/social-links", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      alert("Réseaux sociaux mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating social links:", error);
      alert("Erreur lors de la mise à jour");
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

  const inputs = [
    { id: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
    { id: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
    { id: "youtube", label: "Youtube", placeholder: "https://youtube.com/..." },
    { id: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/..." },
    { id: "pinterest", label: "Pinterest", placeholder: "https://pinterest.com/..." },
    { id: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-terracotta mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au tableau de bord
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
          Gestion des Réseaux Sociaux
        </h1>
        <p className="text-gray-600">
          Renseignez les liens vers vos réseaux sociaux. Seuls les réseaux avec un lien valide seront affichés dans le footer du site.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={input.id}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {input.label}
                </label>
                <input
                  type="url"
                  id={input.id}
                  value={formData[input.id as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [input.id]: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition"
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-terracotta text-white py-3 px-8 rounded-full font-medium hover:bg-darkBrown transition disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
