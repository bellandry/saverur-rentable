import { auth } from "@/lib/auth";
import { User } from "@/lib/auth-types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./admin-layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Rediriger vers la page de login si non authentifié ou si non admin
  if (!session) {
    redirect("/");
  }
  if ((session.user as User).role !== "admin") {
    redirect("/profile/recipes");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
