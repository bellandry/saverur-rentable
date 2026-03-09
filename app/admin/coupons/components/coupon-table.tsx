import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { CouponData } from "../coupons-client";

interface CouponTableProps {
  coupons: CouponData[];
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onDeleteRequest: (coupon: { id: string; code: string }) => void;
}

export function CouponTable({
  coupons,
  onToggleStatus,
  onDeleteRequest,
}: CouponTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Réduction</th>
              <th className="px-6 py-4">Utilisations</th>
              <th className="px-6 py-4">Expiration</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Aucun code promo créé.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-terracotta">
                    {coupon.code}
                  </td>
                  <td className="px-6 py-4">
                    {coupon.discountValue}{" "}
                    {coupon.discountType === "PERCENTAGE" ? "%" : "€"}
                  </td>
                  <td className="px-6 py-4">
                    {coupon.usedCount} / {coupon.maxUses || "∞"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {coupon.expiresAt
                      ? format(new Date(coupon.expiresAt), "dd MMM yyyy", {
                          locale: fr,
                        })
                      : "Jamais"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={coupon.isActive}
                        onCheckedChange={() =>
                          onToggleStatus(coupon.id, coupon.isActive)
                        }
                      />
                      <span className="text-sm text-gray-500">
                        {coupon.isActive ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onDeleteRequest({ id: coupon.id, code: coupon.code })
                      }
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
