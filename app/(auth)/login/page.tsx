import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginClient from "./login-client";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si déjà connecté, rediriger vers le dashboard
  if (session) {
    redirect("/admin");
  }

  return <AdminLoginClient />;
}
