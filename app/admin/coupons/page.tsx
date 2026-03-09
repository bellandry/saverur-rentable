import { getCoupons } from "./actions/coupon";
import { getOptionsForCoupons } from "./actions/coupon-options";
import { CouponsClient } from "./coupons-client";

export const metadata = {
  title: "Gestion des Coupons | Admin",
};

export default async function CouponsPage() {
  const [couponsData, optionsData] = await Promise.all([
    getCoupons(),
    getOptionsForCoupons(),
  ]);

  const initialCoupons =
    couponsData.success && couponsData.coupons ? couponsData.coupons : [];
  const recipes =
    optionsData.success && optionsData.recipes ? optionsData.recipes : [];
  const categories =
    optionsData.success && optionsData.categories ? optionsData.categories : [];

  return (
    <CouponsClient
      initialCoupons={initialCoupons}
      recipes={recipes}
      categories={categories}
    />
  );
}
