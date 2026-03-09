import { z } from "zod";

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "Le code doit contenir au moins 3 caractères")
    .max(20)
    .toUpperCase(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().min(0.01, "La valeur doit être positive"),
  maxUses: z.number().nullable().optional(),
  expiresAt: z.date().nullable().optional(),
  isActive: z.boolean(),
  appliesToAll: z.boolean(),
  validCategoryIds: z.array(z.string()),
  validRecipeIds: z.array(z.string()),
});

export type CouponFormData = z.infer<typeof couponSchema>;
