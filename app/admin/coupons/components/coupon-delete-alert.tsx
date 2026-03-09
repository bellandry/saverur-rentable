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

interface CouponDeleteAlertProps {
  coupon: { id: string; code: string } | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}

export function CouponDeleteAlert({
  coupon,
  onOpenChange,
  onConfirm,
}: CouponDeleteAlertProps) {
  return (
    <AlertDialog open={!!coupon} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer le code promo{" "}
            <span className="font-bold text-terracotta">{coupon?.code}</span> ?
            S&apos;il a déjà été utilisé, il sera désactivé mais conservé dans
            l&apos;historique des achats.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
