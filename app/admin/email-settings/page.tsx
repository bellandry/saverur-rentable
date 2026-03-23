"use client";

import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmailSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/email-settings");
      const data = await res.json();
      if (!data.error) {
        setFormData({
          subject: data.subject || "",
          content: data.content || "",
        });
      }
    } catch (error) {
      console.error("Error fetching email settings:", error);
      toast.error("Erreur lors du chargement des réglages");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/email-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      toast.success("Réglages de l'email mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating email settings:", error);
      toast.error("Erreur lors de la mise à jour");
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
          Email de Bienvenue
        </h1>
        <p className="text-gray-600">
          Personnalisez le mail que reçoivent vos nouveaux utilisateurs lors de la création de leur compte.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sujet de l&apos;email
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition"
              placeholder="Ex: Bienvenue chez Saveur Rentable !"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu de l&apos;email
            </label>
            <TiptapEditor
              value={formData.content}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  content: value,
                }))
              }
              placeholder="Rédigez votre message de bienvenue ici..."
            />
            <p className="mt-2 text-xs text-gray-400">
              Note: Le contenu sera envoyé tel quel au format HTML. Assurez-vous d&apos;inclure vos salutations et informations importantes.
            </p>
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
