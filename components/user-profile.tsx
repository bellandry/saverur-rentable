import { authClient, useSession } from "@/lib/auth-client";
import { User as UserSession } from "@/lib/auth-types";
import { BookOpen, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-beige/20 hover:bg-beige/40 rounded-full transition-all border border-beige/50">
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white overflow-hidden relative">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User size={16} />
                )}
              </div>
              <span className="text-sm font-medium text-darkBrown hidden lg:inline">
                {session.user.name.split(" ")[0]}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border-beige"
          >
            <DropdownMenuLabel className="font-serif">
              Mon Compte
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-beige/30" />
            <DropdownMenuItem asChild>
              <Link
                href="/profile/recipes"
                className="flex items-center gap-2 cursor-pointer"
              >
                <BookOpen size={16} className="text-terracotta" />
                <span>Mes recettes</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User size={16} className="text-terracotta" />
                <span>Mon Profil</span>
              </Link>
            </DropdownMenuItem>
            {(session.user as UserSession).role === "admin" && (
              <DropdownMenuItem asChild>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings size={16} className="text-terracotta" />
                  <span>Administration</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-beige/30" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="bg-terracotta px-5 py-2 rounded-sm text-sm font-medium hover:bg-darkBrown transition-colors uppercase tracking-widest"
          asChild
        >
          <Link href="/login">Connexion</Link>
        </Button>
      )}
    </>
  );
};
