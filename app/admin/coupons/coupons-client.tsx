"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  createCoupon,
  deleteCoupon,
  toggleCouponStatus,
} from "./actions/coupon";
import { CouponFormData } from "./actions/coupon-schema";
import { CouponDeleteAlert } from "./components/coupon-delete-alert";
import { CouponDialog } from "./components/coupon-dialog";
import { CouponTable } from "./components/coupon-table";

export interface CouponData {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  maxUses: number | null;
  usedCount: number;
  expiresAt: Date | string | null;
  isActive: boolean;
}

interface CouponClientProps {
  initialCoupons: CouponData[];
  recipes: { id: string; title: string; isPremium: boolean }[];
  categories: { id: string; name: string }[];
}

export function CouponsClient({
  initialCoupons,
  recipes,
  categories,
}: CouponClientProps) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    code: string;
  } | null>(null);

  const handleOpenNew = () => setShowDialog(true);

  const onSubmit = async (data: CouponFormData) => {
    // Si la date est vide, s'assurer qu'elle est null
    const submitData = { ...data };

    // Gérer les champs facultatifs numériques textuels vides
    if (isNaN(Number(submitData.maxUses)) || Number(submitData.maxUses) === 0)
      submitData.maxUses = null;

    const result = await createCoupon(submitData);
    if (result.success) {
      toast.success("Code promo créé avec succès");
      setShowDialog(false);
      // Pour forcer le rechargement partiel depuis le serveur:
      window.location.reload();
    } else {
      toast.error(result.error || "Une erreur est survenue");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const result = await toggleCouponStatus(id, !currentStatus);
    if (result.success) {
      toast.success("Statut mis à jour");
      setCoupons(
        coupons.map((c) =>
          c.id === id ? { ...c, isActive: !currentStatus } : c,
        ),
      );
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const result = await deleteCoupon(deleteConfirm.id);
    if (result.success) {
      toast.success(result.message || "Code promo supprimé");
      setCoupons(
        coupons.filter((c) => c.id !== deleteConfirm.id && !result.message),
      );
      if (result.message) {
        window.location.reload();
      }
    } else {
      toast.error(result.error);
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-darkBrown mb-2">
            Coupons de Réduction
          </h1>
          <p className="text-gray-600">
            Gérez les codes promo de la plateforme
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Code
        </Button>
      </div>

      <CouponTable
        coupons={coupons}
        onToggleStatus={handleToggleStatus}
        onDeleteRequest={setDeleteConfirm}
      />

      <CouponDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={onSubmit}
        categories={categories}
        recipes={recipes}
      />

      <CouponDeleteAlert
        coupon={deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
