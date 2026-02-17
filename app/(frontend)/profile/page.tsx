import { auth } from "@/lib/auth";
import { BookOpen, ChevronRight, Settings, User } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mb-12">
          Mon <span className="text-terracotta">Profil</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 border border-beige shadow-sm">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-beige p-1">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-terracotta flex items-center justify-center text-white">
                    <User size={40} />
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif font-bold text-darkBrown">
                  {user.name}
                </h3>
                <p className="text-sm text-darkBrown/60 lowercase italic">
                  {user.role}
                </p>
              </div>
            </div>

            <nav className="bg-white rounded-[32px] overflow-hidden border border-beige shadow-sm">
              <Link
                href="/profile/recipes"
                className="flex items-center gap-4 px-6 py-5 hover:bg-beige/10 transition-colors group border-b border-beige/50"
              >
                <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <span className="font-bold text-darkBrown text-sm flex-1">
                  Mes recettes
                </span>
                <ChevronRight size={18} className="text-beige" />
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-4 px-6 py-5 hover:bg-beige/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta group-hover:scale-110 transition-transform">
                    <Settings size={20} />
                  </div>
                  <span className="font-bold text-darkBrown text-sm flex-1">
                    Administration
                  </span>
                  <ChevronRight size={18} className="text-beige" />
                </Link>
              )}
            </nav>
          </div>

          {/* User Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-beige shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-darkBrown mb-8 border-b border-beige pb-4">
                Informations personnelles
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-terracotta block mb-2">
                    Nom complet
                  </label>
                  <p className="text-lg text-darkBrown font-medium">
                    {user.name}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-terracotta block mb-2">
                    Adresse e-mail
                  </label>
                  <p className="text-lg text-darkBrown font-medium">
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-terracotta block mb-2">
                    Date d&apos;inscription
                  </label>
                  <p className="text-lg text-darkBrown font-medium">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-beige/10 rounded-[32px] border border-dashed border-beige text-center">
              <p className="text-sm text-darkBrown/60">
                Vous souhaitez modifier vos informations ? Pour des raisons de
                sécurité, veuillez contacter le support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
