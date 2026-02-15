"use client";

import { ImageUpload } from "@/components/admin/image-upload";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const collectionSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  image: z.string().url("L'URL de l'image est invalide"),
  isLocked: z.boolean(),
});

type CollectionFormData = z.infer<typeof collectionSchema>;

interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isLocked: boolean;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      image: "",
      isLocked: false,
    },
  });

  const watchTitle = watch("title");
  const watchImage = watch("image");
  const watchIsLocked = watch("isLocked");

  useEffect(() => {
    fetchCollections();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !editingCollection) {
      const slug = watchTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [watchTitle, editingCollection, setValue]);

  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/collections");
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
      toast.error("Erreur lors du chargement des collections");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CollectionFormData) => {
    try {
      const url = "/api/admin/collections";
      const method = editingCollection ? "PUT" : "POST";
      const body = editingCollection
        ? { id: editingCollection.id, ...data }
        : data;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      toast.success(
        editingCollection
          ? "Collection mise à jour avec succès"
          : "Collection créée avec succès",
      );

      setShowDialog(false);
      setEditingCollection(null);
      reset();
      fetchCollections();
    } catch (error) {
      console.error("Error saving collection:", error);
      toast.error("Erreur lors de la sauvegarde de la collection");
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    reset({
      title: collection.title,
      slug: collection.slug,
      description: collection.description,
      image: collection.image,
      isLocked: collection.isLocked,
    });
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await fetch(`/api/admin/collections?id=${deleteConfirm.id}`, {
        method: "DELETE",
      });
      toast.success("Collection supprimée avec succès");
      fetchCollections();
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast.error("Erreur lors de la suppression de la collection");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingCollection(null);
    reset();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
            Collections
          </h1>
          <p className="text-gray-600">Gérez les collections de recettes</p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-5 h-5" />
          Nouvelle collection
        </Button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Chargement...
          </div>
        ) : collections.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucune collection pour le moment
          </div>
        ) : (
          collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image
                  fill
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
                {collection.isLocked && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔒 Premium
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-darkBrown mb-2">
                  {collection.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {collection.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleEdit(collection)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      setDeleteConfirm({
                        id: collection.id,
                        title: collection.title,
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCollection
                ? "Modifier la collection"
                : "Nouvelle collection"}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations de la collection
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label>Image *</Label>
              <ImageUpload
                label="Image"
                value={watchImage}
                onChange={(url) => setValue("image", url)}
              />
              {errors.image && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Ex: Recettes d'été"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" {...register("slug")} className="bg-gray-50" />
                {errors.slug && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                {...register("description")}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none resize-none"
                placeholder="Décrivez cette collection..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLocked"
                {...register("isLocked")}
                checked={watchIsLocked}
                className="w-5 h-5 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <Label htmlFor="isLocked">Collection verrouillée (premium)</Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Enregistrement..."
                  : editingCollection
                    ? "Mettre à jour"
                    : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûre de vouloir supprimer la collection &quot;
              {deleteConfirm?.title}&quot; ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
