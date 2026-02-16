import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="items-center gap-2">
      <span className="text-3xl font-bold font-serif">
        Saveurs<span className="text-terracotta">&</span>Rentables
      </span>
    </Link>
  );
};
