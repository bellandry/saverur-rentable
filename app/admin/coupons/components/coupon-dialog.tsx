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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CouponFormData, couponSchema } from "../actions/coupon-schema";

interface CouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CouponFormData) => Promise<void>;
  categories: { id: string; name: string }[];
  recipes: { id: string; title: string; isPremium: boolean }[];
}

export function CouponDialog({
  open,
  onOpenChange,
  onSubmit,
  categories,
  recipes,
}: CouponDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      discountType: "PERCENTAGE",
      discountValue: 0,
      maxUses: null,
      expiresAt: null,
      isActive: true,
      appliesToAll: true,
      validCategoryIds: [],
      validRecipeIds: [],
    },
  });

  const appliesToAll = useWatch({ control, name: "appliesToAll" });
  const discountType = useWatch({ control, name: "discountType" });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing, or you can manage it from outside. For now, doing it here is fine.
      setTimeout(() => reset(), 200);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau Code Promo</DialogTitle>
          <DialogDescription>
            Définissez les règles et restrictions de ce coupon. Une fois créé,
            les règles autres que &quot;Actif&quot; ne sont plus modifiables
            (pour la traçabilité).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Code Promotionnel *</Label>
              <Input
                {...register("code")}
                placeholder="EX: ETE2024"
                className="uppercase"
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
            </div>
            <div className="space-y-2 flex items-center gap-2 mt-8">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label>Actif (Prêt à l&apos;emploi)</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type de réduction *</Label>
              <Controller
                name="discountType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE">
                        Pourcentage (%)
                      </SelectItem>
                      <SelectItem value="FIXED">Montant fixe (€)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Valeur de réduction *</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  {...register("discountValue", { valueAsNumber: true })}
                />
                <div className="absolute right-3 top-2.5 text-gray-500">
                  {discountType === "PERCENTAGE" ? "%" : "€"}
                </div>
              </div>
              {errors.discountValue && (
                <p className="text-sm text-red-500">
                  {errors.discountValue.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Utilisations Max (optionnel)</Label>
              <Input
                type="number"
                placeholder="Illimité si vide"
                {...register("maxUses", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>Date d&apos;expiration (optionnel)</Label>
              <Input
                type="date"
                {...register("expiresAt", { valueAsDate: true })}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-100">
            <div className="flex items-center gap-2">
              <Controller
                name="appliesToAll"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label className="font-semibold">
                Le coupon est valide pour TOUTES les recettes
              </Label>
            </div>

            {!appliesToAll && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Sélectionnez les catégories ET/OU les recettes spécifiques sur
                  lesquelles ce code s&apos;applique.
                </p>

                <div className="space-y-2">
                  <Label>Catégories éligibles</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                    {categories.map((c) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`cat-${c.id}`}
                          value={c.id}
                          {...register("validCategoryIds")}
                          className="rounded border-gray-300 text-terracotta focus:ring-terracotta"
                        />
                        <Label htmlFor={`cat-${c.id}`} className="font-normal">
                          {c.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recettes Premium éligibles</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                    {recipes
                      .filter((r) => r.isPremium)
                      .map((r) => (
                        <div key={r.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`rec-${r.id}`}
                            value={r.id}
                            {...register("validRecipeIds")}
                            className="rounded border-gray-300 text-terracotta focus:ring-terracotta"
                          />
                          <Label
                            htmlFor={`rec-${r.id}`}
                            className="font-normal line-clamp-1"
                          >
                            {r.title}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer le code"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
