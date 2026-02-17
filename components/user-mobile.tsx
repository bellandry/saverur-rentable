import { authClient, useSession } from "@/lib/auth-client";
import { User as UserSession } from "@/lib/auth-types";
import { BookOpen, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export type UserMobileProps = {
  setIsMobileMenuOpen: (open: boolean) => void;
};

export const UserMobile = (props: UserMobileProps) => {
  const { setIsMobileMenuOpen } = props;
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    !isPending && (
      <>
        {session ? (
          <div className="flex flex-col items-center space-y-4 w-full px-6 pt-4 border-t border-beige">
            <Link
              href="/profile/recipes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-xl font-serif text-darkBrown"
            >
              <BookOpen size={20} className="text-terracotta" />
              <span>Mes recettes</span>
            </Link>
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-xl font-serif text-darkBrown"
            >
              <User size={20} className="text-terracotta" />
              <span>Profil</span>
            </Link>
            {(session.user as UserSession).role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-xl font-serif text-darkBrown"
              >
                <Settings size={20} className="text-terracotta" />
                <span>Admin</span>
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-xl font-serif text-red-500 pt-4"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        ) : (
          <Button
            className="mt-4 bg-terracotta px-8 py-3 rounded-sm text-lg font-medium hover:bg-darkBrown transition-colors uppercase tracking-widest w-64"
            asChild
          >
            <Link href="/login">Connexion</Link>
          </Button>
        )}
      </>
    )
  );
};
